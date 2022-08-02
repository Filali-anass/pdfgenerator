import create from "zustand";

export type DataType = {
  header: { title: string };
  sections: {
    title: string;
    phrases: string[];
  }[];
};

type DataMutators = {
  rehydrate: () => void;
  setHeaderTitle: (title: string) => void;
};
type DataStoreState = DataType & DataMutators;

const useDataStore = create<DataStoreState>((set) => ({
  header: { title: "" },
  sections: [],

  rehydrate: () => {
    set({ header: { title: "" }, sections: [] });
  },

  setHeaderTitle: (title) => {
    console.log("setting somethong");
    set((state) => ({ header: { ...state.header, title } }));
  },
}));

export default useDataStore;
