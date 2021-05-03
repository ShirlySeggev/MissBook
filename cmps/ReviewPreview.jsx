export function ReviewPreview({ reviews, onDeleteReview }) {

    if (!reviews || !reviews.length) return <div>No reviews yet...</div>;

    return (
        <div className="reviews-container">
            {reviews.map(review => {
                return <div className="review" key={review.id}><span className="btn" onClick={() => {
                    onDeleteReview(review.id)
                }}>X</span>
                    <p>User: {review.userName} | Rate: {review.rate} | Read At: {review.date}</p>
                    <p>{review.freeText}</p>
                </div>
            })}
        </div>
    )
}