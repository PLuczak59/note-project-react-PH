import "./App.scss";
import { useEffect, useState } from "react";
import { Note } from "./components/Note/Note";
import { Loading } from "./components/Loading/Loading";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { useGetRequest } from "./utils/hooks/useGetRequest";
import { Header } from "./components/Header/Header";
import { ErrorToast } from "./components/ErrorToast/ErrorToast";

function App() {
  const { data: initialNotes, isLoading: notesLoading, error: notesError } = useGetRequest("/notes"); 
  const { data: profile, isLoading: profileLoading, error: profileError } = useGetRequest("/profile"); 
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  // Fonction qui permet de mettre à jour une note localement
  const refreshNote = (id, { title, content, isNoteChecked, isPined, lastUpdatedAt }) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { id, title, content,isNoteChecked, isPined, lastUpdatedAt } : note
      )
    );
  };

  return (
    <>
      {profileLoading ? (
        <Loading />
      ) : (
        <Header profile={profile} />
      )}
      <SideMenu
        notes={notes}
        setNotes={setNotes}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
        isLoading={notesLoading}
      />
      <main className="Main">
        {notesError && <ErrorToast message={notesError} />}
        {profileError && <ErrorToast message={profileError} />}
        {notesLoading ? (
          <Loading />
        ) : (
          selectedNoteId && (
            <Note
              id={selectedNoteId}
              title={
                notes.find((note) => note.id === selectedNoteId)?.title || ""
              }
              content={
                notes.find((note) => note.id === selectedNoteId)?.content || ""
              }
              isNoteChecked={
                notes.find((note) => note.id === selectedNoteId)?.isNoteChecked || ""
              }
              isPined={
                notes.find((note) => note.id === selectedNoteId)?.isPined || ""
              }
              onSubmit={refreshNote}
            />
          )
        )}
      </main>
    </>
  );
}

export default App;
