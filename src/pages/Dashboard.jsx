import React from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { useClients } from '../context/ClientContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Calendar, Users, Plus, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { appointments } = useAppointments();
    const { clients } = useClients();

    const today = new Date().toISOString().split('T')[0];
    const todaysAppointments = appointments.filter(apt => apt.date === today);
    const pendingAppointments = appointments.filter(apt => apt.status === 'pending');

    return (
        <div>
            <header style={{ marginBottom: '24px' }}>
                <h1 style={{ margin: '0 0 4px 0', color: 'var(--color-primary)', fontSize: '1.5rem' }}>Olá, Bianca</h1>
                <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Aqui está o resumo do seu dia.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <Card padding="16px" className="stat-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-primary)' }}>
                        <Calendar size={20} />
                        <span style={{ fontWeight: '600' }}>Hoje</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{todaysAppointments.length}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Agendamentos</div>
                </Card>

                <Card padding="16px" className="stat-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-primary)' }}>
                        <Users size={20} />
                        <span style={{ fontWeight: '600' }}>Total</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{clients.length}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Clientes</div>
                </Card>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0 }}>Próximos Agendamentos</h3>
                    <Link to="/appointments" style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>Ver todos</Link>
                </div>

                {todaysAppointments.length > 0 ? (
                    todaysAppointments.slice(0, 3).map(apt => (
                        <Card key={apt.id} style={{ marginBottom: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{apt.time}</div>
                                    <div style={{ fontSize: '0.9rem' }}>{apt.clientName}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{apt.serviceName}</div>
                                </div>
                                <div style={{
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    backgroundColor: '#FFF8E1',
                                    color: '#F59E0B',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}>
                                    {apt.status === 'pending' ? 'Pendente' : 'Confirmado'}
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>Nenhum agendamento para hoje.</p>
                )}
            </div>

            <div style={{ textAlign: 'center' }}>
                <Link to="/appointments">
                    <Button icon={Plus} fullWidth>Novo Agendamento</Button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
