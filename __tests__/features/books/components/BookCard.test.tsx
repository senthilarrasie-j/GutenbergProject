import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BookCard } from '@/features/books/components/BookCard';
import type { Book } from '@/features/books/types';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

const mockBook: Book = {
  id: 1,
  title: 'Moby Dick',
  authors: [{ name: 'Melville, Herman' }],
  translators: [],
  subjects: [],
  bookshelves: [],
  languages: ['en'],
  copyright: false,
  media_type: 'Text',
  formats: {
    'image/jpeg': 'https://example.com/cover.jpg',
    'text/html': 'https://example.com/book.html',
  },
  download_count: 5000,
};

const mockBookNoAuthor: Book = {
  ...mockBook,
  id: 2,
  authors: [],
};

describe('BookCard', () => {
  it('renders book title in uppercase', async () => {
    const { getByText } = await render(
      <BookCard item={mockBook} onPress={jest.fn()} />,
    );
    expect(getByText('MOBY DICK')).toBeTruthy();
  });

  it('renders formatted author name', async () => {
    const { getByText } = await render(
      <BookCard item={mockBook} onPress={jest.fn()} />,
    );
    expect(getByText('Herman Melville')).toBeTruthy();
  });

  it('renders Unknown Author when authors empty', async () => {
    const { getByText } = await render(
      <BookCard item={mockBookNoAuthor} onPress={jest.fn()} />,
    );
    expect(getByText('Unknown Author')).toBeTruthy();
  });

  it('calls onPress with book item on press', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(
      <BookCard item={mockBook} onPress={onPress} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledWith(mockBook);
  });

  it('has correct accessibilityLabel', async () => {
    const { getByRole } = await render(
      <BookCard item={mockBook} onPress={jest.fn()} />,
    );
    const btn = getByRole('button');
    expect(btn.props.accessibilityLabel).toContain('Moby Dick');
    expect(btn.props.accessibilityLabel).toContain('Herman Melville');
  });
});
