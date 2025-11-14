//Boooton"Size"
document.querySelectorAll(".btn.Size").forEach(button => {
    button.addEventListener("click", function () {
        // Убираем класс "active" у всех кнопок
        document.querySelectorAll(".btn.Size").forEach(btn => btn.classList.remove("active"));

        // Добавляем "active" только на нажатую кнопку
        this.classList.add("active");
    });
});
//Boooton"Size"

//Cart Button
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-button');
    const cartNotification = document.getElementById('cart-notification');
    const sizeNotification = document.getElementById('size-notification');
    
    if (cartButton) {
        cartButton.addEventListener('click', function() {
            // Check if size is selected
            const isSizeSelected = document.querySelector('.btn.Size.active') !== null;
            
            if (isSizeSelected) {
                // Show success notification
                if (cartNotification) {
                    cartNotification.classList.add('show');
                    
                    // Hide notification after 4 seconds
                    setTimeout(function() {
                        cartNotification.classList.remove('show');
                    }, 4000);
                }
                
                // Change button text
                if (cartButton.textContent === 'Добавить в корзину') {
                    cartButton.textContent = 'Перейти в корзину';
                }
                
                // Hide size warning if it's showing
                if (sizeNotification && sizeNotification.classList.contains('show')) {
                    sizeNotification.classList.remove('show');
                }
            } else {
                // Show size warning notification
                if (sizeNotification) {
                    sizeNotification.classList.add('show');
                    
                    // Hide notification after 4 seconds
                    setTimeout(function() {
                        sizeNotification.classList.remove('show');
                    }, 4000);
                }
            }
        });
    }
});
//Cart Button


//Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return; // Only run on pages with carousel

    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.nav-dot');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');
    const container = document.querySelector('.carousel-container');
    
    let currentIndex = 1;
    let autoScrollInterval;
    let isMouseOver = false;
    
    // Function to update carousel state
    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === getPrevIndex()) {
                item.classList.add('prev');
            } else if (index === getNextIndex()) {
                item.classList.add('next');
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function getPrevIndex() {
        return (currentIndex - 1 + items.length) % items.length;
    }
    
    function getNextIndex() {
        return (currentIndex + 1) % items.length;
    }
    
    // Navigate to previous slide
    function prevSlide() {
        currentIndex = getPrevIndex();
        updateCarousel();
    }
    
    // Navigate to next slide
    function nextSlide() {
        currentIndex = getNextIndex();
        updateCarousel();
    }
    
    // Click events for navigation
    if (leftArrow) leftArrow.addEventListener('click', prevSlide);
    if (rightArrow) rightArrow.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-scroll functionality
    function startAutoScroll() {
        if (!isMouseOver) {
            autoScrollInterval = setInterval(nextSlide, 3000);
        }
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Mouse events to control auto-scrolling
    if (container) {
        container.addEventListener('mouseenter', () => {
            isMouseOver = true;
            stopAutoScroll();
        });
        
        container.addEventListener('mouseleave', () => {
            isMouseOver = false;
            startAutoScroll();
        });
    }
    
    // Start auto-scrolling on page load
    startAutoScroll();
    
    // Initial carousel setup
    updateCarousel();
});
//Carousel

// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const checkoutButton = document.querySelector('.checkout-button');

    if (quantityBtns.length > 0) {
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                let value = parseInt(input.value);

                if (this.classList.contains('minus') && value > 1) {
                    input.value = value - 1;
                } else if (this.classList.contains('plus')) {
                    input.value = value + 1;
                }
            });
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // Здесь будет логика оформления заказа
            alert('Переход к оформлению заказа');
        });
    }
});
// Cart Page Functionality

