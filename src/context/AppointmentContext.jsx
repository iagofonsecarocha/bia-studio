import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AppointmentContext = createContext();

export const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointments must be used within an AppointmentProvider');
    }
    return context;
};

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('appointments')
            .select(`
        *,
        clients (name),
        services (name, duration, price)
      `)
            .order('date', { ascending: true });

        if (error) {
            console.error('Error fetching appointments:', error);
        } else {
            // Transform data to match UI expectations (flattening)
            const formatted = data.map(apt => ({
                ...apt,
                clientName: apt.clients?.name,
                serviceName: apt.services?.name,
                duration: apt.services?.duration,
                price: apt.services?.price
            }));
            setAppointments(formatted || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const addAppointment = async (appointment) => {
        // Prepare payload for DB (remove UI-only fields like names)
        const payload = {
            client_id: appointment.clientId,
            service_id: appointment.serviceId,
            date: appointment.date,
            time: appointment.time,
            status: 'pending'
        };

        const { data, error } = await supabase
            .from('appointments')
            .insert([payload])
            .select();

        if (error) {
            console.error('Error adding appointment:', error);
            alert('Erro ao agendar');
        } else {
            // Refresh list to get the joined names
            fetchAppointments();
        }
    };

    const updateStatus = async (id, status) => {
        const { error } = await supabase
            .from('appointments')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating status:', error);
            alert('Erro ao atualizar status');
        } else {
            setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
        }
    };

    const deleteAppointment = async (id) => {
        const { error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting appointment:', error);
            alert('Erro ao excluir agendamento');
        } else {
            setAppointments(appointments.filter(a => a.id !== id));
        }
    };

    return (
        <AppointmentContext.Provider value={{ appointments, addAppointment, updateStatus, deleteAppointment, loading }}>
            {children}
        </AppointmentContext.Provider>
    );
};
