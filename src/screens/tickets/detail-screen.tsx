'use client';

import React from 'react';
import styled from 'styled-components';
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.md};
  margin-bottom: ${({theme}) => theme.spacing.lg};

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TicketTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md};
`;

const Code = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({theme}) => theme.colors.gray[800]};
`;

const SubHeader = styled.p`
  color: ${({theme}) => theme.colors.gray[500]};
  font-size: 0.875rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({theme}) => theme.spacing.lg};

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.lg};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.lg};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({theme}) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[100]};

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({theme}) => theme.colors.gray[500]};
  font-weight: 600;
`;

const Value = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray[900]};
  text-align: right;
`;

const DescriptionBox = styled.div`
  background-color: ${({theme}) => theme.colors.gray[50]};
  padding: ${({theme}) => theme.spacing.md};
  border-radius: ${({theme}) => theme.borderRadius.md};
  color: ${({theme}) => theme.colors.gray[700]};
  white-space: pre-wrap;
  line-height: 1.6;
`;

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
      <div style={{display: 'flex', justifyContent: 'center', padding: '48px'}}>
        <Loader2 className="animate-spin" size={32} color="#0284c7" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: 16, padding: 32}}>
        <p style={{color: '#b91c1c', fontWeight: 600}}>{errorMessage ?? 'Ticket não encontrado.'}</p>
        <Link href={ROUTES.tickets}>
          <Button variant="primary">Voltar para Tickets</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Header>
        <TicketTitleWrapper>
          <Link href={ROUTES.tickets}>
            <Button variant="ghost">
              <ArrowLeft size={16} /> Back
            </Button>
          </Link>
          <div>
            <Code>{ticket.title || `Ticket #${ticket.id}`}</Code>
            <SubHeader>Opened {formatDate(ticket.openedAt)}</SubHeader>
          </div>
        </TicketTitleWrapper>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={16} /> Save Changes</>}
        </Button>
      </Header>

      <Grid>
        <MainContent>
          <Card>
            <CardHeader>
              <CardTitle>Ticket Description</CardTitle>
            </CardHeader>
            <CardBody>
              <DescriptionBox>{ticket.description || 'No description provided.'}</DescriptionBox>
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
        </MainContent>

        <Sidebar>
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardBody>
              <InfoRow>
                <Label>Ticket ID</Label>
                <Value>#{ticket.id}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Severity</Label>
                <Value>{getSeverityName(ticket.severityId)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Status</Label>
                <Value>{statuses.find(status => status.id === ticket.statusId)?.name ?? '--'}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Opened</Label>
                <Value>{formatDate(ticket.openedAt)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Closed</Label>
                <Value>{formatDate(ticket.closedAt)}</Value>
              </InfoRow>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardBody>
              <InfoRow>
                <Label>Line</Label>
                <Value>{getLineName(ticket.lineId)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Workstation</Label>
                <Value>{getWorkstationName(ticket.workstationId)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Category</Label>
                <Value>{getCategoryName(ticket.failureTypeId)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Failure Type</Label>
                <Value>{getFailureTypeName(ticket.failureTypeId)}</Value>
              </InfoRow>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardBody>
              <InfoRow>
                <Label>
                  <Calendar size={14} /> Opened At
                </Label>
                <Value>{formatDate(ticket.openedAt)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>
                  <MapPin size={14} /> On Site
                </Label>
                <Value>{formatDate(ticket.onSiteAt)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>
                  <Clock size={14} /> Closed At
                </Label>
                <Value>{formatDate(ticket.closedAt)}</Value>
              </InfoRow>
            </CardBody>
          </Card>
        </Sidebar>
      </Grid>
    </div>
  );
}
