// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    
    // ヘッダーのスクロール効果
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    // スクロール時のヘッダー変化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // モバイルメニューの開閉
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // ウィンドウサイズが変更されたときの処理
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                nav.style.display = 'flex';
            } else {
                nav.style.display = 'none';
            }
        });
    }
    
    // スムーススクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                if (window.innerWidth <= 768 && nav) {
                    nav.style.display = 'none';
                }
            }
        });
    });
    
    // スクロール時のアニメーション
    const animateElements = document.querySelectorAll('.problem-item, .service-item, .strength-item, .case-item, .pricing-plan, .testimonial-item, .flow-step');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 初期状態を設定してオブザーバーに登録
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // カウントアップアニメーション（数字がある場合）
    const countElements = document.querySelectorAll('.count-number');
    
    function animateCount(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 50);
    }
    
    // カウントアニメーションの実行
    const countObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    countElements.forEach(element => {
        countObserver.observe(element);
    });
    
    // フォームの送信処理
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 送信ボタンを無効化
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
            
            // バリデーション
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                showMessage('必須項目を入力してください。', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                return;
            }
            
            // フォームデータを取得
            const formData = new FormData(this);
            
            // PHPファイルに送信
            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage(data.message, 'success');
                    // フォームをリセット
                    this.reset();
                } else {
                    if (data.errors && data.errors.length > 0) {
                        showMessage(data.errors.join('<br>'), 'error');
                    } else {
                        showMessage(data.message || '送信に失敗しました。', 'error');
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('送信に失敗しました。しばらく時間をおいて再度お試しください。', 'error');
            })
            .finally(() => {
                // 送信ボタンを元に戻す
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    });
    
    // メッセージ表示関数
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
    
    // パララックス効果（軽量版）
    const parallaxElements = document.querySelectorAll('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // ローディングアニメーション
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // ページ読み込み完了時のアニメーション
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    });
    
    // 固定CTAボタンの表示制御
    const fixedCta = document.querySelector('.fixed-cta');
    const finalCtaSection = document.querySelector('.final-cta');
    
    if (fixedCta && finalCtaSection) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fixedCta.style.opacity = '0';
                    fixedCta.style.pointerEvents = 'none';
                } else {
                    fixedCta.style.opacity = '1';
                    fixedCta.style.pointerEvents = 'auto';
                }
            });
        }, { threshold: 0.1 });
        
        ctaObserver.observe(finalCtaSection);
    }
    
    // タイピングエフェクト（キャッチコピー用）
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ページ読み込み時の初期化
    function init() {
        // ヒーローセクションの初期状態
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        }
        
        // 固定CTAの初期状態
        if (fixedCta) {
            fixedCta.style.transition = 'opacity 0.3s ease';
        }
    }
    
    init();
    
    // グローバル関数：クリップボードにコピー
    window.copyToClipboard = function() {
        if (!window.emailData) {
            alert('メールデータが見つかりません。');
            return;
        }
        
        const fullText = `件名: ${window.emailData.subject}\n\n${window.emailData.body}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(fullText).then(() => {
                alert('メール内容をクリップボードにコピーしました。\nメールクライアントに貼り付けて送信してください。');
            }).catch(() => {
                // フォールバック
                fallbackCopyTextToClipboard(fullText);
            });
        } else {
            fallbackCopyTextToClipboard(fullText);
        }
    };
    
    // フォールバック用のコピー関数
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('メール内容をクリップボードにコピーしました。\nメールクライアントに貼り付けて送信してください。');
            } else {
                alert('コピーに失敗しました。手動でコピーしてください。');
            }
        } catch (err) {
            alert('コピーに失敗しました。手動でコピーしてください。');
        }
        
        document.body.removeChild(textArea);
    }
    
    // グローバル関数：メールクライアントを開く
    window.openMailClient = function() {
        if (!window.emailData) {
            alert('メールデータが見つかりません。');
            return;
        }
        
        const subject = encodeURIComponent(window.emailData.subject);
        const body = encodeURIComponent(window.emailData.body);
        const mailtoUrl = `mailto:${window.emailData.to}?subject=${subject}&body=${body}`;
        
        // 新しいウィンドウで開く
        window.open(mailtoUrl, '_blank');
        
        // フォールバック
        setTimeout(() => {
            window.location.href = mailtoUrl;
        }, 100);
    };
    
    // デバッグ用：コンソールにページ情報を表示
    console.log('%c🏢 しまだWeb制作 - Website Loaded Successfully! 🚀', 'color: #2c5aa0; font-size: 16px; font-weight: bold;');
    console.log('開発者向け情報：');
    console.log('- レスポンシブデザイン対応済み');
    console.log('- SEO最適化済み');
    console.log('- アクセシビリティ対応済み');
    console.log('- 高速読み込み最適化済み');
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// パフォーマンス測定
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`ページ読み込み時間: ${loadTime}ms`);
        
        // Core Web Vitals の簡易測定
        if ('PerformanceObserver' in window) {
            // LCP (Largest Contentful Paint)
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('LCP:', entry.startTime);
                }
            }).observe({entryTypes: ['largest-contentful-paint']});
            
            // FID (First Input Delay) 代替
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            }).observe({entryTypes: ['first-input']});
        }
    }
});
