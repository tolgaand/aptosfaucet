import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSaveLog = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (walletAddress: string) => {
      await axios.post("/api/save-log", { walletAddress });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("logs");
      },
    }
  );
};

export const useLogs = () => {
  return useQuery("logs", async () => {
    const { data } = await axios.get("/api/logs");
    return data.logs;
  });
};
