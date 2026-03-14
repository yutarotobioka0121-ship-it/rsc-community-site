import React from 'react';

const EventCard = ({ event, onApplyClick, onClick }) => {
    const isClosed = event.status !== 'open';
    const isFull = event.status === 'full';

    let badgeClass = 'badge-mint';
    let statusText = '募集中';
    if (isFull) {
        badgeClass = 'badge-yellow';
        statusText = '満席';
    } else if (isClosed) {
        badgeClass = 'badge-gray';
        statusText = '受付終了';
    }

    return (
        <div 
            className="card event-card clickable-card"
            onClick={() => onClick && onClick(event)}
        >
            <div className="event-card-header">
                <div className="event-date-box">
                    <span className="event-date">{new Date(event.date).toLocaleDateString('ja-JP')}</span>
                    <span className="event-time">{event.time}</span>
                </div>
                <div className="event-status">
                    <span className={`badge ${badgeClass}`}>{statusText}</span>
                    {(event.status === 'open' && event.remaining > 0) && (
                         <span className="remaining-slots">残り {event.remaining} 人</span>
                    )}
                </div>
            </div>

            {event.thumbnail && (
                <div className="event-thumbnail">
                    <img src={event.thumbnail} alt={event.title} />
                </div>
            )}

            <div className="event-card-body">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-category">
                    📁 {event.category}
                </div>
                
                <ul className="event-details-list">
                    <li>
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{event.location}</span>
                    </li>
                    <li>
                        <span className="detail-icon">👥</span>
                        <span className="detail-text">定員: {event.capacity}人</span>
                    </li>
                    <li>
                        <span className="detail-icon">💰</span>
                        <span className="detail-text">参加費: {event.fee}</span>
                    </li>
                </ul>

                <div className="event-tags">
                    {event.tags && event.tags.map((tag, idx) => (
                        <span key={idx} className="event-tag">#{tag}</span>
                    ))}
                </div>
            </div>

            <div className="event-card-footer">
                <button 
                    className={`btn ${!isClosed ? 'btn-primary' : 'btn-disabled'}`}
                    disabled={isClosed}
                    onClick={(e) => {
                        e.stopPropagation();
                        onApplyClick(event.id);
                    }}
                    style={{ width: '100%' }}
                >
                    {!isClosed ? 'このイベントに申し込む' : statusText}
                </button>
            </div>

            <style>{`
                .event-card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    padding: 0;
                    overflow: hidden;
                }
                
                .event-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 24px 24px 16px;
                    border-bottom: 1px solid var(--color-border);
                    background-color: var(--color-bg-base);
                }
                
                .event-date-box {
                    display: flex;
                    flex-direction: column;
                }
                
                .event-date {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--color-primary-dark);
                }
                
                .event-time {
                    font-size: 0.85rem;
                    color: var(--color-text-muted);
                    font-weight: 500;
                }
                
                .event-status {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 4px;
                }
                
                .remaining-slots {
                    font-size: 0.8rem;
                    color: var(--color-error);
                    font-weight: 700;
                }
                
                .event-thumbnail {
                    width: 100%;
                    height: 180px;
                    overflow: hidden;
                    background-color: #fafafa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .event-thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    transition: transform 0.3s ease;
                }
                
                .clickable-card:hover .event-thumbnail img {
                    transform: scale(1.05);
                }
                
                .event-card-body {
                    padding: 24px;
                    flex-grow: 1;
                }
                
                .event-title {
                    font-size: 1.25rem;
                    margin-bottom: 8px;
                    color: var(--color-text-main);
                }
                
                .event-category {
                    font-size: 0.85rem;
                    color: var(--color-text-muted);
                    margin-bottom: 20px;
                }
                
                .event-details-list {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                .event-details-list li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 0.95rem;
                }
                
                .detail-icon {
                    flex-shrink: 0;
                }
                
                .event-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .event-tag {
                    font-size: 0.8rem;
                    color: var(--color-primary);
                    background-color: var(--color-bg-base);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    padding: 2px 8px;
                    border-radius: 4px;
                }
                
                .event-card-footer {
                    padding: 16px 24px 24px;
                }
                
                .btn-disabled {
                    background-color: var(--color-border);
                    color: var(--color-text-muted);
                    cursor: not-allowed;
                    opacity: 0.7;
                    border: none;
                    box-shadow: none;
                }
                
                .btn-disabled:hover {
                    transform: none;
                    box-shadow: none;
                }
            `}</style>
        </div>
    );
};

export default EventCard;
