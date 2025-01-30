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

// Additional DOM elements
const timeResult = document.getElementById('time-result');
const userInput = document.getElementById('user-input');
const wpmResult = document.getElementById('wpm-result');
const levelResult = document.getElementById('level-result');
const retryBtn = document.getElementById('retry-btn');

// Initialize textarea state
userInput.disabled = false;

// Timer variables
let startTime;
let timerInterval;
let isTimerRunning = false;
let isFirstKeystroke = true;

// Timer functions
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 10); // Update every 10ms
    }
}

// Add keydown event listener for Enter key
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && isTimerRunning) {
        e.preventDefault(); // Prevent new line in textarea
        stopTimer();
    }
});

function stopTimer() {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(timerInterval);
        const endTime = Date.now();
        const timeInSeconds = (endTime - startTime) / 1000;
        const finalTime = formatTime(endTime - startTime);
        
        // Calculate and display WPM
        const typedText = userInput.value;
        const wpm = calculateWPM(typedText, timeInSeconds);
        
        // Update results
        timeResult.textContent = `Time: ${finalTime}`;
        wpmResult.textContent = `WPM: ${wpm}`;
        levelResult.textContent = `Level: ${difficultyDropdown.textContent}`;
        
        // Disable controls
        userInput.disabled = true;
    }
}

function updateTimer() {
    const currentTime = Date.now() - startTime;
    timeResult.textContent = `Time: ${formatTime(currentTime)}`;
}

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
}

function calculateWPM(typedText, timeInSeconds) {
    // Get the sample text for comparison
    const sampleText = sampleTextElement.textContent;
    
    // Split both texts into words
    const sampleWords = sampleText.trim().split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);
    
    // Count correctly typed words
    let correctWords = 0;
    for (let i = 0; i < Math.min(sampleWords.length, typedWords.length); i++) {
        if (sampleWords[i] === typedWords[i]) {
            correctWords++;
        }
    }
    
    // Calculate WPM: (correct words / time in minutes)
    const minutes = timeInSeconds / 60;
    return Math.round(correctWords / minutes);
}

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
        
        // Update level in results
        levelResult.textContent = `Level: ${difficulty}`;
    });
});

function resetGame() {
    // Stop timer if running
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
    
    // Reset input and results
    userInput.value = '';
    userInput.disabled = false;
    timeResult.textContent = 'Time: ';
    wpmResult.textContent = 'WPM: ';
    
    // Reset sample text highlighting
    const originalText = sampleTextElement.textContent;
    sampleTextElement.innerHTML = `<span class="not-typed">${originalText}</span>`;

    isFirstKeystroke = true;
}

// Add retry button event listener
retryBtn.addEventListener('click', resetGame);

function compareText(typedText) {
    // Get original text without any HTML
    const sampleText = sampleTextElement.textContent;
    
    // Split both texts into words
    const sampleWords = sampleText.split(' ');
    const typedWords = typedText.trim().split(' ');
    
    // Create spans for each word with appropriate styling
    const formattedText = sampleWords.map((word, index) => {
        if (!typedWords[index]) {
            // Word hasn't been typed yet
            return `<span class="not-typed">${word}</span>`;
        }
        
        // Exact match comparison
        const isCorrect = word === typedWords[index];
        const className = isCorrect ? 'correct' : 'incorrect';
        return `<span class="${className}">${word}</span>`;
    });
    
    // Join words with space and update HTML
    sampleTextElement.innerHTML = formattedText.join(' ');
}

// Modify input event listener for real-time feedback
userInput.addEventListener('input', (e) => {
    if (isFirstKeystroke) {
        startTimer();
        isFirstKeystroke = false;
    }
    if (isTimerRunning) {
        compareText(e.target.value);
    }
});

function initializeGame() {
    // Set initial sample text with Easy difficulty
    sampleTextElement.textContent = getRandomText('easy');
    // Initialize with not-typed class
    sampleTextElement.innerHTML = `<span class="not-typed">${sampleTextElement.textContent}</span>`;
    isFirstKeystroke = true;
    userInput.disabled = false;
}

// Call initialize function when DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeGame);
