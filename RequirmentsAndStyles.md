# Daily Task Manager — Project Requirements

## 1. Overview

Students will build a **Daily Task Manager** web app based on the provided design mockups: a progress summary, an add-task input, Active/Completed tabs, and a task list with delete + complete actions.

Front-end only — no backend needed. Task data can live in JS state, optionally persisted with `localStorage`.

---

## 2. Technology Requirements

Students may use any stack: **vanilla HTML/CSS/JS**, or any framework/library (React, Vue, Svelte, etc.) with any CSS approach and build tooling. Must run in a modern browser, use only free libraries, and be submitted with instructions to run it.

---

## 3. Functional Requirements

| Feature       | Description                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Progress card | Shows title, completed/total count, a status message, live percentage, and a progress bar. Dashed border.                        |
| Add task      | Input + "+" button (or Enter) adds a task to Active list, clears input, updates counts. Ignores empty text.                      |
| Tabs          | "Active (N)" / "Completed (N)" toggle the visible list. Active tab is highlighted. Heading changes with tab.                     |
| Task item     | Colored side bar, task name (strikethrough if done), date, checkmark to toggle complete, trash icon to delete.                   |
| Delete        | Trash icon removes the task and updates counts/progress. Confirmation step optional.                                             |
| State sync    | Counts, percentage, and progress bar always reflect actual task data — never hardcoded.                                          |
| Empty state   | When a list (Active or Completed) has no tasks, show a checkmark icon, "No tasks left!", and "Create a new task to get started". |

---

## 4. Style

**Primary colors**

- `#1F1D2B` - <span style="display:inline-block;width:12px;height:12px;background:#1F1D2B;border:1px solid #ccc;"></span>
- `#EA7C69` - <span style="display:inline-block;width:12px;height:12px;background:#EA7C69;border:1px solid #ccc;"></span>
- `#FFFFFF` - <span style="display:inline-block;width:12px;height:12px;background:#FFFFFF;border:1px solid #ccc;"></span>
- `#161421` - <span style="display:inline-block;width:12px;height:12px;background:#161421;border:1px solid #ccc;"></span>

**Accent colors**

- `#50D1AA` - <span style="display:inline-block;width:12px;height:12px;background:#50D1AA;border:1px solid #ccc;"></span>
- `#FF7CA3` - <span style="display:inline-block;width:12px;height:12px;background:#FF7CA3;border:1px solid #ccc;"></span>
- `#FFB572` - <span style="display:inline-block;width:12px;height:12px;background:#FFB572;border:1px solid #ccc;"></span>
- `#9290FE` - <span style="display:inline-block;width:12px;height:12px;background:#65B0F6;border:1px solid #ccc;"></span>
- `#65B0F6` - <span style="display:inline-block;width:12px;height:12px;background:#9290FE;border:1px solid #ccc;"></span>
