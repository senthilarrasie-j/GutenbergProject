import { formatAuthorName } from '@/utils';

describe('formatAuthorName', () => {
  it('returns Unknown Author for undefined', () => {
    expect(formatAuthorName(undefined)).toBe('Unknown Author');
  });

  it('returns Unknown Author for empty string', () => {
    expect(formatAuthorName('')).toBe('Unknown Author');
  });

  it('reverses "Last, First" format', () => {
    expect(formatAuthorName('Twain, Mark')).toBe('Mark Twain');
  });

  it('handles extra spaces in parts', () => {
    const result = formatAuthorName('Doe,  John ');
    expect(result).toBe('John Doe');
  });

  it('returns name as-is when no comma', () => {
    expect(formatAuthorName('Homer')).toBe('Homer');
  });

  it('handles multipart first name', () => {
    const result = formatAuthorName('Dostoyevsky, Fyodor Mikhailovich');
    expect(result).toBe('Fyodor Mikhailovich Dostoyevsky');
  });
});
