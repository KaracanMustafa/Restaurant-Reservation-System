function TableGrid({ availability, onTableSelect }) {
  const getTableClass = (table) => {
    if (table.available) return 'available';
    if (table.status === 'pending') return 'pending';
    if (table.status === 'approved') return 'approved';
    return 'unavailable';
  };

  return (
    <div className="table-grid">
      {availability.map((table) => (
        <div
          key={table.table_id}
          className={`table-cell ${getTableClass(table)}`}
          onClick={() => table.available && onTableSelect(table.table_id)}
        >
          T{table.table_id}
        </div>
      ))}
    </div>
  );
}

export default TableGrid;
