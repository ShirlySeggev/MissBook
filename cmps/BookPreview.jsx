import { bookService } from '../services/book-service.js'

const { Link } = ReactRouterDOM;

export function BookPreview({ book, onSelectBook }) {
  const { currencyCode, amount } = book.listPrice;

  return (

    <Link to={`/book/${book.id}`}>
      <section className="book-preview">
        <img src={book.thumbnail} alt="" />
        <h3>{book.title}</h3>
        <p>{amount} <span>{bookService.getCurrencyIcon(currencyCode)}</span></p>
      </section>
    </Link>
  )
}