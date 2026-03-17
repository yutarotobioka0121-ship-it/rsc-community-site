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
                    ✨ 20〜30代の学びと成長のコミュニティ (v2.1)
                </div>
                
                <style>{`
                    .hero-title-inline {
                        font-size: clamp(2.2rem, 6vw, 4rem) !important;
                        font-weight: 800;
                        line-height: 1.4 !important;
                        margin-bottom: 24px;
                        color: #1e293b;
                        padding: 0 16px;
                        word-break: keep-all !important;
                        overflow-wrap: break-word !important;
                    }
                    .phrase-block {
                        display: inline-block !important;
                        white-space: nowrap !important;
                        margin-bottom: 4px;
                    }
                    .highlight-inline {
                        background: linear-gradient(transparent 60%, #fde047 60%) !important;
                        padding: 0 6px !important;
                        border-radius: 4px;
                    }
                    @media (max-width: 480px) {
                        .hero-title-inline {
                            font-size: 1.65rem !important;
                            padding: 0 10px !important;
                        }
                    }
                `}</style>
                
                <h1 className="hero-title-inline animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <span className="phrase-block">学校では学べない、</span>
                    <wbr />
                    <span className="phrase-block highlight-inline">社会人に役立つ知識</span>
                    <span className="phrase-block">を</span>
                    <br className="mobile-break" />
                    <span className="phrase-block">学ぼう</span>
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

            {/* Styles are now in index.css */}
        </section>
    );
};

export default Hero;
