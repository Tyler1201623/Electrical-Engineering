// elementFactory.js

/**
 * Creates an HTML element for a resource with proper structure and accessibility.
 * @param {Object} resource An object containing details about the resource.
 * @param {string} resource.title The title of the resource.
 * @param {string} resource.description A brief description of the resource.
 * @param {string} [resource.link] A URL to the resource.
 * @param {string} [resource.videoId] A YouTube video ID for embedding.
 * @returns {HTMLElement} The resource element.
 */
export function createResourceElement({ title, description, link, videoId }) {
    // Create the main resource container
    const resourceDiv = document.createElement('div');
    resourceDiv.className = 'resource';

    // Create and append the title element
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    resourceDiv.appendChild(titleElement);

    // Create and append the description element
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    resourceDiv.appendChild(descriptionElement);

    // Conditionally create and append the link element
    if (link) {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = 'View Resource';
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer'; // Security measure for links opening new tabs
        resourceDiv.appendChild(linkElement);
    }

    // Conditionally create and append the video iframe
    if (videoId) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.allowFullscreen = true;
        iframe.style.width = '100%';
        iframe.style.height = 'auto';
        iframe.style.aspectRatio = '16/9';
        iframe.frameBorder = '0';
        resourceDiv.appendChild(iframe);
    }

    return resourceDiv;
}

/**
 * Example usage within a larger application context, such as initializing
 * this module on a specific page load or within a single-page application's routing lifecycle.
 */
document.addEventListener("DOMContentLoaded", function() {
    console.log("Element factory ready to create resource elements.");
});
