import React from "react";
import "./App.css";
import { PDFViewer } from "@react-pdf/renderer";
import PdfRenderComponent from "./components/PdfRenderComponent";
import ContentFormComponent from "./components/ContentForm";
import useDataStore from "./store/dataStore";

function App() {
  const { header } = useDataStore();

  return (
    <div className="App">
      <header></header>
      <main className="flex w-full h-screen">
        <div className="flex w-full h-screen">
          <ContentFormComponent />
        </div>
        <div className="flex w-full">
          <PDFViewer style={{ flex: 1 }} showToolbar>
            <PdfRenderComponent sections={[]} header={header} />
          </PDFViewer>
        </div>
      </main>
    </div>
  );
}

export default App;
