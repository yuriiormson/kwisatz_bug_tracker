import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout, Shield, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Navbar */}
            <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                            <Layout className="w-5 h-5" />
                        </div>
                        Kwisatz
                    </div>
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="py-20 md:py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />
                    <div className="container mx-auto px-4 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                        >
                            Manage Bugs with <span className="text-primary">Precision</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                        >
                            Streamline your development workflow with our intuitive, powerful, and beautiful bug tracking solution.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center gap-4"
                        >
                            {isAuthenticated ? (
                                <Link
                                    to="/dashboard"
                                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                                >
                                    Get Started
                                </Link>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Layout className="w-6 h-6 text-blue-500" />}
                                title="Kanban Board"
                                description="Visualize your workflow with our intuitive drag-and-drop Kanban board."
                            />
                            <FeatureCard
                                icon={<Shield className="w-6 h-6 text-green-500" />}
                                title="Secure & Reliable"
                                description="Built with modern security standards to keep your data safe and accessible."
                            />
                            <FeatureCard
                                icon={<Users className="w-6 h-6 text-purple-500" />}
                                title="Team Collaboration"
                                description="Work together seamlessly with real-time updates and comments."
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8 bg-background">
                <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
                    © {new Date().getFullYear()} Kwisatz Bug Tracker. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all"
    >
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </motion.div>
);
