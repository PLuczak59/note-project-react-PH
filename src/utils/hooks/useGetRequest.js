import { useState, useEffect } from "react";

export function useGetRequest(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initialisez isLoading à false

  const fetchData = async () => {
    setIsLoading(true); // Mettez isLoading à true juste avant le lancement de la requête

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Mettez isLoading à false une fois que la réponse est reçue
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading };
}
