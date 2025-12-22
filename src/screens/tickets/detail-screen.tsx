'use client';

import React from 'react';
import Link from 'next/link';
import {ArrowLeft, Calendar, Clock, Loader2, MapPin, Save} from 'lucide-react';

import {Button} from '@/src/components/atoms/button';
import {Card, CardBody, CardHeader, CardTitle} from '@/src/components/atoms/card';
import {Select, TextArea} from '@/src/components/atoms/input';
import {FormField} from '@/src/components/molecules/form-field';
import {
  catalogService,
  FailureCategory,
  FailureType,
  Line,
  SeverityLevel,
  ticketService,
  Ticket,
  TicketStatus,
  Workstation,
} from '@/src/domain';
import {ROUTES} from '@/src/constants/routes';
import {formatDate} from '@/src/utils/date';

import * as S from './detail-screen.styled';

interface TicketDetailScreenProps {
  ticketId: string;
}

export function TicketDetailScreen({ticketId}: TicketDetailScreenProps) {
  const [ticket, setTicket] = React.useState<Ticket | null>(null);
  const [statuses, setStatuses] = React.useState<TicketStatus[]>([]);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [workstations, setWorkstations] = React.useState<Workstation[]>([]);
  const [categories, setCategories] = React.useState<FailureCategory[]>([]);
  const [types, setTypes] = React.useState<FailureType[]>([]);
  const [severities, setSeverities] = React.useState<SeverityLevel[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [statusId, setStatusId] = React.useState('');
  const [correctiveAction, setCorrectiveAction] = React.useState('');
  const [rootCause, setRootCause] = React.useState('');
  const [preventiveAction, setPreventiveAction] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const ticketData = await ticketService.getById(Number(ticketId));
        setTicket(ticketData);
        setStatusId(String(ticketData.statusId));
        setCorrectiveAction(ticketData.correctiveAction ?? '');
        setRootCause(ticketData.rootCause ?? '');
        setPreventiveAction(ticketData.preventiveAction ?? '');

        const results = await Promise.allSettled([
          ticketService.getStatuses(),
          catalogService.listLines({perPage: 200}),
          catalogService.listWorkstations({perPage: 200}),
          catalogService.listFailureCategories({perPage: 200}),
          catalogService.listFailureTypes({perPage: 200}),
          catalogService.listSeverityLevels({perPage: 200}),
        ]);

        const [statusRes, lineRes, workstationRes, categoryRes, typeRes, severityRes] = results;

        if (statusRes.status === 'fulfilled') {
          setStatuses(statusRes.value);
        }
        if (lineRes.status === 'fulfilled') {
          setLines(lineRes.value.data);
        }
        if (workstationRes.status === 'fulfilled') {
          setWorkstations(workstationRes.value.data);
        }
        if (categoryRes.status === 'fulfilled') {
          setCategories(categoryRes.value.data);
        }
        if (typeRes.status === 'fulfilled') {
          setTypes(typeRes.value.data);
        }
        if (severityRes.status === 'fulfilled') {
          setSeverities(severityRes.value.data);
        }
      } catch (error) {
        console.error('Failed to load ticket', error);
        setErrorMessage('Não foi possível carregar os detalhes do ticket. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketId]);

  const handleSave = async () => {
    if (!ticket) return;
    setSaving(true);
    try {
      const updated = await ticketService.updateTicket(ticket.id, {
        statusId: Number(statusId),
        correctiveAction,
        rootCause,
        preventiveAction,
      });
      setTicket(updated);
      alert('Ticket updated successfully');
    } catch (error) {
      console.error('Failed to update ticket', error);
      alert('Failed to update ticket');
    } finally {
      setSaving(false);
    }
  };

  const getLineName = (id?: number | null) => lines.find(line => line.id === id)?.name ?? '--';
  const getWorkstationName = (id?: number | null) => workstations.find(ws => ws.id === id)?.name ?? '--';
  const getCategoryName = (failureTypeId?: number | null) => {
    const failureType = types.find(type => type.id === failureTypeId);
    if (!failureType) return '--';
    return categories.find(category => category.id === failureType.categoryId)?.name ?? '--';
  };
  const getFailureTypeName = (id?: number | null) => types.find(type => type.id === id)?.name ?? '--';
  const getSeverityName = (id?: number | null) => severities.find(severity => severity.id === id)?.name ?? '--';

  if (loading) {
    return (
      <S.LoadingContainer>
        <Loader2 className="animate-spin" size={32} color="#0284c7" />
      </S.LoadingContainer>
    );
  }

  if (!ticket) {
    return (
      <S.ErrorContainer>
        <S.ErrorMessage>{errorMessage ?? 'Ticket não encontrado.'}</S.ErrorMessage>
        <Link href={ROUTES.tickets}>
          <Button variant="primary">Voltar para Tickets</Button>
        </Link>
      </S.ErrorContainer>
    );
  }

  return (
    <div>
      <S.Header>
        <S.TicketTitleWrapper>
          <Link href={ROUTES.tickets}>
            <Button variant="ghost">
              <ArrowLeft size={16} /> Back
            </Button>
          </Link>
          <div>
            <S.Code>{ticket.title || `Ticket #${ticket.id}`}</S.Code>
            <S.SubHeader>Opened {formatDate(ticket.openedAt)}</S.SubHeader>
          </div>
        </S.TicketTitleWrapper>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={16} /> Save Changes</>}
        </Button>
      </S.Header>

      <S.Grid>
        <S.MainContent>
          <Card>
            <CardHeader>
              <CardTitle>Ticket Description</CardTitle>
            </CardHeader>
            <CardBody>
              <S.DescriptionBox>{ticket.description || 'No description provided.'}</S.DescriptionBox>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Corrective Actions</CardTitle>
            </CardHeader>
            <CardBody>
              <FormField label="Status">
                <Select value={statusId} onChange={event => setStatusId(event.target.value)}>
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Root Cause">
                <TextArea rows={3} value={rootCause} onChange={event => setRootCause(event.target.value)} />
              </FormField>
              <FormField label="Corrective Action">
                <TextArea rows={3} value={correctiveAction} onChange={event => setCorrectiveAction(event.target.value)} />
              </FormField>
              <FormField label="Preventive Action">
                <TextArea rows={3} value={preventiveAction} onChange={event => setPreventiveAction(event.target.value)} />
              </FormField>
            </CardBody>
          </Card>
        </S.MainContent>

        <S.Sidebar>
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardBody>
              <S.InfoRow>
                <S.Label>Ticket ID</S.Label>
                <S.Value>#{ticket.id}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Severity</S.Label>
                <S.Value>{getSeverityName(ticket.severityId)}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Status</S.Label>
                <S.Value>{statuses.find(status => status.id === ticket.statusId)?.name ?? '--'}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Opened</S.Label>
                <S.Value>{formatDate(ticket.openedAt)}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Closed</S.Label>
                <S.Value>{formatDate(ticket.closedAt)}</S.Value>
              </S.InfoRow>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardBody>
              <S.InfoRow>
                <S.Label>Line</S.Label>
                <S.Value>{getLineName(ticket.lineId)}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Workstation</S.Label>
                <S.Value>{getWorkstationName(ticket.workstationId)}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Category</S.Label>
                <S.Value>{getCategoryName(ticket.failureTypeId)}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Failure Type</S.Label>
                <S.Value>{getFailureTypeName(ticket.failureTypeId)}</S.Value>
              </S.InfoRow>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardBody>
              <S.InfoRow>
                <S.Label>
                  <Calendar size={14} /> Opened At
                </S.Label>
                <S.Value>{formatDate(ticket.openedAt)}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>
                  <MapPin size={14} /> On Site
                </S.Label>
                <S.Value>{formatDate(ticket.onSiteAt)}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>
                  <Clock size={14} /> Closed At
                </S.Label>
                <S.Value>{formatDate(ticket.closedAt)}</S.Value>
              </S.InfoRow>
            </CardBody>
          </Card>
        </S.Sidebar>
      </S.Grid>
    </div>
  );
}
