import React, { useState } from 'react'
import Home from './src/screens/home'
import AddNote from './src/screens/addNote'
import EditNote from './src/screens/editNote'

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  setNoteList,
  addNote,
  editNote,
  currentNoteID,
  setCurrentNoteID,
  deleteNote,
}) => {
  switch (currentPage) {
    case 'home':
      return <Home noteList={noteList} setCurrentPage={setCurrentPage} setCurrentNoteID={setCurrentNoteID} deleteNote={deleteNote}/>
    case 'add':
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />
    case 'edit':
      return <EditNote setCurrentPage={setCurrentPage} editNote={editNote} noteList={noteList} currentNoteID={currentNoteID} />
    default:
      return <Home />
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: 'Note pertama',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    },
  ])
  const [currentNoteID, setCurrentNoteID] = useState(null)

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1
    setNoteList([
      ...noteList,
      {
        id,
        title,
        desc,
      },
    ])
  }

  const editNote = (id, title, desc) => {
    setNoteList(
      noteList.map(note =>
        note.id === id ? { ...note, title, desc } : note
      )
    )
  }

  const deleteNote = (currentNoteID) => {
    const newNotes = noteList.filter(note => note.id !== currentNoteID)
    setNoteList(newNotes)
  }

  return (
    <CurrentPageWidget
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      noteList={noteList}
      addNote={addNote}
      editNote={editNote}
      currentNoteID={currentNoteID}
      setCurrentNoteID={setCurrentNoteID}
      setNoteList={setNoteList}
      deleteNote={deleteNote}
    />
  )
}

export default App
