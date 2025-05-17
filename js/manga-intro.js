$(document).ready(function() {
    // 吹き出しを取得
    const boxes = [
        $('.manga-box-1'),
        $('.manga-box-2'),
        $('.manga-box-3'),
        $('.manga-box-4'),
        $('.manga-box-5'),
        $('.manga-box-6')
    ];
    
    // アンバランスな間隔で表示するアニメーション
    function animateSequentially() {
        // 各ボックスを不規則な間隔で表示
        const delays = [500, 1800, 1200, 2000, 1500, 2000]; // ミリ秒
        
        let totalDelay = 0;
        boxes.forEach((box, index) => {
            totalDelay += delays[index];
            setTimeout(function() {
                box.removeClass('hidden').addClass('visible');
                
                // 最後のボックスが表示された後、追加の遅延を入れてゲームコンテナを表示
                if (index === boxes.length - 1) {
                    setTimeout(showGameContainer, 3000); // 最後の吹き出しから3秒後に表示
                }
            }, totalDelay);
        });
    }
    
    // ゲームコンテナを表示する関数
    function showGameContainer() {
        $('.game-container').addClass('visible-game').removeClass('hidden-game');
    }
    
    // ページ読み込み時にアニメーション開始
    setTimeout(animateSequentially, 800);
});