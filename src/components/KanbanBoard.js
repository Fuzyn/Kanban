import List from './List';
import { Droppable } from "react-beautiful-dnd";
import React, { useState } from 'react';
import NewCard from './NewCard';
import ReactModal from 'react-modal';


const KanbanBoard = (props) => {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      return (
            <div className='kanban_container'>
                  <button onClick={handleShow} className='float-button'>+</button>
                  <Droppable key={'todo'} droppableId={'todo'}>
                        {(provided, snapshot) => (
                              <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='list_kanban todo'
                              >
                                    <List id='todo'
                                          title="Do zrobienia"
                                          taskCallbacks={props.taskCallbacks}
                                          cardCallbacks={props.cardCallbacks}
                                          cards={props.cards.filter((card) => card.status === "todo")} />

                                    {provided.placeholder}
                              </div>
                        )}
                  </Droppable>
                  <Droppable key={'in-progress'} droppableId={'in-progress'}>
                        {(provided, snapshot) => (
                              <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='list_kanban inprogress'
                              >
                                    <List id='in-progress'
                                          title="W toku"
                                          taskCallbacks={props.taskCallbacks}
                                          cardCallbacks={props.cardCallbacks}
                                          cards={props.cards.filter((card) => card.status === "in-progress")} />
                                    {provided.placeholder}
                              </div>
                        )}
                  </Droppable>
                  <Droppable key={'done'} droppableId={'done'}>
                        {(provided, snapshot) => (
                              <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='list_kanban done'
                              >
                                    <List id='done'
                                          title='Zrobione'
                                          taskCallbacks={props.taskCallbacks}
                                          cardCallbacks={props.cardCallbacks}
                                          cards={props.cards.filter((card) => card.status === "done")} />
                                    {provided.placeholder}
                              </div>
                        )}
                  </Droppable>
                  <ReactModal
                        isOpen={show}
                        onRequestClose={handleClose}
                        className="Modal_K"
                        overlayClassName="Overlay_K"
                  >
                        <NewCard
                              id={props.id}
                              handleClose={handleClose.bind(this)}
                        />
                  </ReactModal>
            </div>
      );
};

export default KanbanBoard;
