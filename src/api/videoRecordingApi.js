import axiosInstance from "./axiosInstance";

export const createRecordingSession = async (payload) => {
  const { data } = await axiosInstance.post("/video/recordings/sessions", payload);
  return data;
};

export const uploadRecordingChunk = async ({
  sessionId,
  chunkIndex,
  blob,
  extension = "webm",
}) => {
  const formData = new FormData();
  formData.append("chunk", blob, `chunk-${chunkIndex}.${extension}`);
  formData.append("chunkIndex", String(chunkIndex));

  const { data } = await axiosInstance.post(
    `/video/recordings/sessions/${sessionId}/chunks`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export const finishRecordingSession = async ({ sessionId, durationMs }) => {
  const { data } = await axiosInstance.post(
    `/video/recordings/sessions/${sessionId}/finish`,
    {
      durationMs,
    },
  );
  return data;
};
