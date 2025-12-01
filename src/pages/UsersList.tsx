import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import api from '../api/client';
import { formatRole } from '../utils/formatters';

import type { User } from '../types';

export const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">Manage system users and their access.</p>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Full Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Project</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Registered</th>
                            <th className="px-6 py-4">Last Login</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{user.username}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=random`}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full ring-2 ring-border"
                                        />
                                        <span>{user.firstName} {user.lastName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                <td className="px-6 py-4">{user.projectName || '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap
                                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                            user.role === 'developer' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                                user.role === 'qa' || user.role === 'qa_lead' || user.role === 'qa_senior_reviewer' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                    user.role === 'superadmin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
                                        {formatRole(user.role)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        No users found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};
