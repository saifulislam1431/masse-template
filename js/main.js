const menuBtn = document.getElementById("menuBtn");

const navContainer = document.getElementById('navBarContainer');

// Add an event listener for scroll
window.addEventListener('scroll', () => {
    // Check if the user has scrolled down 100 pixels or more
    if (window.scrollY > 100) {
        navContainer.classList.add('nav-bg');
    } else {
        navContainer.classList.remove('nav-bg');
    }
});


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

    const currentHash = window.location.hash || '/';  // Default to #home if no hash is present
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


// const boxes = document.querySelectorAll('.box');
// const options = {
//     root: null, // Use the viewport as the root
//     threshold: 0.6 // Trigger when 60% of the box is in the viewport
// };

// const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('active');
//         } else {
//             entry.target.classList.remove('active');
//         }
//     });
// }, options);

// // Observe each box
// boxes.forEach(box => {
//     observer.observe(box);
// });

const serviceContainer = document.getElementById("cards");

// Function to render the services data
const showServicesData = (servicesData) => {
    serviceContainer.innerHTML = ''; // Clear any previous content

    servicesData?.forEach((data, index) => {
        serviceContainer.innerHTML += `
        <li class="card" id=card${index + 1} style="--index: ${index + 1}">
            <div class="card-body flex flex-col lg:flex-row gap-10 items-center justify-center lg:justify-between w-full">
                <div class="flex flex-col gap-4" data-aos="fade-right" data-aos-duration="700">
                    <button class="serviceBtn normalFont w-40">Learn More</button>
                    <h2 class="serviceHeading boldFont">${data.title}</h2>
                    <p class="serviceDescription normalFont">${data.description}</p>
                    <p class="serviceBenifit normalFont"><span class="boldFont">Benefits:</span> ${data.benefits}</p>
                </div>

                <div class="w-full" data-aos="zoom-in" data-aos-duration="700">
                ${data.linkType === 'image'
                ? `<img src="${data.link}" alt="${data.title}" class="w-[280px] h-[300px] rounded-xl" style="object-fit: fill;">`
                : `<video controls class="w-[280px] h-[300px] rounded-xl" style="object-fit: fill;" controls=false loop muted autoplay>
                            <source src="${data.link}" type="video/mp4">
                            Your browser does not support the video tag.
                       </video>`
            }
                </div>
            </div>
        </li>
        `;
    });
};

// Fetch the JSON data from the file and display it
const loadServicesData = async () => {
    try {
        const response = await fetch('../jsons/services.json'); // Path to your JSON file
        if (!response.ok) throw new Error('Failed to load JSON data');

        const servicesData = await response.json();
        document.documentElement.style.setProperty('--cards', servicesData.length);
        showServicesData(servicesData); // Render the data
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
};

// Call the function to load and display the services
loadServicesData();



const testimonialContainer = document.getElementById("testimonial-container");

const showTestimonialData = (testimonialData) => {
    testimonialContainer.innerHTML = ''; // Clear any previous content

    testimonialData?.forEach((data, index) => {
        testimonialContainer.innerHTML += `
        <div class="swiper-slide testimonial-card-box cursor-pointer">
            <div class="testimonialCard">
                <div class="slider-image-container">
                    <img src="https://i.ibb.co.com/9qqmpb5/untitled-01976.jpg" alt="Slider Image"
                        class="slider-image" style="width: 100%; height: 100%;">
                </div>
                <div class="testimonial-card-content">
                    <h3 class="poppinsBold">${data.name}</h3>
                    <p class="client_position">${data.designation}</p>
                    <div class="absolute bottom-3 px-2">
<i class="fa-solid fa-quote-left"></i>

                    <p class="client_testimonial">${data.testimonial}"</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    // After rendering the slides, update Swiper
    if (window.mySwiper) {
        // If Swiper already exists, update it
        window.mySwiper.update();
    } else {
        // If Swiper doesn't exist, initialize it
        window.mySwiper = new Swiper(".mySwiper3", {
            loop: true,
            effect: 'slide',
            spaceBetween: 50,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                reverseDirection: true,
            },
        });
    }
};

const loadTestimonialData = async () => {
    try {
        const response = await fetch('../jsons/testimonial.json'); // Path to your JSON file
        if (!response.ok) throw new Error('Failed to load JSON data');

        const testimonialData = await response.json();

        showTestimonialData(testimonialData); // Render the data
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
};

loadTestimonialData();


// Counter
// Smooth counter animation with Intersection Observer

const counters = document.querySelectorAll('.counter-value');
const speed = 200; // Speed of the counter
let observerTriggered = false; // To avoid re-triggering

// Function to animate the counters
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
        const current = +counter.innerText;
        const increment = target / speed;

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            requestAnimationFrame(updateCount); // Smooth animation
        } else {
            counter.innerText = target; // End at target
        }
    };
    updateCount();
}

// Create an Intersection Observer to trigger the counter animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !observerTriggered) {
            observerTriggered = true; // Avoid re-triggering when scrolling back up
            counters.forEach(counter => animateCounter(counter));
        }
    });
}, {
    threshold: 0.5 // 50% of the element needs to be visible
});

// Start observing the section containing the counters
const section = document.querySelector('.counter-section');
observer.observe(section);


// Carousel

