import { useState } from 'react';
import { Bell, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CreateBugModal } from '../modals/CreateBugModal';

export const Header = () => {
    const { user: currentUser, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4 flex-1 max-w-xl">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search issues, projects, or people..."
                            className="w-full bg-muted/50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Issue</span>
                    </button>

                    <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
                    </button>

                    <div className="h-8 w-px bg-border mx-2"></div>

                    <div className="flex items-center gap-3">
                        {currentUser && (
                            <>
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{currentUser.role}</p>
                                </div>
                                <div className="relative group">
                                    <img
                                        src={currentUser.avatar}
                                        alt={currentUser.name}
                                        className="w-9 h-9 rounded-full ring-2 ring-border cursor-pointer"
                                    />
                                    <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block">
                                        <div className="bg-card border border-border rounded-lg shadow-lg py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-muted transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <CreateBugModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
