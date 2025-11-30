import { LayoutDashboard, KanbanSquare, List, Settings, Bug as BugIcon, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
        { icon: KanbanSquare, label: 'Board', to: '/board' },
        { icon: List, label: 'Issues', to: '/list' },
        { icon: Users, label: 'Users', to: '/users' },
    ];

    return (
        <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3 border-b border-border">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <BugIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-bold text-xl tracking-tight">Kwisatz</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
};
