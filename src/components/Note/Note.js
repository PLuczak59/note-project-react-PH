import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { ErrorToast } from "../ErrorToast/ErrorToast"; // Import du composant ErrorToast
import { Check } from "../../assets/images";
import "./Note.scss";
import { usePutRequest } from "../../utils/hooks/usePutRequest";
import { useDebouncedEffect } from "../../utils/hooks/useDeboucedEffect";
import { Loading } from "../Loading/Loading";

export function Note({
  id,
  title: initialTitle,
  content: initialContent,
  isNoteChecked: initialIsNoteChecked,
  isPined: initialIsPined,
  onSubmit,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isNoteChecked, setIsNoteChecked] = useState(initialIsNoteChecked);
  const [isPined, setIsPined] = useState(initialIsPined);
  const { putData, isLoading: putLoading, isSuccess, error: updateError } = usePutRequest(`/notes/${id}`);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setIsNoteChecked(initialIsNoteChecked);
    setIsPined(initialIsPined);
    setHasChanges(false);
  }, [id, initialTitle, initialContent, initialIsNoteChecked, initialIsPined]);

  const updateNote = () => {
    putData({
      title,
      content,
      isNoteChecked,
      isPined,
      lastUpdatedAt: new Date(),
    });
  };

  useDebouncedEffect(
    () => {
      if (hasChanges) {
        console.log("Mise à jour de la note");
        onSubmit(id, {
          title,
          content,
          isNoteChecked,
          isPined,
          lastUpdatedAt: new Date(),
        });
        updateNote();
        setHasChanges(false);
      }
    },
    [isSuccess, id, title, content, isNoteChecked, isPined, onSubmit, hasChanges],
    3000
  );

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setHasChanges(true);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
    setHasChanges(true);
  };

  return (
    <form
      className="Form"
      onSubmit={(event) => {
        event.preventDefault();
        updateNote();
      }}
    >
      {/* Intégration du ErrorToast en cas d'erreur de mise à jour */}
      {updateError && <ErrorToast message={updateError} />}
      <div className="Note-Header">
        <input
          className="Note-editable Note-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <label className="container">
          <input
            className="Note-checkbox"
            type="checkbox"
            checked={isNoteChecked}
            onChange={(event) => {
              setIsNoteChecked(event.target.checked);
            }}
          />
          <div className="checkmark"></div>
        </label>
      </div>
      <textarea
        className="Note-editable Note-content"
        value={content}
        onChange={handleContentChange}
      />
      <div className="Note-actions">
        <Button type="submit">         
        {putLoading ? 
          <div className="Loading-wrapper">
            <Loading />
          </div> 
          : 
          "Enregistrer"
        }
        </Button>
        {isSuccess && (
          <div className="enregistreLabel">
            <p>Enregistré</p>
            <img src={Check} alt="check" />
          </div>
        )}
      </div>
    </form>
  );
}
