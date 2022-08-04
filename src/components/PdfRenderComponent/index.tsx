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
import { DataType } from "../../store/useDataSlice";

// Create styles
const styles = StyleSheet.create({
  page: {
    // backgroundColor: "#E4E4E4",
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
    // margin: 10,
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

// Create Document Component
const PdfRenderComponent = ({
  header: { title: projectName },
  imgFile,
}: DataType) => (
  <PDFViewer style={{ flex: 1 }} showToolbar>
    <PDFDocument>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <View
            style={{ flex: 1, borderColor: "black", borderRightWidth: 1 }}
          ></View>
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
            style={{ flex: 1, borderColor: "black", borderLeftWidth: 1 }}
          ></View>
        </View>
        <View style={styles.section}>
          {imgFile && <Image style={styles.image} src={imgFile} />}
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
          <div>OK</div>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #3</Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </PDFDocument>
  </PDFViewer>
);

export default PdfRenderComponent;
