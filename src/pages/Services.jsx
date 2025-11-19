import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Services = () => {
    const { services, addService, updateService, deleteService } = useServices();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', price: '', duration: '', description: '' });

    const handleOpenModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData(service);
        } else {
            setEditingService(null);
            setFormData({ name: '', price: '', duration: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingService) {
            updateService(editingService.id, formData);
        } else {
            addService(formData);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            deleteService(id);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>Serviços</h2>
                <Button size="sm" onClick={() => handleOpenModal()} icon={Plus}>Novo</Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {services.map(service => (
                    <Card key={service.id} onClick={() => handleOpenModal(service)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{service.name}</h3>
                                <p style={{ margin: '0 0 8px 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                    {service.duration} min • R$ {service.price}
                                </p>
                                {service.description && (
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>{service.description}</p>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {/* Icons could go here, but card click opens edit */}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingService ? 'Editar Serviço' : 'Novo Serviço'}
            >
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome do Serviço"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Input
                            label="Preço (R$)"
                            type="number"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                        <Input
                            label="Duração (min)"
                            type="number"
                            value={formData.duration}
                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            required
                        />
                    </div>
                    <Input
                        label="Descrição (Opcional)"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                        <Button type="submit" fullWidth>Salvar</Button>
                        {editingService && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    handleDelete(editingService.id);
                                    setIsModalOpen(false);
                                }}
                                style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
                            >
                                Excluir
                            </Button>
                        )}
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Services;
