import React, {useState} from 'react';

const Form = ({handleAddReview}) => {
    const [songName, setSongName] = useState('');
    const [singer, setSinger] = useState('');
    const [songReview, setSongReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddReview([songName, singer, songReview]);
    }

    return (
        <form onSubmit={handleSubmit} novalidate>
            <h1 className="mx-auto">Leave a review for a song</h1>
            <div className="form-song">
                <label htmlFor="songName">Name of Song</label>
                <input type="text" name="songName" id="songName" 
                       className="form-control" required
                       onChange={(e)=>{setSongName(e.target.value)}}>
                </input>
                <div className="valid-feedback">
                    Looks good!
                </div>
                <label htmlFor="singer">Singer</label>
                <input type="text" name="singer" id="singer" 
                       className="form-control" required
                       onChange={(e)=>{setSinger(e.target.value)}}>
                </input>
                <label htmlFor="songReview">Your Review</label>
                <textarea type="text" name="songReview" id="songReview" required
                          className="form-control" aria-label="With textarea"
                          onChange={(e)=>{setSongReview(e.target.value)}}>
                </textarea>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Form;