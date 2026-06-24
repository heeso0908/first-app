export function TodoFilter({ filter, onFilterChange, counts }) {
  const filters = [
    { value: 'all', label: `전체 (${counts.all})` },
    { value: 'active', label: `미완료 (${counts.active})` },
    { value: 'completed', label: `완료 (${counts.completed})` },
  ];

  return (
    <div className="todo-filter">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          className={`btn ${filter === value ? 'btn-active' : 'btn-ghost'}`}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
