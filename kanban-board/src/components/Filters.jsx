export default function Filters({ onChange }) {
  return (
    <div className="filters">
      <input placeholder="Search"
        onChange={e => onChange(f => ({ ...f, search: e.target.value }))} />

      <input placeholder="Assignee"
        onChange={e => onChange(f => ({ ...f, assignee: e.target.value }))} />

      <select onChange={e => onChange(f => ({ ...f, priority: e.target.value }))}>
        <option value="">All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>
  );
}
