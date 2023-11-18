const videos=[
    'vv1.mp4',
    'vv2.mp4',
    'vv2.mp4',
    'vv3.mp4',
    'vv4.mp4',
    'vv5.mp4',
    'vv6.mp4',
    'vv7.mp4',
    'vv8.mp4',
    'vv9.mp4',
    'vv10.mp4',
    'vv11.mp4',
    'vv12.mp4'
]

let currentVideoIndex = 0;
const videoElement = document.getElementById('video');
const videoContainer = document.getElementById('video-container');

function loadVideo() {
    videoElement.src = videos[currentVideoIndex];
    videoElement.play(); 
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
}

window.onload = loadVideo;

videoElement.addEventListener('ended', loadVideo);
const signin = document.querySelector('onclick');


  
