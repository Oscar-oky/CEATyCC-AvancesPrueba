import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('/api/attendance');
                setEvents(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos de asistencia');
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Registro de Asistencia</h1>
            {events.map((event) => (
                <div key={event.id} className="mb-8">
                    <h2 className="text-xl font-semibold">{event.name}</h2>
                    <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                    <div className="mt-4">
                        <h3 className="text-lg font-medium">Asistentes</h3>
                        {event.attendees.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {event.attendees.map((attendee) => (
                                    <li key={attendee.id}>
                                        {attendee.name} ({attendee.email}) - Registrado el:{' '}
                                        {new Date(attendee.registered_at).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay asistentes registrados para este evento.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Attendance;
