import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { useClients } from '../context/ClientContext';
import { useServices } from '../context/ServiceContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { Plus, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const Appointments = () => {
    const { appointments, addAppointment, updateStatus } = useAppointments();
    const { clients } = useClients();
    const { services } = useServices();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        clientId: '',
        serviceId: '',
        date: '',
        time: ''
    });

    // Sort appointments by date/time
    const sortedAppointments = [...appointments].sort((a, b) => {
        return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const client = clients.find(c => c.id === formData.clientId);
        const service = services.find(s => s.id === formData.serviceId);

        addAppointment({
            ...formData,
            clientName: client?.name,
            serviceName: service?.name,
            price: service?.price,
            duration: service?.duration
        });
        setIsModalOpen(false);
        setFormData({ clientId: '', serviceId: '', date: '', time: '' });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'var(--color-success)';
            case 'cancelled': return 'var(--color-danger)';
            case 'completed': return 'var(--color-text-muted)';
            default: return '#F59E0B'; // pending (Orange)
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>Agenda</h2>
                <Button size="sm" onClick={() => setIsModalOpen(true)} icon={Plus}>Novo</Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {sortedAppointments.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>Nenhum agendamento encontrado.</p>
                ) : (
                    sortedAppointments.map(apt => (
                        <Card key={apt.id} style={{ borderLeft: `4px solid ${getStatusColor(apt.status)}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{apt.time}</span>
                                        <span style={{ fontSize: '0.9rem', color: '#666' }}>{new Date(apt.date).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{apt.clientName}</h3>
                                    <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                        {apt.serviceName} • {apt.duration} min
                                    </p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        backgroundColor: `${getStatusColor(apt.status)}20`,
                                        color: getStatusColor(apt.status),
                                        fontWeight: '600',
                                        textTransform: 'uppercase'
                                    }}>
                                        {apt.status === 'pending' ? 'Pendente' :
                                            apt.status === 'confirmed' ? 'Confirmado' :
                                                apt.status === 'cancelled' ? 'Cancelado' : 'Concluído'}
                                    </span>

                                    {apt.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => updateStatus(apt.id, 'confirmed')} style={{ color: 'var(--color-success)' }}>
                                                <CheckCircle size={20} />
                                            </button>
                                            <button onClick={() => updateStatus(apt.id, 'cancelled')} style={{ color: 'var(--color-danger)' }}>
                                                <XCircle size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Agendamento">
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '500', color: '#666' }}>Cliente</label>
                        <select
                            value={formData.clientId}
                            onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E0E0E0', backgroundColor: 'white' }}
                        >
                            <option value="">Selecione um cliente</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '500', color: '#666' }}>Serviço</label>
                        <select
                            value={formData.serviceId}
                            onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E0E0E0', backgroundColor: 'white' }}
                        >
                            <option value="">Selecione um serviço</option>
                            {services.map(s => <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>)}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Input
                            label="Data"
                            type="date"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                        <Input
                            label="Hora"
                            type="time"
                            value={formData.time}
                            onChange={e => setFormData({ ...formData, time: e.target.value })}
                            required
                        />
                    </div>

                    <Button type="submit" fullWidth style={{ marginTop: '24px' }}>Agendar</Button>
                </form>
            </Modal>
        </div>
    );
};

export default Appointments;
