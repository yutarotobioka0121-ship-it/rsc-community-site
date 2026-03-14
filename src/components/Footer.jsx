import React, { useState } from 'react';
import SupportModal from './SupportModal';

const Footer = () => {
    const [activeModal, setActiveModal] = useState(null);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo" style={{ marginBottom: '16px' }}>
                            <span className="logo-icon grayscale">UP!</span>
                            <span className="logo-text" style={{ color: 'white' }}>
                                RSC
                                <span className="logo-sub" style={{ color: '#94A3B8' }}>令和スキルアップ研究会</span>
                            </span>
                        </div>
                        <p className="footer-desc">
                            学校では学べない、社会人に役立つ知識や考え方を学び、伝えるグループです。あなたと共に新しい分野にチャレンジし、より良い未来を築きましょう。
                        </p>
                    </div>
                    
                    <div className="footer-links">
                        <div className="link-col">
                            <h4>メニュー</h4>
                            <ul>
                                <li><a href="#hero">トップページ</a></li>
                                <li><a href="#about">RSCについて</a></li>
                                <li><a href="#events">イベント一覧</a></li>
                            </ul>
                        </div>
                        <div className="link-col">
                            <h4>サポート</h4>
                            <ul>
                                <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActiveModal('contact'); }}>お問い合わせ</a></li>
                                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); setActiveModal('privacy'); }}>プライバシーポリシー</a></li>
                                <li><a href="#terms" onClick={(e) => { e.preventDefault(); setActiveModal('terms'); }}>利用規約</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} 令和スキルアップ研究会 (RSC). All rights reserved.</p>
                </div>
            </div>

            <SupportModal 
                isOpen={activeModal !== null} 
                type={activeModal} 
                onClose={() => setActiveModal(null)} 
            />

            <style>{`
                .footer {
                    background-color: var(--color-text-main); /* Dark Slate */
                    color: white;
                    padding: 80px 0 24px;
                    margin-top: 80px;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 48px;
                    margin-bottom: 64px;
                }
                
                @media (min-width: 768px) {
                    .footer-content {
                        grid-template-columns: 2fr 3fr;
                    }
                }
                
                .footer-brand .logo-icon.grayscale {
                    background: #334155;
                    box-shadow: none;
                }
                
                .footer-desc {
                    color: #94A3B8;
                    font-size: 0.95rem;
                    line-height: 1.8;
                    max-width: 400px;
                }
                
                .footer-links {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                }
                
                .link-col h4 {
                    color: white;
                    font-size: 1.1rem;
                    margin-bottom: 24px;
                    position: relative;
                    display: inline-block;
                }
                
                .link-col h4::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    width: 30px;
                    height: 3px;
                    background-color: var(--color-primary);
                    border-radius: 2px;
                }
                
                .link-col ul {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                .link-col a {
                    color: #94A3B8;
                    font-size: 0.95rem;
                }
                
                .link-col a:hover {
                    color: var(--color-primary-light);
                    padding-left: 4px;
                }
                
                .footer-bottom {
                    border-top: 1px solid #334155;
                    padding-top: 24px;
                    text-align: center;
                    color: #64748B;
                    font-size: 0.875rem;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
