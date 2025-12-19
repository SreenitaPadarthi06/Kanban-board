import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

export default function Column({ column, tasks, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      columnId: column.id,
    },
  });

  return (
    <section ref={setNodeRef} className="column">
      <h2>
        {column.title} ({tasks.length})
      </h2>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task
          key={task.id}
          task={task}
          columnId={column.id}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
        ))}
      </SortableContext>
    </section>
  );
}
