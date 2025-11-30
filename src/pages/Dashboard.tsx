import { AlertCircle, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { useBugs } from '../context/BugContext';
import { StatCard } from '../components/dashboard/StatCard';

export const Dashboard = () => {
    const { bugs } = useBugs();

    const totalBugs = bugs.length;
    const openBugs = bugs.filter((b) => b.status === 'todo' || b.status === 'in_progress').length;
    const criticalBugs = bugs.filter((b) => b.priority === 'critical').length;
    const completedBugs = bugs.filter((b) => b.status === 'done').length;

    return (
        <div className="space-y-6 p-6 overflow-y-auto h-full">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Overview of your project's health and activity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Issues"
                    value={totalBugs}
                    icon={AlertCircle}
                    color="bg-blue-500"
                />
                <StatCard
                    label="Open Issues"
                    value={openBugs}
                    icon={PlayCircle}
                    color="bg-amber-500"
                />
                <StatCard
                    label="Critical Issues"
                    value={criticalBugs}
                    icon={AlertCircle}
                    color="bg-red-500"
                />
                <StatCard
                    label="Completed"
                    value={completedBugs}
                    icon={CheckCircle2}
                    color="bg-green-500"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {bugs.slice(0, 5).map((bug) => (
                            <div key={bug.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className="bg-muted p-2 rounded-full">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{bug.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {bug.id} • Updated {new Date(bug.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                                    {bug.status.replace('_', ' ')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4">Priority Breakdown</h3>
                    <div className="space-y-4">
                        {['critical', 'high', 'medium', 'low'].map((priority) => {
                            const count = bugs.filter((b) => b.priority === priority).length;
                            const percentage = Math.round((count / totalBugs) * 100) || 0;

                            return (
                                <div key={priority} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="capitalize font-medium">{priority}</span>
                                        <span className="text-muted-foreground">{count} ({percentage}%)</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${priority === 'critical' ? 'bg-red-500' :
                                                priority === 'high' ? 'bg-orange-500' :
                                                    priority === 'medium' ? 'bg-yellow-500' :
                                                        'bg-green-500'
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
