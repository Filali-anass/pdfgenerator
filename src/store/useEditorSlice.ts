import create, { GetState, SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

import produce from "immer";
import { IProject } from "../model/Project";
import { v4 as uuid } from "uuid";
import { SchemaTypeOptions } from "mongoose";
import { IReport } from "../model/Report";

export type DataType = {
  project?: IProject;
  report: {
    projectId: string;
    userId: string;
    date: string;
    city: string;
    subject: string;
    sections: {
      uid?: string;
      _id?: string;
      title: string;
      sentences: string[];
    }[];
    pictures: string[];
  };
  // name: string;
};

type DataMutators = {
  setProject: (project: IProject) => void;
  setReport: (report: IReport, project: IProject) => void;
  addSection: (section: DataType["report"]["sections"][number]) => void;
  editSection: (
    section: DataType["report"]["sections"][number],
    uid?: string
  ) => void;
  setDate: (date: string) => void;
  setCity: (city: string) => void;
  setSubject: (subject: string) => void;
  addPictures: (pictures: string[]) => void;
};

const initialState: DataType = {
  report: {
    projectId: "",
    userId: "",
    date: "",
    city: "",
    subject: "",
    sections: [
      {
        uid: uuid(),
        _id: uuid(),
        title: "",
        sentences: [""],
      },
    ],
    pictures: [],
  },
  project: undefined,
};

const editorStore: (set: any) => DataType & DataMutators = (set) => ({
  ...initialState,

  setProject: (project) => {
    set(
      produce((draft: DataType) => {
        draft.report = initialState.report;
        draft.project = project;
        draft.report.projectId = project._id;
      })
    );
  },
  setReport: (report, project) => {
    set(
      produce((draft: DataType) => {
        draft.report = {
          projectId: project._id,
          userId: "",
          date: report.date,
          city: report.city,
          subject: report.subject,
          sections: report.sections.map((s) => ({ ...s, uid: s._id })),
          pictures: report.pictures,
        };
        draft.project = project;
      })
    );
  },

  addSection: (section) => {
    set(
      produce((draft: DataType) => {
        draft.report.sections.push({
          ...section,
          uid: uuid(),
        });
      })
    );
  },

  editSection: (section, uid) => {
    set(
      produce((draft: DataType) => {
        draft.report.sections = draft.report.sections.map((s) =>
          s.uid === uid ? section : s
        );
      })
    );
  },

  setDate: (date) => {
    set(
      produce((draft: DataType) => {
        draft.report.date = date;
      })
    );
  },

  setCity: (city) => {
    set(
      produce((draft: DataType) => {
        draft.report.city = city;
      })
    );
  },
  setSubject: (subject) => {
    set(
      produce((draft: DataType) => {
        draft.report.subject = subject;
      })
    );
  },
  addPictures: (pictures) => {
    set(
      produce((draft: DataType) => {
        draft.report.pictures = [...draft.report.pictures, ...pictures];
      })
    );
  },
});

const useEditorSlice = create(
  devtools(
    persist(editorStore, {
      name: "editorStore",
      getStorage: () => localStorage,
    })
  )
);

export default useEditorSlice;
