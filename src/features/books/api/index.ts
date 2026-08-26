import axios from 'axios';
import { GutendexResponse } from '@/features/books/types';
import { BOOK_STRINGS } from '@/features/books/constants';
import { NEXT_URL_TARGET, NEXT_URL_REPLACEMENT } from '@env';

const BASE_URL = BOOK_STRINGS.baseUrl;

export interface FetchBooksArgs {
  genre: string;
  search?: string;
  nextUrl?: string | null;
}

export const fetchBooksApi = async ({ genre, search, nextUrl }: FetchBooksArgs) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (nextUrl) {
    const target = NEXT_URL_TARGET || 'http://gutendex-api:8974';
    const replacement = NEXT_URL_REPLACEMENT || 'https://gutendex.careers.ignitesol.com';
    const secureUrl = nextUrl.replace(target, replacement);
    console.log('Fetching nextUrl:', secureUrl);
    const response = await axios.get<GutendexResponse>(secureUrl, config);
    console.log('NextUrl response data:', response.data);
    return { data: response.data, isNext: true };
  }

  const params: Record<string, string> = {
    topic: genre.toLowerCase(),
    mime_type: 'image',
  };

  if (search) {
    params.search = search;
  }

  console.log('Fetching initial URL:', BASE_URL, 'with params:', params);
  const response = await axios.get<GutendexResponse>(BASE_URL, {
    params,
    ...config,
  });
  console.log('Initial URL response data:', response.data);
  return { data: response.data, isNext: false };
};
