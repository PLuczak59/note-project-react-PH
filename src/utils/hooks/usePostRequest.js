import { useState } from "react";

export function usePostRequest(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); 

  const postData = async (body) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      setData(responseData);
      return responseData;
    } catch (error) {
      console.error("Error creating note:", error);
      setError("Erreur lors de la création de votre note. Veuillez réessayer plus tard.");
    }
  };

  return { data, postData, error }; 
}
