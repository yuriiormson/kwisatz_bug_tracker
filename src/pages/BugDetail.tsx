import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User as UserIcon, AlertTriangle, Flag } from 'lucide-react';
import { useBugs } from '../context/BugContext';
import { clsx } from 'clsx';

export const BugDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { bugs, users, statuses } = useBugs();

    const bug = bugs.find((b) => b.id === id);
    const assignee = users.find((u) => u.id === bug?.assigneeId);
    const reporter = users.find((u) => u.id === bug?.reporterId);
    const status = statuses.find((s) => s.id === bug?.status);

    if (!bug) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <p>Issue not found</p>
                <button onClick={() => navigate('/board')} className="text-primary hover:underline mt-2">
                    Back to Board
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 overflow-y-auto h-full">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </button>

                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm font-mono text-muted-foreground">{bug.id}</span>
                                <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground')}>
                                    {status?.label}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold leading-tight">{bug.title}</h1>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">{bug.description}</p>
                        </div>

                        <div className="border-t border-border pt-6">
                            <h3 className="text-lg font-semibold mb-4">Activity</h3>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                    <UserIcon className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <div className="bg-muted/50 rounded-lg p-3">
                                        <p className="text-sm">
                                            <span className="font-medium">{reporter?.name}</span> created this issue
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(bug.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Details</h3>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Assignee</p>
                                <div className="flex items-center gap-2">
                                    {assignee ? (
                                        <>
                                            <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full" />
                                            <span className="text-sm font-medium">{assignee.name}</span>
                                        </>
                                    ) : (
                                        <span className="text-sm text-muted-foreground italic">Unassigned</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Priority</p>
                                <div className="flex items-center gap-2">
                                    <Flag className={clsx('w-4 h-4',
                                        bug.priority === 'critical' ? 'text-red-500' :
                                            bug.priority === 'high' ? 'text-orange-500' :
                                                'text-green-500'
                                    )} />
                                    <span className="text-sm font-medium capitalize">{bug.priority}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Severity</p>
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium capitalize">{bug.severity}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Created</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{new Date(bug.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
