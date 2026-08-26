import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GenreCard } from '@/features/books/components/GenreCard';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

const mockItem = { id: '1', title: 'Fiction' };

describe('GenreCard', () => {
  it('renders genre title in uppercase', async () => {
    const { getByText } = await render(
      <GenreCard item={mockItem} onPress={jest.fn()} />,
    );
    expect(getByText('FICTION')).toBeTruthy();
  });

  it('renders emoji for known genre', async () => {
    const { getByText } = await render(
      <GenreCard item={mockItem} onPress={jest.fn()} />,
    );
    // fiction emoji is 🧪
    expect(getByText('🧪')).toBeTruthy();
  });

  it('renders fallback emoji for unknown genre', async () => {
    const { getByText } = await render(
      <GenreCard item={{ id: '99', title: 'Unknown' }} onPress={jest.fn()} />,
    );
    expect(getByText('📖')).toBeTruthy();
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
