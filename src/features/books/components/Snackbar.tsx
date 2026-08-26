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
      <Icon name="checkmark-circle" size={20} color="#FFFFFF" style={styles.icon} />
      <Text style={styles.text} allowFontScaling={false}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 9999,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Theme.fonts.semiBold,
    flex: 1,
  },
});
