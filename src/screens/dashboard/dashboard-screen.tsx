'use client';

import React from 'react';
import styled from 'styled-components';
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

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({theme}) => theme.colors.gray[800]};
  margin-bottom: ${({theme}) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  gap: ${({theme}) => theme.spacing.lg};
  margin-bottom: ${({theme}) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  gap: ${({theme}) => theme.spacing.lg};

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartContainer = styled.div`
  height: 320px;
  width: 100%;
`;

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
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh'}}>
        <Loader2 className="animate-spin" size={32} color="#0284c7" />
      </div>
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
      <PageTitle>Production Dashboard</PageTitle>

      <Grid>
        <StatCard label="Open Tickets" value={totalOpen} icon={AlertTriangle} color="#2563eb" bgColor="#dbeafe" />
        <StatCard label="Closed Tickets" value={totalClosed} icon={CheckCircle} color="#16a34a" bgColor="#dcfce7" />
        <StatCard label="Lines" value={lines.length} icon={Clock} color="#9333ea" bgColor="#f3e8ff" />
      </Grid>

      <ChartsGrid>
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Status</CardTitle>
          </CardHeader>
          <CardBody>
            <ChartContainer>
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
            </ChartContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets by Severity</CardTitle>
          </CardHeader>
          <CardBody>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardBody>
        </Card>
      </ChartsGrid>
    </div>
  );
}
