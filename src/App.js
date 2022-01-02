import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Axios from 'axios';

function App() {
  const [songName, setSongName] = useState('');
  const [singer, setSinger] = useState('');
  const [songReview, setSongReview] = useState('');
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    Axios.get('https://demo-react-wcs.herokuapp.com/get').then((resp)=>{
      setSongList(resp.data);
    });
  }, []);

  const submitAction = () => {
    Axios.post('https://demo-react-wcs.herokuapp.com/add', {
      songName, songReview, singer
    }).then(() => {
      //update new song 
      setSongList([
        ...songList, 
        {songName, songReview, singer},
      ])
    });
  };

  const deleteButton = (song) => { 
    Axios.delete(`https://demo-react-wcs.herokuapp.com/delete/${song.id}`)
    .then(()=>{
      setSongList(
        songList.filter(i=>{
          return i.id !== song.id;
        })
      )
    })
  }

  let haveReview;
  if(songList.length>0){
    haveReview = <div className="show-list-review">
                  <h2 >List of Song Review </h2>
                  <h4 className="fst-italic mb-3">({songList.length} posts)</h4>
                </div>
  }
  return (
    <div className="App">
      <h1>Leave a review for a song</h1>
      <div className="form-song">
          <label htmlFor="songName">Name of Song</label>
          <input type="text" name="songName" id="songName" className="form-control"
                 onChange={(e)=>{setSongName(e.target.value)}}>
          </input>
          <label htmlFor="songName">Singer</label>
          <input type="text" name="songName" id="songName" className="form-control"
                 onChange={(e)=>{setSinger(e.target.value)}}>
          </input>
          <label htmlFor="songReview">Your Review</label>
          <textarea type="text" name="songReview" id="songReview" 
                    className="form-control" aria-label="With textarea"
                    onChange={(e)=>{setSongReview(e.target.value)}}>
          </textarea>
          <button type="submit" onClick= {submitAction}>Submit</button>
      </div>
      
      {haveReview}
      <div className="container show-item-song-review">
        <div className="row justify-content-center">
          {songList.reverse().map((val, i) => {
            return <div key={i} className="col-4">
              <div className="card mb-3" >
              <div className="card-body">
                <h5 className="card-title">{val.songName.toUpperCase()}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{val.singer}</h6>
                <p className="card-text fst-italic">&ldquo;{val.songReview}&rdquo;</p>
                <div>
                  <button type="button" 
                          className="btn btn-outline-danger btm-sm mx-2" 
                          onClick ={()=>deleteButton(val)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
