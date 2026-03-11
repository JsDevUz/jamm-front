import axiosInstance from "./axiosInstance";

export const getProfileDecorations = async () => {
  const { data } = await axiosInstance.get("/users/profile-decorations");
  return Array.isArray(data) ? data : [];
};

export const updateProfileDecoration = async (decorationId) => {
  const { data } = await axiosInstance.patch("/users/me/profile-decoration", {
    decorationId: decorationId || null,
  });
  return data;
};

export const uploadProfileDecorationImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.patch(
    "/users/me/profile-decoration-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};
