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
import { useSession } from "next-auth/react";

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
  footer: {
    borderTopWidth: 1,
    borderColor: "black",
  },

  section: {
    padding: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
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
          backgroundColor: "black",
          borderRadius: 50,
        }}
      />
      <Text style={{ paddingLeft: 10 }}>{title}</Text>
    </View>
    <View>
      {sentences.map((sentence) => (
        <View key={sentence}>
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
        </View>
      ))}
    </View>
  </View>
);

const Pager = () => (
  // <View fixed>
  <Text
    style={styles.pageNumber}
    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    fixed
  />
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
        }}
      >
        {userImage != "" && (
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
      <Text>{title}</Text>
    </View>
  );
};

const ReportSubject = ({ subject }: { subject: string }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Objet: {subject}</Text>
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
      <Text>
        {city}
        {city !== "" ? "," : ""} {date !== "" ? "le" : ""} {date}
      </Text>
    </View>
  );
};

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
      <Pager />
    </Page>
  </PDFDocument>
);

// Create Document Component
const PdfRenderComponent = ({}) => {
  const { report, project } = useEditorSlice();
  const { data: session } = useSession();

  return (
    <>
      <PDFViewer style={{ flex: 1 }} showToolbar>
        <MyDocument
          project={project}
          session={session}
          report={report}
        ></MyDocument>
      </PDFViewer>
    </>
  );
};

export default PdfRenderComponent;
