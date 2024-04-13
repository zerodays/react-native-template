import { X } from 'lucide-react-native';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ButtonProps } from './button';
import Button from './button';

// Dialog Context
const DialogContext = createContext({
  isVisible: false,
  toggleDialog: () => {
    // do nothing
  },
});

interface DialogProps extends PropsWithChildren {
  className?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

// Dialog Provider
const Dialog = ({ children, className, onOpenChange, open }: DialogProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDialog = () => {
    setIsVisible((prev) => !prev);
    onOpenChange?.(!isVisible);
  };

  useEffect(() => {
    setIsVisible(open ?? false);
  }, [open]);

  return (
    <DialogContext.Provider value={{ isVisible, toggleDialog }}>
      <View className={className}>{children}</View>
    </DialogContext.Provider>
  );
};

interface DialogContentProps extends PropsWithChildren {
  isDismissable?: boolean;
}

const DialogContent = ({
  children,
  isDismissable = true,
}: DialogContentProps) => {
  const { isVisible, toggleDialog } = useContext(DialogContext);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      statusBarTranslucent
      onRequestClose={isDismissable ? toggleDialog : undefined}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex h-screen w-screen items-center justify-center">
        <View className="relative flex h-screen w-screen items-center justify-center pt-20">
          <TouchableOpacity
            onPress={toggleDialog}
            disabled={!isDismissable}
            activeOpacity={1}
            className="absolute -bottom-40 top-0 w-full bg-black/40"
          />
          <View className="min-w-[60%] max-w-[90%] overflow-hidden rounded-2xl bg-slate-50 p-4">
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const DialogTrigger = (buttonProps: ButtonProps) => {
  const { toggleDialog } = useContext(DialogContext);

  return (
    <Button onPress={toggleDialog} {...buttonProps}>
      {buttonProps.children}
    </Button>
  );
};

const DialogClose = ({ onPress }: { onPress?: () => void }) => {
  const { toggleDialog } = useContext(DialogContext);

  return (
    <TouchableOpacity
      onPress={() => {
        toggleDialog();
        onPress?.();
      }}
      className="absolute right-4 top-[18px] z-10">
      <X size={24} className="text-slate-700" />
    </TouchableOpacity>
  );
};

const DialogHeader = ({ children }: PropsWithChildren) => (
  <View className="-mx-2 mb-3 border-b border-primary-100 px-2 pb-2">
    <Text className="font-semibold text-lg">{children}</Text>
  </View>
);

const DialogFooter = ({ children }: PropsWithChildren) => (
  <View className="mt-4 flex-row justify-end">{children}</View>
);

const DialogDismissFooter = ({ onPress }: { onPress?: () => void }) => {
  const { t } = useTranslation();
  const { toggleDialog } = useContext(DialogContext);

  return (
    <View className="mt-4 flex-row justify-end">
      <Button
        onPress={() => {
          toggleDialog();
          onPress?.();
        }}>
        {t('common:actions.confirm')}
      </Button>
    </View>
  );
};

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDismissFooter,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
};
