import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SortablePhraseProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SortablePhrase({ id, children, className }: SortablePhraseProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'p-4 border-2 hover-lift',
        isDragging && 'opacity-50 shadow-lg z-50',
        className
      )}
      {...attributes}
    >
      <div className="flex items-start gap-3">
        <button
          {...listeners}
          className="flex-shrink-0 p-1 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1">{children}</div>
      </div>
    </Card>
  );
}
