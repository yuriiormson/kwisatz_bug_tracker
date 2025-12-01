export const formatRole = (role: string): string => {
    switch (role) {
        case 'qa':
            return 'QA';
        case 'qa_lead':
            return 'QA Lead';
        case 'qa_senior_reviewer':
            return 'QA Sr. Reviewer';
        case 'superadmin':
            return 'Superadmin';
        case 'admin':
            return 'Admin';
        case 'developer':
            return 'Developer';
        case 'viewer':
            return 'Viewer';
        default:
            // Fallback: replace underscores with spaces and capitalize first letter of each word
            return role
                .replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
    }
};
