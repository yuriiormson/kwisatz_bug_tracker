import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: string;
}

export const StatCard = ({ label, value, icon: Icon, trend, trendUp, color = 'bg-primary' }: StatCardProps) => {
    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                </div>
                <div className={clsx('p-3 rounded-lg opacity-80', color)}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={clsx('font-medium', trendUp ? 'text-green-500' : 'text-red-500')}>
                        {trend}
                    </span>
                    <span className="text-muted-foreground ml-2">from last month</span>
                </div>
            )}
        </div>
    );
};
