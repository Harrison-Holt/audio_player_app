// Get DOM elements
const rewindButton = document.getElementById('rewind-btn');
const playPauseButton = document.getElementById('play-pause-btn');
const forwardButton = document.getElementById('forward-btn');
const currentTimeElement = document.getElementById('current-time');
const addTitleButton = document.getElementById('add-title-btn');
const removeTitleButton = document.getElementById('remove-title-btn');

// Select the file input and audio elements
const fileInput = document.getElementById('audio-upload');
const audioFile = new Audio();
const audioFileNameElement = document.getElementById('audio-file-name');
const playlistElement = document.getElementById('playlist');

// Handle file selection
fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (file && file.type === 'audio/mpeg') {
        const fileURL = URL.createObjectURL(file);
        audioFile.src = fileURL;
        audioFileNameElement.textContent = file.name;

        // Optionally, add the uploaded file to the playlist
        const newTitle = { title: file.name, time: 0 };
        playlist.push(newTitle);
        const button = document.createElement('button');
        button.textContent = newTitle.title;
        button.addEventListener('click', () => playSegment(newTitle.time));
        playlistElement.appendChild(button);
    } else {
        alert('Please upload a valid MP3 file.');
    }
});

const playlist = [
 { title: 'Title 1', time: 0 },
 { title: 'Title 2', time: 180 },
 { title: 'Title 3', time: 300 },
 // Add more titles as needed
]; 

// Create playlist buttons
playlist.forEach((item, index) => {
    const button = document.createElement('button');
    button.textContent = item.title;
    button.addEventListener('click', () => playSegment(item.time));
    playlistElement.appendChild(button);
   });
   // Play segment of audio
   function playSegment(time) {
    audioFile.currentTime = time;
    audioFile.play();
   }
   // Rewind 5 seconds
   rewindButton.addEventListener('click', () => {
    audioFile.currentTime -= 5;
   });

   // Play/Pause toggle
playPauseButton.addEventListener('click', () => {
    if (audioFile.paused) {
    audioFile.play();
    playPauseButton.textContent = 'Pause';
    } else {
    audioFile.pause();
    playPauseButton.textContent = 'Play';
    }
   });
   // Forward 5 seconds
   forwardButton.addEventListener('click', () => {
    audioFile.currentTime += 5;
   });
   // Update current time display
   audioFile.addEventListener('timeupdate', () => {
    currentTimeElement.textContent = formatTime(audioFile.currentTime);
   });

   function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
   }
   // Add Title to playlist
   addTitleButton.addEventListener('click', () => {
    const title = prompt('Enter title:');
    const time = audioFile.currentTime;
    const newTitle = { title, time };
    playlist.push(newTitle);
    const button = document.createElement('button');
    button.textContent = newTitle.title;
    button.addEventListener('click', () => playSegment(newTitle.time));
    playlistElement.appendChild(button);
   });
   // Remove Title from playlist
   removeTitleButton.addEventListener('click', () => {
    const titleToRemove = prompt('Enter the title to remove:');
    const indexToRemove = playlist.findIndex(item => item.title === titleToRemove);
    if (indexToRemove !== -1) {
    playlist.splice(indexToRemove, 1);
    playlistElement.removeChild(playlistElement.children[indexToRemove]);
    }
   });