export const STATUS_CODE_COLORS: Record<string, {bg: string; text: string; border: string}> = {
  OPEN: {bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe'},
  IN_PROGRESS: {bg: '#fef3c7', text: '#92400e', border: '#fde68a'},
  HOLD: {bg: '#ffedd5', text: '#9a3412', border: '#fed7aa'},
  CLOSED: {bg: '#d1fae5', text: '#065f46', border: '#a7f3d0'},
};

export function getStatusColors(code?: string | null) {
  if (!code) return STATUS_CODE_COLORS.OPEN;
  return STATUS_CODE_COLORS[code] ?? {bg: '#f3f4f6', text: '#1f2937', border: '#e5e7eb'};
}
