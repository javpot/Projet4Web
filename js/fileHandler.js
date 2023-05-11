const fs = require('fs');
const path = require('path');

function sendImage(requestedPath, response) {
    const imagePath = path.join(__dirname, "../" + requestedPath);
    const imageExtension = path.extname(imagePath).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

    if (allowedExtensions.includes(imageExtension)) {
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write('404 Not Found');
                response.end();
            } else {
                response.writeHead(200, { 'Content-Type': getContentTypeByExtension(imageExtension) });
                response.write(data);
                response.end();
            }
        });
    } else {
        response.writeHead(403, { 'Content-Type': 'text/html' });
        response.write('403 Forbidden');
        response.end();
    }
}

function sendCSS(requestedPath, response) {
    const cssPath = path.join(__dirname, "../" + requestedPath);
    const cssExtension = path.extname(cssPath).toLowerCase();
    const allowedExtensions = ['.css'];

    if (allowedExtensions.includes(cssExtension)) {
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write('404 Not Found');
                response.end();
            } else {
                response.writeHead(200, { 'Content-Type': getContentTypeByExtension(cssExtension) });
                response.write(data);
                response.end();
            }
        });
    } else {
        response.writeHead(403, { 'Content-Type': 'text/html' });
        response.write('403 Forbidden');
        response.end();
    }
}

function sendContent(requestedPath, response) {
    const contentPath = path.join(__dirname, "../" + requestedPath);
    const contentExtension = path.extname(contentPath).toLowerCase();
    const allowedExtensions = ['.html', '.txt', '.js'];

    if (allowedExtensions.includes(contentExtension)) {
        fs.readFile(contentPath, (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write('404 Not Found');
                response.end();
            } else {
                response.writeHead(200, { 'Content-Type': getContentTypeByExtension(contentExtension) });
                response.write(data);
                response.end();
            }
        });
    } else {
        response.writeHead(403, { 'Content-Type': 'text/html' });
        response.write('403 Forbidden');
        response.end();
    }
}

function getContentTypeByExtension(extension) {
    const contentTypes = {
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
        '.gif': 'image/gif', '.bmp': 'image/bmp', '.webp': 'image/webp', '.css': 'text/css',
        '.js': 'text/javascript', '.html': 'text/html', '.txt': 'text/plain'
    };

    return contentTypes[extension] || 'application/octet-stream';
}

module.exports = { sendImage, sendCSS, sendContent };
