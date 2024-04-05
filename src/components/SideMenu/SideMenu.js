import "./SideMenu.scss";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Loading } from "../Loading/Loading";
import { Trash } from "../../assets/images";
import { usePostRequest } from "../../utils/hooks/usePostRequest";
import { useDeleteRequest } from "../../utils/hooks/useDeleteRequest";

export function SideMenu({ notes ,setNotes , selectedNoteId, setSelectedNoteId, isLoading }) {
  const {postData} = usePostRequest("/notes");
  const {deleteData} = useDeleteRequest();

  const createNote = async () => {
    const newNoteData = await postData({
      title: "Nouvelle note",
      content: "",
      lastUpdatedAt: new Date(),
    });
    if (newNoteData) {
      const updatedNotes = [...notes, newNoteData]; 
      setNotes(updatedNotes);
      setSelectedNoteId(newNoteData.id);
    }
  };

  const deleteNote = async (id) => {
    await deleteData(`/notes/${id}`);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setSelectedNoteId(null);
  };

  const sortNotesByLastUpdatedAt = (notes) => {
    return notes.sort((a, b) => {
      return new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt);
    });
  };

  return (
    <aside className="Side">
      <div className="Create-note-wrapper">
        <Button onClick={createNote}>+ Créer une nouvelle note</Button>
      </div>
      {isLoading ? (
        <div className="Loading-wrapper">
          <Loading />
        </div>
      ) : (
        notes?.map((note) => (
          <div key={note.id}>
            <button
              className={`Note-button ${selectedNoteId === note.id ? "Note-button-selected" : ""}`}
              onClick={() => {
                setSelectedNoteId(note.id);
              }}
            >
              {note.title.length > 25 ? 
                `${note.title.slice(0, note.title.lastIndexOf(' ', 25))} ...` :
                note.title}
              <span className="trashBtn" onClick={() => deleteNote(note.id)}><img src={Trash} /></span>
            </button>
          </div>
        ))        
      )}
    </aside>
  );
}
