import { BOOK_STRINGS } from '@/features/books/constants';

export const formatAuthorName = (name?: string): string => {
  if (!name) return BOOK_STRINGS.unknownAuthor;
  const parts = name.split(',');
  if (parts.length === 2) {
    return `${parts[1].trim()} ${parts[0].trim()}`;
  }
  return name;
};
