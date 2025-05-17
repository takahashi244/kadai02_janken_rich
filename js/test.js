// 食べ物じゃんけんゲーム

// ゲームのルール
// パンは角砂糖に勝つ、チェリーに負ける
// チェリーはパンに勝つ、角砂糖に負ける
// 角砂糖はチェリーに勝つ、パンに負ける

$(document).ready(function () {
  // ゲームの選択肢とルール
  const choices = {
    pan: { display: "パン", beats: "sugar" },
    cherry: { display: "チェリー", beats: "pan" },
    sugar: { display: "角砂糖", beats: "cherry" }
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
  
  // 各ボタンのクリックイベントを設定
  $("#pan, #cherry, #sugar").click(function() {
    const playerChoice = $(this).attr("id");
    console.log("プレイヤーの選択:", playerChoice);
    playGame(playerChoice);
  });

  // ゲーム実行処理
  function playGame(playerChoice) {
    // プレイヤーの選択を表示
    $("#player-choice").text(choices[playerChoice].display);
    
    // コンピュータの選択をランダムに決定
    const computerChoice = getComputerChoice();
    console.log("コンピュータの選択:", computerChoice);
    $("#computer-choice").text(choices[computerChoice].display);
    
    // 勝敗を判定
    const result = determineWinner(playerChoice, computerChoice);
    console.log("勝敗結果:", result);
    
    // 結果表示とアニメーション
    setTimeout(function() {
      console.log("ゲーム画面を非表示にします");
      // ゲームボタンエリアを非表示に
      $(".game-buttons").addClass("hide");
      
      // ゲームエリアを非表示に
      $(".game-area").addClass("hide");
      
      // 少し遅延して結果エリアを表示（フェードイン効果のため）
      setTimeout(function() {
        console.log("結果を表示します");
        // 結果を表示
        displayResult(result, playerChoice, computerChoice);
        
        // 結果エリアを表示
        $(".result-area").addClass("show");
      }, 300);
    }, 800);
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
    
    switch (result) {
      case "win":
        resultText = `あなたの勝ち！ ${choices[playerChoice].display} は ${choices[computerChoice].display} に勝ちました！`;
        $("#result-text").css("color", "green");
        break;
      case "lose":
        resultText = `あなたの負け... ${choices[playerChoice].display} は ${choices[computerChoice].display} に負けました。`;
        $("#result-text").css("color", "red");
        break;
      case "draw":
        resultText = `引き分け！ お互い ${choices[playerChoice].display} を選びました。`;
        $("#result-text").css("color", "blue");
        break;
    }
    
    // 結果テキストを表示
    $("#result-text").text(resultText);
    
    // プレイヤーの選択と結果に基づいて適切な画像を表示
    const imagePath = resultImages[playerChoice][result];
    $("#result-image").attr("src", imagePath).show();
  }
  
  // もう一度プレイするボタンのクリック処理
  $(document).on("click", "#play-again", function() {
    console.log("ゲームをリセットします");
    // 結果エリアを非表示
    $(".result-area").removeClass("show");
    
    // 少し遅延してゲームボタンエリアとゲームエリアを再表示
    setTimeout(function() {
      console.log("ゲーム画面を再表示します");
      // ゲームボタンエリアを再表示
      $(".game-buttons").removeClass("hide");
      
      // ゲームエリアを再表示
      $(".game-area").removeClass("hide");
      
      // 選択をリセット
      $("#player-choice").text("？");
      $("#computer-choice").text("？");
      
      // 結果画像を非表示
      $("#result-image").hide();
    }, 300);
  });
});
