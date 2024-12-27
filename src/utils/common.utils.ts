export const sanitizeRecord = <T extends Record<any, any>>(record: T): T => {
  try {
    return Object.fromEntries(
      Object.entries(record).filter(([_, value]) => value !== null && value !== undefined),
    ) as T;
  } catch {
    return record;
  }
};
