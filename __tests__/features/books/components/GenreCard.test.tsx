import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GenreCard } from '@/features/books/components/GenreCard';

jest.mock('react-native-vector-icons/Ionicons', () => {
  const { Text } = require('react-native');
  return (props: any) => <Text>{props.name}</Text>;
});

const mockItem = { id: '1', title: 'Fiction' };

describe('GenreCard', () => {
  it('renders genre title in uppercase', async () => {
    const { getByText } = await render(
      <GenreCard item={mockItem} onPress={jest.fn()} />,
    );
    expect(getByText('FICTION')).toBeTruthy();
  });

  it('renders icon for known genre', async () => {
    const { getByText } = await render(
      <GenreCard item={mockItem} onPress={jest.fn()} />,
    );
    // fiction icon is flask-outline
    expect(getByText('flask-outline')).toBeTruthy();
  });

  it('renders fallback icon for unknown genre', async () => {
    const { getByText } = await render(
      <GenreCard item={{ id: '99', title: 'Unknown' }} onPress={jest.fn()} />,
    );
    expect(getByText('book-outline')).toBeTruthy();
  });

  it('calls onPress with genre title on press', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(
      <GenreCard item={mockItem} onPress={onPress} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledWith('Fiction');
  });

  it('has correct accessibilityLabel', async () => {
    const { getByRole } = await render(
      <GenreCard item={mockItem} onPress={jest.fn()} />,
    );
    expect(getByRole('button').props.accessibilityLabel).toBe('Genre Fiction');
  });
});
