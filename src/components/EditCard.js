import { useContext } from 'react'
import CardForm from './CardForm'
import { CardsContext } from '../KanBanApp';
import update from 'react-addons-update';

const EditCard = (props) => {
    const { notes, setNotes } = useContext(CardsContext);
    const idCard = notes.findIndex((card) => card.id === props.id)

    const updateCard = (card) => {
        const cardIndex = notes.findIndex((c) => c.id === card.id)
        const nextState = update(notes, { [cardIndex]: { $set: card } })
        setNotes(nextState)
      }

    const handleChange = (field, value) => {
        let cardIndex = notes.findIndex((card) => card.id === props.id);
        setNotes( update(notes, {[cardIndex]: { [field]: {$set: value} }}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCard(notes)
        props.handleClose();
    }

    const handleClose = (e) => {
        props.handleClose();
    }
    
    return (
        <CardForm draftCard={notes[idCard]}
            buttonLabel='Edytuj kartkę'
            handleChange={handleChange.bind(this)}
            handleSubmit={handleSubmit.bind(this)}
            handleClose={handleClose.bind(this)} />
    )

}

export default EditCard