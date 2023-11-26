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
function onVideoEnded() {
    videoElement.removeEventListener('ended', onVideoEnded);
    loadVideo();
    }
    videoElement.addEventListener('ended', onVideoEnded);
    loadVideo();
window.onload = loadVideo;
videoElement.addEventListener('ended', loadVideo);

//++++++++++++++++++signinpage++++++++++++++++++++
// function SignInPage(){
//     let signUpForm = document.getElementById('signUpForm');
//     signUpForm.style.display = 'none';
//     let signInForm = document.getElementById('signInForm');
//     signInForm.style.display = 'flex';
//     let container = document.getElementById('form-container');
//     container.style.transition = 'flex-direction 0.5s ease-in-out';
//     requestAnimationFrame(() => {
//         // Change flexDirection to row-reverse
//         container.style.flexDirection = 'row-reverse';
//     });

//     container.addEventListener('transitionend', function() {
//         container.style.transition = '';
//     }, { once: true });
// }
function SignInPage() {
    
    let signUpForm = document.getElementById('signUpForm');
    signUpForm.style.display = 'none';
    let signInForm = document.getElementById('signInForm');
    signInForm.style.display = 'flex';
    let container = document.getElementById('form-container');
    container.style.flexDirection = 'row-reverse';

}
//++++++++++++++++++signuppage++++++++++
function SignUpPage() {

    let signInForm = document.getElementById('signInForm');
    signInForm.style.display = 'none';
    let signUpForm = document.getElementById('signUpForm');
    signUpForm.style.display = 'flex';
    let container = document.getElementById('form-container');
    container.style.flexDirection = 'row';

}
//++++++++++++++++++++++++++++++