document.getElementById('analyzeButton').addEventListener('click', async () => {
    const input = document.getElementById('imageInput');
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = async function (e) {
            const base64Image = e.target.result.split(',')[1];
            await analyzeImage(base64Image, e.target.result);
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
});

async function analyzeImage(base64Image, imageDataUrl) {
    const apiKey = '6no5BqbYOBBiZzVDJ0cj';
    const modelEndpoint = 'https://app.roboflow.com/my-workspace-z5slm/pytocoin/1';

    try {
        const response = await axios.post(
            `${modelEndpoint}`,
            {
                api_key: apiKey,
                image: base64Image
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const result = response.data;
        displayResult(result, imageDataUrl);
    } catch (error) {
        console.error('Error analyzing image:', error);
    }
}

function displayResult(result, imageDataUrl) {
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);

        result.predictions.forEach(prediction => {
            ctx.beginPath();
            ctx.rect(
                prediction.x - prediction.width / 2,
                prediction.y - prediction.height / 2,
                prediction.width,
                prediction.height
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.stroke();
            ctx.fillText(
                `${prediction.class} (${(prediction.confidence * 100).toFixed(2)}%)`,
                prediction.x - prediction.width / 2,
                prediction.y - prediction.height / 2 - 5
            );
        });
    };

    image.src = imageDataUrl;
}
