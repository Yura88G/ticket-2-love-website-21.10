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
// Код JavaScript для анімації "Рідкого Градієнта" та Сердечок
        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('liquidCanvas');
            const ctx = canvas.getContext('2d');
            let width, height;
            
            // Кольорова палітра для градієнтних "плям"
            const colors = [
                '#890B0B', // Бордовий Бренду
                '#4D0606', // Глибокий Рубін
                '#B4324E', // Насичений Малиновий
                '#2C0B3B', // Темний Фіалковий
            ];

            // Налаштування для "плям" (Blobs)
            const blobs = [];
            const BLOB_COUNT = 8;
            const MAX_RADIUS = 300;
            const MIN_RADIUS = 150;

            // Налаштування для рожевих сердечок
            const hearts = [];
            const MAX_HEARTS = 20;

            /**
             * Клас для анімованих кольорових плям (Blobs)
             */
            class Blob {
                constructor() {
                    this.radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.vx = (Math.random() - 0.5) * 0.3; // Дуже повільна швидкість
                    this.vy = (Math.random() - 0.5) * 0.3;
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                }

                update() {
                    this.x += this.vx;
                    this.y += this.vy;

                    // Змінюємо напрямок, коли пляма досягає краю
                    if (this.x - this.radius > width) this.x = -this.radius;
                    if (this.x + this.radius < 0) this.x = width + this.radius;
                    if (this.y - this.radius > height) this.y = -this.radius;
                    if (this.y + this.radius < 0) this.y = height + this.radius;
                }

                draw() {
                    ctx.beginPath();
                    // Створюємо градієнт всередині плями для м'якості
                    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                    gradient.addColorStop(0, this.color + 'FF'); // Повна непрозорість у центрі
                    gradient.addColorStop(1, this.color + '00'); // Повна прозорість на краю
                    
                    ctx.fillStyle = gradient;
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            /**
             * Клас для рожевих сердечок
             */
            class Heart {
                constructor() {
                    this.size = Math.random() * 8 + 4; // Розмір від 4 до 12
                    this.x = Math.random() * width;
                    this.y = height + this.size; // Починаємо знизу
                    this.vy = -(Math.random() * 0.5 + 0.5); // Швидкість підйому вгору
                    this.opacity = 1;
                    this.maxOpacity = Math.random() * 0.7 + 0.3; // Максимальна прозорість для м'якості
                }

                update() {
                    this.y += this.vy;
                    // Зменшуємо прозорість при підйомі
                    if (this.y < height * 0.7) {
                        this.opacity = this.maxOpacity * (this.y / (height * 0.7));
                    }
                }

                draw() {
                    ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`; // #FF69B4 - Hot Pink
                    ctx.shadowColor = 'rgba(255, 105, 180, 0.8)';
                    ctx.shadowBlur = 5;

                    // Малюємо просте сердечко
                    const r = this.size;
                    const cpx = this.x;
                    const cpy = this.y;

                    ctx.beginPath();
                    ctx.moveTo(cpx, cpy + r); 
                    ctx.bezierCurveTo(cpx + r, cpy + r, cpx + r, cpy, cpx, cpy);
                    ctx.bezierCurveTo(cpx - r, cpy, cpx - r, cpy + r, cpx, cpy + r);
                    ctx.closePath();
                    ctx.fill();

                    ctx.shadowBlur = 0; // Вимикаємо тінь
                }
            }

            /**
             * Встановлення розміру Canvas
             */
            function resizeCanvas() {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
                
                // Створюємо Blobs лише один раз при першому запуску
                if (blobs.length === 0) {
                     for (let i = 0; i < BLOB_COUNT; i++) {
                        blobs.push(new Blob());
                    }
                }
            }

            /**
             * Основний цикл анімації
             */
            function animate() {
                // Очищаємо Canvas
                ctx.clearRect(0, 0, width, height);

                // --- 1. Анімація "Рідкого Градієнта" (Blobs) ---
                // Режим накладання "lighter" створює ефект світіння та змішування
                ctx.globalCompositeOperation = 'lighter';
                blobs.forEach(blob => {
                    blob.update();
                    blob.draw();
                });

                // --- 2. Анімація Сердечок ---
                // Повертаємо нормальний режим для сердечок
                ctx.globalCompositeOperation = 'source-over'; 
                
                // Додаємо нове сердечко (рідко та випадково)
                if (hearts.length < MAX_HEARTS && Math.random() < 0.01) {
                    hearts.push(new Heart());
                }

                // Оновлюємо та малюємо сердечка
                for (let i = hearts.length - 1; i >= 0; i--) {
                    const heart = hearts[i];
                    heart.update();
                    heart.draw();

                    // Видаляємо сердечка, які вийшли за межі екрана
                    if (heart.y + heart.size < 0) {
                        hearts.splice(i, 1);
                    }
                }

                requestAnimationFrame(animate);
            }

            // Ініціалізація: встановлюємо розмір і запускаємо цикл
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas(); 
            animate();
        });
