import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { Theme, useAppTheme, lightColors } from '@/ui/theme';

export interface ModalButton {
  text: string;
  onPress: () => void;
  type?: 'primary' | 'cancel';
}

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttons?: ModalButton[];
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  onClose,
  buttons,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const modalButtons = buttons || [
    { text: 'Close', onPress: onClose, type: 'primary' as const },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle} allowFontScaling={false}>
            {title}
          </Text>
          <Text style={styles.modalText} allowFontScaling={false}>
            {message}
          </Text>
          <View
            style={[
              styles.buttonContainer,
              modalButtons.length === 1 && styles.singleButtonContainer,
            ]}
          >
            {modalButtons.map((btn, index) => {
              const isCancel = btn.type === 'cancel';
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    isCancel ? styles.cancelButton : styles.confirmButton,
                    modalButtons.length === 1 && styles.singleButton,
                  ]}
                  onPress={btn.onPress}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      isCancel
                        ? styles.cancelButtonText
                        : styles.confirmButtonText
                    }
                    allowFontScaling={false}
                  >
                    {btn.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors: typeof lightColors) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: Theme.spacing.sm,
    padding: Theme.spacing.xxl,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: Theme.fontSizes.xl,
    fontFamily: Theme.fonts.semiBold,
    color: colors.primary,
    marginBottom: Theme.spacing.md,
  },
  modalText: {
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.regular,
    color: colors.greyDark,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  singleButtonContainer: {
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: Theme.spacing.m,
    borderRadius: Theme.spacing.xs,
    alignItems: 'center',
    marginHorizontal: Theme.spacing.sm,
  },
  singleButton: {
    flex: 0,
    paddingHorizontal: Theme.spacing.xxl,
  },
  cancelButton: {
    backgroundColor: colors.greyLight,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.semiBold,
    color: colors.greyDark,
  },
  confirmButtonText: {
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.semiBold,
    color: colors.white,
  },
});
