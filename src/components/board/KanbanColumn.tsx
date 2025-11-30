import { Droppable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import type { Bug, User, WorkflowStatus } from '../../types';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
    status: WorkflowStatus;
    bugs: Bug[];
    users: User[];
}

export const KanbanColumn = ({ status, bugs, users }: KanbanColumnProps) => {
    return (
        <div className="flex flex-col h-full min-w-[280px] w-[280px]">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <div className={clsx('w-3 h-3 rounded-full', status.color)} />
                    <h3 className="font-semibold text-sm">{status.label}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {bugs.length}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                        <Plus className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <Droppable droppableId={status.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={clsx(
                            'flex-1 bg-muted/30 rounded-xl p-2 transition-colors min-h-0',
                            snapshot.isDraggingOver && 'bg-muted/60'
                        )}
                    >
                        {bugs.map((bug, index) => (
                            <KanbanCard
                                key={bug.id}
                                bug={bug}
                                index={index}
                                user={users.find((u) => u.id === bug.assigneeId)}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
