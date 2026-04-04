import React, { useState, useEffect } from 'react';
import { getEventSchedule } from '../data/events';
import EventCard from './EventCard';
import EventModal from './EventModal';

const EventSchedule = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'finance', 'skillup'

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

    // カテゴリー分類ロジック
    const isFinance = (category) => {
        if (!category) return false;
        const keywords = ['ファイナンス', 'お金', 'NISA', 'iDeCo', '副業', '資産', '経済'];
        return keywords.some(keyword => category.includes(keyword));
    };

    const isSkillUp = (category) => {
        if (!category) return false;
        const keywords = ['ビジネススキル', 'コミュニケーション', '自己啓発', '心理', 'スキルアップ'];
        return keywords.some(keyword => category.includes(keyword));
    };

    const filteredEvents = events.filter(event => {
        if (activeTab === 'all') return true;
        if (activeTab === 'finance') return isFinance(event.category);
        if (activeTab === 'skillup') return isSkillUp(event.category);
        return true;
    });

    const handleApplyClick = (eventOrId) => {
// ... (rest of handles)
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

                {/* カテゴリータブ */}
                {!isLoading && events.length > 0 && (
                    <div className="category-tabs mb-10">
                        <button 
                            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            <span className="tab-icon">📅</span> 全て見る
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'finance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('finance')}
                        >
                            <span className="tab-icon">💰</span> ファイナンス・経済
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'skillup' ? 'active' : ''}`}
                            onClick={() => setActiveTab('skillup')}
                        >
                            <span className="tab-icon">💡</span> 自己啓発・スキルアップ
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center" style={{ padding: '60px 0', color: 'var(--color-text-muted)' }}>
                        イベント情報を読み込み中...
                    </div>
                ) : (
                    <>
                        <div className="events-grid">
                            {filteredEvents.map((event) => (
                                <EventCard 
                                    key={event.id} 
                                    event={event} 
                                    onApplyClick={handleApplyClick} 
                                    onClick={handleCardClick}
                                />
                            ))}
                        </div>

                        {!isLoading && filteredEvents.length === 0 && (
                            <div className="text-center" style={{ padding: '40px 0', color: 'var(--color-text-muted)' }}>
                                <p>このカテゴリーで現在募集中のイベントはありません。</p>
                            </div>
                        )}
                    </>
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
                
                .category-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .tab-btn {
                    padding: 10px 20px;
                    border-radius: 50px;
                    border: 2px solid var(--color-border);
                    background-color: white;
                    color: var(--color-text-muted);
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.95rem;
                }

                .tab-btn:hover {
                    border-color: var(--color-primary-light);
                    color: var(--color-primary);
                }

                .tab-btn.active {
                    background-color: var(--color-primary);
                    border-color: var(--color-primary);
                    color: white;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
                }

                .tab-icon {
                    font-size: 1.1rem;
                }

                @media (max-width: 600px) {
                    .category-tabs {
                        gap: 8px;
                    }
                    .tab-btn {
                        padding: 8px 16px;
                        font-size: 0.85rem;
                    }
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
