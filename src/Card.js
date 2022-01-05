import React from 'react';

const Card = (props) => {  
  const deleteButton = () => {
      props.deleteComment();
  }
  return (
      <div className="card mb-3" >
      <div className="card-body">
        {props.children}
        <div>
          <button type="button" 
                  className="btn btn-outline-danger btm-sm mx-2" 
                  onClick ={deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
export default Card;