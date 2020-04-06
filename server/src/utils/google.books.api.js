import axios from 'axios';

const client = axios.create({
  baseURL: process.env.GOOGLE_BOOKS_API,
  timeout: 15000
});

export default class GoogleBooksAPI {
  static async search(query) {
    return await client.get('volumes', { params: query });
  }

  static normalizeBooks(books) {
    return books.map(bookInfo => {
      const book = bookInfo.volumeInfo;
      return {
        title: book.title,
        subtitle: book.subtitle || '',
        author: book.authors && book.authors.length > 0 ? book.authors[0] : '',
        publisher: book.publisher || '',
        published: book.publishedDate || '',
        description: book.description || '',
        isbn10: GoogleBooksAPI.getIsbn(book, 'ISBN_10'),
        isbn13: GoogleBooksAPI.getIsbn(book, 'ISBN_13'),
        pageCount: book.pageCount || null,
        printType: book.printType || '',
        maturityRating: book.maturityRating || '',
        thumbnail: book.imageLinks ? book.imageLinks.thumbnail : 'https://www.aamindus.com/images/notfound.png',
        smallThumbnail: book.imageLinks ? book.imageLinks.smallThumbnail : 'https://www.aamindus.com/images/notfound.png',
        language: book.language || '',
        from: 'google',
        fromid: bookInfo.id
      };
    }).filter(book => !!book.isbn10 || !!book.isbn13);
  }

  static getIsbn(book, isbnType) {
    if (!book.industryIdentifiers) return null;
    for (const id of book.industryIdentifiers) {
      if (id.type === isbnType) return id.identifier;
    }
  }
}
