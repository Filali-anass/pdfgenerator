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
  page: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "black",
  },

  section: {
    margin: 10,
    // padding: 10,
    // flexGrow: 1,
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
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          backgroundColor: "black",
          borderRadius: 50,
          marginHorizontal: 10,
        }}
      />
      <Text style={{}}>{title}</Text>
    </View>
    <View>
      {sentences.map((sentence) => (
        <View key={sentence}>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                width: 8,
                height: 2,
                backgroundColor: "black",
                marginTop: 10,
                marginHorizontal: 10,
              }}
            />
            <Text>{sentence}</Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);

const Pager = () => (
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
          padding: 20,
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

const DateAndLocation = ({}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 15,
      }}
    >
      <Text>{"Casa le 09-09-2022"}</Text>
    </View>
  );
};

export const MyDocument = ({ project, session }: any) => (
  <PDFDocument>
    <Page size="A4" style={styles.page}>
      <Header
        projectName={project?.name ?? ""}
        projectImage={project?.image ?? ""}
        userImage={session?.user?.image ?? ""}
      />
      <DateAndLocation />
      <ReportTitle title={"COMPTE RENDU"} />
      <Section
        section={{
          title: "Pointage",
          sentences: ["5 ouvriers : désherbage et nettoyage du chantier"],
        }}
      />
      <Section
        section={{
          title: "Avancement travaux :",
          sentences: [
            "L’entreprise a procédé au désherbage et nettoyage du chantier pour reprise des travaux.",
            "5 ouvriers : désherbage et nettoyage du chantier",
          ],
        }}
      />
      <Pager />
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #3</Text>
      </View>
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
      <PDFViewer style={{ flex: 1 }} showToolbar={false}>
        <MyDocument project={project} session={session}></MyDocument>
      </PDFViewer>
    </>
  );
};

export default PdfRenderComponent;
