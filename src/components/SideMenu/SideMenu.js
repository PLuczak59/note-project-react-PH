import React, { useState } from "react";
import "./SideMenu.scss";
import { Button } from "../Button/Button";
import { Loading } from "../Loading/Loading";
import { SearchBar } from "../SearchBar/SearchBar"; // Import du composant SearchBar
import { Trash, Pin } from "../../assets/images";
import { usePostRequest } from "../../utils/hooks/usePostRequest";
import { useDeleteRequest } from "../../utils/hooks/useDeleteRequest";
import { useDebouncedEffect } from "../../utils/hooks/useDeboucedEffect";
import DeleteModal from "../DeleteModal/DeleteModal";

export function SideMenu({ notes, setNotes, selectedNoteId, setSelectedNoteId, isLoading }) {
  const { postData } = usePostRequest("/notes");
  const { deleteData } = useDeleteRequest();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState(null);

  const createNote = async () => {
    const newNoteData = await postData({
      title: "Nouvelle note",
      content: "",
      isNoteChecked: false,
      isPined: false,
      lastUpdatedAt: new Date(),
    });
    if (newNoteData) {
      setNotes([newNoteData, ...notes]);
      setSelectedNoteId(newNoteData.id);
    }
  };

  const deleteNote = async (id) => {
    await deleteData(`/notes/${id}`);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setSelectedNoteId(null);
  };

  const handleOpenDelete = (id) => {
    setNoteToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteNote = () => {
    deleteNote(noteToDeleteId);
    setIsDeleteModalOpen(false);
  };

  const handlePinNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isPined: !note.isPined } : note
    );
    setNotes(updatedNotes);
  };

  // Vérifier que notes n'est pas null avant de filtrer les notes épinglées et non épinglées
  const pinnedNotes = notes && notes.filter((note) => note.isPined);
  const unpinnedNotes = notes && notes.filter((note) => !note.isPined);

  // Trier les deux listes de notes séparées
  const sortedNotes = [...(pinnedNotes || []), ...(unpinnedNotes || [])];

  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
    const originalNotes = [...notes]; // Garder une copie des notes originales
    const filteredNotes = originalNotes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNotes(filteredNotes);
  };
  

  return (
    <aside className="Side">
      <div className="Create-note-wrapper">
        <Button onClick={createNote}>+ Créer une nouvelle note</Button>
      </div>
      <div className="Search-note-wrapper">
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading ? (
        <div className="Loading-wrapper">
          <Loading />
        </div>
      ) : (
        sortedNotes.map((note) => (
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
              <div className="buttonContainer">
                <span className={`pinnedBtn ${note.isPined ? 'pinned' : ''}`} onClick={() => handlePinNote(note.id)}>
                  <img src={Pin} alt="Epinglé"/>
                </span>
                <span className="trashBtn" onClick={() => handleOpenDelete(note.id)}><img src={Trash} alt="Supprimer" /></span>
              </div>
            </button>
          </div>
        ))
      )}
      {/* Modal de confirmation de suppression */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={confirmDeleteNote} />
    </aside>
  );
}
