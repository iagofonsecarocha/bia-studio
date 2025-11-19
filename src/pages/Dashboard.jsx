import React, { useMemo } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { useClients } from '../context/ClientContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatsCard from '../components/StatsCard';
import { Plus, Calendar, Users, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
    const { appointments, loading: loadingApts } = useAppointments();
    const { clients, loading: loadingClients } = useClients();

    // Financial & Analytics Logic
    const stats = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // 1. Monthly Revenue (Completed appointments this month)
        const monthlyRevenue = appointments
            .filter(apt => {
                const aptDate = new Date(apt.date + 'T00:00:00');
                return (
                    apt.status === 'completed' &&
                    aptDate.getMonth() === currentMonth &&
                    aptDate.getFullYear() === currentYear
                );
            })
            .reduce((sum, apt) => sum + (Number(apt.price) || 0), 0);

        // 2. Pending Revenue (Confirmed appointments)
        const pendingRevenue = appointments
            .filter(apt => apt.status === 'confirmed')
            .reduce((sum, apt) => sum + (Number(apt.price) || 0), 0);

        // 3. New Clients (Created this month)
        const newClients = clients.filter(client => {
            const createdDate = new Date(client.created_at);
            return (
                createdDate.getMonth() === currentMonth &&
                createdDate.getFullYear() === currentYear
            );
        }).length;

        // 4. Weekly Revenue Chart Data
        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const weeklyData = daysOfWeek.map(day => ({ name: day, total: 0 }));

        appointments.forEach(apt => {
            if (apt.status === 'completed') {
                const aptDate = new Date(apt.date + 'T00:00:00');
                if (aptDate.getMonth() === currentMonth && aptDate.getFullYear() === currentYear) {
                    const dayIndex = aptDate.getDay();
                    weeklyData[dayIndex].total += (Number(apt.price) || 0);
                }
            }
        });

        return { monthlyRevenue, pendingRevenue, newClients, weeklyData };
    }, [appointments, clients]);

    // Existing Dashboard Logic
    const today = new Date().toISOString().split('T')[0];

    const todaysAppointments = appointments.filter(apt => apt.date === today);

    const sortedAppointments = [...todaysAppointments].sort((a, b) => {
        return a.time.localeCompare(b.time);
    });

    if (loadingApts || loadingClients) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando dashboard...</div>;
    }

    return (
        <div style={{ paddingBottom: '80px' }}>
            <header style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginBottom: '4px' }}>
                    Visão Geral
                </h1>
                <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                    Bem-vinda ao seu painel de controle
                </p>
            </header>

            {/* Financial Section */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <StatsCard
                    label="Faturamento"
                    value={`R$ ${stats.monthlyRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    color="var(--color-primary)"
                />
                <StatsCard
                    label="A Receber"
                    value={`R$ ${stats.pendingRevenue.toFixed(2)}`}
                    icon={Clock}
                    color="#F59E0B" // Amber
                />
                <div style={{ gridColumn: '1 / -1' }}>
                    <StatsCard
                        label="Novos Clientes (Mês)"
                        value={stats.newClients}
                        icon={Users}
                        color="#10B981" // Emerald
                    />
                </div>
            </section>

            {/* Chart Section */}
            <section style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Performance Semanal</h2>
                <Card padding="16px">
                    <div style={{ height: '200px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#888' }}
                                    dy={10}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f9f9f9' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="total" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </section>

            {/* Today's Appointments Section */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Hoje ({sortedAppointments.length})</h2>
                    <Link to="/appointments">
                        <Button size="sm" variant="ghost">Ver todos</Button>
                    </Link>
                </div>

                {sortedAppointments.length === 0 ? (
                    <Card padding="32px">
                        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                            <Calendar size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <p>Nenhum agendamento para hoje.</p>
                            <Link to="/appointments">
                                <Button variant="outline" style={{ marginTop: '12px' }}>
                                    <Plus size={16} style={{ marginRight: '8px' }} />
                                    Novo Agendamento
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {sortedAppointments.map(apt => (
                            <Card key={apt.id} padding="16px">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{apt.clientName || 'Cliente'}</h3>
                                        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                            {apt.serviceName || 'Serviço'}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            display: 'block',
                                            fontWeight: '600',
                                            color: 'var(--color-primary)',
                                            fontSize: '1.1rem'
                                        }}>
                                            {apt.time.slice(0, 5)}
                                        </span>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            background: apt.status === 'confirmed' ? '#E0F2FE' : '#F3F4F6',
                                            color: apt.status === 'confirmed' ? '#0284C7' : '#6B7280',
                                            marginTop: '4px',
                                            display: 'inline-block'
                                        }}>
                                            {apt.status === 'confirmed' ? 'Confirmado' : apt.status}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
