function helloGraphics() {
    console.log("🎨 Graphics & Assets ready");
}

window.AssetLoader = {
    images: {},
    loadedCount: 0,
    totalImages: 0,
    onComplete: null,
    
    // Регистрация одного изображения
    registerImage: function(name, path) {
        this.totalImages++;
        const img = new Image();
        img.onload = () => {
            this.loadedCount++;
            console.log(`✅ Loaded: ${name} (${this.loadedCount}/${this.totalImages})`);
            if(this.loadedCount === this.totalImages && this.onComplete) {
                console.log("🎉 All assets loaded!");
                this.onComplete();
            }
        };
        img.onerror = () => {
            console.error(`❌ Failed to load: ${name} from ${path}`);
            this.loadedCount++;
            if(this.loadedCount === this.totalImages && this.onComplete) {
                this.onComplete();
            }
        };
        img.src = path;
        this.images[name] = img;
    },
    
    // НОВЫЙ МЕТОД: массовая загрузка
    loadAll: function(imagesList, callback) {
        this.onComplete = callback;
        const names = Object.keys(imagesList);
        this.totalImages = names.length;
        this.loadedCount = 0;
        
        for(let i = 0; i < names.length; i++) {
            const name = names[i];
            const path = imagesList[name];
            this.registerImage(name, path);
        }
    },
    
    // Получение загруженного изображения
    getImage: function(name) {
        return this.images[name] || null;
    }
};

helloGraphics();
// Добавить после существующего кода
window.AssetLoader.loadFromConfig = function() {
    if(window.GameConfig && window.GameConfig.images) {
        console.log("🖼️ Loading images from GameConfig");
        this.loadAll(GameConfig.images, () => {
            console.log("✅ All GameConfig images loaded");
        });
    }
};

// Вызвать автоматически при загрузке
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        AssetLoader.loadFromConfig();
    });
} else {
    AssetLoader.loadFromConfig();
}


// js/graphics/assets.js
class AssetLoader {
    constructor() {
        // Хранилище загруженных изображений (ключ -> изображение)
        this.images = new Map();
        // Счетчик загруженных файлов
        this.loadedCount = 0;
        // Общее количество файлов для загрузки
        this.totalImages = 0;
        // Функция, которая вызовется после загрузки всех файлов
        this.onComplete = null;
    }
    // Добавьте этот метод ВНУТРЬ класса AssetLoader
loadAll(imagesList, callback) {
    // Сохраняем функцию, которую нужно вызвать по завершению
    this.onComplete = callback;
    
    // Преобразуем объект в массив пар [ключ, значение]
    const entries = Object.entries(imagesList);
    
    // Устанавливаем общее количество изображений
    this.totalImages = entries.length;
    
    // Сбрасываем счетчик загруженных
    this.loadedCount = 0;
    
    // Запускаем загрузку каждого изображения
    for (let i = 0; i < entries.length; i++) {
        const name = entries[i][0];  // например: 'player'
        const path = entries[i][1];  // например: 'assets/images/player.png'
        this.loadImage(name, path);
    }
}
    // Добавьте этот метод ВНУТРЬ класса AssetLoader
loadImage(name, path) {
    // Создаем новый объект Image
    const img = new Image();
    
    // Сохраняем ссылку на this (потому что внутри onload this будет другим)
    const self = this;
    
    // Что делать когда изображение загрузится
    img.onload = function() {
        // Сохраняем изображение в Map под именем name
        self.images.set(name, img);
        // Увеличиваем счетчик
        self.loadedCount++;
        console.log(`✅ Loaded: ${name} (${self.loadedCount}/${self.totalImages})`);
        
        // Если все загрузились - вызываем колбэк
        if (self.loadedCount === self.totalImages && self.onComplete) {
            console.log("🎉 All assets loaded!");
            self.onComplete();
        }
    };
    
    // Что делать если ошибка загрузки
    img.onerror = function() {
        console.error(`❌ Failed to load: ${name} from ${path}`);
        self.loadedCount++;
        if (self.loadedCount === self.totalImages && self.onComplete) {
            self.onComplete();
        }
    };
    
    // Запускаем загрузку
    img.src = path;
}
    // Добавьте этот метод ВНУТРЬ класса AssetLoader
getImage(name) {
    // Возвращает изображение по имени или null если не найдено
    return this.images.get(name) || null;
    }
}
window.assetLoader = new AssetLoader();
