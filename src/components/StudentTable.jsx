export default function StudentTable({ students, search, onSearch, onEdit, onDelete }) {
  return (
    <div className="panel">
      <div className="search-row">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            placeholder="Search by name or subject..."
            value={search}
            onChange={onSearch}
          />
        </div>
      </div>
      {students.length === 0 ? (
        <div className="empty-state">no students found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Subject</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td><span className="name-cell">{s.name}</span></td>
                <td>{s.grade || "—"}</td>
                <td>{s.subject || "—"}</td>
                <td><span className="gpa-badge">{s.gpa || "—"}</span></td>
                <td>
                  <div className="action-btns">
                    <button className="btn-edit" onClick={() => onEdit(s)}>Edit</button>
                    <button className="btn-delete" onClick={() => onDelete(s.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}