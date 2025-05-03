import { useState } from "react";
import apiClient from "./apiClient";
export const useTest = (): any => {
  const client = apiClient;
  const [loading, setLoading] = useState(false);
  const handleTest = async () => {
    setLoading(true);
    await client.get("/").then((res) => console.log(res.data));
    setLoading(false);
  };
  return { handleTest, loading };
};
