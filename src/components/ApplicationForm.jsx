import React, { useState, useEffect } from 'react';
import { getEventSchedule } from '../data/events';

const ApplicationForm = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', eventId: '', message: ''
    });
    const [selectedEventInfo, setSelectedEventInfo] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEventSchedule();
            const flatSchedules = data.flatMap(ev => 
                ev.allSchedules ? ev.allSchedules.map(schedule => ({
                    id: schedule.id,
                    masterEventId: ev.id,
                    title: ev.title,
                    date: schedule.date,
                    time: schedule.time,
                    status: schedule.status
                })) : []
            );
            setEvents(flatSchedules);

            const hash = window.location.hash;
            if (hash && hash.includes('eventId=')) {
                const id = hash.split('eventId=')[1];
                const targetSchedule = flatSchedules.find(e => e.masterEventId === id && e.status === 'open');
                if (targetSchedule) {
                    setFormData(prev => ({ ...prev, eventId: targetSchedule.id }));
                    setSelectedEventInfo(targetSchedule);
                    setIsLocked(true);
                }
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash && hash.includes('eventId=')) {
                const id = hash.split('eventId=')[1];
                if (events.length > 0) {
                    const targetSchedule = events.find(e => e.masterEventId === id && e.status === 'open');
                    if (targetSchedule) {
                        setFormData(prev => ({ ...prev, eventId: targetSchedule.id }));
                        setSelectedEventInfo(targetSchedule);
                        setIsLocked(true);
                    }
                }
            } else if (hash === '#apply') {
                // 一般的な申し込みフォーム（選択なし）の場合
                setIsLocked(false);
                setSelectedEventInfo(null);
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [events]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClearSelection = () => {
        setIsLocked(false);
        setSelectedEventInfo(null);
        setFormData(prev => ({ ...prev, eventId: '' }));
        window.history.pushState(null, '', '#apply');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            const selectedEvent = events.find(ev => ev.id === formData.eventId);
            
            // GASへ送るデータ
            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                eventTitle: selectedEvent ? selectedEvent.title : '未選択',
                eventDate: selectedEvent ? `${new Date(selectedEvent.date).toLocaleDateString('ja-JP')} ${selectedEvent.time || ''}`.trim() : '未選択',
                message: formData.message || 'なし'
            };

            const endpoint = import.meta.env.VITE_GAS_ENDPOINT;
            
            if (!endpoint) {
                console.warn("GAS URL is not set in .env. Mocking successful submission.");
                setTimeout(() => {
                    setStatus('success');
                    setFormData({ name: '', email: '', phone: '', eventId: '', message: '' });
                }, 1000);
                return;
            }

            // CORSエラーを回避するため、x-www-form-urlencoded形式で送信し、modeを'no-cors'にする
            const response = await fetch(endpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(submissionData).toString()
            });

            // GASからのリダイレクト等のレスポンスを処理
            if (response.ok || response.type === 'opaque') {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', eventId: '', message: '' });
            } else {
                setStatus('error');
                console.error("Form submission failed with status:", response.status);
            }
        } catch (error) {
            setStatus('error');
            console.error("Error submitting form via GAS:", error);
        }
    };

    return (
        <section id="apply" className="section bg-white">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="text-center mb-8">
                    <h2 className="section-title">
                        {selectedEventInfo ? `${selectedEventInfo.title} お申し込み` : '参加申し込み'}
                    </h2>
                    <p className="section-subtitle mt-4">
                        {selectedEventInfo 
                            ? `${new Date(selectedEventInfo.date).toLocaleDateString('ja-JP')} 開催の「${selectedEventInfo.title}」へのお申し込みフォームです。`
                            : 'RSCの勉強会・イベントに参加をご希望の方は、以下のフォームよりお申し込みください。'
                        }
                    </p>
                </div>

                <div className="form-container card">
                    {status === 'success' ? (
                        <div className="success-message text-center animate-fade-in">
                            <div className="icon-success">✉️</div>
                            <h3>お申し込みが完了しました！</h3>
                            <p className="mt-4">
                                この度は参加枠をお申し込みいただきありがとうございます。<br />
                                ご入力いただいたメールアドレス宛に、自動返信で詳細なご案内（ZoomのURLや会場詳細）を送付いたしましたのでご確認ください。(※迷惑メールフォルダ等に振り分けられる場合があります)
                            </p>
                            <button className="btn btn-outline mt-8" onClick={() => setStatus(null)}>
                                さらに別のイベントに申し込む
                            </button>
                        </div>
                    ) : status === 'error' ? (
                        <div className="error-message text-center animate-fade-in">
                            <div className="icon-error" style={{ fontSize: '4rem', marginBottom: '16px' }}>❌</div>
                            <h3 style={{ color: 'var(--color-error)' }}>送信エラー</h3>
                            <p className="mt-4">
                                申し訳ありません。通信エラーが発生し、申し込みを完了できませんでした。<br />
                                時間をおいて再度お試しいただくか、直接お問い合わせください。
                            </p>
                            <button className="btn btn-outline mt-8" onClick={() => setStatus(null)}>
                                入力画面に戻る
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="custom-form">
                            <div className="form-group">
                                <label>お名前 <span className="req">必須</span></label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="例: スキル 太郎" />
                            </div>
                            
                            <div className="form-group">
                                <label>メールアドレス <span className="req">必須</span></label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="例: rsc@example.com" />
                            </div>
                            
                            <div className="form-group">
                                <label>電話番号 <span className="opt">任意</span></label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="例: 090-1234-5678" />
                            </div>
                            
                            <div className="form-group">
                                <label>参加希望のイベント <span className="req">必須</span></label>
                                {isLocked && selectedEventInfo ? (
                                    <div className="locked-event-display">
                                        <div className="locked-event-info">
                                            <strong>{selectedEventInfo.title}</strong>
                                            <span>{new Date(selectedEventInfo.date).toLocaleDateString('ja-JP')} {selectedEventInfo.time}</span>
                                        </div>
                                        <button type="button" className="btn-change-event" onClick={handleClearSelection}>
                                            日程を変更または選び直す
                                        </button>
                                        <input type="hidden" name="eventId" value={formData.eventId} />
                                    </div>
                                ) : (
                                    <select name="eventId" value={formData.eventId} onChange={(e) => {
                                        handleChange(e);
                                        const found = events.find(ev => ev.id === e.target.value);
                                        setSelectedEventInfo(found);
                                    }} required>
                                        <option value="" disabled>イベントを選択してください</option>
                                        {events.map(ev => (
                                            <option key={ev.id} value={ev.id} disabled={ev.status !== 'open'}>
                                                {ev.title} - {new Date(ev.date).toLocaleDateString('ja-JP')}{ev.time ? ` ${ev.time}` : ''} {ev.status === 'open' ? '' : '(受付終了)'}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label>ご質問など <span className="opt">任意</span></label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="初心者ですが大丈夫でしょうか？など、気になることがあればご記入ください"></textarea>
                            </div>
                            
                            <div className="text-center mt-8">
                                <button type="submit" className="btn btn-primary btn-large" disabled={status === 'submitting'} style={{ width: '100%', maxWidth: '300px' }}>
                                    {status === 'submitting' ? '送信中...' : '申し込む'}
                                </button>
                                <p className="mt-4" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                    送信することで、プライバシーポリシーに同意したものとみなされます。
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style>{`
                .form-container {
                    padding: 40px;
                    border-top: 5px solid var(--color-primary);
                }
                
                @media (max-width: 768px) {
                    .form-container {
                        padding: 32px 20px;
                    }
                }
                
                .form-group {
                    margin-bottom: 24px;
                }
                
                .form-group label {
                    display: block;
                    font-weight: 700;
                    margin-bottom: 8px;
                    color: var(--color-text-main);
                }

                .locked-event-display {
                    background-color: var(--color-bg-base);
                    border: 2px solid var(--color-primary-light);
                    border-radius: var(--radius-sm);
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;
                }

                @media (max-width: 600px) {
                    .locked-event-display {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }

                .locked-event-info {
                    display: flex;
                    flex-direction: column;
                }

                .locked-event-info strong {
                    font-size: 1.1rem;
                    color: var(--color-primary-dark);
                }

                .locked-event-info span {
                    font-size: 0.9rem;
                    color: var(--color-text-muted);
                }

                .btn-change-event {
                    background: none;
                    border: none;
                    color: var(--color-primary);
                    font-size: 0.85rem;
                    text-decoration: underline;
                    cursor: pointer;
                    padding: 0;
                    white-space: nowrap;
                }

                .btn-change-event:hover {
                    color: var(--color-primary-dark);
                }
                
                .req {
                    font-size: 0.75rem;
                    background-color: var(--color-error);
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-left: 8px;
                    font-weight: normal;
                }
                
                .opt {
                    font-size: 0.75rem;
                    background-color: var(--color-border);
                    color: var(--color-text-muted);
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-left: 8px;
                    font-weight: normal;
                }
                
                .form-group input, 
                .form-group select, 
                .form-group textarea {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-sm);
                    font-family: var(--font-body);
                    font-size: 1rem;
                    background-color: var(--color-bg-base);
                    transition: all var(--transition-fast);
                }
                
                .form-group input:focus, 
                .form-group select:focus, 
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--color-primary-light);
                    background-color: white;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
                }
                
                .icon-success {
                    font-size: 4rem;
                    margin-bottom: 16px;
                }
                
                .success-message h3 {
                    color: var(--color-success);
                    font-size: 1.5rem;
                }
                
                .success-message p {
                    color: var(--color-text-muted);
                    line-height: 1.8;
                }
            `}</style>
        </section>
    );
};

export default ApplicationForm;
