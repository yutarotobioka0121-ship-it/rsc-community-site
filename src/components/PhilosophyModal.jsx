import React, { useEffect } from 'react';

const PhilosophyModal = ({ isOpen, onClose }) => {
    // モーダル表示時に背景のスクロールを無効化する
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // オーバーレイ（背景）をクリックした時に閉じる
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay animate-fade-in" onClick={handleOverlayClick}>
            <div className="modal-content philosophy-modal animate-slide-up">
                <button className="modal-close-btn" onClick={onClose} aria-label="閉じる">
                    ✕
                </button>
                
                <div className="modal-header text-center">
                    <span className="badge badge-yellow mb-2">Philosophy</span>
                    <h2 className="modal-title">RSCの理念</h2>
                </div>

                <div className="modal-body mt-6">
                    <div className="philosophy-quote card mb-8">
                        <p className="quote-text">
                            「一生モノの『経済』と『時間』を、仲間と共に創り出す。」
                        </p>
                    </div>

                    <div className="philosophy-intro mb-8">
                        <h3 className="text-center mb-4" style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', fontWeight: 'bold' }}>RSCの想い（Essence）</h3>
                        <p className="text-center" style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '16px' }}>
                            「満たされた心で、そっと誰かの力に。」
                        </p>
                        <p>
                            私たちが豊かさと自由を形にするのは、自分自身に「ゆとり」を持つためです。自分が満たされることで、自然と周りの人にも優しくなれたり、誰かの役に立ちたいと思える。
                        </p>
                        <p className="mt-4">
                            そんな「善い循環（Force for Good）」が生まれる場所でありたいと願っています。
                        </p>
                    </div>

                    <div className="philosophy-pillars">
                        <h3 className="text-center mb-6" style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', fontWeight: 'bold' }}>理念を支える3つの柱</h3>

                        <div className="pillar mb-8">
                            <h3 className="pillar-title">1. 「自分」を磨き、未来を変える力をつける（自律の習慣）</h3>
                            <p className="pillar-desc">
                                未来の自分を助けられるのは、今の自分の行動だけです。
                            </p>
                            <ul className="pillar-list mt-4">
                                <li>
                                    <strong>自分らしく一歩ずつ:</strong><br />
                                    周りと比べるのではなく、昨日の自分より少しだけ前へ。自分の人生に責任を持ち、前向きに挑戦する姿勢を大切にします。
                                </li>
                                <li className="mt-3">
                                    <strong>信頼される自分になる:</strong><br />
                                    知識だけでなく、人として誠実であることを土台に、着実なスキルアップを目指します。
                                </li>
                            </ul>
                        </div>

                        <div className="pillar mb-8">
                            <h3 className="pillar-title">2. 「先に与える」ことで、成功の輪を広げる（ギバーの精神）</h3>
                            <p className="pillar-desc">
                                一人の成功よりも、みんなで豊かになる方が、結果として自分も遠くへ行けます。
                            </p>
                            <ul className="pillar-list mt-4">
                                <li>
                                    <strong>応援し合う文化:</strong><br />
                                    自分の得意を仲間に教えたり、誰かの挑戦を応援したり。先に価値を届ける「与える人（ギバー）」であることで、最高のチームワークを生み出します。
                                </li>
                                <li className="mt-3">
                                    <strong>共に育つ（Win-Win）:</strong><br />
                                    誰かの足を引っ張るのではなく、互いの良さを引き出し合い、全員がプラスになる関係を築きます。
                                </li>
                            </ul>
                        </div>

                        <div className="pillar mb-8">
                            <h3 className="pillar-title">3. 揺るぎない「豊かさ」と「ゆとり」を築く（自由の実現）</h3>
                            <p className="pillar-desc">
                                「お金」と「時間」を自分の手に取り戻し、人生の選択肢を増やします。
                            </p>
                            <ul className="pillar-list mt-4">
                                <li>
                                    <strong>長く続く安心を作る:</strong><br />
                                    一時的な稼ぎではなく、ずっと自分を支えてくれる「知恵」と「仕組み」を学び、経済的な不安を安心に変えていきます。
                                </li>
                                <li className="mt-3">
                                    <strong>大切なものを大切にする:</strong><br />
                                    経済的なゆとりを「自由な時間」に変え、家族や趣味、新しい挑戦など、本当に価値を感じることに時間を使える人生を目指します。
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="modal-footer text-center mt-4">
                    <button className="btn btn-outline" onClick={onClose} style={{ minWidth: '160px' }}>
                        閉じる
                    </button>
                </div>
            </div>

            <style>{`
                .philosophy-modal {
                    max-width: 800px;
                }
                
                .philosophy-quote {
                    background-color: var(--color-bg-base);
                    border: none;
                    border-left: 6px solid var(--color-accent);
                    padding: 24px 32px;
                    border-radius: 4px var(--radius-md) var(--radius-md) 4px;
                }
                
                .quote-text {
                    font-size: 1.35rem;
                    font-weight: 800;
                    color: var(--color-text-main);
                    line-height: 1.5;
                    font-family: var(--font-heading);
                }
                
                .philosophy-intro p {
                    font-size: 1.05rem;
                    color: var(--color-text-main);
                    line-height: 1.8;
                }
                
                .pillar-title {
                    font-size: 1.25rem;
                    color: var(--color-primary-dark);
                    border-bottom: 2px solid var(--color-primary-light);
                    padding-bottom: 8px;
                    margin-bottom: 12px;
                    font-family: var(--font-heading);
                }
                
                .pillar-desc {
                    font-weight: 700;
                    color: var(--color-text-main);
                    margin-bottom: 12px;
                }
                
                .pillar-list {
                    list-style: none;
                    padding-left: 0;
                }
                
                .pillar-list li {
                    position: relative;
                    padding-left: 24px;
                    margin-bottom: 16px;
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: var(--color-text-muted);
                }
                
                .pillar-list li::before {
                    content: '✔';
                    position: absolute;
                    left: 0;
                    color: var(--color-primary);
                    font-weight: bold;
                }
                
                .pillar-list li strong {
                    color: var(--color-text-main);
                    display: block;
                    margin-bottom: 4px;
                }
                
                @media (max-width: 768px) {
                    .quote-text {
                        font-size: 1.15rem;
                    }
                    .philosophy-quote {
                        padding: 16px 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PhilosophyModal;
