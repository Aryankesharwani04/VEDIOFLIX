// ++++++++++++++++++ SIDEBAR ++++++++++++++++++++++++++++++++
function sidebarClose(){
    let sidebarClose = document.getElementById('sidebarOpen');
    sidebarClose.style.display = 'none';
    
    let sidebarOpen = document.getElementById('sidebarClose');
    sidebarOpen.style.display = 'flex';
}
function sidebarOpen(){
    
    let sidebarClose = document.getElementById('sidebarClose');
    sidebarClose.style.display = 'none';
    let sidebarOpen = document.getElementById('sidebarOpen');
    sidebarOpen.style.display = 'flex';
    
}
// +++++++++++++++++++VIDEO Elements++++++++++++++++++++++++++++++
function createVideo(){
    let containerClose = document.getElementById('container');
    containerClose.style.display = 'none';
    let createVideo = document.getElementById('createVideo');
    createVideo.style.display = 'block';
    
}
function startBtn(){
    let startBtn = document.getElementById('startBtn');
    startBtn.style.display = 'none';
    let pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.style.display = 'block';
    let stopBtn = document.getElementById('stopBtn');
    stopBtn.style.display = 'block';
}
function stopBtn(){
    let startBtn = document.getElementById('startBtn');
    startBtn.style.display = 'block';
    let pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.style.display = 'none';
    let stopBtn = document.getElementById('stopBtn');
    stopBtn.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {

    const video = document.getElementById('video');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const uploadBtn = document.getElementById('uploadBtn');

    let mediaRecorder;
    let recordedChunks = [];

    startBtn.addEventListener('click', startRecording);
    pauseBtn.addEventListener('click', pauseRecording);
    stopBtn.addEventListener('click', stopRecording);
    downloadBtn.addEventListener('click', downloadVideo);
    uploadBtn.addEventListener('change', handleUpload);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        video.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            video.srcObject = null; // Stop the stream
            video.src = url;
            recordedChunks = [];
            downloadBtn.href = url;
            downloadBtn.download = 'recorded-video.webm';
            downloadBtn.disabled = false;
            startBtn.disabled = false; // Enable start button again
            pauseBtn.disabled = true;
            stopBtn.disabled = true; // Disable stop button after recording
        };

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;

        mediaRecorder.start();
    }

    function pauseRecording() {
        if (mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
            pauseBtn.innerText = `Resume`;
        } else if (mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
            pauseBtn.innerText = 'Pause';
        }
    }

    function stopRecording() {
        if (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused') {
            mediaRecorder.stop();
            // Note: The onstop event will handle UI state
        }
    }

    function downloadVideo() {
        // Download using a data URL
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recorded-video.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // function handleUpload(event) {
    //     const file = event.target.files[0];
    //     if (file) {
    //         video.src = URL.createObjectURL(file);
    //         startBtn.disabled = true;
    //         pauseBtn.disabled = true;
    //         stopBtn.disabled = true;
    //         downloadBtn.disabled = false;
    //     }
    // }
});
// +++++++++++++++++++++++++++Image Uploading+++++++++++++++++++++++++++++++
function uploadImage() {
    const input = document.getElementById('imageInput');
    const preview = document.getElementById('imagePreview');

    if (input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const reader = new FileReader();
        reader.onloadend = function () {
            console.log('Image preview successful.');
            preview.src = reader.result;
        };

        reader.readAsDataURL(file);

        fetch('upload.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Image upload successful:', data);
            preview.src = data.imageUrl;
        })
        .catch(error => console.error('Error:', error));
    } 
    else {
        alert('Please select an image to upload.');
    }
    let uploadButton = document.getElementById('uploadButton');
    uploadButton.style.display = 'none';
    let imagePreview = document.getElementById('circle-crop');
    imagePreview.style.display = 'flex';
}
// function uploadImage() {
//     const input = document.getElementById('imageInput');
//     const cropperContainer = document.querySelector('.cropper-container');
//     const preview = document.getElementById('imagePreview');

//     if (input.files.length > 0) {
//         const file = input.files[0];
//         const formData = new FormData();
//         formData.append('image', file);

//         const reader = new FileReader();
//         reader.onloadend = function () {
//             // Initialize Cropper.js
//             const cropper = new Cropper(preview, {
//                 aspectRatio: 1,  // Set the aspect ratio as needed
//                 viewMode: 2,     // Set the view mode as needed
//                 ready: function () {
//                     // Destroy the previous cropper instance
//                     if (this.cropper) {
//                         this.cropper.destroy();
//                     }
//                     // Replace the preview image with the uploaded image
//                     this.replace(reader.result);
//                 },
//             });

//             // Display the cropper container
//             cropperContainer.style.display = 'block';

//             // Upload the cropped image on button click
//             document.querySelector('button').onclick = function () {
//                 // Get the cropped canvas
//                 const croppedCanvas = cropper.getCroppedCanvas();
//                 // Convert the canvas to a Blob
//                 croppedCanvas.toBlob(function (blob) {
//                     // Append the Blob to the FormData
//                     formData.set('croppedImage', blob, 'croppedImage.png');
//                     // Upload the FormData
//                     fetch('upload.php', {
//                         method: 'POST',
//                         body: formData,
//                     })
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log('Image upload successful:', data);
//                         // Assuming the server responds with the URL of the uploaded image
//                         preview.src = data.imageUrl;
//                     })
//                     .catch(error => console.error('Error:', error));
//                 });
//             };
//         };

//         reader.readAsDataURL(file);
//     } else {
//         alert('Please select an image to upload.');
//     }
//     let uploadButton = document.getElementById('uploadButton');
//     uploadButton.style.display = 'none';
//     let imagePreview = document.getElementById('circle-crop');
//     imagePreview.style.display = 'flex';
// }

function showUploadButton(){
    let imageInput = document.getElementById('imageInput');
    imageInput.style.display = 'none';
    let uploadButton = document.getElementById('uploadButton');
    uploadButton.style.display = 'flex';
}
// function showImagePreview(){
//     let uploadButton = document.getElementById('uploadButton');
//     uploadButton.style.display = 'none';
//     let imagePreview = document.getElementById('circle-crop');
//     imagePreview.style.display = 'flex';
// }
// ++++++++++++++++++++++++++++++Login-Page++++++++++++++++++++++++++++++++++++++++++++++
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
const videoElement = document.getElementById('slideshowVideo');
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
function homePage(){
    // const nameInput = document.getElementById('name');
    // const usernameInput = document.getElementById('username');
    // const emailInput = document.getElementById('email');
    // const passwordInput = document.getElementById('password');

    // const name = nameInput.value.trim();
    // const username = usernameInput.value.trim();
    // const email = emailInput.value.trim();
    // const password = passwordInput.value.trim();

    // if (name === '' || email === '' || password === '' || username === '') {
    //     alert('Please fill in all fields before submitting.');
    //     return;
    // }
    document.getElementById('homePage').style.display = 'flex';
    document.getElementById('loginPage').style.display = 'none';
  
  
}
// function homePage2(){
//     // const nameInputSignin = document.getElementById('signInName');
//     // const passwordInputSignin = document.getElementById('signInPassword');

//     // if(nameInputSignin.value.trim() === '' || passwordInputSignin.value.trim() === '')
//     // {
//     //     alert('Please fill in all fields before submitting.');
//     //     return;
//     // }
//         let homePage = document.getElementById('homePage');
//         homePage.style.display = 'flex';
        
//         let loginPage = document.getElementById('loginPage');
//         loginPage.style.display = 'none';
// }