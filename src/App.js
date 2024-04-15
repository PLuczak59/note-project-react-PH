import "./App.scss";
import { useEffect, useState } from "react";
import { Note } from "./components/Note/Note";
import { Loading } from "./components/Loading/Loading";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { useGetRequest } from "./utils/hooks/useGetRequest";
import { Header } from "./components/Header/Header";

function App() {
  const { data: initialNotes, isLoading: notesLoading } = useGetRequest("/notes");
  const { data: profile, isLoading: profileLoading } = useGetRequest("/profile"); // Utilisation de useGetRequest pour récupérer le profil
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const refreshNote = (id, { title, content, isNoteChecked, isPined, lastUpdatedAt }) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { id, title, content,isNoteChecked, isPined, lastUpdatedAt } : note
      )
    );
  };

  return (
    <>
      {/* Rendu conditionnel du Header */}
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
