const URLShortener = require('./URLShortener');

describe('URLShortener', () => {
  let shortener;

  beforeEach(() => {
    shortener = URLShortener();
  });

  test('should shorten a valid URL', () => {
    const longURL = "https://www.example.com";
    const shortURL = shortener.shortenURL(longURL);

    expect(shortURL).toHaveLength(6);
    expect(typeof shortURL).toBe('string');
  });

  test('should throw an error for invalid URL', () => {
    const longURL = "invalid-url";

    expect(() => {
      shortener.shortenURL(longURL);
    }).toThrow('Invalid URL');
  });

  test('should redirect to the original URL', () => {
    const longURL = "https://www.example.com";
    const shortURL = shortener.shortenURL(longURL);
    const originalURL = shortener.redirectToOriginalURL(shortURL);

    expect(originalURL).toBe(longURL);
  });

  test('should throw an error for non-existent short URL', () => {
    expect(() => {
      shortener.redirectToOriginalURL('nonexistent');
    }).toThrow('Short URL not found');
  });
});