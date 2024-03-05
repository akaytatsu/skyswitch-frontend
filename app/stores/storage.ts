import { create } from 'zustand';
import { StorageModel } from '~/models/storage.model';

type IStorage = {
  data?: StorageModel;
  setData(data?: StorageModel): void;
};

export const useStorage = create<IStorage>((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
}));
