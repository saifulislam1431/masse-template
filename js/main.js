const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener('click', function () {
    let icon = document.getElementsByClassName("menu-icon")[0]; // Access the first element
    let smallMenu = document.getElementsByClassName("small-menu")[0]; // Access the small-menu

    // Toggle the "open" class on the menu icon
    icon.classList.toggle("open");

    // Check if the "open" class is added and apply the CSS
    if (icon.classList.contains("open")) {
        smallMenu.classList.add("small-active");
    } else {
        smallMenu.classList.remove("small-active");
    }
});



// Function to update the active link based on the hash
function setActiveLink() {
    const links = document.querySelectorAll('.nav-items a');
    console.log(links);

    const currentHash = window.location.hash || '#banner' || "/";  // Default to #home if no hash is present
    console.log(currentHash);

    links.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('nav-active');
        } else {
            link.classList.remove('nav-active');
        }
    });
}

// Add event listener for hash changes
window.addEventListener('hashchange', setActiveLink);

// Set the active link when the page loads
setActiveLink();


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const boxes = document.querySelectorAll('.box');
const options = {
    root: null, // Use the viewport as the root
    threshold: 0.6 // Trigger when 60% of the box is in the viewport
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, options);

// Observe each box
boxes.forEach(box => {
    observer.observe(box);
});