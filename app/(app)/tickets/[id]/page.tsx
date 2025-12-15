import {notFound} from 'next/navigation';

import {TicketDetailScreen} from '@/src/screens/tickets/detail-screen';

interface TicketDetailPageProps {
  params: Promise<{id?: string}>;
}

export default async function TicketDetailPage({params}: TicketDetailPageProps) {
  const resolvedParams = await params;

  if (!resolvedParams?.id) {
    notFound();
  }

  return <TicketDetailScreen ticketId={resolvedParams.id!} />;
}
