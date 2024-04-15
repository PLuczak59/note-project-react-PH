import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { Check } from "../../assets/images";
import "./Note.scss";
import { usePutRequest } from "../../utils/hooks/usePutRequest";
import { useDebouncedEffect } from "../../utils/hooks/useDeboucedEffect";

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
  const { putData, isSuccess } = usePutRequest(`/notes/${id}`);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setIsNoteChecked(initialIsNoteChecked);
    setIsPined(initialIsPined);
    setHasChanges(false);
  }, [id, initialTitle, initialContent, initialIsNoteChecked, initialIsPined]);

  const updateNote = () => {
    setIsUpdating(true);
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
        setIsUpdating(false);
        setHasChanges(false);
      }
    },
    [isSuccess, isUpdating, id, title, content, isNoteChecked, isPined, onSubmit, hasChanges],
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
        <Button>Enregistrer</Button>
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
