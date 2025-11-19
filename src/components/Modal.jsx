import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                animation: 'slideUp 0.3s ease-out'
            }} onClick={e => e.stopPropagation()}>

                <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-text)' }}>{title}</h3>
                    <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ padding: '24px' }}>
                    {children}
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default Modal;
