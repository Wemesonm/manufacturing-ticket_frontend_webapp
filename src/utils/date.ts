export function formatDate(value?: string | null) {
  if (!value) return '--';
  try {
    return new Intl.DateTimeFormat('en-US').format(new Date(value));
  } catch {
    return value;
  }
}
