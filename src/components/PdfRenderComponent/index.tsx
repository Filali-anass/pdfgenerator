import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { DataType } from "../../store/dataStore";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
  },

  section: {
    // margin: 10,
    // padding: 10,
    // flexGrow: 1,
  },
});

// Create Document Component
const PdfRenderComponent = ({ header: { title: projectName } }: DataType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
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
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default PdfRenderComponent;
