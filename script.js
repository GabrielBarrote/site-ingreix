document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progressHeight = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = progressHeight + "%";
    });

    // 2. Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth scrolling for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Animate on Scroll & Counters (Intersection Observer)
    const animElements = document.querySelectorAll('.animate-on-scroll');
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters if the football section comes into view
                if (entry.target.id === 'football' && !countersAnimated) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const updateCount = () => {
                            if (count < target) {
                                count++;
                                counter.innerText = count;
                                setTimeout(updateCount, 200); // Slow count up
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                    countersAnimated = true;
                }
            }
        });
    }, { threshold: 0.15 });

    animElements.forEach(el => observer.observe(el));
});

// 5. Global Functions: Interactive Map Logic (Click-based)
const cityTitle = document.getElementById('city-title');
const cityDesc = document.getElementById('city-desc');
const pins = document.querySelectorAll('.map-pin');

function selectCity(element, name, description) {
    // Remove selected class from all pins
    pins.forEach(pin => pin.classList.remove('selected'));
    
    // Add selected class to the clicked pin
    element.classList.add('selected');

    // Update tooltip text
    cityTitle.textContent = name;
    cityDesc.textContent = description;
}

// Add event listener to deselect city when clicking outside the map-container
document.addEventListener('click', (event) => {
    const isMapClick = event.target.closest('.map-container');
    if (!isMapClick) {
        pins.forEach(pin => pin.classList.remove('selected'));
        cityTitle.textContent = "Explore Germany";
        cityDesc.textContent = "Click on a red pin to learn more about a major city.";
    }
});

// 6. Global Functions: Castle Slider
let currentSlide = 0;
function moveSlider(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active-slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active-slide');
}
