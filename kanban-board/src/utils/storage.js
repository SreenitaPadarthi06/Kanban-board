const KEY = "kanban-data";

export const loadData = () => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
};

export const saveData = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};
