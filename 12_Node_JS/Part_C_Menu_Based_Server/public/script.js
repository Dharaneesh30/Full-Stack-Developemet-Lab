function handleMenu(option) {
    const viewer = document.getElementById('viewer');
    
    switch(option) {
        case 1:
            // View Text
            viewer.innerHTML = `<iframe src="/api/file/view/sample.txt" width="100%" height="300" style="border:none;"></iframe>`;
            break;
        case 2:
            // View HTML
            viewer.innerHTML = `<iframe src="/api/file/view/sample.html" width="100%" height="300" style="border:none;"></iframe>`;
            break;
        case 3:
            // View PDF
            viewer.innerHTML = `<iframe src="/api/file/view/sample.pdf" width="100%" height="300" style="border:none;"></iframe>`;
            break;
        case 4:
            // View Image
            viewer.innerHTML = `<img src="/api/file/view/sample.jpg" alt="Sample Image">`;
            break;
        case 5:
            // Play Video
            viewer.innerHTML = `<video controls width="100%"><source src="/api/file/view/sample.mp4" type="video/mp4">Your browser does not support the video tag.</video>`;
            break;
        case 6:
            // Download File
            const filename = prompt("Enter the file name to download (e.g., sample.txt, sample.pdf):", "sample.txt");
            if (filename) {
                window.location.href = `/api/file/download/${filename}`;
                viewer.innerHTML = `<p>Initiated download for ${filename}</p>`;
            }
            break;
        case 7:
            // Exit
            viewer.innerHTML = `<p>Thank you for using the Student Digital Resource Server. You can close this window.</p>`;
            document.querySelector('.menu').style.display = 'none';
            break;
        default:
            viewer.innerHTML = `<p>Invalid selection.</p>`;
    }
}
