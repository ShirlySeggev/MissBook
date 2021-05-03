export function LongTxt({ description, isLongTxtShown, showMore }) {

    if (description.length > 100) {
        description = isLongTxtShown ? description : description.substring(0, 100) + '...';
    }

    return (
        <div>
            {description}
            {description.length > 100 && <span className="show-more" onClick={showMore}>{isLongTxtShown ? 'Show less' : 'Show more'}</span>}
        </div>

    )

}