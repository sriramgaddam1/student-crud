export default function StudentForm({ form, editId, onChange, onSubmit, onCancel }) {
  return (
    <div className={`panel ${editId !== null ? "edit-highlight" : ""}`}>
      <div className="panel-title">{editId !== null ? "✎ Edit Student" : "+ Add Student"}</div>
      <div className="form-grid">
        <div className="field">
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={onChange} placeholder="e.g. Jane Doe" />
        </div>
        <div className="field">
          <label>Grade</label>
          <input name="grade" value={form.grade} onChange={onChange} placeholder="e.g. 10" />
        </div>
        <div className="field">
          <label>Subject</label>
          <input name="subject" value={form.subject} onChange={onChange} placeholder="e.g. Biology" />
        </div>
        <div className="field">
          <label>GPA</label>
          <input name="gpa" value={form.gpa} onChange={onChange} placeholder="e.g. 3.7" />
        </div>
      </div>
      <div className="btn-row">
        <button className="btn-primary" onClick={onSubmit}>
          {editId !== null ? "Update" : "Add Student"}
        </button>
        {editId !== null && (
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </div>
  );
}