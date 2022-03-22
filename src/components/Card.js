import React, { useState } from 'react';
import CheckList from './CheckList';
import EditCard from './EditCard';
import ReactModal from 'react-modal'



const Card = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => { setShowDetails(!showDetails) };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  let cardDetails;
  if (showDetails) {
    cardDetails = (
      <div className='card_details'>
        {props.description}
        <CheckList cardId={props.id}
          tasks={props.tasks}
          taskCallbacks={props.taskCallbacks}
          cardCallbacks={props.cardCallbacks} />
      </div>)

  };

  let sideColor = {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    bottom: 0,
    left: 0,
    width: 7,
    backgroundColor: props.color
  };

  return (
    <div className='card'>
      <div style={sideColor} />
      <div className="card__edit">
        <button variant="primary" onClick={handleShow}>✎</button>
      </div>
      <div className={
        showDetails ? "card_title card_title-is-open" : "card_title"
      } onClick={toggleDetails.bind(this)}>
        {props.title}
      </div>
      {cardDetails}

      <ReactModal
        isOpen={show}
        onRequestClose={handleClose}
        className="Modal_K"
        overlayClassName="Overlay_K"
      >
        <EditCard
          id={props.id}
          handleClose={handleClose.bind(this)}
        />
      </ReactModal>
    </div>
  )
}

export default Card;
