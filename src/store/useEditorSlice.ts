import create from "zustand";
import produce from "immer";
import { IProject } from "../model/Project";

export type DataType = {
  project?: IProject;
  report: {
    projectId: string;
    userId: string;
    date: string;
    city: string;
    subject: string;
    sections: {
      title: string;
      sentences: string[];
    }[];
    pictures: string[];
  };
};

type DataMutators = {
  setProject: (project: IProject) => void;
};

const initialState = {
  report: {
    projectId: "",
    userId: "",
    date: "",
    city: "",
    subject: "",
    sections: [
      {
        title: "",
        sentences: [],
      },
    ],
    pictures: [],
  },
};

const useEditorSlice = create<DataType & DataMutators>((set) => ({
  ...initialState,

  setProject: (project) => {
    console.log("We are setting something");
    set(
      produce((draft: DataType) => {
        draft.project = project;
        draft.report.projectId = project._id;
      })
    );
  },
}));

export default useEditorSlice;
