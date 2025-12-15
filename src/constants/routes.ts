export const ROUTES = {
  login: '/login',
  dashboard: '/',
  tickets: '/tickets',
  ticketCreate: '/tickets/new',
  ticketDetail: (id: number | string) => `/tickets/${id}`,
};
