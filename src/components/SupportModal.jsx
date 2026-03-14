import React, { useState, useEffect } from 'react';
import { privacyPolicy, termsOfService } from '../data/legal';

const SupportModal = ({ isOpen, onClose, type }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: ''
    });
    const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'

    // モーダル表示時に背景のスクロールを無効化する
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // モーダルを開くたびにフォームのステータスをリセットする
            setStatus(null);
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'support-modal-overlay animate-fade-in') {
            onClose();
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            // お問い合わせ用データ
            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: '', // イベントフォームと共通のGAS受付スクリプトを使う場合の互換性のため
                eventTitle: `お問い合わせ: ${formData.subject}`,
                eventDate: new Date().toLocaleDateString('ja-JP'),
                message: formData.message
            };

            const endpoint = import.meta.env.VITE_GAS_ENDPOINT;
            
            if (!endpoint) {
                console.warn("GAS URL is not set. Mocking successful submission.");
                setTimeout(() => {
                    setStatus('success');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                }, 1000);
                return;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(submissionData).toString()
            });

            if (response.ok || response.type === 'opaque') {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
            console.error("Contact Form submission failed:", error);
        }
    };

    // コンテンツの切り替え
    let title = '';
    let content = null;

    if (type === 'privacy') {
        title = 'プライバシーポリシー';
        content = (
            <div className="legal-content">
                <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
            </div>
        );
    } else if (type === 'terms') {
        title = '利用規約';
        content = (
            <div className="legal-content">
                <div dangerouslySetInnerHTML={{ __html: termsOfService }} />
            </div>
        );
    } else if (type === 'contact') {
        title = 'お問い合わせ / サポート';
        content = (
            <div className="contact-form-container">
                {status === 'success' ? (
                    <div className="success-message text-center">
                        <div style={{ fontSize: '3rem', margin: '20px 0' }}>✉️</div>
                        <h3 style={{ color: 'var(--color-success)', marginBottom: '16px' }}>送信完了しました！</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                            お問い合わせ内容を受け付けました。<br />
                            数日以内に、ご記入いただいたメールアドレス宛にご返信いたします。
                        </p>
                        <button className="btn btn-outline" style={{ marginTop: '24px' }} onClick={onClose}>閉じる</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="custom-form">
                        <p style={{ marginBottom: '24px', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                            RSCに関するご質問やお問い合わせは、以下のフォームよりお気軽にご連絡ください。
                        </p>
                        {status === 'error' && (
                            <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '0.9rem' }}>
                                送信に失敗しました。時間をおいて再度お試しください。
                            </div>
                        )}
                        <div className="form-group">
                            <label>お名前 <span className="req">必須</span></label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="例: 山田 太郎" />
                        </div>
                        <div className="form-group">
                            <label>メールアドレス <span className="req">必須</span></label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="例: rsc@example.com" />
                        </div>
                        <div className="form-group">
                            <label>件名 <span className="req">必須</span></label>
                            <select name="subject" value={formData.subject} onChange={handleChange} required>
                                <option value="" disabled>選択してください</option>
                                <option value="イベントに関するご質問">イベントに関するご質問</option>
                                <option value="参加キャンセル・変更">参加キャンセル・変更</option>
                                <option value="当グループについて">当グループについて</option>
                                <option value="その他のお問い合わせ">その他のお問い合わせ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>お問い合わせ内容 <span className="req">必須</span></label>
                            <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="ご質問内容などを詳しくご記入ください"></textarea>
                        </div>
                        <div className="text-center" style={{ marginTop: '24px' }}>
                            <button type="submit" className="btn btn-primary" disabled={status === 'submitting'} style={{ width: '100%', padding: '14px' }}>
                                {status === 'submitting' ? '送信中...' : '送信する'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        );
    }

    return (
        <div className="support-modal-overlay animate-fade-in" onClick={handleOverlayClick}>
            <div className={`support-modal-content animate-slide-up ${type === 'contact' ? 'contact-size' : 'legal-size'}`}>
                <div className="support-modal-header border-b border-gray-200 pb-4 mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                        ✕
                    </button>
                </div>
                
                <div className="support-modal-body">
                    {content}
                </div>
            </div>

            <style>{`
                .support-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    backdrop-filter: blur(4px);
                }

                .support-modal-content {
                    background-color: white;
                    border-radius: 12px;
                    padding: 32px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    position: relative;
                }

                .contact-size {
                    width: 100%;
                    max-width: 500px;
                }

                .legal-size {
                    width: 100%;
                    max-width: 800px;
                }

                .legal-content h3 {
                    font-size: 1.1rem;
                    color: var(--color-primary);
                    margin-top: 24px;
                    margin-bottom: 12px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid var(--color-border);
                }
                
                .legal-content h3:first-child {
                    margin-top: 0;
                }

                .legal-content p, .legal-content li {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: var(--color-text-main);
                    margin-bottom: 12px;
                }
                
                .legal-content ul, .legal-content ol {
                    margin-left: 24px;
                    margin-bottom: 16px;
                }

                /* Custom Form Styles Reuse */
                .form-group {
                    margin-bottom: 20px;
                }
                .form-group label {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 6px;
                    font-size: 0.9rem;
                }
                .form-group input, .form-group select, .form-group textarea {
                    width: 100%;
                    padding: 10px 12px;
                    border: 1px solid var(--color-border);
                    border-radius: 6px;
                    font-family: inherit;
                    font-size: 1rem;
                }
                .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
                }
                .req {
                    font-size: 0.7rem;
                    background-color: var(--color-error);
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-left: 6px;
                    font-weight: normal;
                }
            `}</style>
        </div>
    );
};

export default SupportModal;
