import { useState } from "react";

// Hook personnalisé pour les requêtes PUT(mise à jour de données)
export function usePutRequest(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update data: ${response.statusText}`);
      }

      setIsSuccess(true);
    } catch (error) {
      //console.error(error);
      setError("Une erreur est survenue lors de la mise à jour de votre Note. Veuillez réessayerplus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return { putData, isLoading, isSuccess, error };
}
