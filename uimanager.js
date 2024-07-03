// uiManager.js
import { getResources } from './resourceManager.js';
import { createResourceElement } from './elementFactory.js';

export function setupUI() {
    const resources = getResources();
    Object.keys(resources).forEach(type => {
        const container = document.querySelector(`#${type}`);
        if (container) {
            // Clear existing content to avoid duplication on re-render
            container.innerHTML = '';
            resources[type].forEach(resource => {
                const element = createResourceElement(resource);
                container.appendChild(element);
            });
        } else {
            console.error(`No container found for resource type: ${type}`);
        }
    });
}

// Optional: Setup event listeners or other UI interactions
export function setupEventListeners() {
    document.querySelector('nav').addEventListener('click', event => {
        const target = event.target.closest('a');
        if (target && target.hash) {
            event.preventDefault(); // Prevent the default anchor click behavior
            const resourceType = target.hash.substring(1); // Strip the '#' from the hash
            displayResources(resourceType);
        }
    });
}

// Function to display resources for a specific type
export function displayResources(resourceType) {
    const container = document.querySelector(`#${resourceType}`);
    if (!container) {
        console.error(`Invalid container for resources: #${resourceType}`);
        return;
    }

    const resources = getResources()[resourceType];
    if (!resources) {
        console.error(`No resources found for type: ${resourceType}`);
        return;
    }

    container.innerHTML = ''; // Clear the container first
    resources.forEach(resource => {
        container.appendChild(createResourceElement(resource));
    });
}

// Debounce function to improve performance on frequent events
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Initialize the UI setup on document ready
document.addEventListener("DOMContentLoaded", () => {
    setupUI();
    setupEventListeners(); // Setup all event listeners after the UI is ready

    // Optionally debounce event listeners for performance
    window.addEventListener('resize', debounce(() => {
        console.log('Window resized, updating UI...');
        setupUI(); // Re-setup UI on window resize if necessary
    }, 200));
});
