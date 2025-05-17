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
    
    // ルール説明の要素を取得
    const rulesTitle = $('.rules-title');
    const ruleItems = $('.rule-item');
    const gameButtons = $('.game-buttons');
    
    // JoJoオノマトペリスト
    const onomatopoeia = ['ゴゴゴ...', 'ドドド...', 'バァーン!', 'ズキュウウン!', 'ドォーン!'];
    
    // アンバランスな間隔で表示するアニメーション
    function animateSequentially() {
        // 各ボックスを不規則な間隔で表示
        const delays = [500, 1800, 1200, 2000, 1500, 2000]; // ミリ秒
        
        let totalDelay = 0;
        boxes.forEach((box, index) => {
            totalDelay += delays[index];
            setTimeout(function() {
                box.removeClass('hidden').addClass('visible');
                
                // 最後のボックスが表示された後、ゲームコンテナを表示
                if (index === boxes.length - 1) {
                    setTimeout(showGameContainer, 2000); // 最後の吹き出しから2秒後に表示
                }
            }, totalDelay);
        });
    }
    
    // ゲームコンテナを表示する関数
    function showGameContainer() {
        $('.game-container').addClass('visible-game').removeClass('hidden-game');
        
        // ゲームコンテナ表示後、ルール説明のタイトルを表示
        setTimeout(showRules, 800);
    }
    
    // オノマトペを表示する関数
    function showOnomatopoeia(target) {
        const text = onomatopoeia[Math.floor(Math.random() * onomatopoeia.length)];
        const onoElem = $('<div class="onomatopoeia">' + text + '</div>');
        
        // 要素の左側に配置（少しのランダム性を残す）
        const offsetX = -80 - Math.random() * 20; // 左に-80〜-100pxの位置
        const offsetY = 10 + Math.random() * 20; // 縦位置は少し下にずらす
        
        onoElem.css({
            'left': (target.offset().left + offsetX) + 'px',
            'top': (target.offset().top + offsetY) + 'px'
        });
        
        $('body').append(onoElem);
        
        // アニメーション終了後に要素を削除
        setTimeout(() => {
            onoElem.remove();
        }, 800);
    }
    
    // ルール説明を順番に表示する関数
    function showRules() {
        // まずタイトルを表示し、オノマトペを追加
        rulesTitle.addClass('visible-rule').removeClass('hidden-rule');
        showOnomatopoeia(rulesTitle);
        
        // 各ルール項目を1つずつ表示（1.2秒間隔）- よりジョジョ風に
        ruleItems.each(function(index) {
            const item = $(this);
            setTimeout(() => {
                item.addClass('visible-rule').removeClass('hidden-rule');
                showOnomatopoeia(item);
                
                // 最後のルール項目が表示された後、ボタンを表示
                if (index === ruleItems.length - 1) {
                    setTimeout(() => {
                        gameButtons.addClass('visible-buttons').removeClass('hidden-buttons');
                        // ボタンエリアにもオノマトペを追加
                        showOnomatopoeia(gameButtons);
                    }, 1200);
                }
            }, 1500 * (index + 1)); // 少し長めの間隔（ジョジョ的な間）
        });
    }
    
    // ページ読み込み時にアニメーション開始
    setTimeout(animateSequentially, 800);
});