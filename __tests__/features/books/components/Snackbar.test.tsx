import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Snackbar } from '@/features/books/components/Snackbar';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

// Animated uses native driver — mock it
jest.useFakeTimers();

describe('Snackbar', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders message when visible=true', async () => {
    const { getByText } = await render(
      <Snackbar visible={true} message="Books updated!" onDismiss={jest.fn()} />,
    );
    expect(getByText('Books updated!')).toBeTruthy();
  });

  it('renders nothing when visible=false', async () => {
    const { queryByText } = await render(
      <Snackbar visible={false} message="Books updated!" onDismiss={jest.fn()} />,
    );
    expect(queryByText('Books updated!')).toBeNull();
  });

  it('calls onDismiss after animation completes', async () => {
    const onDismiss = jest.fn();
    await render(
      <Snackbar visible={true} message="Books updated!" onDismiss={onDismiss} />,
    );
    await act(async () => {
      jest.runAllTimers();
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
