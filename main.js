// Assuming ECMAScript modules are supported and set up correctly
import { resources } from './resourceManager.js';

document.addEventListener("DOMContentLoaded", () => {
    initResourceDisplay();

    document.querySelector('nav').addEventListener('click', handleNavigationClick);
});

function initResourceDisplay() {
    Object.keys(resources).forEach(displayResources);
}

function displayResources(resourceType) {
    const container = document.querySelector(`#${resourceType}`);
    if (!container) {
        console.error(`Invalid container for resources: ${resourceType}`);
        return;
    }

    // Clear the container and prepare for new content
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    resources[resourceType].forEach(resource => {
        fragment.appendChild(createResourceElement(resource));
    });

    container.appendChild(fragment);
}

function createResourceElement(resource) {
    const element = document.createElement('div');
    element.className = 'resource';
    element.innerHTML = `
        <h3 class="resource-title">${resource.title}</h3>
        <p class="resource-description">${resource.description}</p>
        ${resource.link ? `<a href="${resource.link}" class="resource-link" target="_blank">View Resource</a>` : ''}
        ${resource.videoId ? `<iframe class="resource-video" src="https://www.youtube.com/embed/${resource.videoId}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0" style="width:100%; height:auto; aspectRatio:16/9;"></iframe>` : ''}
    `;
    return element;
}

function handleNavigationClick(event) {
    const target = event.target.closest('a');
    if (target && target.hash) {
        const resourceType = target.hash.substring(1);
        if (resources[resourceType]) {
            displayResources(resourceType);
        } else {
            console.error(`Resource category not found: ${resourceType}`);
        }
    }
}

