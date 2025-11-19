import React from 'react';

const Card = ({ children, padding = '16px', className = '', onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: padding,
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid rgba(0,0,0,0.03)',
                marginBottom: '16px',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            className={className}
        >
            {children}
        </div>
    );
};

export default Card;
