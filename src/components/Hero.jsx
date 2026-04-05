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
                    <span className="title-phrase">一生モノの</span>
                    <wbr />
                    <span className="title-phrase text-highlight">「経済」と「時間」の自由</span>
                    <span className="title-phrase">を</span>
                </h1>
                
                <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    一生モノの「経済」と「時間」の自由を、仲間と共に創り出す。<br />
                    RSCは、自らの人生をデザインし、共に成長し合える挑戦者のためのコミュニティです。
                </p>
                
                <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <a href="#events" className="btn btn-primary btn-large">
                        開催中のイベントを見る
                    </a>
                    <p className="main-philosophy">
                        一生モノの「経済」と「時間」の自由を、<br />
                        仲間と共に創り出す。
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
