document.addEventListener("DOMContentLoaded", () => {
    const resources = {
        courses: [
            {
                title: 'Introduction to Circuit Analysis',
                description: 'Learn the basics of electrical circuits, including resistors, capacitors, and Ohm\'s Law.', 
                link: 'https://learn.sparkfun.com/tutorials/voltage-current-resistance-and-ohms-law/all', //hardcode all these links into my resourcemanager.js
                videoId: 'r-SCyD7f_zI'
            }
        ],
        tutorials: [
            {
                title: 'Soldering Basics',
                description: 'A tutorial on the fundamentals of soldering electronic components.',
                link: '#',
                videoId: 'vIT4ra6Mo0s'
            }
        ],
        labs: [
            {
                title: 'Circuit Building Lab',
                description: 'Experiment with building circuits in a virtual lab environment.',
                link: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_en.html',
                videoId: 'MUX6rcU28h8'
            }
        ],
        quizzes: [
            {
                title: 'Ohm\'s Law Quiz',
                description: 'Test your knowledge on Ohm\'s Law.',
                link: 'https://sciencesource2.pearsoncanada.ca/resources/hotpotato_quiz_09_11_3.htm',
                videoId: 'FkvsyFRzJ5w'
            }
        ]
    };

    function createResourceElement({ title, description, link, videoId }) {
        const resourceDiv = document.createElement('div');
        resourceDiv.className = 'resource';

        const titleH3 = document.createElement('h3');
        titleH3.textContent = title;
        resourceDiv.appendChild(titleH3);

        const descP = document.createElement('p');
        descP.textContent = description;
        resourceDiv.appendChild(descP);

        if (link) {
            const linkA = document.createElement('a');
            linkA.href = link;
            linkA.textContent = 'View Resource';
            linkA.target = '_blank';
            resourceDiv.appendChild(linkA);
        }

        if (videoId) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.width = '100%';
            iframe.height = 'auto';
            iframe.style.aspectRatio = '16 / 9';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            resourceDiv.appendChild(iframe);
        }

        return resourceDiv;
    }

    function displayResources(resourceType) {
        const container = document.querySelector(`#${resourceType}`);
        if (!container) {
            console.error(`Invalid container for resources: #${resourceType}`);
            return;
        }

        container.innerHTML = '';
        resources[resourceType].forEach(resource => {
            const element = createResourceElement(resource);
            if (element) {
                container.appendChild(element);
            }
        });
    }

    function detectAdBlocker() {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        document.body.appendChild(testAd);
        window.setTimeout(() => {
            if (testAd.offsetHeight === 0) {
                console.warn('AdBlocker detected: Some features like videos might not work correctly.');
                document.getElementById('adBlockWarning').style.display = 'block';
            }
            testAd.remove();
        }, 100);
    }

    document.querySelector('nav').addEventListener('click', (event) => {
        const target = event.target.closest('a');
        if (target) {
            const category = target.getAttribute('href').slice(1);
            if (resources[category]) {
                displayResources(category);
            } else {
                console.error(`Resource category not found: ${category}`);
            }
        }
    });

    detectAdBlocker();
    Object.keys(resources).forEach(displayResources);  // Automatically display all resources on load
});