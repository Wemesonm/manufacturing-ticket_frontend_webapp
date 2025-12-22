'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {AlertTriangle, CheckCircle, Clock, Loader2} from 'lucide-react';

import {Card, CardBody, CardHeader, CardTitle} from '@/src/components/atoms/card';
import {StatCard} from '@/src/components/molecules/stat-card';
import {catalogService, Line, SeverityLevel, Ticket, ticketService, TicketStatus} from '@/src/domain';

import * as S from './dashboard-screen.styled';

export function DashboardScreen() {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [statuses, setStatuses] = React.useState<TicketStatus[]>([]);
  const [severities, setSeverities] = React.useState<SeverityLevel[]>([]);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketPage, statusList, severityPage, linePage] = await Promise.all([
          ticketService.getList({perPage: 200}),
          ticketService.getStatuses(),
          catalogService.listSeverityLevels({perPage: 200}),
          catalogService.listLines({perPage: 200}),
        ]);

        setTickets(ticketPage.data);
        setStatuses(statusList);
        setSeverities(severityPage.data);
        setLines(linePage.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <Loader2 className="animate-spin" size={32} color="#0284c7" />
      </S.LoadingContainer>
    );
  }

  const statusMap = new Map(statuses.map(status => [status.id, status]));

  const ticketsByStatus = statuses
    .map(status => {
      const code = status.code?.toUpperCase();
      const color = code === 'CLOSED' ? '#10b981' : code === 'OPEN' ? '#3b82f6' : '#f59e0b';
      const count = tickets.filter(ticket => ticket.statusId === status.id).length;
      return {name: status.name, value: count, color};
    })
    .filter(entry => entry.value > 0);

  const totalClosed = tickets.filter(ticket => statusMap.get(ticket.statusId)?.code?.toUpperCase() === 'CLOSED').length;
  const totalOpen = tickets.length - totalClosed;

  const severityCounts = tickets.reduce<Record<number, number>>((acc, ticket) => {
    acc[ticket.severityId] = (acc[ticket.severityId] || 0) + 1;
    return acc;
  }, {});

  const severityData = Object.entries(severityCounts).map(([severityId, count]) => {
    const severity = severities.find(s => s.id === Number(severityId));
    return {
      name: severity?.name ?? `Severity ${severityId}`,
      count,
    };
  });

  return (
    <div>
      <S.PageTitle>Production Dashboard</S.PageTitle>

      <S.Grid>
        <StatCard label="Open Tickets" value={totalOpen} icon={AlertTriangle} color="#2563eb" bgColor="#dbeafe" />
        <StatCard label="Closed Tickets" value={totalClosed} icon={CheckCircle} color="#16a34a" bgColor="#dcfce7" />
        <StatCard label="Lines" value={lines.length} icon={Clock} color="#9333ea" bgColor="#f3e8ff" />
      </S.Grid>

      <S.ChartsGrid>
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Status</CardTitle>
          </CardHeader>
          <CardBody>
            <S.ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ticketsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </S.ChartContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets by Severity</CardTitle>
          </CardHeader>
          <CardBody>
            <S.ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </S.ChartContainer>
          </CardBody>
        </Card>
      </S.ChartsGrid>
    </div>
  );
}
