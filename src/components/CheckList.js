import React from 'react';

const CheckList = (props) => {
  const checkInputKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      props.taskCallbacks.add(props.cardId, evt.target.value);
      evt.target.value = '';
    }
  }

  const tasks = props.tasks.map((task, taskIndex) => (
    <li key={task.id} className='checklist_task'>
      <input id='task' type="checkbox"
        checked={task.done}
        onChange={props.taskCallbacks.toggle.bind(null, props.cardId, taskIndex)} />
      <p>{task.name}{' '}</p>
      <div
      className='checklist_task-remove'
      onClick={props.taskCallbacks.delete.bind(null,props.cardId, taskIndex)} />
    </li>
  ));
    
  return(
    <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text"
          className="checklist-add-task"
          placeholder="Wpisz coś i naciśnij Enter, aby dodać zadanie"
          onKeyPress={checkInputKeyPress.bind(this)} />
      </div>
  )
}

export default CheckList