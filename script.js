// Main JavaScript for Call 2 Cady

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.hamburger-menu')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Video Carousel Functionality
    const carousel = document.querySelector('.video-carousel');
    
    if (carousel) {
        // Sample carousel data - in a real application, this would come from an API or database
        const carouselData = [
            {
                id: 1,
                title: 'Anupama - Episode 1245',
                thumbnail: 'https://via.placeholder.com/350x200?text=Anupama+Ep+1245',
                videoId: 'dQw4w9WgXcQ',
                show: 'Anupama',
                views: '120K'
            },
            {
                id: 2,
                title: 'Yeh Rishta Kya Kehlata Hai - Episode 3890',
                thumbnail: 'https://via.placeholder.com/350x200?text=Yeh+Rishta+Ep+3890',
                videoId: 'dQw4w9WgXcQ',
                show: 'Yeh Rishta Kya Kehlata Hai',
                views: '115K'
            },
            {
                id: 3,
                title: 'Kumkum Bhagya - Episode 2475',
                thumbnail: 'https://via.placeholder.com/350x200?text=Kumkum+Bhagya+Ep+2475',
                videoId: 'dQw4w9WgXcQ',
                show: 'Kumkum Bhagya',
                views: '105K'
            },
            {
                id: 4,
                title: 'Ghum Hai Kisikey Pyaar Meiin - Episode 825',
                thumbnail: 'https://via.placeholder.com/350x200?text=Ghum+Hai+Ep+825',
                videoId: 'dQw4w9WgXcQ',
                show: 'Ghum Hai Kisikey Pyaar Meiin',
                views: '110K'
            },
            {
                id: 5,
                title: 'Iss Ishq Ka Rabb Rakha - Episode 156',
                thumbnail: 'https://via.placeholder.com/350x200?text=Iss+Ishq+Ep+156',
                videoId: 'dQw4w9WgXcQ',
                show: 'Iss Ishq Ka Rabb Rakha',
                views: '95K'
            }
        ];
        
        // Populate carousel with items
        carouselData.forEach(item => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            carouselItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="info">
                    <h3>${item.title}</h3>
                    <div class="metrics">
                        <span><i class="fas fa-eye"></i> ${item.views}</span>
                    </div>
                </div>
            `;
            
            // Add click event to play video
            carouselItem.addEventListener('click', function() {
                // In a real application, this would open a video player or redirect to the show page
                window.location.href = `${item.show.toLowerCase().replace(/\s+/g, '-')}.html`;
            });
            
            carousel.appendChild(carouselItem);
        });
        
        // Automatic carousel animation
        let position = 0;
        const itemWidth = document.querySelector('.carousel-item').offsetWidth + 20; // width + gap
        const totalItems = carouselData.length;
        const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
        const maxPosition = (totalItems - visibleItems) * itemWidth;
        
        // Clone items for infinite scroll effect
        const clonedItems = Array.from(carousel.querySelectorAll('.carousel-item')).slice(0, visibleItems);
        clonedItems.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });
        
        // Animate carousel
        function animateCarousel() {
            position += 1;
            
            // Reset position for infinite loop
            if (position >= maxPosition + itemWidth) {
                position = 0;
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(-${position}px)`;
                // Force reflow
                carousel.offsetHeight;
                carousel.style.transition = 'transform 0.3s ease';
            } else {
                carousel.style.transform = `translateX(-${position}px)`;
            }
        }
        
        // Start animation
        const carouselInterval = setInterval(animateCarousel, 30);
        
        // Pause animation on hover
        carousel.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });
        
        // Resume animation on mouse leave
        carousel.addEventListener('mouseleave', function() {
            clearInterval(carouselInterval);
            setInterval(animateCarousel, 30);
        });
    }
    
    // FAQ Accordion (if present)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        
        question.addEventListener('click', function() {
            // Toggle active class
            item.classList.toggle('active');
            
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real application, this would send the email to a server
                alert(`Thank you for subscribing with ${email}! You'll receive updates on the latest episodes.`);
                emailInput.value = '';
            }
        });
    }
    
    // Share Button Functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Check if Web Share API is supported
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                })
                .catch(error => console.log('Error sharing:', error));
            } else {
                // Fallback for browsers that don't support Web Share API
                const tempInput = document.createElement('input');
                document.body.appendChild(tempInput);
                tempInput.value = window.location.href;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Show copied message
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
});