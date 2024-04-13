import { create } from 'zustand';

type ToastData = {
  type: 'error' | 'success' | 'info';
  message: string;
};

type ToastState = {
  toast: ToastData | null;
};

type ToastActions = {
  setToast: (toast: ToastData | null) => void;
};

const useToastStore = create<ToastState & ToastActions>((set) => ({
  toast: null,
  setToast: (toast) => set({ toast }),
}));

export default useToastStore;
