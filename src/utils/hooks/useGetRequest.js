import { useState, useEffect } from "react";

export function useGetRequest(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); 

    try {
      const response = await fetch(`${url}?_sort=lastUpdatedAt`);
      let responseData = await response.json();

      if (!Array.isArray(responseData)) {
        responseData = [responseData];
      }

      setData(responseData.reverse());
      //console.log("Data fetched successfully:", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Une erreur s'est produite lors de la récupération des données.Veuillez réessayer plus tard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
