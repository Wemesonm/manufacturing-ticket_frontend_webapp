'use client';

import React from 'react';
import {Loader2, Plus} from 'lucide-react';
import Link from 'next/link';

import {Select} from '@/src/components/atoms/input';
import {TicketTable} from '@/src/components/organisms/ticket-table';
import {catalogService, Line, SeverityLevel, ticketService, TicketStatus, Ticket} from '@/src/domain';
import {ROUTES} from '@/src/constants/routes';

import * as S from './list-screen.styled';

export function TicketListScreen() {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [statuses, setStatuses] = React.useState<TicketStatus[]>([]);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [severities, setSeverities] = React.useState<SeverityLevel[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [filterStatus, setFilterStatus] = React.useState("");
  const [filterLine, setFilterLine] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [statusRes, lineRes, severityRes] = await Promise.all([
          ticketService.getStatuses(),
          catalogService.listLines({ perPage: 200 }),
          catalogService.listSeverityLevels({ perPage: 200 }),
        ]);

        setStatuses(statusRes);
        setLines(lineRes.data);
        setSeverities(severityRes.data);
      } catch (error) {
        console.error("Failed to load metadata", error);
      }
    };

    fetchMetadata();
  }, []);

  React.useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const ticketPage = await ticketService.getList({ perPage: 200 });
        setTickets(ticketPage.data);
      } catch (error) {
        console.error("Failed to load tickets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = React.useMemo(() => {
    return tickets.filter(ticket => {
      const matchesStatus = filterStatus ? ticket.statusId === Number(filterStatus) : true;
      const matchesLine = filterLine ? ticket.lineId === Number(filterLine) : true;
      const search = searchTerm.toLowerCase();
      const title = ticket.title?.toLowerCase() ?? '';
      const matchesSearch = title.includes(search) || `#${ticket.id}`.toLowerCase().includes(search);
      return matchesStatus && matchesLine && matchesSearch;
    });
  }, [tickets, filterStatus, filterLine, searchTerm]);

  return (
    <div>
      <S.Header>
        <S.Title>Tickets Wwemeson</S.Title>
        <Link href={ROUTES.ticketCreate}>
          <S.NewTicketButton variant="primary">
            <Plus size={16} /> New Ticket
          </S.NewTicketButton>
        </Link>
      </S.Header>

      <S.FilterBar>
        <S.SearchWrapper>
          <S.SearchIcon size={16} />
          <S.SearchInput
            type="text"
            placeholder="Search code or title..."
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </S.SearchWrapper>
        <Select value={filterStatus} onChange={event => setFilterStatus(event.target.value)}>
          <option value="">All Statuses</option>
          {statuses.map(status => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </Select>
        <Select value={filterLine} onChange={event => setFilterLine(event.target.value)}>
          <option value="">All Lines</option>
          {lines.map(line => (
            <option key={line.id} value={line.id}>
              {line.code || line.name}
            </option>
          ))}
        </Select>
      </S.FilterBar>

      {loading ? (
        <S.LoadingContainer>
          <Loader2 className="animate-spin" size={32} color="#0284c7" />
        </S.LoadingContainer>
      ) : (
        <TicketTable
          tickets={filteredTickets}
          getStatusName={id => statuses.find(status => status.id === id)?.name ?? `${id}`}
          getStatusCode={id => statuses.find(status => status.id === id)?.code ?? ''}
          getLineName={id => lines.find(line => line.id === id)?.name ?? `${id}`}
          getSeverityName={id => severities.find(severity => severity.id === id)?.name ?? `${id}`}
          getTicketHref={id => ROUTES.ticketDetail(id)}
        />
      )}
    </div>
  );
}
