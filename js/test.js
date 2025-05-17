// 食べ物じゃんけんゲーム

// ゲームのルール
// パンは角砂糖に勝つ、チェリーに負ける
// チェリーはパンに勝つ、角砂糖に負ける
// 角砂糖はチェリーに勝つ、パンに負ける

$(document).ready(function () {
  // 選択肢の定義を画像パスを含む形に拡張
  const choices = {
    pan: {
      display: "パン",
      image: "image/select_pan2.png",
      beats: "sugar"
    },
    cherry: {
      display: "チェリー",
      image: "image/select_cherry2.png",
      beats: "pan"
    },
    sugar: {
      display: "角砂糖",
      image: "image/select_sugar2.png",
      beats: "cherry"
    }
  };
  
  // 結果画像のパス（選択と結果の組み合わせで9パターン）
  const resultImages = {
    pan: {
      win: "image/win_pan.jpg",    // パンで勝った
      lose: "image/lose_pan.jpg",  // パンで負けた
      draw: "image/draw_pan.jpg"   // パンで引き分け
    },
    cherry: {
      win: "image/win_cherry.jpg",    // チェリーで勝った
      lose: "image/lose_cherry.png",  // チェリーで負けた
      draw: "image/draw_cherry.jpg"   // チェリーで引き分け
    },
    sugar: {
      win: "image/win_sugar.png",    // 角砂糖で勝った
      lose: "image/lose_sugar.jpg",  // 角砂糖で負けた
      draw: "image/draw_sugar.jpg"   // 角砂糖で引き分け
    }
  };
  
  // ゲームの状態管理変数
  let isFirstPlay = true; // 初回プレイかどうかを判定するフラグ
  
  // 各ボタンのクリックイベントを設定
  $("#pan, #cherry, #sugar").click(function() {
    const playerChoice = $(this).attr("id");
    console.log("プレイヤーの選択:", playerChoice);
    playGame(playerChoice);
  });

  // ゲーム実行処理の修正
  function playGame(playerChoice) {
    // 選択内容を一時保存（まだ表示しない）
    const computerChoice = getComputerChoice();
    
    // manga-intro部分も含めて非表示にする
    $(".manga-intro").addClass("hide-permanent");
    $(".game-buttons").addClass("hide");
    $(".game-rules").addClass("hide");
    
    // 画面切り替えのための遅延
    setTimeout(function() {
      // ゲームコンテナをタイトル下の位置に移動させる
      $(".game-container").addClass("game-active-position");
      
      // この時点で game-area を表示
      $(".game-area").removeClass("hidden-game-area").addClass("visible-game-area");
      
      // プレイヤーの選択を画像で表示
      setTimeout(function() {
        $("#player-choice-img")
          .attr("src", choices[playerChoice].image)
          .attr("alt", choices[playerChoice].display)
          .addClass("active");
        
        // コンピュータの選択を少し遅れて表示 - ここの遅延時間を長くする
        setTimeout(function() {
          $("#computer-choice-img")
            .attr("src", choices[computerChoice].image)
            .attr("alt", choices[computerChoice].display)
            .addClass("active");
          
          // 最後に結果を表示 - 必要に応じてここも調整
          setTimeout(function() {
            // 勝敗判定と結果表示
            const result = determineWinner(playerChoice, computerChoice);
            displayResult(result, playerChoice, computerChoice);
            
            // 結果エリアを表示
            $(".result-area").addClass("show");
          }, 800); // 結果表示までの遅延
        }, 2000); // ここを長くする（例: 2000）- コンピューターの手表示までの遅延
      }, 400); // プレイヤーの手表示までの遅延
    }, 600); // 画面切り替えの遅延
  }
  
  // コンピュータの選択をランダムに決定する関数
  function getComputerChoice() {
    const choices = ["pan", "cherry", "sugar"];
    
    // 乱数生成プロセスの詳細をコンソールに表示
    const randomValue = Math.random();
    console.log("生成された乱数:", randomValue);
    
    const scaledValue = randomValue * choices.length;
    console.log("選択肢数を掛けた値:", scaledValue);
    
    const randomIndex = Math.floor(scaledValue);
    console.log("切り捨て後のインデックス:", randomIndex);
    
    const computerChoice = choices[randomIndex];
    console.log(`インデックス ${randomIndex} の選択肢: "${computerChoice}"`);
    
    return computerChoice;
  }
  
  // 勝敗を判定する関数
  function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "draw";
    }
    if (choices[playerChoice].beats === computerChoice) {
      return "win";
    }
    return "lose";
  }
  
  // 結果を表示する関数
  function displayResult(result, playerChoice, computerChoice) {
    let resultText = "";
    
    // 以前のクラスをすべて削除
    $("#result-text").removeClass("win lose draw");
    
    switch (result) {
      case "win":
        resultText = `あなたの勝ち！ ${choices[playerChoice].display} は ${choices[computerChoice].display} に勝ちました！`;
        $("#result-text").addClass("win");
        break;
      case "lose":
        resultText = `あなたの負け... ${choices[playerChoice].display} は ${choices[computerChoice].display} に負けました。`;
        $("#result-text").addClass("lose");
        break;
      case "draw":
        resultText = `引き分け！ お互い ${choices[playerChoice].display} を選びました。`;
        $("#result-text").addClass("draw");
        break;
    }
    
    // 結果テキストを表示
    $("#result-text").text(resultText);
    
    // 結果画像を表示
    const imagePath = resultImages[playerChoice][result];
    $("#result-image").attr("src", imagePath).show();
  }
  
  // もう一度プレイするボタンの処理も修正
  $(document).on("click", "#play-again", function() {
    // 結果エリアを非表示
    $(".result-area").removeClass("show");
    
    // game-area も非表示に戻す
    $(".game-area").removeClass("visible-game-area").addClass("hidden-game-area");
    
    // 選択をリセット
    setTimeout(function() {
      // 画像を？に戻す
      $("#player-choice-img")
        .attr("src", "image/question_mark.png")
        .attr("alt", "？")
        .removeClass("active");
      
      $("#computer-choice-img")
        .attr("src", "image/question_mark.png")
        .attr("alt", "？")
        .removeClass("active");
      
      // 結果テキストをリセット
      $("#result-text").text("選択してください");
      
      // 結果画像を非表示
      $("#result-image").hide();
      
      // ボタンを再表示
      setTimeout(function() {
        $(".game-buttons").removeClass("hide");
      }, 300);
    }, 400);
  });
});
