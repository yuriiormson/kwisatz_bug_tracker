import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBugs } from '../context/BugContext';
import { clsx } from 'clsx';
import { Search, Filter } from 'lucide-react';

export const BugList = () => {
    const navigate = useNavigate();
    const { bugs, fetchBugs } = useBugs();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchBugs({ search, status: statusFilter, priority: priorityFilter });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, statusFilter, priorityFilter, fetchBugs]);

    return (
        <div className="space-y-6 p-6 overflow-y-auto h-full">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">Issues</h1>
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
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">All Statuses</option>
                            <option value="backlog">Backlog</option>
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </select>
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

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border">
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Assignee</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugs.map((bug) => (
                            <tr
                                key={bug.id}
                                onClick={() => navigate(`/bug/${bug.id}`)}
                                className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                            >
                                <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{bug.id.slice(0, 8)}</td>
                                <td className="py-3 px-4 text-sm font-medium">{bug.title}</td>
                                <td className="py-3 px-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                                        {bug.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={clsx('text-xs font-medium capitalize',
                                        bug.priority === 'critical' ? 'text-red-500' :
                                            bug.priority === 'high' ? 'text-orange-500' :
                                                'text-green-500'
                                    )}>
                                        {bug.priority}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                    {bug.assigneeId ? 'Assigned' : 'Unassigned'}
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                    {new Date(bug.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {bugs.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                    No issues found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
