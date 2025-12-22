'use client';

import Link from 'next/link';

import {Badge} from '@/src/components/atoms/badge';
import {getStatusColors} from '@/src/constants/status';
import {Ticket} from '@/src/domain';
import {formatDate} from '@/src/utils/date';

import * as S from './ticket-table.styled';

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
    <S.TableContainer>
      <S.Table>
        <thead>
          <tr>
            <S.Th>ID</S.Th>
            <S.Th>Title</S.Th>
            <S.Th>Line</S.Th>
            <S.Th>Status</S.Th>
            <S.Th>Severity</S.Th>
            <S.Th>Opened</S.Th>
            <S.Th style={{textAlign: 'right'}}>Action</S.Th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <S.Td style={{color: '#0284c7', fontWeight: 500}}>#{ticket.id}</S.Td>
              <S.Td title={ticket.title} style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {ticket.title || 'No title'}
              </S.Td>
              <S.Td>{getLineName(ticket.lineId)}</S.Td>
              <S.Td>{renderStatus(ticket.statusId)}</S.Td>
              <S.Td>{getSeverityName(ticket.severityId)}</S.Td>
              <S.Td>{formatDate(ticket.openedAt)}</S.Td>
              <S.Td style={{textAlign: 'right'}}>
                <Link href={getTicketHref(ticket.id)} style={{color: '#0284c7', fontWeight: 500}}>
                  View
                </Link>
              </S.Td>
            </tr>
          ))}
          {tickets.length === 0 && (
            <tr>
              <S.Td colSpan={7} style={{textAlign: 'center', padding: '48px', color: '#9ca3af'}}>
                No tickets found.
              </S.Td>
            </tr>
          )}
        </tbody>
      </S.Table>
    </S.TableContainer>
  );
}
