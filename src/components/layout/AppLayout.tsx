import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans antialiased">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
