import React, { useContext } from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';
import { DragDropContext } from "react-beautiful-dnd";
import { CardsContext } from '../KanBanApp';

const KanbanBoardContainer = (props) => {

  const { notes, setNotes } = useContext(CardsContext);

  const addTask = (cardId, taskName) => {
    let cardIndex = notes.findIndex((card) => card.id === cardId);
    let newTask = { id: Date.now(), name: taskName, done: false };
    let nextState = update(notes, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    });
    setNotes(nextState);
  }

  const deleteTask = (cardId, taskIndex) => {
    const cardIndex = notes.findIndex((card) => card.id === cardId);
    const nextState = update(notes, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    });
    setNotes(nextState);
  }

  const toggleTask = (cardId, taskIndex) => {
    let cardIndex = notes.findIndex((card) => card.id === cardId);
    let nextState = update(
      notes, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: (done) => !done
            }
          }
        }
      }
    });
    setNotes(nextState);
  }

  const addCard = (card) => {
    const nextState = update(notes, { $push: [card] })
    setNotes({ notes: nextState })
  }

  const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const withSInd = notes.filter(card => card.status === source)
    const withDInd = notes.filter(card => card.status === destination)
    const withoutSInd = notes.filter(card => card.status !== source)
    const withoutDInd = withoutSInd.filter(card => card.status !== destination)
    const [removed] = withSInd.splice(droppableSource, 1);
    let updateRemoved = update(
      removed, {
      status: {
        $set: destination
      }
    });
    withDInd.splice(droppableDestination, 0, updateRemoved);
    const result = withSInd.concat(withDInd, withoutDInd)
    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    const sIndex = source.index;
    const dIndex = destination.index;

    if (sInd === dInd) {
      const withSInd = notes.filter(card => card.status === sInd)
      const withoutSInd = notes.filter(card => card.status !== sInd)
      const items = reorder(withSInd, sIndex, dIndex);
      const newState = items.concat(withoutSInd)
      setNotes(newState);

    } else {
      const result = move(sInd, dInd, sIndex, dIndex);
      setNotes(result);
    }
  }

  return (
    
    <div>
      <DragDropContext onDragEnd={onDragEnd} >
        <KanbanBoard cards={notes}
          taskCallbacks={{
            toggle: toggleTask.bind(this),
            delete: deleteTask.bind(this),
            add: addTask.bind(this)
          }}
          cardCallbacks={{
            addCard: addCard.bind(this),
          }}
        />
      </DragDropContext>
    </div>
    
  );
}



export default KanbanBoardContainer;
