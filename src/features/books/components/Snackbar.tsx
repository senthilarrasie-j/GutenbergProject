import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '@/ui/theme';

interface SnackbarProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({ visible, message, onDismiss }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.delay(2300),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss();
      });
    }
  }, [visible, animatedValue, onDismiss]);

  if (!visible) return null;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const opacity = animatedValue;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], opacity }]}>
      <Icon name="checkmark-circle" size={20} color={Theme.colors.white} style={styles.icon} />
      <Text style={styles.text} allowFontScaling={false}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: Theme.spacing.xxl,
    right: Theme.spacing.xxl,
    backgroundColor: Theme.colors.success,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 9999,
  },
  icon: {
    marginRight: Theme.spacing.m,
  },
  text: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.sm,
    fontFamily: Theme.fonts.semiBold,
    flex: 1,
  },
});
