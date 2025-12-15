export function extractData<T>(payload: {data?: T[]; results?: T[] | null} | T[]): T[] {
  if (Array.isArray(payload)) return payload;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  if (payload?.results && Array.isArray(payload.results)) return payload.results;
  return [];
}
