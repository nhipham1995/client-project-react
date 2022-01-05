import React from 'react';

const CommentPart = (props) => {
    return (
        <div>
            <h5 className="card-title">{props.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{props.singer}</h6>
            <p className="card-text fst-italic">&ldquo;{props.review}&rdquo;</p>
        </div>
    );
}

export default CommentPart;
