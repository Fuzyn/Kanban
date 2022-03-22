import React, { useState } from 'react';
import KanbanBoardContainer from './components/KanbanBoardContainer';
import './KanBanApp.css';
import { cardsList } from './components/cardsExample';
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')


export const CardsContext = React.createContext({
  notes: cardsList,
  setNotes: () => { }
});

function KanBanApp() {

  const [notes, setNotes] = useState(cardsList);
  const value = { notes, setNotes };

  return (
    <CardsContext.Provider value={value}>
      <KanbanBoardContainer />
    </CardsContext.Provider>
  );
}

export default KanBanApp;
