import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  addEvents: (payload: IEvent) => {
    instance.post(`/create${endpoint.EVENT}`, payload);
  },
  getEvents: (params?: string) =>
    instance.get(`${endpoint.EVENT}?${params}`),
  getEventsById: (id: string) => instance.get(`${endpoint.EVENT}/${id}`),
  updateEvents: (id: string, payload: IEvent) =>
    instance.put(`update${endpoint.EVENT}/${id}`, payload),
  deleteEvents: (id: string) =>
    instance.delete(`/delete${endpoint.EVENT}/${id}`),
};

export default eventServices;