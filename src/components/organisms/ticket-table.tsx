'use client';

import Link from 'next/link';
import styled from 'styled-components';

import {Badge} from '@/src/components/atoms/badge';
import {getStatusColors} from '@/src/constants/status';
import {Ticket} from '@/src/domain';
import {formatDate} from '@/src/utils/date';

const TableContainer = styled.div`
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${({theme}) => theme.borderRadius.lg};
  border: 1px solid ${({theme}) => theme.colors.gray[200]};
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  white-space: nowrap;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({theme}) => theme.spacing.md};
  background-color: ${({theme}) => theme.colors.gray[50]};
  color: ${({theme}) => theme.colors.gray[600]};
  font-weight: 600;
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[200]};
`;

const Td = styled.td`
  padding: ${({theme}) => theme.spacing.md};
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[100]};
  color: ${({theme}) => theme.colors.gray[800]};
`;

interface TicketTableProps {
  tickets: Ticket[];
  getStatusName: (id: number) => string;
  getStatusCode: (id: number) => string;
  getLineName: (id: number) => string;
  getSeverityName: (id: number) => string;
  getTicketHref: (id: number) => string;
}

export function TicketTable({
  tickets,
  getStatusName,
  getStatusCode,
  getLineName,
  getSeverityName,
  getTicketHref,
}: TicketTableProps) {
  const renderStatus = (statusId: number) => {
    const code = getStatusCode(statusId);
    const colors = getStatusColors(code);
    return (
      <Badge bg={colors.bg} color={colors.text} border={colors.border}>
        {getStatusName(statusId)}
      </Badge>
    );
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Line</Th>
            <Th>Status</Th>
            <Th>Severity</Th>
            <Th>Opened</Th>
            <Th style={{textAlign: 'right'}}>Action</Th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <Td style={{color: '#0284c7', fontWeight: 500}}>#{ticket.id}</Td>
              <Td title={ticket.title} style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {ticket.title || 'No title'}
              </Td>
              <Td>{getLineName(ticket.lineId)}</Td>
              <Td>{renderStatus(ticket.statusId)}</Td>
              <Td>{getSeverityName(ticket.severityId)}</Td>
              <Td>{formatDate(ticket.openedAt)}</Td>
              <Td style={{textAlign: 'right'}}>
                <Link href={getTicketHref(ticket.id)} style={{color: '#0284c7', fontWeight: 500}}>
                  View
                </Link>
              </Td>
            </tr>
          ))}
          {tickets.length === 0 && (
            <tr>
              <Td colSpan={7} style={{textAlign: 'center', padding: '48px', color: '#9ca3af'}}>
                No tickets found.
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
