import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Sparkles } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', icon: Home, label: 'Início' },
        { path: '/appointments', icon: Calendar, label: 'Agenda' },
        { path: '/clients', icon: Users, label: 'Clientes' },
        { path: '/services', icon: Sparkles, label: 'Serviços' },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--color-background)',
            paddingBottom: '80px' // Space for bottom nav
        }}>
            {/* Header - Optional, maybe per page */}
            {/* <header style={{ padding: '1rem', background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-primary)' }}>Bia Studio</h1>
      </header> */}

            <main style={{ flex: 1, padding: '16px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <Outlet />
            </main>

            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(0,0,0,0.05)',
                padding: '12px 16px 24px 16px', // Extra padding bottom for iOS home indicator
                display: 'flex',
                justifyContent: 'space-around',
                zIndex: 100,
                boxShadow: '0 -4px 20px rgba(0,0,0,0.03)'
            }}>
                {navItems.map(({ path, icon: Icon, label }) => (
                    <Link
                        key={path}
                        to={path}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            color: isActive(path) ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            fontSize: '0.75rem',
                            fontWeight: isActive(path) ? '600' : '400',
                            transition: 'color 0.2s'
                        }}
                    >
                        <Icon size={24} strokeWidth={isActive(path) ? 2.5 : 2} />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Layout;
