import React, { useState, useEffect } from 'react';

const EventModal = ({ event, onClose, onApplyClick }) => {
    // 選択された日程(schedule)のIDを管理するState
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);

    // イベントが変わったタイミングで、デフォルト表示する日程をセットする
    useEffect(() => {
        if (event && event.allSchedules && event.allSchedules.length > 0) {
            setSelectedScheduleId(event.allSchedules[0].id);
        } else {
            setSelectedScheduleId(null);
        }
    }, [event]);

    // モーダル表示時に背景のスクロールを無効化する
    useEffect(() => {
        if (event) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [event]);

    if (!event) return null;

    // 現在選択されている日程オブジェクトを取得
    const currentSchedule = event.allSchedules?.find(s => s.id === selectedScheduleId) || event;

    // オーバーレイ（背景）をクリックした時に閉じる
    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay animate-fade-in" onClick={handleOverlayClick}>
            <div className="modal-content animate-slide-up">
                <button className="modal-close-btn" onClick={onClose} aria-label="閉じる">
                    ✕
                </button>
                
                <div className="modal-header">
                    <span className={`status-badge ${currentSchedule.status === 'open' ? 'status-open' : currentSchedule.status === 'full' ? 'status-full' : 'status-closed'}`}>
                        {currentSchedule.status === 'open' ? '募集中' : currentSchedule.status === 'full' ? '満席' : '受付終了'}
                    </span>
                    <span className="event-category mt-2 block">{event.category}</span>
                    <h2 className="modal-title mt-2">{event.title}</h2>
                    <div className="event-tags mt-2">
                        {event.tags && event.tags.map((tag, index) => (
                            <span key={index} className="event-tag">#{tag}</span>
                        ))}
                    </div>
                </div>

                {event.thumbnail && (
                    <div className="modal-thumbnail mt-4" style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                        <img src={event.thumbnail} alt={event.title} style={{ maxHeight: '300px', objectFit: 'contain', width: '100%', borderRadius: '8px' }} />
                    </div>
                )}

                <div className="modal-body mt-6">
                    <div className="info-grid">
                        <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                            <span className="info-label mb-2 block">📅 参加希望日時を選択してください</span>
                            {event.allSchedules && event.allSchedules.length > 0 ? (
                                <select 
                                    className="modal-date-selector" 
                                    value={selectedScheduleId || ''}
                                    onChange={(e) => setSelectedScheduleId(e.target.value)}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '1rem', backgroundColor: 'var(--color-bg-base)' }}
                                >
                                    {event.allSchedules.map(schedule => (
                                        <option key={schedule.id} value={schedule.id}>
                                            {new Date(schedule.date).toLocaleDateString('ja-JP')} {schedule.time || ''} 
                                            ({schedule.status === 'open' ? '募集中' : schedule.status === 'full' ? '満席' : '受付終了'})
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span className="info-value">{currentSchedule.date} {currentSchedule.time}</span>
                            )}
                        </div>
                        <div className="info-item">
                            <span className="info-label">📍 場所</span>
                            <span className="info-value">{currentSchedule.location}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">💰 参加費</span>
                            <span className="info-value">{event.fee}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">👥 残席</span>
                            <span className="info-value">残り {currentSchedule.remaining}名 (定員 {event.capacity}名)</span>
                        </div>
                    </div>

                    <div className="modal-description mt-6">
                        <h3>イベント詳細</h3>
                        <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: event.description }} />
                    </div>

                    {event.agenda && event.agenda.length > 0 && (
                        <div className="modal-agenda mt-6">
                            <h3>当日のアジェンダ</h3>
                            <ul>
                                {event.agenda.map((item, index) => (
                                    <li key={index}>
                                        <span className="agenda-time">{item.time}</span>
                                        <span className="agenda-content">{item.content}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="modal-footer mt-8">
                    {currentSchedule.status === 'open' ? (
                        <button className="btn btn-primary w-full" style={{ padding: '16px' }} onClick={() => onApplyClick(currentSchedule.id)}>
                            この日時に申し込む
                        </button>
                    ) : (
                        <button className="btn w-full" style={{ padding: '16px', backgroundColor: 'var(--color-border)', color: 'var(--color-text-muted)', cursor: 'pointer' }} onClick={onClose}>
                            {currentSchedule.status === 'full' ? '満席のため受付終了 (閉じる)' : '受付終了 (閉じる)'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventModal;
