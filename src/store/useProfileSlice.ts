import create from "zustand";

import produce from "immer";

export type DataType = {
  profile?: {
    _id: string;
    name: string;
    image: string;
  };
};

type DataMutators = {
  setProfile: (profile: DataType["profile"]) => void;
};

const initialState: DataType = {
  profile: undefined,
};

const profileStore: (set: any) => DataType & DataMutators = (set) => ({
  ...initialState,

  setProfile: (profile) => {
    set(
      produce((draft: DataType) => {
        draft.profile = profile;
      })
    );
  },
});

const useProfileSlice = create(profileStore);

export default useProfileSlice;
