import {Page} from '@/src/types';

export interface TicketAPI {
  id: number;
  line: number;
  workstation: number | null;
  failure_type: number | null;
  severity: number;
  status: number;
  title: string;
  description: string;
  is_hold_line: boolean;
  opened_by: number;
  accepted_by: number | null;
  closed_by: number | null;
  opened_at: string;
  accepted_at: string | null;
  on_site_at: string | null;
  closed_at: string | null;
  root_cause: string | null;
  corrective_action: string | null;
  preventive_action: string | null;
}

export interface TicketStatusAPI {
  id: number;
  code: string;
  name: string;
  description: string;
  order: number;
  active: boolean;
}

export interface Ticket {
  id: number;
  lineId: number;
  workstationId: number | null;
  failureTypeId: number | null;
  severityId: number;
  statusId: number;
  title: string;
  description: string;
  isHoldLine: boolean;
  openedById: number;
  acceptedById: number | null;
  closedById: number | null;
  openedAt: string;
  acceptedAt: string | null;
  onSiteAt: string | null;
  closedAt: string | null;
  rootCause: string | null;
  correctiveAction: string | null;
  preventiveAction: string | null;
}

export interface TicketStatus {
  id: number;
  code: string;
  name: string;
  description: string;
  order: number;
  active: boolean;
}

export interface TicketPayload {
  lineId: number;
  workstationId?: number | null;
  failureTypeId?: number | null;
  severityId: number;
  statusId: number;
  title: string;
  description?: string;
  isHoldLine?: boolean;
  acceptedById?: number | null;
  closedById?: number | null;
  acceptedAt?: string | null;
  onSiteAt?: string | null;
  closedAt?: string | null;
  rootCause?: string | null;
  correctiveAction?: string | null;
  preventiveAction?: string | null;
}

export type UpdateTicketPayload = Partial<TicketPayload>;

export interface TicketPayloadAPI {
  line: number;
  workstation?: number | null;
  failure_type?: number | null;
  severity: number;
  status: number;
  title: string;
  description?: string;
  is_hold_line?: boolean;
  accepted_by?: number | null;
  closed_by?: number | null;
  accepted_at?: string | null;
  on_site_at?: string | null;
  closed_at?: string | null;
  root_cause?: string | null;
  corrective_action?: string | null;
  preventive_action?: string | null;
}

export type UpdateTicketPayloadAPI = Partial<TicketPayloadAPI>;

export interface TicketListParams {
  page?: number;
  perPage?: number;
  lineId?: number;
  severityId?: number;
  statusId?: number;
  siteId?: number;
}

export interface TicketListParamsAPI {
  page?: number;
  per_page?: number;
  line?: number;
  severity?: number;
  status?: number;
  site?: number;
}

export type TicketPage = Page<Ticket>;
