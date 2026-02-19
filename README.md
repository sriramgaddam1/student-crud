# Multi-Category To-Do Manager

A beautiful and functional React-based to-do list application with category management.

## Features
- Create, edit, and delete tasks
- Organize tasks by custom categories
- Color-coded categories
- Mark tasks as complete/incomplete
- Filter tasks by category
- Persistent storage using `localStorage`
- Fully responsive design
- Track completion statistics

## Installation
1. Clone or extract the project files.
2. Navigate to the project directory:
   ```bash
   cd student-crud
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Usage
### Adding Tasks
1. Type your task in the input field.
2. Select a category from the dropdown.
3. Click **Add Task** or press **Enter**.

### Managing Categories
1. Click **+ New Category** to create a new category.
2. Enter a name and choose a color.
3. Delete categories by clicking the **x** button (requires at least one category).

### Task Actions
- **Check/Uncheck:** Click the checkbox to mark tasks as complete or incomplete.
- **Edit:** Click **Edit** to update task text.
- **Delete:** Click **Delete** to remove a task.

### Filtering
Use the category dropdown in the tasks section to view tasks from specific categories or all categories.

## Technologies Used
- React 19
- Vite
- CSS3
- `localStorage` API

## Build for Production
To create a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist` folder.

## Browser Support
Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License
MIT License - feel free to use this project however you'd like.
