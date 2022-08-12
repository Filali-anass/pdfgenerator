import React from "react";
import {
  Page,
  Text,
  View,
  Document as PDFDocument,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import useEditorSlice, { DataType } from "../../store/useEditorSlice";
import useProfileSlice from "../../store/useProfileSlice";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
  },

  section: {
    padding: 10,
  },
  pageNumber: {
    fontSize: 12,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "black",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingHorizontal: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
  },
});

const Section = ({
  section: { title, sentences },
}: {
  section: DataType["report"]["sections"][number];
}) => (
  <View style={styles.section}>
    {title !== "" && (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            marginTop: 2,
            backgroundColor: "#1f497e",
            borderRadius: 50,
          }}
        />
        <Text style={{ paddingLeft: 10, color: "#1f497e" }}>{title}</Text>
      </View>
    )}
    <View>
      {sentences.map((sentence) => (
        <View key={sentence}>
          {sentence !== "" && (
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                paddingLeft: 30,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 2,
                  backgroundColor: "black",
                  marginTop: 10,
                }}
              />
              <Text style={{ paddingLeft: 10 }}>{sentence}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  </View>
);

const Pager = ({ userName }: { userName: string }) => (
  <View fixed style={styles.footer}>
    <Text style={styles.pageNumber}>
      Service Suivi {"«"} {userName} {"»"}
    </Text>
    <Text
      style={styles.pageNumber}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);

const Header = ({
  userImage,
  projectImage,
  projectName,
}: {
  userImage?: string;
  projectImage?: string;
  projectName: string;
}) => {
  return (
    <View style={styles.header} fixed>
      <View
        style={{
          flex: 1,
          borderColor: "black",
          borderRightWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        {userImage !== "" && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image style={styles.image} src={userImage} />
        )}
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>{projectName}</Text>
      </View>
      <View
        style={{
          flex: 1,
          borderColor: "black",
          borderLeftWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        {projectImage != "" && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image style={styles.image} src={projectImage} />
        )}
      </View>
    </View>
  );
};

const ReportTitle = ({ title }: { title: string }) => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", padding: 20 }}
    >
      <Text style={{ borderBottomWidth: 2 }}>{title}</Text>
    </View>
  );
};

const ReportSubject = ({ subject }: { subject: string }) => {
  return (
    <View style={styles.section}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            marginTop: 2,
            backgroundColor: "#1f497e",
            borderRadius: 50,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ paddingLeft: 10, color: "#1f497e" }}>Objet: </Text>
          <Text style={{ paddingLeft: 5 }}>{subject}</Text>
        </View>
      </View>
    </View>
  );
};

const DateAndLocation = ({ city, date }: { city: string; date: string }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 15,
      }}
    >
      <Text style={{ borderBottomWidth: 1 }}>
        {city}
        {city !== "" ? ", " : ""}
        {date !== "" ? "le " : ""}
        {date}
      </Text>
    </View>
  );
};

const chunkArray: <T>(arr: T[], size: number) => T[][] = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
    : [arr];

export const MyDocument = ({
  project,
  session,
  report,
}: DataType & { session: any }) => (
  <PDFDocument>
    <Page size="A4" style={styles.body}>
      <Header
        projectName={project?.name ?? ""}
        projectImage={project?.image ?? ""}
        userImage={session?.user?.image ?? ""}
      />
      <DateAndLocation city={report.city} date={report.date} />
      <ReportTitle title={"COMPTE RENDU"} />
      <ReportSubject subject={report.subject} />
      {report.sections.map((section, index) => (
        <Section key={section.title} section={section} />
      ))}
      <Pager userName={session?.user?.name ?? ""} />
    </Page>
    {report.pictures.length !== 0 &&
      chunkArray(report.pictures, 2).map((arr, index) => (
        <Page key={index} size="A4" style={styles.body}>
          <Header
            projectName={project?.name ?? ""}
            projectImage={project?.image ?? ""}
            userImage={session?.user?.image ?? ""}
          />
          <View>
            <ReportTitle title={"REPORTAGE PHOTOGRAPHIQUE"} />
            {arr.map((p) => (
              <View
                key={p}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ borderWidth: 1, margin: -0.5 }}>
                  {
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <Image
                      style={{
                        width: 400,
                        height: 300,
                        padding: 20,
                      }}
                      src={p}
                    />
                  }
                </View>
              </View>
            ))}
          </View>
          <Pager userName={session?.user?.name ?? ""} />
        </Page>
      ))}
  </PDFDocument>
);

// Create Document Component
const PdfRenderComponent = ({}) => {
  const { report, project } = useEditorSlice();
  const { profile } = useProfileSlice();

  return (
    <>
      <PDFViewer style={{ flex: 1 }} showToolbar>
        <MyDocument
          project={project}
          session={{ user: profile }}
          report={report}
        ></MyDocument>
      </PDFViewer>
    </>
  );
};

export default PdfRenderComponent;
