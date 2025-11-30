import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Bug, User, WorkflowStatus } from '../types';
import { WORKFLOW_STATUSES } from '../store/mockData';
import api from '../api/client';
import { useAuth } from './AuthContext';

interface BugContextType {
    bugs: Bug[];
    users: User[];
    statuses: WorkflowStatus[];
    addBug: (bug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateBugStatus: (bugId: string, newStatus: string) => Promise<void>;
    updateBug: (bugId: string, updates: Partial<Bug>) => Promise<void>;
    deleteBug: (bugId: string) => Promise<void>;
    fetchBugs: (filters?: { status?: string; priority?: string; search?: string }) => Promise<void>;
}

const BugContext = createContext<BugContextType | undefined>(undefined);

export const BugProvider = ({ children }: { children: ReactNode }) => {
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [statuses] = useState<WorkflowStatus[]>(WORKFLOW_STATUSES);
    const { isAuthenticated } = useAuth();

    const fetchBugs = async (filters?: { status?: string; priority?: string; search?: string }) => {
        try {
            const response = await api.get('/bugs', { params: filters });
            setBugs(response.data);
        } catch (error) {
            console.error('Failed to fetch bugs', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchBugs();
            fetchUsers();
        } else {
            setBugs([]);
            setUsers([]);
        }
    }, [isAuthenticated]);

    const addBug = async (bugData: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await api.post('/bugs', bugData);
            setBugs((prev) => [response.data, ...prev]);
        } catch (error) {
            console.error('Failed to create bug', error);
        }
    };

    const updateBugStatus = async (bugId: string, newStatus: string) => {
        try {
            const response = await api.put(`/bugs/${bugId}`, { status: newStatus });
            setBugs((prev) => prev.map((bug) => (bug.id === bugId ? response.data : bug)));
        } catch (error) {
            console.error('Failed to update bug status', error);
        }
    };

    const updateBug = async (bugId: string, updates: Partial<Bug>) => {
        try {
            const response = await api.put(`/bugs/${bugId}`, updates);
            setBugs((prev) => prev.map((bug) => (bug.id === bugId ? response.data : bug)));
        } catch (error) {
            console.error('Failed to update bug', error);
        }
    };

    const deleteBug = async (bugId: string) => {
        // API endpoint not implemented yet, just local update for now or add endpoint
        // For now, let's assume we add it or just ignore
        console.warn('Delete bug not implemented in API yet', bugId);
    };

    return (
        <BugContext.Provider
            value={{
                bugs,
                users,
                statuses,
                addBug,
                updateBugStatus,
                updateBug,
                deleteBug,
                fetchBugs,
            }}
        >
            {children}
        </BugContext.Provider>
    );
};

export const useBugs = () => {
    const context = useContext(BugContext);
    if (context === undefined) {
        throw new Error('useBugs must be used within a BugProvider');
    }
    return context;
};
