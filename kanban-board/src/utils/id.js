export const generateId = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : `task-${Math.random().toString(36).slice(2)}`;
