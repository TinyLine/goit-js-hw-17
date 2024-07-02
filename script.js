const apiKey = '44745318-d405a2bfe88f16496c90839a8';
let page = 1;

async function apiImageLink(apiKey, query, page) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&page=${page}&per_page=6`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.hits.map(hit => hit.webformatURL);
    } catch (error) {
        console.error('Error fetching data from Pixabay API:', error);
        return [];
    }
}

async function loadMoreImages() {
    const imageContainer = document.getElementById('imageContainer');
    const imageUrls = await apiImageLink(apiKey, 'nature', page);
    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Зображення з Pixabay';
        imageContainer.appendChild(img);
    });
    page++;
}

document.getElementById('loadMoreBtn').addEventListener('click', loadMoreImages);

loadMoreImages();

