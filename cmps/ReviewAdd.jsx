import { bookService } from '../services/book-service.js';
import { utilService } from '../services/util-service.js';
import { ReviewPreview } from './ReviewPreview.jsx';


export class ReviewAdd extends React.Component {
    state = {
        id: utilService.makeId(),
        userName: '',
        date: '',
        rate: 0,
        freeText: ''
    }

    componentDidMount() {
    }

    onAddReview = (ev) => {
        ev.preventDefault();
        bookService.addReview(this.props.book.id, this.state)
            .then((book) => {
                this.props.onReviewAdd(book)
                // this.props.history.push(`/book`)
            })
    }

    handleChange = ({ target }) => {
        const name = target.name
        const value = target.type === 'select-one' ? +target.value : target.value;
        this.setState({ ...this.state, [name]: value }, () => {
            console.log(this.state)
        })

    }

    render() {
        const { userName, date, rate, freeText } = this.state;
        return (
            <div className="review-container">
                <div className="reviews">
                    <h4>Reviews:</h4>
                    <ReviewPreview reviews={this.props.book.reviews} onDeleteReview={this.props.onDeleteReview} />
                </div>
                <form className="review-form" onSubmit={this.onAddReview}>
                    <label>Your Name
                    <input type="text" id="userName" name="userName" value={userName} onChange={this.handleChange} placeholder="Your Name" required />
                    </label>
                    <label htmlFor="date">Date
                    <input type="date" id="date" name="date" value={date} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="rate">Rate
                    <select name="rate" id="rate" value={rate} onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>

                    <label htmlFor="freeText">Review:
                    <textarea id="freeText" name="freeText" cols="40" rows="3" value={freeText} onChange={this.handleChange} />
                    </label>

                    <button type="submit">Submit</button>
                </form>

            </div>
        )
    }
}


