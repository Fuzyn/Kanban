import { useState, useContext } from "react";
import CardForm from "./CardForm";
import { CardsContext } from '../KanBanApp';
import update from 'react-addons-update';


const NewCard = (props) => {

    const { notes, setNotes } = useContext(CardsContext);
    
    const [state, setState] = useState({id: Date.now(), title: '', description: '', status: 'todo', color: '#ffffff', tasks: []})

    const handleChange = (field, value) => {
        setState(update(state, {[field]: {$set: value}}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArray = notes.concat(state)
        setNotes(newArray);
        props.handleClose();
    }

    const handleClose = (e) => {
        props.handleClose();
    }

    return (
        <CardForm draftCard={state}
        buttonLabel='Utwórz kartkę'
        handleChange={handleChange.bind(this)}
        handleSubmit={handleSubmit.bind(this)}
        handleClose={handleClose.bind(this)} />
    )
}

export default NewCard;