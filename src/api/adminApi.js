import axiosInstance from "./axiosInstance";

export const fetchAdminUsers = async (params = {}) => {
  const { data } = await axiosInstance.get("/admin/users", { params });
  return data;
};

export const fetchAdminGroups = async (params = {}) => {
  const { data } = await axiosInstance.get("/admin/groups", { params });
  return data;
};

export const fetchAdminCourses = async (params = {}) => {
  const { data } = await axiosInstance.get("/admin/courses", { params });
  return data;
};

export const fetchAdminPromocodes = async (params = {}) => {
  const { data } = await axiosInstance.get("/admin/promocodes", { params });
  return data;
};

export const createAdminPromocode = async (payload) => {
  const { data } = await axiosInstance.post("/admin/promocodes", payload);
  return data;
};
