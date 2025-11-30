import { useState, useEffect } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useBugs } from '../context/BugContext';
import { KanbanColumn } from '../components/board/KanbanColumn';
import { Search, Filter } from 'lucide-react';

export const BugBoard = () => {
    const { bugs, statuses, updateBugStatus, fetchBugs, users } = useBugs();
    const [search, setSearch] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchBugs({ search, priority: priorityFilter });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, priorityFilter, fetchBugs]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStatus = destination.droppableId;
        updateBugStatus(draggableId, newStatus);
    };

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h1 className="text-2xl font-bold">Board</h1>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search issues..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex-1 overflow-auto pb-4">
                    <div className="flex gap-6 h-full min-w-max">
                        {statuses.map((status) => {
                            const columnBugs = bugs.filter((bug) => bug.status === status.id);
                            return (
                                <KanbanColumn
                                    key={status.id}
                                    status={status}
                                    bugs={columnBugs}
                                    users={users}
                                />
                            );
                        })}
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};
