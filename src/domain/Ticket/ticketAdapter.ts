import {
  Ticket,
  TicketAPI,
  TicketListParams,
  TicketListParamsAPI,
  TicketPayload,
  TicketPayloadAPI,
  TicketStatus,
  TicketStatusAPI,
  UpdateTicketPayload,
  UpdateTicketPayloadAPI,
} from './ticketTypes';

function toTicket(ticketApi: TicketAPI): Ticket {
  return {
    id: ticketApi.id,
    lineId: ticketApi.line,
    workstationId: ticketApi.workstation,
    failureTypeId: ticketApi.failure_type,
    severityId: ticketApi.severity,
    statusId: ticketApi.status,
    title: ticketApi.title,
    description: ticketApi.description,
    isHoldLine: ticketApi.is_hold_line,
    openedById: ticketApi.opened_by,
    acceptedById: ticketApi.accepted_by,
    closedById: ticketApi.closed_by,
    openedAt: ticketApi.opened_at,
    acceptedAt: ticketApi.accepted_at,
    onSiteAt: ticketApi.on_site_at,
    closedAt: ticketApi.closed_at,
    rootCause: ticketApi.root_cause,
    correctiveAction: ticketApi.corrective_action,
    preventiveAction: ticketApi.preventive_action,
  };
}

function toTicketStatus(statusApi: TicketStatusAPI): TicketStatus {
  return {
    id: statusApi.id,
    code: statusApi.code,
    name: statusApi.name,
    description: statusApi.description,
    order: statusApi.order,
    active: statusApi.active,
  };
}

function toTicketPayloadAPI(payload: TicketPayload): TicketPayloadAPI {
  return {
    line: payload.lineId,
    workstation:
      payload.workstationId === undefined
        ? undefined
        : payload.workstationId,
    failure_type:
      payload.failureTypeId === undefined
        ? undefined
        : payload.failureTypeId,
    severity: payload.severityId,
    status: payload.statusId,
    title: payload.title,
    description: payload.description,
    is_hold_line: payload.isHoldLine,
    accepted_by: payload.acceptedById,
    closed_by: payload.closedById,
    accepted_at: payload.acceptedAt,
    on_site_at: payload.onSiteAt,
    closed_at: payload.closedAt,
    root_cause: payload.rootCause,
    corrective_action: payload.correctiveAction,
    preventive_action: payload.preventiveAction,
  };
}

function toUpdateTicketPayloadAPI(
  payload: UpdateTicketPayload,
): UpdateTicketPayloadAPI {
  const payloadApi: UpdateTicketPayloadAPI = {};

  if (payload.lineId !== undefined) payloadApi.line = payload.lineId;
  if (payload.workstationId !== undefined)
    payloadApi.workstation = payload.workstationId;
  if (payload.failureTypeId !== undefined)
    payloadApi.failure_type = payload.failureTypeId;
  if (payload.severityId !== undefined) payloadApi.severity = payload.severityId;
  if (payload.statusId !== undefined) payloadApi.status = payload.statusId;
  if (payload.title !== undefined) payloadApi.title = payload.title;
  if (payload.description !== undefined)
    payloadApi.description = payload.description;
  if (payload.isHoldLine !== undefined)
    payloadApi.is_hold_line = payload.isHoldLine;
  if (payload.acceptedById !== undefined)
    payloadApi.accepted_by = payload.acceptedById;
  if (payload.closedById !== undefined)
    payloadApi.closed_by = payload.closedById;
  if (payload.acceptedAt !== undefined)
    payloadApi.accepted_at = payload.acceptedAt;
  if (payload.onSiteAt !== undefined)
    payloadApi.on_site_at = payload.onSiteAt;
  if (payload.closedAt !== undefined) payloadApi.closed_at = payload.closedAt;
  if (payload.rootCause !== undefined) payloadApi.root_cause = payload.rootCause;
  if (payload.correctiveAction !== undefined)
    payloadApi.corrective_action = payload.correctiveAction;
  if (payload.preventiveAction !== undefined)
    payloadApi.preventive_action = payload.preventiveAction;

  return payloadApi;
}

function toTicketListParamsAPI(
  params: TicketListParams = {},
): TicketListParamsAPI {
  const paramsApi: TicketListParamsAPI = {};

  if (params.page !== undefined) paramsApi.page = params.page;
  if (params.perPage !== undefined) paramsApi.per_page = params.perPage;
  if (params.lineId !== undefined) paramsApi.line = params.lineId;
  if (params.severityId !== undefined)
    paramsApi.severity = params.severityId;
  if (params.statusId !== undefined) paramsApi.status = params.statusId;
  if (params.siteId !== undefined) paramsApi.site = params.siteId;

  return paramsApi;
}

export const ticketAdapter = {
  toTicket,
  toTicketStatus,
  toTicketPayloadAPI,
  toUpdateTicketPayloadAPI,
  toTicketListParamsAPI,
};
