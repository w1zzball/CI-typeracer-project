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
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const timeResult = document.getElementById('time-result');
const userInput = document.getElementById('user-input');
const wpmResult = document.getElementById('wpm-result');

// Initialize textarea state
userInput.disabled = true;

// Timer variables
let startTime;
let timerInterval;
let isTimerRunning = false;

// Timer functions
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 10); // Update every 10ms
        startBtn.disabled = true;
        stopBtn.disabled = false;
        userInput.disabled = false;  // Enable textarea
        userInput.focus();  // Focus textarea for immediate typing
    }
}

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
        
        // Disable controls
        startBtn.disabled = false;
        stopBtn.disabled = true;
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

function calculateWPM(text, timeInSeconds) {
    // Standard word length is considered 5 characters
    const words = text.trim().length / 5;
    const minutes = timeInSeconds / 60;
    return Math.round(words / minutes);
}

// Event listeners for timer buttons
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

// Initialize button states
stopBtn.disabled = true;

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
