import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ExampleStore {
  value: number;
  increment: () => void;
  decrement: () => void;
}

export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      value: 0,
      increment: () => set((state) => ({ value: state.value + 1 })),
      decrement: () => set((state) => ({ value: state.value - 1 })),
    }),
    {
      name: 'example-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
