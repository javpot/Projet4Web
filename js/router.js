const fileHandler = require('./fileHandler');

function routeRequest(request, response) {
    const pathRequest = request.url;
    const pathParts = pathRequest.split('/');
    const pathType = getPathType(pathParts[1]);

    switch (pathType) {
        case 'root':
            fileHandler.sendContent('/content/Acceuil.html', response);
            break;
        case 'img':
            fileHandler.sendImage(getImagePath(pathParts), response);
            break;
        case 'css':
            fileHandler.sendCSS(pathRequest, response);
            break;
        case 'js':
            fileHandler.sendContent('/content/menu.js', response);
            break;
        case 'content':
            fileHandler.sendContent(getContentPath(pathParts), response);
            break;
        default:
            send404(response);
    }
}

function getPathType(pathPart) {
    const types = {
        '': 'root',
        'img': 'img',
        'css': 'css',
        'js': 'js',
        'content': 'content'
    };
    return types[pathPart] || 'unknown';
}

function getImagePath(pathParts) {
    return `/${pathParts[1]}/${pathParts[2]}`;
}

function getContentPath(pathParts) {
    return `/${pathParts[1]}/${pathParts[2]}`;
}

function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write('404 Not Found');
    response.end();
}

module.exports = { routeRequest };