// Order Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.querySelector('.order-form');
    const continueBtn = document.querySelector('.continue-btn');
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Проверяем все обязательные поля
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const city = document.getElementById('city');
            const address = document.getElementById('address');
            const phone = document.getElementById('phone');
            const agreement = document.getElementById('agreement');
            
            // Проверяем заполнение всех полей
            const fields = [name, email, city, address, phone];
            let isValid = true;
            
            fields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Проверяем согласие
            if (!agreement.checked) {
                agreement.parentElement.style.color = 'red';
                isValid = false;
            } else {
                agreement.parentElement.style.color = '#333';
            }
            
            if (isValid) {
                // Здесь будет логика отправки формы
                alert('Заказ оформлен!');
            }
        });
    }
    
    // Валидация email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
            this.style.borderColor = isValidEmail ? '#ddd' : 'red';
        });

        // Добавляем placeholder для формата email
        emailInput.placeholder = 'example@domain.com';
    }
    
    // Валидация телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        let previousValue = '';
        
        // Добавляем placeholder для формата телефона
        phoneInput.placeholder = '+7(999)999 99 99';

        phoneInput.addEventListener('input', function(e) {
            let cursorPosition = this.selectionStart;
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';

            if (value.length >= 1) {
                // Добавляем +7 в начало
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                formattedValue = '+7';
                if (value.length > 0) {
                    formattedValue += '(' + value.substring(0, 3);
                }
                if (value.length >= 3) {
                    formattedValue += ')' + value.substring(3, 6);
                }
                if (value.length >= 6) {
                    formattedValue += ' ' + value.substring(6, 8);
                }
                if (value.length >= 8) {
                    formattedValue += ' ' + value.substring(8, 10);
                }
            }

            this.value = formattedValue;

            // Восстанавливаем положение курсора
            if (cursorPosition < this.value.length) {
                this.setSelectionRange(cursorPosition, cursorPosition);
            }

            previousValue = this.value;
        });

        // Проверяем формат при потере фокуса
        phoneInput.addEventListener('blur', function() {
            if (this.value.length > 0 && this.value.length < 17) { // +7(999)999 99 99
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
});
// Order Form Functionality

// Navigation with FaceLogo Transition
document.addEventListener('DOMContentLoaded', function() {
    // Сохраняем предыдущую страницу в localStorage при переходе
    if (window.location.pathname.includes('index.html')) {
        localStorage.setItem('previousPage', 'index.html');
    } else if (window.location.pathname.includes('cataloge.html') || 
               window.location.pathname.includes('gallerry.html')) {
        localStorage.setItem('previousPage', window.location.pathname.split('/').pop());
    }

    // Если мы на странице faceLogo.html
    if (window.location.pathname.includes('faceLogo.html')) {
        const previousPage = localStorage.getItem('previousPage');
        const targetPage = previousPage === 'index.html' ? 
            (localStorage.getItem('targetPage') || 'cataloge.html') : 
            'index.html';

        // Добавляем класс для начала анимации
        const logo = document.querySelector('.facelogo2');
        if (logo) {
            logo.style.opacity = '0';
            // Небольшая задержка перед началом анимации
            setTimeout(() => {
                logo.style.opacity = '1';
            }, 100);
        }

        // Задержка перед редиректом для отображения лого
        setTimeout(() => {
            // Плавно скрываем лого перед переходом
            if (logo) {
                logo.style.transition = 'opacity 0.5s';
                logo.style.opacity = '0';
            }
            // Переходим на следующую страницу после затухания
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500);
        }, 2000); // Увеличили время показа до 2 секунд для нескольких пульсаций
    }

    // Обрабатываем клики по ссылкам на main.html
    if (window.location.pathname.includes('index.html')) {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.includes('cataloge.html') || href.includes('gallerry.html'))) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.setItem('targetPage', href);
                    window.location.href = 'faceLogo.html';
                });
            }
        });
    }

    // Обрабатываем клики по ссылкам на cataloge.html и gallerry.html
    if (window.location.pathname.includes('cataloge.html') || 
        window.location.pathname.includes('gallerry.html')) {
        document.querySelectorAll('a[href="index.html"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'faceLogo.html';
            });
        });
    }
});
// Navigation with FaceLogo Transition


