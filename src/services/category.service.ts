import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryServices = {
  addCategories: (payload: ICategory) => {
    instance.post(`${endpoint.CATEGORY}`, payload);
  },
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
  getCategoriesById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  updateCategories: (id: string, payload: ICategory) =>
    instance.put(`${endpoint.CATEGORY}/${id}`, payload),
  deleteCategories: (id: string) =>
    instance.delete(`${endpoint.CATEGORY}/${id}`),
};

export default categoryServices;
