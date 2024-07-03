// navigationManager.js
import { displayResources } from './uiManager.js'; // Assume displayResources is a function that updates UI based on the resource type.

export function handleNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) {
        console.error('Navigation element not found');
        return;
    }

    nav.addEventListener('click', event => {
        const target = event.target.closest('a');
        if (target && target.hash) {
            event.preventDefault(); // Prevent the default anchor click behavior
            const category = target.hash.slice(1); // Remove the '#' to get the identifier
            console.log(`Navigating to category: ${category}`);

            displayResources(category); // Dynamically update the displayed resources based on the clicked navigation link
            updateActiveLink(target); // Update the visual state of the active navigation link
            smoothScrollToContent(category); // Smoothly scroll to the content section
        }
    });
}

function updateActiveLink(activeElement) {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => link.classList.remove('active'));
    activeElement.classList.add('active');
}

function smoothScrollToContent(category) {
    const targetSection = document.getElementById(category);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Target section with id '${category}' not found`);
    }
}

// Optionally include a function to setup the navigation when the page loads
export function setupNavigation() {
    handleNavigation(); // Attach event listeners

    // Automatically display the first category content if needed
    const firstNavLink = document.querySelector('nav a');
    if (firstNavLink) {
        displayResources(firstNavLink.hash.slice(1)); // Display initial content without triggering click event
        updateActiveLink(firstNavLink); // Set the first link as active
    }
}

// Example of integrating the navigation setup within the DOMContentLoaded if it's not already managed elsewhere
document.addEventListener("DOMContentLoaded", setupNavigation);
