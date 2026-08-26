interface Book {
  id: number;
  title: string;
  authors: Array<{ name: string; birth_year?: number; death_year?: number }>;
  translators: Array<{ name: string }>;
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  nextUrl: string | null;
  searchQuery: string;
  selectedGenre: string;
  genres: Array<{ id: string; title: string; query: string }>;
}

export type { Book, GutendexResponse, BooksState };
