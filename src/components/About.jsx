import React from 'react';

const About = () => {
    const keywords = [
        "自己投資", "自己啓発", "投資", "東京", "イベント", 
        "勉強会", "キャッシュフローゲーム会", "金持ち父さん", 
        "スキルアップ", "NISA", "自己実現"
    ];

    return (
        <section id="about" className="section bg-white">
            <div className="container" style={{ maxWidth: '900px' }}>
                <div className="text-center mb-8">
                    <h2 className="section-title">RSCについて</h2>
                    <p className="section-subtitle mt-4">令和スキルアップ研究会 (RSC) とは？</p>
                </div>

                <div className="about-grid">
                    <div className="about-content card">
                        <div className="icon-wrapper mb-4">
                            <span style={{ fontSize: '2rem' }}>🎓</span>
                        </div>
                        <h3 className="about-heading">学びと挑戦の場</h3>
                        <p className="about-desc">
                            令和スキルアップ研究会は、あなたと共に我々にとって新しい分野にチャレンジします。学校教育ではカバーしきれない、実社会で真っ直ぐに役立つ知識を共有し合います。
                        </p>
                    </div>

                    <div className="about-content card">
                        <div className="icon-wrapper mb-4" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}>
                            <span style={{ fontSize: '2rem' }}>🤝</span>
                        </div>
                        <h3 className="about-heading">仲間たちとのつながり</h3>
                        <p className="about-desc">
                            志を同じくする仲間たちとのつながりを築く場所でもあります。この素敵なネットワークを活用してお互いに学び合いながら成長し、より良い未来を築きましょう！
                        </p>
                    </div>
                </div>

                <div className="keywords-section mt-8">
                    <h4 className="text-center mb-4" style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
                        こんなキーワードに興味がある方におすすめ！
                    </h4>
                    <div className="keywords-cloud">
                        {keywords.map((kw, idx) => (
                            <span 
                                key={idx} 
                                className={`badge ${idx % 3 === 0 ? 'badge-yellow' : idx % 2 === 0 ? 'badge-mint' : 'badge-gray'}`}
                            >
                                #{kw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .bg-white { background-color: white; }
                
                .about-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                }
                
                @media (min-width: 768px) {
                    .about-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }
                
                .icon-wrapper {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 64px;
                    height: 64px;
                    border-radius: var(--radius-full);
                    background-color: rgba(16, 185, 129, 0.15);
                }
                
                .about-heading {
                    font-size: 1.25rem;
                    margin-bottom: 12px;
                    color: var(--color-text-main);
                }
                
                .about-desc {
                    color: var(--color-text-muted);
                    font-size: 0.95rem;
                    line-height: 1.8;
                }
                
                .keywords-section {
                    background-color: var(--color-bg-base);
                    border-radius: var(--radius-md);
                    padding: 32px;
                    border: 1px dashed var(--color-border);
                }
                
                .keywords-cloud {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    justify-content: center;
                }
                
                .keywords-cloud .badge {
                    font-size: 0.95rem;
                    padding: 8px 16px;
                    transition: transform var(--transition-fast);
                    cursor: default;
                }
                
                .keywords-cloud .badge:hover {
                    transform: scale(1.05) rotate(2deg);
                }
            `}</style>
        </section>
    );
};

export default About;
