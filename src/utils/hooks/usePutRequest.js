import { useState } from "react";

export function usePutRequest(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (data) => {
    setIsLoading(true); // Définir isLoading sur true lors du début de la requête

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
      console.error(error);
      setError("Une erreur est survenue lors de la mise à jour de votre Note. Veuillez réessayerplus tard.");
    } finally {
      setIsLoading(false); // Définir isLoading sur false une fois la requête terminée
    }
  };

  return { putData, isLoading, isSuccess, error };
}
