import React, { useState, useEffect } from 'react';
import { getEventSchedule } from '../data/events';
import EventCard from './EventCard';
import EventModal from './EventModal';

const EventSchedule = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEventSchedule();
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleApplyClick = (eventOrId) => {
        const eventId = typeof eventOrId === 'object' ? eventOrId.id : eventOrId;
        setSelectedEvent(null);

        // Hash routing for scrolling to apply form
        window.history.pushState(null, '', `#apply?eventId=${eventId}`);
        window.dispatchEvent(new Event('hashchange'));

        const applySection = document.getElementById('apply');
        if (applySection) {
            applySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCardClick = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (
        <section id="events" className="section bg-light">
            <div className="container">
                <div className="text-center mb-8">
                    <h2 className="section-title">イベント一覧</h2>
                    <p className="section-subtitle mt-4">
                        現在募集中のRSC勉強会・イベントの一覧です。
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center" style={{ padding: '60px 0', color: 'var(--color-text-muted)' }}>
                        イベント情報を読み込み中...
                    </div>
                ) : (
                    <div className="events-grid">
                        {events.map((event) => (
                            <EventCard 
                                key={event.id} 
                                event={event} 
                                onApplyClick={handleApplyClick} 
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>
                )}

                <EventModal 
                    event={selectedEvent} 
                    onClose={handleCloseModal} 
                    onApplyClick={handleApplyClick} 
                />

                {!isLoading && events.length === 0 && (
                    <div className="empty-state card text-center">
                        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>📅</span>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>現在予定されているイベントはありません</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>次回の開催日程が決まり次第、こちらでお知らせいたします。</p>
                    </div>
                )}
            </div>

            <style>{`
                .bg-light {
                    background-color: var(--color-bg-base);
                }
                
                .events-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 32px;
                }
                
                @media (min-width: 768px) {
                    .events-grid {
                        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                    }
                }
                
                .empty-state {
                    padding: 60px 24px;
                    max-width: 600px;
                    margin: 0 auto;
                }
            `}</style>
        </section>
    );
};

export default EventSchedule;
