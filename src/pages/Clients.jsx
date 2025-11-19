import React, { useState } from 'react';
import { useClients } from '../context/ClientContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { Plus, Search, Phone, Mail } from 'lucide-react';

const Clients = () => {
    const { clients, addClient, updateClient, deleteClient } = useClients();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    const handleOpenModal = (client = null) => {
        if (client) {
            setEditingClient(client);
            setFormData(client);
        } else {
            setEditingClient(null);
            setFormData({ name: '', phone: '', email: '', notes: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingClient) {
            updateClient(editingClient.id, formData);
        } else {
            addClient(formData);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            deleteClient(id);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>Clientes</h2>
                <Button size="sm" onClick={() => handleOpenModal()} icon={Plus}>Novo</Button>
            </div>

            <div style={{ position: 'relative', marginBottom: '24px' }}>
                <Input
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Search size={18} style={{ position: 'absolute', right: '12px', top: '42px', color: '#999' }} />
                {/* Note: top value depends on Input label presence, simplified here */}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredClients.map(client => (
                    <Card key={client.id} onClick={() => handleOpenModal(client)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{client.name}</h3>
                                <div style={{ display: 'flex', gap: '12px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Phone size={14} /> {client.phone}
                                    </span>
                                </div>
                                {client.notes && (
                                    <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>
                                        "{client.notes}"
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingClient ? 'Editar Cliente' : 'Novo Cliente'}
            >
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome Completo"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Telefone (WhatsApp)"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required
                        placeholder="11999999999"
                    />
                    <Input
                        label="Email (Opcional)"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                        label="Observações"
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                        <Button type="submit" fullWidth>Salvar</Button>
                        {editingClient && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    handleDelete(editingClient.id);
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

export default Clients;
