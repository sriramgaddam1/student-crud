import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StatsBar from "./components/StatsBar";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Aisha Patel", grade: "10", subject: "Mathematics", gpa: "3.8" },
  { id: 2, name: "Marcus Chen", grade: "11", subject: "Physics", gpa: "3.5" },
  { id: 3, name: "Sofia Rivera", grade: "9", subject: "Literature", gpa: "3.9" },
];

const emptyForm = { name: "", grade: "", subject: "", gpa: "" };

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [nextId, setNextId] = useState(4);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editId !== null) {
      setStudents(students.map(s => s.id === editId ? { ...form, id: editId } : s));
      setEditId(null);
    } else {
      setStudents([...students, { ...form, id: nextId }]);
      setNextId(nextId + 1);
    }
    setForm(emptyForm);
  };

  const handleEdit = (s) => {
    setForm({ name: s.name, grade: s.grade, subject: s.subject, gpa: s.gpa });
    setEditId(s.id);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
    if (editId === id) { setEditId(null); setForm(emptyForm); }
  };

  const handleCancel = () => { setEditId(null); setForm(emptyForm); };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.subject.toLowerCase().includes(search.toLowerCase())
  );

  const avgGpa = students.length
    ? (students.reduce((a, s) => a + (parseFloat(s.gpa) || 0), 0) / students.length).toFixed(2)
    : "—";

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="header-tag">// record system v1.0</div>
          <h1>Student<br /><span>Registry</span></h1>
          <p className="subtitle">manage · track · update</p>
        </div>

        <StatsBar students={students} avgGpa={avgGpa} />

        <StudentForm
          form={form}
          editId={editId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        <StudentTable
          students={filtered}
          search={search}
          onSearch={e => setSearch(e.target.value)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}