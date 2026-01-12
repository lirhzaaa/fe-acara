import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  addEvents: (payload: IEvent) => {
    instance.post(`${endpoint.EVENT}`, payload);
  },
  getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
  getEventById: (id: string) => instance.get(`${endpoint.EVENT}/${id}`),  
  getEventsySlug: (slug: string) => instance.get(`${endpoint.EVENT}/${slug}/slug`),
  updateEvents: (id: string, payload: IEvent) =>
    instance.put(`${endpoint.EVENT}/${id}`, payload),
  deleteEvents: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  getRegencyById: (id: string) =>
    instance.get(`${endpoint.REGION}/${id}/regency`),
};

export default eventServices;
