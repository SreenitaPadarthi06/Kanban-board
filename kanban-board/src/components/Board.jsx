import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import Column from "./Column";
import TaskModal from "./TaskModal";
import Filters from "./Filters";
import { initialData } from "../data/initialData";
import { loadData, saveData } from "../utils/storage";
import { generateId } from "../utils/id";

export default function Board() {
  const [data, setData] = useState(loadData() || initialData);
  const [modalState, setModalState] = useState(null); // { mode, task }
  const [announcement, setAnnouncement] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    assignee: "",
    priority: "",
  });

  useEffect(() => saveData(data), [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ✅ DRAG END
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const fromCol = active.data.current.columnId;
    const toCol = over.data.current.columnId;
    if (fromCol === toCol) return;

    setData((prev) => {
      const source = [...prev.columns[fromCol].taskIds];
      const dest = [...prev.columns[toCol].taskIds];

      source.splice(source.indexOf(active.id), 1);
      dest.push(active.id);

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [fromCol]: { ...prev.columns[fromCol], taskIds: source },
          [toCol]: { ...prev.columns[toCol], taskIds: dest },
        },
      };
    });

    setAnnouncement(`Task moved to ${toCol}`);
  };

  // ✅ ADD / EDIT SAVE
 const handleSaveTask = (task) => {
  setData((prev) => {
    const tasks = {
      ...prev.tasks,
      [task.id]: task, // overwrite if edit, add if new
    };

    let columns = prev.columns;

    // ✅ ONLY add to TODO when creating a NEW task
    if (modalState.mode === "add") {
      columns = {
        ...prev.columns,
        todo: {
          ...prev.columns.todo,
          taskIds: [...prev.columns.todo.taskIds, task.id],
        },
      };
    }

    return { ...prev, tasks, columns };
  });

  setModalState(null);
};


  // ✅ DELETE
  const handleDeleteTask = (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setData((prev) => {
      const tasks = { ...prev.tasks };
      delete tasks[taskId];

      const columns = {};
      for (const col in prev.columns) {
        columns[col] = {
          ...prev.columns[col],
          taskIds: prev.columns[col].taskIds.filter(
            (id) => id !== taskId
          ),
        };
      }

      return { ...prev, tasks, columns };
    });
  };

  // ✅ FILTER
  const getVisibleTasks = (ids) =>
    ids
      .map((id) => data.tasks[id])
      .filter(
        (t) =>
          (!filters.search ||
            t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            t.description.toLowerCase().includes(filters.search.toLowerCase())) &&
          (!filters.assignee || t.assignee === filters.assignee) &&
          (!filters.priority || t.priority === filters.priority)
      );

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <Filters onChange={setFilters} />

      <button
        className="add-btn"
        onClick={() =>
          setModalState({
            mode: "add",
            task: {
              id: generateId(),
              title: "",
              description: "",
              assignee: "",
              priority: "Low",
              dueDate: "",
            },
          })
        }
      >
        + Add Task
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="board">
      {data.columnOrder.map((colId) => (
    <Column
      key={colId}
      column={data.columns[colId]}
      tasks={getVisibleTasks(data.columns[colId].taskIds)}
      onEdit={(task) =>
        setModalState({
          mode: "edit",
          task: { ...task }, // IMPORTANT clone
        })
      }
          onDelete={handleDeleteTask}
        />
      ))}
      </div>

      </DndContext>

      {modalState && (
        <TaskModal
          mode={modalState.mode}
          task={modalState.task}
          onSave={handleSaveTask}
          onClose={() => setModalState(null)}
        />
      )}
    </>
  );
}
