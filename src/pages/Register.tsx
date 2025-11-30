import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', { name, email, password });
            login(response.data.token, response.data.user);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md border border-border">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-2 rounded font-medium hover:bg-primary/90 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};
