const { Link } = ReactRouterDOM;

import { LongTxt } from "../cmps/LongTxt.jsx";
import { ReviewAdd } from '../cmps/ReviewAdd.jsx';
import { bookService } from '../services/book-service.js'


export class BookDetails extends React.Component {
    state = {
        book: null,
        isLongTxtShown: false
    }

    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook() {
        const id = this.props.match.params.bookId;
        bookService.getBookById(id).then(book => {
            if (!book) return this.props.history.push('/')
            this.setState({ book })
        })
    }

    get pageCountCategory() {
        const { book } = this.state;
        let pageCountCategory = '';
        if (book.pageCount > 500) pageCountCategory = 'Long Reading';
        else if (book.pageCount > 200) pageCountCategory = 'Decent Reading';
        else if (book.pageCount < 100) pageCountCategory = 'Light Reading';
        else pageCountCategory = '';
        return pageCountCategory;
    }

    get publishedDateCategory() {
        const { book } = this.state;
        let publishedDateCategory = '';
        const currYear = new Date().getFullYear();
        if (currYear - book.publishedDate > 10) publishedDateCategory = 'Veteran Book';
        else if (currYear - book.publishedDate < 1) publishedDateCategory = 'New!';
        else publishedDateCategory = '';
        return publishedDateCategory;

    }

    showMore = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown });
    }

    onChangePage = (id, diff) => {
        bookService.getNextPrevBook(id, diff)
            .then((bookId) => this.props.history.push(`/book/${bookId}`))
    }

    onDeleteReview = (reviewId) => {
        bookService.deleteReview(this.state.book.id, reviewId)
            .then((book) => {
                this.setState({ book })
            })
    }

    onReviewAdd = (book) => {
        this.setState({ book })
    }


    render() {
        const { book, isLongTxtShown } = this.state;
        if (!book) return <div>Loading...</div>
        return (
            <div className={`book-details`}>
                <div className="book-container">
                    <img className="book-details-img" title={book.title} src={book.thumbnail} alt="" />
                    <div className="books-info">
                        <h2>{book.title}</h2>
                        <p>By (author): {book.authors}</p>
                        <h4> {book.subtitle}</h4>
                        <h5 className={`${(book.listPrice.amount > 150) ? 'red-price' : ''} ${(book.listPrice.amount) < 20 ? 'green-price' : ''}`}>{book.listPrice.amount}     {bookService.getCurrencyIcon(book.listPrice.currencyCode)}
                        </h5>
                        {book.listPrice.isOnSale && <img className="sale-img" src='./assets/img/sale.png' alt="" />}
                        <p>{book.categories.join(' | ')}</p>
                        <p>{this.pageCountCategory} | {this.publishedDateCategory}</p>
                        <p>{book.pageCount} Pages | Lenguage: {book.language} | {book.publishedDate}</p>
                        <LongTxt description={book.description} isLongTxtShown={isLongTxtShown} showMore={this.showMore} />
                    </div>
                </div>
                <ReviewAdd book={book} onDeleteReview={this.onDeleteReview} onReviewAdd={this.onReviewAdd} />
                <div className="actions">
                    <button onClick={() => this.onChangePage(book.id, -1)}>Prev</button>
                    <button onClick={() => this.onChangePage(book.id, 1)}>Next</button>
                    {/* <Link to={`/book/${bookService.getPrevBookId(book.id)}`}>Prev Book</Link>
                    <Link to={`/book/${bookService.getNextBookId(book.id)}`}>Next Book</Link> */}
                </div>
            </div>
        )
    }
}
