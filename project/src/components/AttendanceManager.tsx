import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceManager = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch all events
        axios.get('/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const handleEventSelect = (eventId) => {
        setSelectedEvent(eventId);
        setLoading(true);
        // Fetch attendees for the selected event
        axios.get(`/api/events/${eventId}/attendance`)
            .then(response => {
                setAttendees(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching attendees:', error);
                setLoading(false);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Asistencia</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                    <h2 className="text-xl font-semibold mb-2">Eventos</h2>
                    <ul className="space-y-2">
                        {events.map(event => (
                            <li key={event.id}
                                className={`p-2 rounded cursor-pointer ${selectedEvent === event.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleEventSelect(event.id)}>
                                {event.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Asistentes</h2>
                    {loading ? (
                        <p>Cargando...</p>
                    ) : selectedEvent ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Nombre</th>
                                        <th className="py-2 px-4 border-b">Email</th>
                                        <th className="py-2 px-4 border-b">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendees.map(attendee => (
                                        <tr key={attendee.id}>
                                            <td className="py-2 px-4 border-b">{attendee.user.name}</td>
                                            <td className="py-2 px-4 border-b">{attendee.user.email}</td>
                                            <td className="py-2 px-4 border-b">{attendee.attended ? 'Presente' : 'Ausente'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Seleccione un evento para ver la lista de asistentes.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendanceManager;