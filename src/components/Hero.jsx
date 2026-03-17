import React from 'react';

const Hero = () => {
    return (
        <section id="hero" className="hero-section text-center">
            {/* Background Decorations */}
            <div className="bg-shape shape-1 animate-float"></div>
            <div className="bg-shape shape-2 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="bg-shape shape-3 animate-float" style={{ animationDelay: '1s' }}></div>

            <div className="container relative" style={{ zIndex: 2 }}>
                <div className="hero-badge badge badge-yellow mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    ✨ 20〜30代の学びと成長のコミュニティ
                </div>
                
                <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    学校では学べない、<br />
                    <span className="text-highlight">社会人に役立つ知識</span>を<br className="mobile-break" />
                    学ぼう
                </h1>
                
                <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    本グループは学校教育では学べない、社会人に役立つスキルや考え方等を学び、それを伝えることを目的としたグループです。一緒に新しい分野にチャレンジしませんか？
                </p>
                
                <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <a href="#events" className="btn btn-primary btn-large">
                        開催中のイベントを見る
                    </a>
                    <a href="#about" className="btn btn-outline btn-large">
                        RSCについてもっと知る
                    </a>
                </div>
                
                {/* おすすめキーワード タグエリア */}
                <div className="hero-tags-section animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <p style={{ fontWeight: 700, color: '#475569', fontSize: '1.1rem', marginBottom: '24px' }}>こんなキーワードに興味がある方におすすめ！</p>
                    <div className="hero-tags-container">
                        {[
                            { text: "#自己投資", color: "yellow" },
                            { text: "#自己啓発", color: "purple" },
                            { text: "#投資", color: "green" },
                            { text: "#東京", color: "yellow" },
                            { text: "#オンライン", color: "purple" },
                            { text: "#金持ち父さん", color: "purple" },
                            { text: "#スキルアップ", color: "green" },
                            { text: "#NISA", color: "yellow" },
                            { text: "#自己実現", color: "green" },
                            { text: "#株式", color: "green" },
                            { text: "#不動産", color: "yellow" },
                            { text: "#経済", color: "purple" }
                        ].map((tag, index) => (
                            <span key={index} className={`hero-tag hero-tag-${tag.color}`}>
                                {tag.text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .hero-section {
                    position: relative;
                    padding: 160px 0 100px;
                    background: linear-gradient(180deg, var(--color-bg-base) 0%, #E2E8F0 100%);
                    overflow: hidden;
                }
                
                .hero-badge {
                    font-size: 0.95rem;
                    padding: 6px 16px;
                }
                
                .hero-title {
                    font-size: clamp(2rem, 8vw, 4rem);
                    font-weight: 800;
                    line-height: 1.25;
                    margin-bottom: 24px;
                    color: var(--color-text-main);
                    padding: 0 16px;
                }
                
                .text-highlight {
                    display: inline;
                    background: linear-gradient(transparent 60%, var(--color-accent-light) 60%);
                    color: var(--color-primary-dark);
                    padding: 0 4px;
                    border-radius: 4px;
                }
                
                /* Removed .text-highlight::after as it is replaced by background gradient */
                
                .hero-subtitle {
                    font-size: clamp(1rem, 2vw, 1.15rem);
                    color: var(--color-text-muted);
                    max-width: 600px;
                    margin: 0 auto 40px;
                    line-height: 1.8;
                }
                
                .hero-actions {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .btn-large {
                    padding: 16px 36px;
                    font-size: 1.1rem;
                }
                
                .hero-tags-section {
                    max-width: 800px;
                    margin: 48px auto 0;
                    padding: 32px 20px;
                    border: 2px dashed #cbd5e1;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.5);
                }
                
                .hero-tags-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    justify-content: center;
                }
                
                .hero-tag {
                    padding: 8px 16px;
                    border-radius: 9999px;
                    font-weight: 700;
                    font-size: 0.95rem;
                }
                
                .hero-tag-yellow {
                    background-color: #fef3c7;
                    color: #d97706;
                }
                
                .hero-tag-purple {
                    background-color: #e2e8f0;
                    color: #475569;
                }
                
                .hero-tag-green {
                    background-color: #dcfce7;
                    color: #16a34a;
                }
                
                .mobile-break { display: none; }
                
                /* Background Shapes for Pop aesthetic */
                .bg-shape {
                    position: absolute;
                    border-radius: var(--radius-full);
                    opacity: 0.4;
                    z-index: 1;
                    filter: blur(40px);
                }
                
                .shape-1 {
                    width: 300px;
                    height: 300px;
                    background-color: var(--color-primary-light);
                    top: -50px;
                    left: -50px;
                }
                
                .shape-2 {
                    width: 400px;
                    height: 400px;
                    background-color: var(--color-accent-light);
                    bottom: -100px;
                    right: -100px;
                }
                
                .shape-3 {
                    width: 200px;
                    height: 200px;
                    background-color: #38BDF8; /* Light blue */
                    top: 20%;
                    right: 15%;
                }
                
                @media (max-width: 768px) {
                    .hero-section {
                        padding: 120px 0 60px;
                    }
                    .hero-actions {
                        flex-direction: column;
                        padding: 0 20px;
                    }
                    .hero-actions .btn {
                        width: 100%;
                    }
                    .mobile-break { display: block; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
