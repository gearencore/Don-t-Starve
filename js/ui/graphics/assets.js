function helloGraphics() {
    console.log("🎨 Graphics & Assets ready");
}

// Загрузчик изображений
window.AssetLoader = {
    images: {},
    loadedCount: 0,
    totalImages: 0,
    
    registerImage: function(name, path) {
        this.totalImages++;
        const img = new Image();
        img.onload = () => {
            this.loadedCount++;
            console.log(`✅ Loaded: ${name} (${this.loadedCount}/${this.totalImages})`);
            if(this.loadedCount === this.totalImages) {
                console.log("🎉 All assets loaded!");
                if(this.onComplete) this.onComplete();
            }
        };
        img.onerror = () => {
            console.error(`❌ Failed to load: ${name} from ${path}`);
            this.loadedCount++;
        };
        img.src = path;
        this.images[name] = img;
    },
    
    getImage: function(name) {
        return this.images[name];
    },
    
    onComplete: null
};

helloGraphics();
