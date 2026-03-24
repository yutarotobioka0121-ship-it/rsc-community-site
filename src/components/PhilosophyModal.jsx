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
        if (e.target.className === 'modal-overlay animate-fade-in') {
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
                            「完璧じゃなくていい。ただ、昨日より一歩前へ。<br />
                            その泥臭い挑戦の積み重ねが、やがて誰にも真似できないあなただけの『在り方』になる。」
                        </p>
                    </div>

                    <div className="philosophy-intro mb-8">
                        <p>
                            私たちは、挑戦することを恐れません。なぜなら、<strong>成功の反対は「失敗」ではなく「何もしないこと」</strong>だと知っているからです。
                        </p>
                        <p className="mt-4">
                            失敗とは、あなたが挑んだ証であり、尊いデータです。うまくいかない出来事さえも成長の種に変える「解釈力」を磨くこと。そのマインドセットこそが、変化の激しい時代を生き抜く最大の武器になります。
                        </p>
                        <p className="mt-4">
                            「令和スキルアップ研究会」は、自らの人生にオーナーシップを取り戻し、理想の未来を自らデザインする挑戦者のためのプラットフォームです。
                        </p>
                    </div>

                    <div className="philosophy-pillars">
                        <div className="pillar mb-8">
                            <h3 className="pillar-title">1. 経済的な自律を叶える「視座の変革」</h3>
                            <p className="pillar-desc">
                                一歩踏み出す先にあるのは、会社員という枠を超えた、自分で舵を取る世界です。
                            </p>
                            <ul className="pillar-list mt-4">
                                <li>
                                    <strong>ビジネスオーナー・投資家の思考:</strong> 
                                    労働の対価を得るだけでなく、自ら仕組みを創り、資本を活かす側の「視点」を習得します。
                                </li>
                                <li>
                                    <strong>「失敗」を資産に変える:</strong> 
                                    試行錯誤を繰り返し、最速で改善を回す。投資家的な冷静さと、オーナーとしての情熱を両立させます。
                                </li>
                            </ul>
                        </div>

                        <div className="pillar mb-8">
                            <h3 className="pillar-title">2. 時代に左右されない「人間力」の探求</h3>
                            <p className="pillar-desc">
                                どれほど高いスキルを手にしても、その土台となる「人格」がなければ、真の成功は掴めません。
                            </p>
                            <ul className="pillar-list mt-4">
                                <li>
                                    <strong>『GIVE & TAKE』の体現:</strong> 
                                    アダム・グラント氏が提唱する「ギバー（与える人）」として、まず他者に貢献し、豊かな循環を生み出すコミュニティを築きます。
                                </li>
                                <li>
                                    <strong>『7つの習慣』の実践:</strong> 
                                    誠実さ、自立、相互協力。普遍的な原則を指針とし、周囲から信頼され、応援される「在り方（Being）」を追求します。
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
