const CardForm = (props) => {

    const handleChange = (field, e) => {
        props.handleChange(field, e.target.value);
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.handleClose();
    }

    return (
        <div className="cardModal">
            <div className="card big">
                <form onSubmit={props.handleSubmit.bind(this)}>
                    <input type='text'
                        value={props.draftCard.title}
                        onChange={handleChange.bind(this, 'title')}
                        placeholder='Tytuł'
                        required={true}
                        autoFocus={true} /><br />
                    
                    <textarea value={props.draftCard.description}
                        onChange={handleChange.bind(this, 'description')}
                        placeholder='Opis'
                        required={true} /><br />
                    
                    <label htmlFor="status">Status</label>
                    <select id="status"
                        value={props.draftCard.status}
                        onChange={handleChange.bind(this, 'status')}>
                            <option value='todo'>Do zrobienia</option>
                            <option value='in-progress'>W toku</option>
                            <option value='done'>Zrobione</option>
                    </select>
                    <br/>
                    <label htmlFor="color">Kolor</label>
                    <input id="color"
                        value={props.draftCard.color}
                        onChange={handleChange.bind(this, 'color')}
                        type='color'
                        // defaultValue='#ffffff' 
                        />
                    <div className="action">
                        <button type="submit">{props.buttonLabel}</button>
                    </div>                    
                </form>
            </div>
            <div className="overlay_K" onClick={handleClose.bind(this)} />
        </div>
    )
}

export default CardForm;