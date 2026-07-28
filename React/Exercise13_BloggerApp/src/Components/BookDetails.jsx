const books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'Effective Java', author: 'Joshua Bloch' },
];

function BookDetails() {
  return (
    <section>
      <h2>Book Details</h2>
      {books.length ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title} — {book.author}</li>
          ))}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
    </section>
  );
}

export default BookDetails;
