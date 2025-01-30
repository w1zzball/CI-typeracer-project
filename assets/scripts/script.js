// Sample texts for different difficulty levels
const sampleTexts = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "A rainbow appeared after the heavy rain.",
        "She sells seashells by the seashore."
    ],
    medium: [
        "The spacecraft circumnavigated the globe in precisely eighty-seven minutes.",
        "The archaeological excavation revealed numerous prehistoric artifacts.",
        "The quantum physicist explained the theory of parallel universes."
    ],
    hard: [
        "The supercalifragilisticexpialidocious phenomenon inexplicably manifested itself.",
        "The psychophysiological mechanisms underlying cognitive behavioral therapy remain enigmatic.",
        "The pneumonoultramicroscopicsilicovolcanoconiosis diagnosis puzzled the physician."
    ]
};

// Get DOM elements
const difficultyDropdown = document.getElementById('difficultyDropdown');
const difficultyItems = document.querySelectorAll('.dropdown-item');
const sampleTextElement = document.getElementById('sample-text');

// Function to get random text based on difficulty
function getRandomText(difficulty) {
    const texts = sampleTexts[difficulty.toLowerCase()];
    return texts[Math.floor(Math.random() * texts.length)];
}

// Add click event listeners to difficulty items
difficultyItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const difficulty = e.target.textContent;
        
        // Update dropdown button text
        difficultyDropdown.textContent = difficulty;
        
        // Update active state
        difficultyItems.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update sample text
        sampleTextElement.textContent = getRandomText(difficulty);
    });
});
