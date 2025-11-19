import React from 'react';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    name
}) => {
    return (
        <div style={{ marginBottom: '16px', width: '100%' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: 'var(--color-text-muted)'
                }}>
                    {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${error ? 'var(--color-danger)' : '#E0E0E0'}`,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: 'var(--color-surface)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = error ? 'var(--color-danger)' : '#E0E0E0'}
            />
            {error && (
                <span style={{
                    display: 'block',
                    marginTop: '4px',
                    fontSize: '0.8rem',
                    color: 'var(--color-danger)'
                }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
