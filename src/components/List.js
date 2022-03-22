import Card from './Card';
import { Draggable } from "react-beautiful-dnd";

const List = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.cards.map((card, index) => (
        <Draggable key={card.id} draggableId={`${card.id}`} index={index}>
          {(provided, snapshot) => (
            <div
              className='choiceK'
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={provided.draggableProps.style}
            >
              <Card key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                color={card.color}
                tasks={card.tasks}
                taskCallbacks={props.taskCallbacks}
                cardCallbacks={props.cardCallbacks}
              />
            </div>
          )}
        </Draggable>
      ))}

    </div>)
};

export default List;


