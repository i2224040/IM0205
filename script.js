document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('videoElement');
    const canvas = document.getElementById('photoCanvas');
    const overlay = document.getElementById('overlay');
    let context = canvas.getContext('2d');
    let transparency = 0;
    let gameStarted = false;

    // カメラのストリームを取得（内カメラ、4:3の比率）
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'user',
            aspectRatio: 4 / 3
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
        overlay.style.opacity = 0; // 透明度を初期化
        transparency = 0; // 透明度を初期化
    }

    // 透明度を増加させる関数
    function increaseTransparency() {
        if (transparency < 100) {
            transparency++;
            overlay.style.opacity = transparency / 100;
            console.log(`Transparency increased to: ${transparency}`);
        }
    }

    // タップイベントリスナー
    document.addEventListener('click', () => {
        if (!gameStarted) {
            takeScreenshot();
            gameStarted = true;
        } else {
            increaseTransparency();
        }
    });
});
