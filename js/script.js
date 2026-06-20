const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }

    });

}, {
    threshold: 0.2
});

document
    .querySelectorAll('.section, .project-card, .article-item')
    .forEach(element => {

        element.classList.add('fade-in');
        observer.observe(element);

    });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute('href')
        );

        if(target){

            target.scrollIntoView({
                behavior: 'smooth'
            });

        }

    });

});
 // Slide database - You can easily swap these mock presentation images for your real case study slides!
        const projectDecks = {
            'saint-laurent': [
                './assets/images/YSL Portfolio/1.png',
                './assets/images/YSL Portfolio/2.png',
                './assets/images/YSL Portfolio/3.png',
                './assets/images/YSL Portfolio/4.png',
                './assets/images/YSL Portfolio/5.png',
                './assets/images/YSL Portfolio/6.png',
                './assets/images/YSL Portfolio/7.png',
                './assets/images/YSL Portfolio/8.png',
                './assets/images/YSL Portfolio/9.png',
                './assets/images/YSL Portfolio/10.png',
                './assets/images/YSL Portfolio/11.png',
                './assets/images/YSL Portfolio/12.png'
            ],
            'illy': [
                './assets/images/Illy/illy strategic presentation/1.png',
                './assets/images/Illy/illy strategic presentation/2.png',
                './assets/images/Illy/illy strategic presentation/3.png',
                './assets/images/Illy/illy strategic presentation/4.png',
                './assets/images/Illy/illy strategic presentation/5.png',
                './assets/images/Illy/illy strategic presentation/6.png',
                './assets/images/Illy/illy strategic presentation/7.png',
                './assets/images/Illy/illy strategic presentation/8.png',
                './assets/images/Illy/illy strategic presentation/9.png',
                './assets/images/Illy/illy strategic presentation/10.png',
                './assets/images/Illy/illy strategic presentation/11.png',
                './assets/images/Illy/illy strategic presentation/12.png',
                './assets/images/Illy/illy strategic presentation/13.png',
                './assets/images/Illy/illy strategic presentation/14.png',
                './assets/images/Illy/illy strategic presentation/15.png',
                './assets/images/Illy/illy strategic presentation/16.png',
                './assets/images/Illy/illy strategic presentation/17.png',
                './assets/images/Illy/illy strategic presentation/18.png',
                './assets/images/Illy/illy strategic presentation/19.png',
                './assets/images/Illy/illy strategic presentation/20.png',
                './assets/images/Illy/illy strategic presentation/21.png',
                './assets/images/Illy/illy strategic presentation/22.png',
                './assets/images/Illy/illy strategic presentation/23.png'
            ],
            'valentino': [
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .001.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .002.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .003.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .004.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .005.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .006.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .007.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .008.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .009.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .010.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .011.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .012.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .013.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .014.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .015.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .016.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .017.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .018.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .019.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .020.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .021.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .022.png',
                './assets/images/Valentino/Valentino Business Case /Valentino Business Case .023.png'
            ]
        };

        const theater = document.getElementById('project-theater');
        const wrapper = document.getElementById('slides-wrapper');
        const counter = document.getElementById('hud-counter');
        let currentSlideIndex = 0;
        let totalSlides = 0;

        // Open the theater and inject appropriate slide images
        function openProject(projectId) {
            const slides = projectDecks[projectId];
            if (!slides) return;
            
            // Build the slides inside the horizontal wrapper
            wrapper.innerHTML = '';
            slides.forEach((slideSrc, idx) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'project-slide';
                
                // Nest inside strict 16:9 aspect ratio frame
                slideDiv.innerHTML = `
                    <div class="slide-frame">
                        <img src="${slideSrc}" alt="Presentation Slide ${idx + 1}">
                    </div>
                `;
                wrapper.appendChild(slideDiv);
            });

            currentSlideIndex = 0;
            totalSlides = slides.length;
            updateHUD();

            // Open overlay & lock site vertical scroll
            theater.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Scroll the wrapper back to absolute start
            wrapper.scrollLeft = 0;
        }

        function closeProjectTheater() {
            theater.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Horizontal Slide Navigation Logic
        function slideNext() {
            if (currentSlideIndex < totalSlides - 1) {
                currentSlideIndex++;
                scrollToSlide(currentSlideIndex);
            }
        }

        function slidePrev() {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                scrollToSlide(currentSlideIndex);
            }
        }

        function scrollToSlide(index) {
            const slideWidth = wrapper.clientWidth;
            wrapper.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
            updateHUD();
        }

        function updateHUD() {
            counter.innerHTML = `Slide <span>${currentSlideIndex + 1}</span> of ${totalSlides}`;
        }

        // Listen for horizontal scroll events to update HUD (for manual touch swipe/trackpad scroll)
        wrapper.addEventListener('scroll', () => {
            const slideWidth = wrapper.clientWidth;
            if (slideWidth > 0) {
                const index = Math.round(wrapper.scrollLeft / slideWidth);
                if (index !== currentSlideIndex && index < totalSlides) {
                    currentSlideIndex = index;
                    updateHUD();
                }
            }
        });

        // Keyboard Arrow Listeners for high-end feel
        window.addEventListener('keydown', (e) => {
            if (!theater.classList.contains('active')) return;
            
            if (e.key === 'ArrowRight') {
                slideNext();
            } else if (e.key === 'ArrowLeft') {
                slidePrev();
            } else if (e.key === 'Escape') {
                closeProjectTheater();
            }
        });

        // Automatically update slide width parameters if browser is resized while theater is open
        window.addEventListener('resize', () => {
            if (theater.classList.contains('active')) {
                scrollToSlide(currentSlideIndex);
            }
        });
        
        /* --- 7. DYNAMIC INTERSECTION OBSERVER FOR MOBILE VIEWPORTS --- */
        // Automatically expands the vertical drawer as the user scrolls them into focus
        const observerOptions = {
            root: null, // Viewport
            rootMargin: '-15% 0px -15% 0px', // Shrink the trigger boundary area to the middle of the screen
            threshold: 0.15 // Triggers when 15% of the card occupies this center screen boundary
        };

        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('expanded');
                } else {
                    entry.target.classList.remove('expanded');
                }
            });
        }, observerOptions);

        // Bind observer to all rows
        document.querySelectorAll('.project-row').forEach(row => {
            projectObserver.observe(row);
        });
