import { Draggable } from '@hello-pangea/dnd';
import { Clock, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import type { Bug, User } from '../../types';

interface KanbanCardProps {
    bug: Bug;
    index: number;
    user?: User;
}

export const KanbanCard = ({ bug, index, user }: KanbanCardProps) => {
    const priorityColors = {
        low: 'bg-green-100 text-green-700',
        medium: 'bg-yellow-100 text-yellow-700',
        high: 'bg-orange-100 text-orange-700',
        critical: 'bg-red-100 text-red-700',
    };

    return (
        <Draggable draggableId={bug.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={clsx(
                        'bg-card p-4 rounded-lg border border-border shadow-sm mb-3 group hover:border-primary/50 transition-colors',
                        snapshot.isDragging && 'shadow-lg ring-2 ring-primary rotate-2'
                    )}
                    style={provided.draggableProps.style}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span
                            className={clsx(
                                'text-xs font-medium px-2 py-0.5 rounded-full capitalize',
                                priorityColors[bug.priority]
                            )}
                        >
                            {bug.priority}
                        </span>
                        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>

                    <h4 className="font-medium text-sm mb-2 line-clamp-2">{bug.title}</h4>

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{new Date(bug.updatedAt).toLocaleDateString()}</span>
                        </div>
                        {user && (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-6 h-6 rounded-full ring-1 ring-border"
                                title={user.name}
                            />
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};
