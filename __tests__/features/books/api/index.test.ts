import axios from 'axios';
import { fetchBooksApi } from '@/features/books/api';
import { BOOK_STRINGS } from '@/features/books/constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      title: 'Moby Dick',
      authors: [{ name: 'Melville, Herman' }],
      formats: { 'image/jpeg': 'https://example.com/cover.jpg' },
      download_count: 5000,
    },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchBooksApi — initial fetch', () => {
  it('calls axios.get with BASE_URL and correct params', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
    await fetchBooksApi({ genre: 'Fiction', search: 'moby' });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      BOOK_STRINGS.baseUrl,
      expect.objectContaining({
        params: expect.objectContaining({
          topic: 'fiction',
          mime_type: 'image',
          search: 'moby',
        }),
      }),
    );
  });

  it('omits search param when not provided', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
    await fetchBooksApi({ genre: 'Drama' });
    const [, config] = mockedAxios.get.mock.calls[0];
    expect((config as any).params).not.toHaveProperty('search');
  });

  it('returns { data, isNext: false }', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
    const result = await fetchBooksApi({ genre: 'Fiction' });
    expect(result.isNext).toBe(false);
    expect(result.data).toEqual(mockResponse);
  });

  it('lowercases genre for topic param', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
    await fetchBooksApi({ genre: 'HISTORY' });
    const [, config] = mockedAxios.get.mock.calls[0];
    expect((config as any).params.topic).toBe('history');
  });
});

describe('fetchBooksApi — pagination fetch (nextUrl)', () => {
  it('replaces internal host with public host', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
    await fetchBooksApi({
      genre: 'Fiction',
      nextUrl: 'http://gutendex-api:8974/books/?page=2',
    });
    const [url] = mockedAxios.get.mock.calls[0];
    expect(url).toBe('https://gutendex.careers.ignitesol.com/books/?page=2');
  });

  it('returns { data, isNext: true }', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
    const result = await fetchBooksApi({
      genre: 'Fiction',
      nextUrl: 'http://gutendex-api:8974/books/?page=2',
    });
    expect(result.isNext).toBe(true);
  });
});

describe('fetchBooksApi — errors', () => {
  it('throws on network error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
    await expect(fetchBooksApi({ genre: 'Fiction' })).rejects.toThrow('Network Error');
  });
});
