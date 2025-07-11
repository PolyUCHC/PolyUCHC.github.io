
// article.js

// Fetch the JSON data once
let articleLinks = [];

function updateRandomLinks() {
    const anchors = document.querySelectorAll('.skills__data a');

    anchors.forEach(anchor => {
        if (articleLinks.length > 0) {
            const random = articleLinks[Math.floor(Math.random() * articleLinks.length)];
            anchor.href = random.url;
        }
    });
}

// Load articles.json once, then start interval updates
fetch('assets/data/articles.json')
    .then(response => response.json())
    .then(data => {
        articleLinks = data;
        updateRandomLinks(); // First update right away
        setInterval(updateRandomLinks, 60000); // Update every 60 seconds
    })
    .catch(error => console.error('Error loading JSON:', error));
