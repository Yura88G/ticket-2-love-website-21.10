// Повний код js/script.js, який має працювати.
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. ДАНІ ПРОФІЛІВ (ОБ'ЄКТИ)
    // =========================================================================
    const profiles = [
        // ЖІНОЧІ ПРОФІЛІ
        { id: 1, name: 'Анна', age: 32, city: 'Київ', description: 'Архітектор, любить скандинавський дизайн та гірські походи.', img: 'placeholder-woman-1.jpg', gender: 'women' },
        { id: 2, name: 'Олена', age: 28, city: 'Львів', description: 'Художниця, цінує класичну музику та тихі вечори.', img: 'placeholder-woman-2.jpg', gender: 'women' },
        { id: 3, name: 'Софія', age: 35, city: 'Одеса', description: 'Маркетолог, шукає партнера для спільних подорожей та активного відпочинку.', img: 'placeholder-woman-3.jpg', gender: 'women' },
        
        // ЧОЛОВІЧІ ПРОФІЛІ
        { id: 4, name: 'Дмитро', age: 37, city: 'Київ', description: 'IT-підприємець, захоплюється дайвінгом та інвестиціями.', img: 'placeholder-man-1.jpg', gender: 'men' },
        { id: 5, name: 'Олександр', age: 30, city: 'Дніпро', description: 'Фітнес-тренер, цінує здоровий спосіб життя та щирість.', img: 'placeholder-man-2.jpg', gender: 'men' },
        { id: 6, name: 'Максим', age: 41, city: 'Харків', description: 'Адвокат, любить джаз та філософські розмови.', img: 'placeholder-man-3.jpg', gender: 'men' }
    ];

    // =========================================================================
    // 2. БАЗОВА ФУНКЦІОНАЛЬНІСТЬ (Анімації, Меню, Лічильник)
    // =========================================================================
    
    // === ЛОГІКА АНІМАЦІЇ FADE-IN ПРИ СКРОЛІНГУ ===
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));

    // === ЛОГІКА МОБІЛЬНОГО МЕНЮ ===
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
        });
    }

    console.log("Ticket 2 Love: Проект ініціалізовано.");

    // === ФУНКЦІЯ ОНОВЛЕННЯ ЛІЧИЛЬНИКА ОБРАНИХ ===
    const updateFavoritesCounter = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const count = favorites.length;
        const favoritesButtons = document.querySelectorAll('.favorites-button');
        
        favoritesButtons.forEach(button => {
            button.textContent = `Обрані (${count})`;
        });
        
        const selectCountSpan = document.getElementById('select-count');
        if (selectCountSpan) {
            selectCountSpan.textContent = `(${count}/3)`;
            const proceedButton = document.getElementById('proceed-to-application');
            if (proceedButton) {
                 if (count > 0) {
                    proceedButton.classList.remove('disabled');
                    proceedButton.removeAttribute('disabled');
                 } else {
                    proceedButton.classList.add('disabled');
                    proceedButton.setAttribute('disabled', 'true');
                 }
            }
        }
    };

    updateFavoritesCounter();


    // =========================================================================
    // 3. ЛОГІКА КАТАЛОГУ (catalogue.html: ФІЛЬТРАЦІЯ ТА ВІДОБРАЖЕННЯ)
    // =========================================================================
    
    const catalogueSection = document.getElementById('profile-catalogue');

    if (catalogueSection) {
        
        // 1. Отримання параметру gender з URL
        const urlParams = new URLSearchParams(window.location.search);
        const selectedGender = urlParams.get('gender'); 
        
        // 2. Фільтрація профілів
        let filteredProfiles = [];
        let catalogueTitle = 'Каталог Профілів';
        
        if (selectedGender === 'men') {
            filteredProfiles = profiles.filter(p => p.gender === 'men'); 
            catalogueTitle = 'Каталог Чоловічих Профілів 🤵';
        } else if (selectedGender === 'women') {
            filteredProfiles = profiles.filter(p => p.gender === 'women'); 
            catalogueTitle = 'Каталог Жіночих Профілів 🌹';
        } else {
            // За замовчуванням показуємо жінок, якщо перехід був не з головної
            filteredProfiles = profiles.filter(p => p.gender === 'women');
            catalogueTitle = 'Каталог Жіночих Профілів 🌹 (Оберіть стать на Головній)';
        }

        // 3. Оновлення заголовка сторінки
        const catalogueH1 = document.getElementById('catalogue-title');
        if(catalogueH1) {
             catalogueH1.textContent = catalogueTitle;
        }

        const profileGrid = document.getElementById('profile-grid');
        
        if (profileGrid) {
            
            filteredProfiles.forEach(profile => {
                
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const isFavorite = favorites.includes(profile.id.toString());
                const favoriteClass = isFavorite ? 'is-favorite' : '';
                
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';
                profileCard.innerHTML = `
                    <div class="card-header-wrapper">
                         <img src="assets/img/${profile.img}" alt="Фото ${profile.name}" class="profile-photo">
                         <button class="favorite-toggle ${favoriteClass}" data-id="${profile.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                    <div class="card-content">
                        <h2 class="profile-name">${profile.name}, ${profile.age}</h2>
                        <p class="profile-city">${profile.city}</p>
                        <p class="profile-description">${profile.description}</p>
                        <a href="profile.html?id=${profile.id}" class="view-profile-btn cta-her">Переглянути</a>
                    </div>
                `;
                profileGrid.appendChild(profileCard);
            });
            
            // Додавання обробників подій для кнопок "Обрати"
            document.querySelectorAll('.favorite-toggle').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = e.currentTarget.dataset.id;
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    
                    if (favorites.includes(id)) {
                        // Видалити з обраних
                        favorites = favorites.filter(favId => favId !== id);
                        e.currentTarget.classList.remove('is-favorite');
                    } else {
                        // Додати до обраних (з лімітом 3)
                        if (favorites.length < 3) {
                            favorites.push(id);
                            e.currentTarget.classList.add('is-favorite');
                        } else {
                            alert('Ви досягли ліміту (3 профілі). Будь ласка, перейдіть до оформлення заявки.');
                        }
                    }
                    
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    updateFavoritesCounter();
                });
            });
        }
        
        // Логіка переходу до заявки
        const proceedButton = document.getElementById('proceed-to-application');
        if (proceedButton) {
            proceedButton.addEventListener('click', () => {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if (favorites.length > 0) {
                    alert(`Перехід до форми заявки. Обрані ID: ${favorites.join(', ')}`);
                } else {
                    alert('Будь ласка, оберіть хоча б один профіль.');
                }
            });
        }
    }


    // =========================================================================
    // 4. ЛОГІКА СТОРІНКИ ДЕТАЛЬНОГО ПРОФІЛЮ (profile.html)
    // =========================================================================
    
    // Функція для отримання даних профілю за ID
    const getProfileData = (id) => {
        return profiles.find(p => p.id.toString() === id);
    };

    const profileDetailSection = document.getElementById('profile-detail');
    if (profileDetailSection) {
        const urlParams = new URLSearchParams(window.location.search);
        const profileId = urlParams.get('id'); 
        const profile = getProfileData(profileId);
        
        if (profile) {
            const profileNameDetail = document.querySelector('.profile-name-detail');
            const profileCityDetail = document.querySelector('.profile-city-detail');
            const mainProfilePhoto = document.querySelector('.main-profile-photo');
            const selectProfileBtn = document.getElementById('select-profile-btn');

            if (profileNameDetail) profileNameDetail.textContent = `${profile.name}, ${profile.age}`;
            if (profileCityDetail) profileCityDetail.textContent = profile.city;
            if (mainProfilePhoto) mainProfilePhoto.src = `assets/img/${profile.img}`;

            if (selectProfileBtn) {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const isFavorite = favorites.includes(profileId);
                
                selectProfileBtn.textContent = isFavorite ? `Вибрано ✅` : `Обрати ${profile.name}`;
                if (isFavorite) selectProfileBtn.classList.add('is-favorite');
                
                selectProfileBtn.addEventListener('click', () => {
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    
                    if (!favorites.includes(profileId)) {
                        if (favorites.length < 3) {
                            favorites.push(profileId);
                            localStorage.setItem('favorites', JSON.stringify(favorites));
                            updateFavoritesCounter();
                            
                            selectProfileBtn.textContent = `Вибрано ✅`;
                            selectProfileBtn.classList.add('is-favorite');
                            alert(`${profile.name} додано до Ваших обраних! ✅`);
                        } else {
                            alert('Ви досягли ліміту (3 профілі). Будь ласка, перейдіть до оформлення заявки.');
                        }
                    } else {
                        alert(`${profile.name} вже у Ваших обраних.`);
                    }
                });
            }

        } else {
             if (profileDetailSection) {
                profileDetailSection.innerHTML = '<p class="error-message">Профіль не знайдено.</p>';
            }
        }
    }


    // =========================================================================
    // 5. ЛОГІКА МОДАЛЬНОГО ВІКНА (ФІЛЬТРИ) 
    // =========================================================================
    const openFiltersBtn = document.getElementById('open-filters');
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    // Вміст модального вікна
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Фільтри Профілів</h3>
                <button class="close-btn">&times;</button>
            </div>
            <form id="filter-form">
                <div class="filter-group">
                    <label for="age-range">Вік (20 - 45)</label>
                    <input type="range" id="age-range" min="18" max="55" value="30">
                    <span id="age-value" style="font-family: var(--font-sans);">30 років</span>
                </div>
                <div class="filter-group">
                    <label for="height-range">Зріст (160 - 190 см)</label>
                    <input type="range" id="height-range" min="150" max="210" value="175">
                    <span id="height-value" style="font-family: var(--font-sans);">175 см</span>
                </div>
                <button type="submit" class="cta-button cta-her" style="width: 100%; margin-top: 15px;">Застосувати Фільтри</button>
            </form>
        </div>
    `;

    if (document.getElementById('open-filters')) {
        document.body.appendChild(modalOverlay);
    }
    

    const closeBtn = modalOverlay.querySelector('.close-btn');
    const ageRange = document.getElementById('age-range');
    const ageValue = document.getElementById('age-value');
    const heightRange = document.getElementById('height-range');
    const heightValue = document.getElementById('height-value');

    if (openFiltersBtn) {
        openFiltersBtn.addEventListener('click', () => {
            modalOverlay.classList.add('is-open');
        });
    }

    const closeModal = () => {
        modalOverlay.classList.remove('is-open');
    };
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal(); 
            }
        });
    }

    if (ageRange && heightRange) {
        ageRange.addEventListener('input', () => {
            ageValue.textContent = `${ageRange.value} років`;
        });
        heightRange.addEventListener('input', () => {
            heightValue.textContent = `${heightRange.value} см`;
        });
    }


});
// =========================================================================
// =========================================================================
// 6. CANVAS АНІМАЦІЯ СЕРДЕЦЬ У HERO-СЕКЦІЇ
// =========================================================================
const canvas = document.getElementById('hearts-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let hearts = [];
    let canvasWidth, canvasHeight;

    // Налаштування розміру canvas
    function resizeCanvas() {
        canvasWidth = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = document.querySelector('.hero-section').offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Клас для серця
    class Heart {
        constructor() {
            this.x = Math.random() * canvasWidth;
            this.y = canvasHeight + 20;
            this.size = Math.random() * 20 + 10;
            this.speedY = Math.random() * -2 - 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.opacity -= 0.002;
            if (this.y < -this.size || this.opacity <= 0) {
                this.y = canvasHeight + 20;
                this.x = Math.random() * canvasWidth;
                this.opacity = Math.random() * 0.5 + 0.3;
            }
        }

        draw() {
            const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.size, this.y + this.size);
            gradient.addColorStop(0, '#C2185B');
            gradient.addColorStop(1, '#8D6E63');
            ctx.fillStyle = gradient;
            ctx.globalAlpha = Math.max(this.opacity, 0.5);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.size / 4);
            ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 4, this.x, this.y + this.size);
            ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 4, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y + this.size / 4);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }
    }

    // Ініціалізація сердець
    function initHearts() {
        hearts = [];
        const heartCount = Math.floor(canvasWidth / 50);
        for (let i = 0; i < heartCount; i++) {
            hearts.push(new Heart());
        }
    }
    initHearts();

    // Анімація
    let lastTime = 0;
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Серця
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Переініціалізація при зміні розміру
    window.addEventListener('resize', () => {
        resizeCanvas();
        initHearts();
    });
}