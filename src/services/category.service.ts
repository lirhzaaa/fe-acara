import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryServices = {
  addCategories: (payload: ICategory) => {
    instance.post(`/create${endpoint.CATEGORY}`, payload);
  },
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
  getCategoriesById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  updateCategories: (id: string, payload: ICategory) =>
    instance.put(`update${endpoint.CATEGORY}/${id}`, payload),
  deleteCategories: (id: string) =>
    instance.delete(`/delete${endpoint.CATEGORY}/${id}`),
};

export default categoryServices;
