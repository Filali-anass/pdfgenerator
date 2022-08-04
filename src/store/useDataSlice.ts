import create from "zustand";
import produce from "immer";

export type DataType = {
  header: { title: string };
  sections: {
    title: string;
    phrases: string[];
  }[];
  imgFile?: string;
};

type DataMutators = {
  rehydrate: () => void;
  setHeaderTitle: (title: string) => void;
  addImage: (imgFile: string) => void;
};

const initialState = { header: { title: "" }, sections: [] };

const useDataSlice = create<DataType & DataMutators>((set) => ({
  ...initialState,

  rehydrate: () => {
    set({ header: { title: "" }, sections: [] });
  },

  setHeaderTitle: (title) => {
    set(
      produce((draft: DataType) => {
        draft.header = { ...draft.header, title };
      })
      // (state) => ({ header: { ...state.header, title } })
    );
  },

  addImage: (imgFile) => {
    set(
      produce((draft: DataType) => {
        draft.imgFile = imgFile;
      })
      // (state) => ({ imgFile })
    );
  },
}));

export default useDataSlice;
