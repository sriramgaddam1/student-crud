import { useEffect, useMemo, useState } from "react";
import "./App.css";

const STORAGE_KEYS = {
  tasks: "todo-manager.tasks.v1",
  categories: "todo-manager.categories.v1",
};

const defaultCategories = [
  { id: "cat-1", name: "Personal", color: "#ef6c3a" },
  { id: "cat-2", name: "Work", color: "#1f9d8a" },
  { id: "cat-3", name: "Study", color: "#2a6fdb" },
];

const defaultTasks = [
  { id: "task-1", text: "Plan next week goals", categoryId: "cat-1", completed: false },
  { id: "task-2", text: "Finish sprint backlog", categoryId: "cat-2", completed: true },
];

const makeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const parseStored = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const getInitialCategories = () => {
  const stored = parseStored(STORAGE_KEYS.categories, defaultCategories);
  return Array.isArray(stored) && stored.length > 0 ? stored : defaultCategories;
};

const getInitialTasks = () => {
  const stored = parseStored(STORAGE_KEYS.tasks, defaultTasks);
  return Array.isArray(stored) ? stored : defaultTasks;
};

export default function App() {
  const [categories, setCategories] = useState(getInitialCategories);
  const [tasks, setTasks] = useState(getInitialTasks);
  const [newTaskText, setNewTaskText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => getInitialCategories()[0].id);
  const [filterCategoryId, setFilterCategoryId] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  const [isCategoryEditorOpen, setIsCategoryEditorOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#ef6c3a");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
  }, [categories]);

  const categoryMap = useMemo(
    () => categories.reduce((acc, category) => ({ ...acc, [category.id]: category }), {}),
    [categories]
  );

  const filteredTasks = useMemo(() => {
    if (filterCategoryId === "all") return tasks;
    return tasks.filter((task) => task.categoryId === filterCategoryId);
  }, [tasks, filterCategoryId]);

  const completionRate = tasks.length
    ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100)
    : 0;

  const handleAddTask = (event) => {
    event.preventDefault();
    const text = newTaskText.trim();
    if (!text || !selectedCategoryId) return;
    setTasks((prev) => [
      ...prev,
      { id: makeId(), text, categoryId: selectedCategoryId, completed: false },
    ]);
    setNewTaskText("");
  };

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };

  const handleSaveEdit = (taskId) => {
    const nextText = editingTaskText.trim();
    if (!nextText) return;
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, text: nextText } : task))
    );
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    if (editingTaskId === taskId) {
      setEditingTaskId(null);
      setEditingTaskText("");
    }
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    const name = newCategoryName.trim();
    if (!name) return;
    const newCategory = {
      id: makeId(),
      name,
      color: newCategoryColor,
    };
    setCategories((prev) => [...prev, newCategory]);
    setSelectedCategoryId(newCategory.id);
    setNewCategoryName("");
    setNewCategoryColor("#ef6c3a");
    setIsCategoryEditorOpen(false);
  };

  const handleDeleteCategory = (categoryId) => {
    if (categories.length <= 1) return;
    const remaining = categories.filter((category) => category.id !== categoryId);
    const fallbackCategoryId = remaining[0]?.id;
    setCategories(remaining);
    setTasks((prev) =>
      prev.map((task) =>
        task.categoryId === categoryId ? { ...task, categoryId: fallbackCategoryId } : task
      )
    );
    if (selectedCategoryId === categoryId) setSelectedCategoryId(fallbackCategoryId);
    if (filterCategoryId === categoryId) setFilterCategoryId("all");
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <p className="header-tag">Productivity Dashboard</p>
          <h1>Multi-Category To-Do Manager</h1>
          <p className="subtitle">Track your priorities with color-coded categories.</p>
        </header>

        <section className="stats-row">
          <article className="stat">
            <p className="stat-num">{tasks.length}</p>
            <p className="stat-label">Total Tasks</p>
          </article>
          <article className="stat">
            <p className="stat-num">{tasks.filter((task) => task.completed).length}</p>
            <p className="stat-label">Completed</p>
          </article>
          <article className="stat">
            <p className="stat-num">{tasks.filter((task) => !task.completed).length}</p>
            <p className="stat-label">Active</p>
          </article>
          <article className="stat">
            <p className="stat-num">{completionRate}%</p>
            <p className="stat-label">Completion Rate</p>
          </article>
        </section>

        <section className="panel">
          <h2 className="panel-title">Add Task</h2>
          <form className="task-form" onSubmit={handleAddTask}>
            <input
              type="text"
              value={newTaskText}
              onChange={(event) => setNewTaskText(event.target.value)}
              placeholder="What needs to be done?"
              aria-label="Task text"
            />
            <select
              value={selectedCategoryId}
              onChange={(event) => setSelectedCategoryId(event.target.value)}
              aria-label="Select category"
            >
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button className="btn-primary" type="submit">
              Add Task
            </button>
          </form>
        </section>

        <section className="panel">
          <div className="category-header">
            <h2 className="panel-title">Manage Categories</h2>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsCategoryEditorOpen((prev) => !prev)}
            >
              + New Category
            </button>
          </div>

          {isCategoryEditorOpen && (
            <form className="category-form" onSubmit={handleAddCategory}>
              <input
                type="text"
                value={newCategoryName}
                onChange={(event) => setNewCategoryName(event.target.value)}
                placeholder="Category name"
                aria-label="Category name"
              />
              <input
                type="color"
                value={newCategoryColor}
                onChange={(event) => setNewCategoryColor(event.target.value)}
                aria-label="Category color"
              />
              <button className="btn-primary" type="submit">
                Create
              </button>
            </form>
          )}

          <div className="category-list">
            {categories.map((category) => (
              <div className="category-pill" key={category.id}>
                <span
                  className="category-dot"
                  style={{ backgroundColor: category.color }}
                  aria-hidden="true"
                />
                <span>{category.name}</span>
                <button
                  className="btn-x"
                  type="button"
                  onClick={() => handleDeleteCategory(category.id)}
                  disabled={categories.length <= 1}
                  aria-label={`Delete ${category.name}`}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="filter-row">
            <h2 className="panel-title">Tasks</h2>
            <select
              value={filterCategoryId}
              onChange={(event) => setFilterCategoryId(event.target.value)}
              aria-label="Filter tasks by category"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 && <p className="empty-state">No tasks for this filter.</p>}
            {filteredTasks.map((task) => {
              const category = categoryMap[task.categoryId];
              return (
                <article className={`task-item ${task.completed ? "done" : ""}`} key={task.id}>
                  <label className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                    />
                    <span className="checkmark" />
                  </label>

                  <div className="task-content">
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editingTaskText}
                        onChange={(event) => setEditingTaskText(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") handleSaveEdit(task.id);
                          if (event.key === "Escape") {
                            setEditingTaskId(null);
                            setEditingTaskText("");
                          }
                        }}
                      />
                    ) : (
                      <p className="task-text">{task.text}</p>
                    )}
                    <p className="task-meta">
                      <span
                        className="category-dot"
                        style={{ backgroundColor: category?.color || "#999999" }}
                        aria-hidden="true"
                      />
                      {category?.name || "Uncategorized"}
                    </p>
                  </div>

                  <div className="action-btns">
                    {editingTaskId === task.id ? (
                      <button className="btn-edit" type="button" onClick={() => handleSaveEdit(task.id)}>
                        Save
                      </button>
                    ) : (
                      <button className="btn-edit" type="button" onClick={() => handleStartEdit(task)}>
                        Edit
                      </button>
                    )}
                    <button className="btn-delete" type="button" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
