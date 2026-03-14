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
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 800;
                    line-height: 1.25;
                    margin-bottom: 24px;
                    color: var(--color-text-main);
                }
                
                .text-highlight {
                    position: relative;
                    display: inline-block;
                    color: var(--color-primary-dark);
                }
                
                .text-highlight::after {
                    content: '';
                    position: absolute;
                    bottom: 8px;
                    left: 0;
                    width: 100%;
                    height: 12px;
                    background-color: var(--color-accent-light);
                    z-index: -1;
                    opacity: 0.8;
                    border-radius: 4px;
                    transform: rotate(-1deg);
                }
                
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
