function uploadImage() {
    const input = document.getElementById('imageInput');
    const preview = document.getElementById('preview');

    if (input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const reader = new FileReader();
        reader.onloadend = function () {
            console.log('Image preview successful.'); // Add this log statement
            preview.src = reader.result;
        };

        reader.readAsDataURL(file);  // Make sure this line is inside the if block

        fetch('upload.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Image upload successful:', data); // Add this log statement
            // Assuming the server responds with the URL of the uploaded image
            preview.src = data.imageUrl;
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please select an image to upload.');
    }
}
