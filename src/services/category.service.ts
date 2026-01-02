import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryServices = {
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
  addCategories: (payload: ICategory) => {
    instance.post(`/create${endpoint.CATEGORY}`, payload);
  },
  deleteCategories: (id: string) =>
    instance.delete(`/delete${endpoint.CATEGORY}/${id}`),
};

export default categoryServices;
