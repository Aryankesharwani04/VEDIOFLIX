<?php

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Check if the file was uploaded without errors
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $tempPath = $_FILES['image']['tmp_name'];
        $uploadPath = 'uploads/' . basename($_FILES['image']['name']);

        // Move the uploaded file to the desired location
        move_uploaded_file($tempPath, $uploadPath);

        // Respond with the URL of the uploaded image
        $response = ['imageUrl' => $uploadPath];
        echo json_encode($response);
    } else {
        // Handle the case where the file upload failed
        http_response_code(500);
        echo json_encode(['error' => 'File upload failed.']);
    }
} else {
    // Handle the case where the request method is not POST
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>

