import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ task, columnId, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`task ${task.priority.toLowerCase()}`}
      {...attributes}
    >
      {/* DRAG HANDLE ONLY */}
      <div className="task-drag-handle" {...listeners}>
        ⠿
      </div>

      <strong>{task.title}</strong>
      <p>{task.description}</p>

      
        <div className="task-meta">
  <div className="task-priority">{task.priority}</div><br></br>
  <div className="task-assignee">{task.assignee}</div>
      </div>
     

      {/* ACTION BUTTONS – NO DRAG */}
      <div className="task-actions">
        <button
          type="button"
          onClick={() => onEdit(task)}
        >
          ✏️
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
        >
          🗑️
        </button>
      </div>
    </article>
  );
}
