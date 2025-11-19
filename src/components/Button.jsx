import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    onClick,
    type = 'button',
    disabled = false,
    icon: Icon
}) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderRadius: 'var(--radius-full)',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, var(--color-primary) 0%, #C5A028 100%)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
        },
        secondary: {
            background: 'var(--color-secondary)',
            color: 'white',
        },
        outline: {
            background: 'transparent',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--color-text)',
        }
    };

    const sizes = {
        sm: { padding: '6px 16px', fontSize: '0.875rem' },
        md: { padding: '10px 24px', fontSize: '1rem' },
        lg: { padding: '14px 32px', fontSize: '1.125rem' },
    };

    const style = {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={style}
            onMouseEnter={(e) => {
                if (!disabled && variant === 'primary') {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.4)';
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled && variant === 'primary') {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)';
                }
            }}
        >
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
};

export default Button;
