import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Axios from 'axios';
import CommentPart from './CommentPart';
import Card from './Card';
import Form from './Form';


function App() {
  const [songList, setSongList] = useState([]);
  const [show, setShow] = useState(0);
  useEffect(() => {
    Axios.get('https://demo-react-wcs.herokuapp.com/get').then((resp)=>{
      setSongList(resp.data);
    });
  }, []);

  let haveReview;
  let showNotifMsg;
  let notificationMsg = (color, msg)=>{
    return (
      <div className={`alert alert-${color} alert-dismissible fade show mt-5 mx-auto`} 
           role="alert" style={{width: 450}}>
        <strong>{msg}</strong> 
        <button onClick={()=>setShow(0)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    )
  }
  if(show === 1) {
    showNotifMsg = notificationMsg("success", "A song review is successfully added!")
  } else if( show === 2) {
    showNotifMsg = notificationMsg("warning", "A song review is successfully deleted!")

  }

  if(songList.length>0){
    haveReview = <div className="show-list-review">
                  <h2> List of Song Review </h2>
                  <h4 className="fst-italic mb-3">({songList.length} posts)</h4>
                </div>
  }

  const  addForm = (childData) =>{
    const [songName, singer, songReview] = childData;
    Axios.post('https://demo-react-wcs.herokuapp.com/add', {
        songName, singer, songReview
    }).then(() => {
        //update new song 
        setSongList([
        ...songList, 
        {songName, singer, songReview},
        ]);  
        setShow(1);    
        }
    );
  }
  const deleteButton = (song) => { 
    Axios.delete(`https://demo-react-wcs.herokuapp.com/delete/${song}`)
    .then(()=>{
      setSongList(
        songList.filter(i=>{
          return i.id !== song;
        })
      )
      setShow(2);
    })
  }
  return (
    <div className="App">
      <Form handleAddReview= {addForm}/>
      
      {showNotifMsg}

      {haveReview}
      <div className="container show-item-song-review">
        <div className="row justify-content-center">
          {songList.reverse().map((val, i) => {
            return <div key={i} className="col-sm-12 col-md-6 col-lg-4">
              <Card deleteComment={()=>deleteButton(val.id)}>
                <CommentPart name={val.songName.toUpperCase()}
                             singer = {val.singer}
                             review= {val.songReview}
                />
              </Card>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
