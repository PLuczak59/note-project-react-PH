import { useState } from "react";

export function usePutRequest(url) {
  const [isSuccess, setIsSuccess] = useState(false);

  const putData = async (data) => {
    setIsSuccess(false);

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
    }
  };

  return { putData, isSuccess };
}
