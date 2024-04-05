import { useState } from "react";

export function useDeleteRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return { isLoading, isSuccess, deleteData };
}
