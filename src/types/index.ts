export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Severity = 'cosmetic' | 'minor' | 'major' | 'critical';
export type Role = 'admin' | 'developer' | 'qa' | 'viewer';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: Role;
}

export interface WorkflowStatus {
    id: string;
    label: string;
    color: string; // Tailwind color class or hex
    order: number;
}

export interface Bug {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: Priority;
    severity: Severity;
    assigneeId?: string | null;
    reporterId: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}
