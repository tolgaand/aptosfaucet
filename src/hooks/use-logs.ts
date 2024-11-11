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
        queryClient.invalidateQueries("logCount");
      },
    }
  );
};

export const useLogs = () => {
  return useQuery("logs", async () => {
    const { data } = await axios.get("/api/logs");
    return data;
  });
};

export const useLogCount = () => {
  return useQuery("logCount", async () => {
    const { data } = await axios.get("/api/get-log-count");
    return data;
  });
};
