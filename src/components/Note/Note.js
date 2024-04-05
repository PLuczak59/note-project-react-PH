import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { Check, Trash } from "../../assets/images";
import "./Note.scss";
import { usePutRequest } from "../../utils/hooks/usePutRequest";

export function Note({
  id,
  title: initialTitle,
  content: initialContent,
  onSubmit,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const { putData, isSuccess } = usePutRequest(`/notes/${id}`);
  const [isUpdating, setIsUpdating] = useState(false); // Ajout de l'état isUpdating pour contrôler la mise à jour

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [id, initialTitle, initialContent]);

  const updateNote = () => {
    setIsUpdating(true); // Définir isUpdating sur true avant la mise à jour
    putData({
      title,
      content,
      lastUpdatedAt: new Date(),
    });
  };

  useEffect(() => {
    if (isSuccess && isUpdating) { // Mettre à jour localement uniquement si la mise à jour est réussie et si isUpdating est true
      onSubmit(id, { title, content });
      setIsUpdating(false); // Réinitialiser isUpdating après la mise à jour
    }
  }, [isSuccess, isUpdating, id, title, content, onSubmit]);

  return (
    <form
      className="Form"
      onSubmit={(event) => {
        event.preventDefault();
        updateNote();
      }}
    >
      <input
        className="Note-editable Note-title"
        type="text"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <textarea
        className="Note-editable Note-content"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
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
