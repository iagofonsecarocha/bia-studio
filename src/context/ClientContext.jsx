import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ClientContext = createContext();

export const useClients = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error('useClients must be used within a ClientProvider');
    }
    return context;
};

export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('name');

        if (error) console.error('Error fetching clients:', error);
        else setClients(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const addClient = async (client) => {
        const { data, error } = await supabase
            .from('clients')
            .insert([client])
            .select();

        if (error) {
            console.error('Error adding client:', error);
            alert('Erro ao adicionar cliente');
        } else {
            setClients([...clients, data[0]]);
        }
    };

    const updateClient = async (id, updatedClient) => {
        const { error } = await supabase
            .from('clients')
            .update(updatedClient)
            .eq('id', id);

        if (error) {
            console.error('Error updating client:', error);
            alert('Erro ao atualizar cliente');
        } else {
            setClients(clients.map(c => c.id === id ? { ...c, ...updatedClient } : c));
        }
    };

    const deleteClient = async (id) => {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting client:', error);
            alert('Erro ao excluir cliente');
        } else {
            setClients(clients.filter(c => c.id !== id));
        }
    };

    return (
        <ClientContext.Provider value={{ clients, addClient, updateClient, deleteClient, loading }}>
            {children}
        </ClientContext.Provider>
    );
};
