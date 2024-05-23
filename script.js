document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('videoElement');
    const canvas = document.getElementById('photoCanvas');
    const overlay = document.getElementById('overlay');
    let context = canvas.getContext('2d');
    let gameStarted = false;

    // カメラのストリームを取得（内カメラ、40:30の比率）
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'user',
            aspectRatio: 40 / 30
        }
    })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("Error accessing the camera: " + err);
    });

    // スクリーンショットを撮る関数
    function takeScreenshot() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        overlay.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
        video.style.display = 'none'; // ビデオフィードを非表示にする
    }

    // スライダーで透明度を変更する関数
    function changeTransparency(value) {
        overlay.style.opacity = value / 100;
    }

    // スライダーのDOM要素を取得
    const slider = document.getElementById('transparencySlider');

    // スライダーの値が変更されたときのイベントリスナーを追加
    slider.addEventListener('input', () => {
        const value = slider.value;
        changeTransparency(value);
    });

    // 画面をタップしたときのイベントリスナーを追加
    document.addEventListener('mousedown', () => {
        if (!gameStarted) {
            takeScreenshot();
            gameStarted = true;
        }
    });
});


