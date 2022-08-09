import create from "zustand";
import produce from "immer";
import { IProject } from "../model/Project";
import { v4 as uuid } from "uuid";
import { SchemaTypeOptions } from "mongoose";

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
      title: string;
      sentences: string[];
    }[];
    pictures: string[];
  };
};

type DataMutators = {
  setProject: (project: IProject) => void;
  addSection: (section: DataType["report"]["sections"][number]) => void;
  editSection: (
    section: DataType["report"]["sections"][number],
    uid?: string
  ) => void;
  setDate: (date: string) => void;
  setCity: (city: string) => void;
  setSubject: (subject: string) => void;
};

const initialState = {
  report: {
    projectId: "",
    userId: "",
    date: "[Date]",
    city: "[Ville]",
    subject: "[Objet]",
    sections: [
      {
        uid: uuid(),
        title: "[Titre]",
        sentences: ["[Remarque 1]"],
      },
    ],
    pictures: [],
  },
};

const useEditorSlice = create<DataType & DataMutators>((set) => ({
  ...initialState,

  setProject: (project) => {
    set(
      produce((draft: DataType) => {
        draft.project = project;
        draft.report.projectId = project._id;
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
}));

export default useEditorSlice;
