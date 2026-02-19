export default function StatsBar({ students, avgGpa }) {
  return (
    <div className="stats-row">
      <div className="stat">
        <div className="stat-num">{students.length}</div>
        <div className="stat-label">Total Students</div>
      </div>
      <div className="stat">
        <div className="stat-num">{avgGpa}</div>
        <div className="stat-label">Avg GPA</div>
      </div>
      <div className="stat">
        <div className="stat-num">{[...new Set(students.map(s => s.grade))].length}</div>
        <div className="stat-label">Grades</div>
      </div>
      <div className="stat">
        <div className="stat-num">{[...new Set(students.map(s => s.subject))].length}</div>
        <div className="stat-label">Subjects</div>
      </div>
    </div>
  );
}