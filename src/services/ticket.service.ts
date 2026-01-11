import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket } from "@/types/Ticket";

const ticketServices = {
  addTicket: (payload: ITicket) => {
    instance.post(`${endpoint.TICKET}`, payload);
  },
  getTicketByEventId: (id: string) => instance.get(`${endpoint.TICKET}/${id}/events`),
  getTicketById: (id: string) => instance.get(`${endpoint.TICKET}/${id}`),
  updateTicket: (id: string, payload: ITicket) =>
    instance.put(`${endpoint.TICKET}/${id}`, payload),
  deleteTicket: (id: string) =>
    instance.delete(`${endpoint.TICKET}/${id}`),
};

export default ticketServices;