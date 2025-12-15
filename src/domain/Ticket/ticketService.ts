import {apiAdapter} from '@/src/api';
import {Page} from '@/src/types';

import {ticketAdapter} from './ticketAdapter';
import {ticketApi} from './ticketApi';
import {
  Ticket,
  TicketListParams,
  TicketPayload,
  TicketStatus,
  UpdateTicketPayload,
} from './ticketTypes';

async function getList(params?: TicketListParams): Promise<Page<Ticket>> {
  const ticketPageAPI = await ticketApi.getTickets(
    ticketAdapter.toTicketListParamsAPI(params),
  );

  return apiAdapter.toPageModel(ticketPageAPI, ticketAdapter.toTicket);
}

async function getById(ticketId: number): Promise<Ticket> {
  const ticketApiData = await ticketApi.getTicket(ticketId);
  return ticketAdapter.toTicket(ticketApiData);
}

async function createTicket(payload: TicketPayload): Promise<Ticket> {
  const ticketApiData = await ticketApi.createTicket(
    ticketAdapter.toTicketPayloadAPI(payload),
  );
  return ticketAdapter.toTicket(ticketApiData);
}

async function updateTicket(
  ticketId: number,
  payload: UpdateTicketPayload,
): Promise<Ticket> {
  const ticketApiData = await ticketApi.updateTicket(
    ticketId,
    ticketAdapter.toUpdateTicketPayloadAPI(payload),
  );
  return ticketAdapter.toTicket(ticketApiData);
}

async function getStatuses(): Promise<TicketStatus[]> {
  const ticketStatusesApi = await ticketApi.getTicketStatuses();
  return ticketStatusesApi.map(ticketAdapter.toTicketStatus);
}

export const ticketService = {
  getList,
  getById,
  createTicket,
  updateTicket,
  getStatuses,
};
