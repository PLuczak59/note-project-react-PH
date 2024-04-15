import { useState, useEffect } from "react";

export function useGetRequest(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true); 

    try {
      const response = await fetch(`${url}?_sort=lastUpdatedAt`); 
      let responseData = await response.json();

      // Vérification si responseData est un tableau
      if (!Array.isArray(responseData)) {
        responseData = [responseData];
      }

      setData(responseData.reverse());
      console.log("Data fetched successfully:", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading };
}
