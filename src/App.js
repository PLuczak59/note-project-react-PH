import "./App.scss";
import { useEffect, useState } from "react";
import { Note } from "./components/Note/Note";
import { Loading } from "./components/Loading/Loading";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { useGetRequest } from "./utils/hooks/useGetRequest";

function App() {
  const { data: initialNotes, isLoading } = useGetRequest("/notes");
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const refreshNote = (id, { title, content, lastUpdatedAt }) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { id, title, content, lastUpdatedAt } : note
      )
    );
  };

  return (
    <>
      <SideMenu
        notes={notes}
        setNotes={setNotes}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
        isLoading={isLoading}
      />
      <main className="Main">
        {isLoading ? (
          <Loading /> 
        ) : (
          selectedNoteId && (
            <Note
              id={selectedNoteId}
              title={notes.find((note) => note.id === selectedNoteId)?.title || ""}
              content={notes.find((note) => note.id === selectedNoteId)?.content || ""}
              onSubmit={refreshNote}
            />
          )
        )}
      </main>
    </>
  );
}

export default App;
