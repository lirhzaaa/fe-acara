import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IBanner } from "@/types/Banner";

const bannerServices = {
  addBanners: (payload: IBanner) => {
    instance.post(`${endpoint.BANNER}`, payload);
  },
  getBanners: (params?: string) =>
    instance.get(`${endpoint.BANNER}?${params}`),
  getBannersById: (id: string) => instance.get(`${endpoint.BANNER}/${id}`),
  updateBanners: (id: string, payload: IBanner) =>
    instance.put(`${endpoint.BANNER}/${id}`, payload),
  deleteBanners: (id: string) =>
    instance.delete(`${endpoint.BANNER}/${id}`),
};

export default bannerServices;
