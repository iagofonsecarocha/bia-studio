import React from 'react';
import Card from './Card';

const StatsCard = ({ label, value, icon: Icon, trend, color = 'var(--color-primary)' }) => {
    return (
        <Card padding="20px">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
                    {label}
                </span>
                {Icon && <Icon size={20} color={color} />}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-text)' }}>
                    {value}
                </h3>
                {trend && (
                    <span style={{
                        fontSize: '0.8rem',
                        color: trend > 0 ? 'var(--color-success)' : 'var(--color-danger)',
                        fontWeight: '500'
                    }}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>
        </Card>
    );
};

export default StatsCard;
