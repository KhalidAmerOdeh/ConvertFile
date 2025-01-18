<?php
if ($_FILES["file"]["error"] > 0) {
    echo "Error: " . $_FILES["file"]["error"];
} else {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
    echo "File uploaded successfully!";
}
?>