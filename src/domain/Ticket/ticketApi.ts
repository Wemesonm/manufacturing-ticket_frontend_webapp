import {api, PageAPI} from '@/src/api';
import {extractData} from '@/src/utils/api';

import {
  TicketAPI,
  TicketListParamsAPI,
  TicketPayloadAPI,
  TicketStatusAPI,
  UpdateTicketPayloadAPI,
} from './ticketTypes';

const TICKETS_PATH = 'tickets/';
const TICKET_STATUS_PATH = 'ticket-status/';

async function getTickets(
  params: TicketListParamsAPI = {},
): Promise<PageAPI<TicketAPI>> {
  const response = await api.get<PageAPI<TicketAPI>>(TICKETS_PATH, {
    params,
  });
  return response.data;
}

async function createTicket(payload: TicketPayloadAPI): Promise<TicketAPI> {
  const response = await api.post<TicketAPI>(TICKETS_PATH, payload);
  return response.data;
}

async function getTicket(id: number): Promise<TicketAPI> {
  const response = await api.get<TicketAPI>(`${TICKETS_PATH}${id}/`);
  return response.data;
}

async function updateTicket(
  id: number,
  payload: UpdateTicketPayloadAPI,
): Promise<TicketAPI> {
  const response = await api.patch<TicketAPI>(
    `${TICKETS_PATH}${id}/`,
    payload,
  );
  return response.data;
}

async function getTicketStatuses(): Promise<TicketStatusAPI[]> {
  const response = await api.get<{data?: TicketStatusAPI[]; results?: TicketStatusAPI[]} | TicketStatusAPI[]>(
    TICKET_STATUS_PATH,
  );
  return extractData(response.data);
}

export const ticketApi = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  getTicketStatuses,
};
