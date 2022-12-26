const API_KEY = "";
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

const generateBody = (image) => {
    const body = {
        request: [
            {
                image: {
                    content: image
                },
                features: [
                    {
                        type: 'TEXT_DETECTION',
                        maxResults: 1
                    }
                ]
            }
        ]
    };
    return body;
}

const callGoogleVision = async (image) => {
    const body = generateBody(image);
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(result);
    const detectedText = result.response[0].fullTextAnnotation;
    return detectedText ? detectedText : { text: "This image doesn't contain any text!" }
}

export default callGoogleVision;