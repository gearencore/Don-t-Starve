// Главный файл инициализации игры
window.addEventListener('DOMContentLoaded', () => {
    console.log("🎮 Starting Don't Starve Clone v0.1.0...");
    
    // Проверка наличия GameConfig
    if(!window.GameConfig) {
        console.error("❌ GameConfig not loaded!");
        return;
    }
    
    // Инициализация камеры
    if(window.GameCamera && typeof GameCamera.init === 'function') {
        GameCamera.init();
    } else {
        console.warn("⚠️ GameCamera not available");
        window.GameCamera = { x: 0, y: 0, worldToScreen: (x,y) => ({x,y}) };
    }
    
    // Инициализация рендерера с камерой
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    if(window.GameRenderer) {
        GameRenderer.init(ctx, GameCamera);
    } else {
        console.error("❌ GameRenderer not loaded!");
    }
    
    // Инициализация обработчика ввода с камерой
    if(window.InputHandler) {
        InputHandler.init(canvas, GameCamera);
    }
    
    // Инициализация игрового состояния
    if(window.GameState) {
        GameState.init();
    } else {
        console.error("❌ GameState not loaded!");
    }
    
    // Запуск игрового цикла
    if(window.CoreGame) {
        CoreGame.start();
    }
    
    // Анимационный цикл
    let frameId;
    function animate(timestamp) {
        if(window.CoreGame) {
            CoreGame.gameLoop(timestamp);
        }
        frameId = requestAnimationFrame(animate);
    }
    
    frameId = requestAnimationFrame(animate);
    
    // Очистка при выгрузке
    window.addEventListener('beforeunload', () => {
        if(frameId) cancelAnimationFrame(frameId);
    });
    
    console.log("✅ Game initialized successfully!");
});
