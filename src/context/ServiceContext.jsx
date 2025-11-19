import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ServiceContext = createContext();

export const useServices = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServices must be used within a ServiceProvider');
    }
    return context;
};

export const ServiceProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('name');

        if (error) console.error('Error fetching services:', error);
        else setServices(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const addService = async (service) => {
        const { data, error } = await supabase
            .from('services')
            .insert([service])
            .select();

        if (error) {
            console.error('Error adding service:', error);
            alert('Erro ao adicionar serviço');
        } else {
            setServices([...services, data[0]]);
        }
    };

    const updateService = async (id, updatedService) => {
        const { error } = await supabase
            .from('services')
            .update(updatedService)
            .eq('id', id);

        if (error) {
            console.error('Error updating service:', error);
            alert('Erro ao atualizar serviço');
        } else {
            setServices(services.map(s => s.id === id ? { ...s, ...updatedService } : s));
        }
    };

    const deleteService = async (id) => {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting service:', error);
            alert('Erro ao excluir serviço');
        } else {
            setServices(services.filter(s => s.id !== id));
        }
    };

    return (
        <ServiceContext.Provider value={{ services, addService, updateService, deleteService, loading }}>
            {children}
        </ServiceContext.Provider>
    );
};
