function URLShortener() {
  const urlMap = new Map();
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const shortURLLength = 6;

  // creating a random short url
  function generateShortURL() {
    let shortURL = '';
    for (let i = 0; i < shortURLLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortURL += characters[randomIndex];
    }
    return shortURL;
  }

  // this function checks the url is valid or not
  function isValidURL(url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

  // function of shortend the url 
  function shortenURL(longURL) {
    if (!isValidURL(longURL)) {
      throw new Error('Invalid URL');
    }

    let shortURL;
    do {
      shortURL = generateShortURL();
    } while (urlMap.has(shortURL));

    urlMap.set(shortURL, longURL);
    console.log(`Mapping: ${shortURL} -> ${longURL}`); // Debug log

    return shortURL;
  }

  // function of redirect to the original Url
  function redirectToOriginalURL(shortURL) {
    if (!urlMap.has(shortURL)) {
      throw new Error('Short URL not found');
    }

    const originalURL = urlMap.get(shortURL);
    console.log(`Redirect: ${shortURL} -> ${originalURL}`); // Debug log

    return originalURL;
  }

  return { shortenURL, redirectToOriginalURL };
}

module.exports = URLShortener;