import { useState } from "react";

// Hook personnalisé pour la suppression de données
export function useDeleteRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        setError("Une erreur s'est produite lors de la suppression de votre note. Veuillez réessayer plus tard.");
      }

      setIsLoading(false);
    } catch (error) {
      //console.error("Error deleting data:", error);
      setIsLoading(false);
      setIsSuccess(false);
      setError("Une erreur s'est produite lors de la suppression de votre note. Veuillez réessayer plus tard.");
    }
  };

  return { isLoading, isSuccess, error, deleteData };
}
