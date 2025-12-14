// Game State Management
interface GameState {
    currentLevel: number;
    runes: string[];
    levelComplete: boolean;
    gamePhase: 'intro' | 'customization' | 'playing' | 'dialogue' | 'finalGate' | 'complete';
    playerName: string;
    selectedSprite: string;
    selectedCape: string;
    selectedTransport: string;
}

const gameState: GameState = {
    currentLevel: 0,
    runes: [],
    levelComplete: false,
    gamePhase: 'intro',
    playerName: '',
    selectedSprite: 'penguin',
    selectedCape: 'red',
    selectedTransport: 'sled'
};

// Canvas setup
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
canvas.width = 800;
canvas.height = 600;

// Load custom images
const hippoHeroImage = new Image();
hippoHeroImage.src = 'hippo-hero.png';
let hippoHeroLoaded = false;
hippoHeroImage.onload = () => {
    hippoHeroLoaded = true;
};

const winterBackgroundImage = new Image();
winterBackgroundImage.src = 'winter-background.png';
let winterBackgroundLoaded = false;
winterBackgroundImage.onload = () => {
    winterBackgroundLoaded = true;
};

const watermelonWastelandImage = new Image();
watermelonWastelandImage.src = 'watermelon-wasteland-background.png';
let watermelonWastelandLoaded = false;
watermelonWastelandImage.onload = () => {
    watermelonWastelandLoaded = true;
};

// Load and setup audio
const backgroundMusic = new Audio('background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.4; // 40% volume
let isMuted = false;

function startBackgroundMusic() {
    backgroundMusic.play().catch(error => {
        console.log("Audio autoplay prevented. Will play after user interaction:", error);
    });
}

function toggleMusicMute() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    
    const musicButton = document.getElementById('music-toggle-button')!;
    musicButton.textContent = isMuted ? '🔇' : '🔊';
}

// Hippo Character Drawing
function drawHippoCharacter(x: number, y: number, scale: number = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    // Blue Cape
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(-15, 10, 8, 35); // Left cape
    ctx.fillRect(35, 10, 8, 35); // Right cape
    ctx.fillRect(-15, 10, 58, 8); // Cape top
    
    // Cape shine/detail
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(-13, 12, 4, 30);
    ctx.fillRect(37, 12, 4, 30);
    
    // Body
    ctx.fillStyle = '#8b7aa8';
    ctx.fillRect(0, 20, 28, 32); // Main body
    ctx.fillRect(4, 52, 20, 4); // Body bottom
    
    // Head
    ctx.fillRect(0, 0, 28, 24); // Head
    
    // Ears
    ctx.fillStyle = '#6a5a88';
    ctx.fillRect(-4, 0, 4, 8);
    ctx.fillRect(28, 0, 4, 8);
    
    // Snout
    ctx.fillStyle = '#9d8bb8';
    ctx.fillRect(0, 16, 28, 12);
    
    // Eyes
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(6, 6, 6, 6);
    ctx.fillRect(16, 6, 6, 6);
    
    // Eye shine
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(8, 7, 2, 2);
    ctx.fillRect(18, 7, 2, 2);
    
    // Nostrils
    ctx.fillStyle = '#5a4a68';
    ctx.fillRect(8, 22, 3, 3);
    ctx.fillRect(17, 22, 3, 3);
    
    // Arms
    ctx.fillStyle = '#8b7aa8';
    ctx.fillRect(-6, 24, 6, 16);
    ctx.fillRect(28, 24, 6, 16);
    
    // Legs
    ctx.fillRect(4, 52, 8, 12);
    ctx.fillRect(16, 52, 8, 12);
    
    // Feet
    ctx.fillStyle = '#6a5a88';
    ctx.fillRect(2, 62, 10, 4);
    ctx.fillRect(14, 62, 10, 4);
    
    ctx.restore();
}

// Title Screen Background (Home Screen)
function drawTitleScreen() {
    // Draw winter background image filling entire canvas
    if (winterBackgroundLoaded) {
        // Fill the entire canvas with the image
        ctx.imageSmoothingEnabled = false;
        
        // Calculate scaling to fill canvas while maintaining aspect ratio
        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = winterBackgroundImage.width / winterBackgroundImage.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imageAspect > canvasAspect) {
            // Image is wider - fit to height
            drawHeight = canvas.height;
            drawWidth = winterBackgroundImage.width * (canvas.height / winterBackgroundImage.height);
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Image is taller - fit to width
            drawWidth = canvas.width;
            drawHeight = winterBackgroundImage.height * (canvas.width / winterBackgroundImage.width);
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(winterBackgroundImage, offsetX, offsetY, drawWidth, drawHeight);
    } else {
        // Fallback background while image loads
        ctx.fillStyle = '#4a7ba7';
        ctx.fillRect(0, 0, 800, 600);
    }
    
    // Title - styled like the reference image with green text and dark shadow
    // Split into two lines and positioned at top
    ctx.font = 'bold 32px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    const titleLine1 = '5 Runes of the';
    const titleLine2 = 'Winter Trials';
    
    // Dark shadow/outline
    ctx.fillStyle = '#000000';
    const shadowOffsets = [
        {x: -3, y: -3}, {x: 0, y: -3}, {x: 3, y: -3},
        {x: -3, y: 0}, {x: 3, y: 0},
        {x: -3, y: 3}, {x: 0, y: 3}, {x: 3, y: 3}
    ];
    shadowOffsets.forEach(offset => {
        ctx.fillText(titleLine1, 400 + offset.x, 60 + offset.y);
        ctx.fillText(titleLine2, 400 + offset.x, 105 + offset.y);
    });
    
    // Green text with lighter green gradient effect
    const textGradient = ctx.createLinearGradient(0, 60, 0, 140);
    textGradient.addColorStop(0, '#7cf07c');
    textGradient.addColorStop(1, '#4ade80');
    ctx.fillStyle = textGradient;
    ctx.fillText(titleLine1, 400, 60);
    ctx.fillText(titleLine2, 400, 105);
    
    // Subtitle text - black color
    ctx.font = '13px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    const subtitleLines = [
        'Brave the icy realms, solve ancient',
        'trials, and collect five magical runes',
        'said to unlock winter\'s greatest treasures'
    ];
    let yPos = 170;
    subtitleLines.forEach(line => {
        ctx.fillText(line, 400, yPos);
        yPos += 22;
    });
}

// Dialogue Screen Background
let currentDialogueBackground: 'intro' | 'level1' = 'intro';

function drawDialogueScreen() {
    ctx.imageSmoothingEnabled = false;
    
    // Choose background based on current dialogue context
    let backgroundImage: HTMLImageElement;
    let imageLoaded: boolean;
    
    if (currentDialogueBackground === 'level1' && watermelonWastelandLoaded) {
        backgroundImage = watermelonWastelandImage;
        imageLoaded = watermelonWastelandLoaded;
    } else if (hippoHeroLoaded) {
        backgroundImage = hippoHeroImage;
        imageLoaded = hippoHeroLoaded;
    } else {
        // Fallback background while image loads
        ctx.fillStyle = '#2d4563';
        ctx.fillRect(0, 0, 800, 600);
        return;
    }
    
    // Fill the entire canvas with the selected image
    const canvasAspect = canvas.width / canvas.height;
    const imageAspect = backgroundImage.width / backgroundImage.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (imageAspect > canvasAspect) {
        // Image is wider - fit to height
        drawHeight = canvas.height;
        drawWidth = backgroundImage.width * (canvas.height / backgroundImage.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    } else {
        // Image is taller - fit to width
        drawWidth = canvas.width;
        drawHeight = backgroundImage.height * (canvas.width / backgroundImage.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    }
    
    ctx.drawImage(backgroundImage, offsetX, offsetY, drawWidth, drawHeight);
}

// Dialogue system
const dialogueBox = document.getElementById('dialogue-box')!;
const dialogueText = document.getElementById('dialogue-text')!;
const dialogueNext = document.getElementById('dialogue-next')!;

let currentDialogueQueue: string[] = [];

function showDialogue(messages: string[], onComplete: () => void) {
    currentDialogueQueue = [...messages];
    gameState.gamePhase = 'dialogue';
    showNextDialogue(onComplete);
}

function showNextDialogue(onComplete: () => void) {
    if (currentDialogueQueue.length === 0) {
        dialogueBox.classList.add('hidden');
        onComplete();
        return;
    }
    
    const message = currentDialogueQueue.shift()!;
    dialogueText.textContent = message;
    dialogueBox.classList.remove('hidden');
    
    dialogueNext.onclick = () => showNextDialogue(onComplete);
}

// Rune system
const RUNE_LETTERS = ['M', 'A', 'N', 'G', 'O'];

function awardRune() {
    const randomRune = RUNE_LETTERS[Math.floor(Math.random() * RUNE_LETTERS.length)];
    gameState.runes.push(randomRune);
    updateRuneDisplay();
}

function updateRuneDisplay() {
    const runeCollection = document.getElementById('rune-collection')!;
    runeCollection.innerHTML = '';
    gameState.runes.forEach(rune => {
        const runeEl = document.createElement('div');
        runeEl.className = 'rune-item';
        runeEl.textContent = rune;
        runeCollection.appendChild(runeEl);
    });
}

// Level completion
function completeLevel() {
    gameState.levelComplete = true;
    awardRune();
    
    const levelMessages = [
        "Well done, brave traveler! You have earned a Rune of Winter. The ancient power flows through you. Your journey continues..."
    ];
    
    showDialogue(levelMessages, () => {
        gameState.currentLevel++;
        gameState.levelComplete = false;
        
        if (gameState.currentLevel >= 5) {
            showFinalGate();
        } else {
            startLevel(gameState.currentLevel);
        }
    });
}

// Final Gate
function showFinalGate() {
    const finalGate = document.getElementById('final-gate')!;
    const finalRunes = document.getElementById('final-runes')!;
    const passwordInput = document.getElementById('password-input') as HTMLInputElement;
    const submitButton = document.getElementById('submit-password')!;
    const gateMessage = document.getElementById('gate-message')!;
    
    // Display scrambled runes
    finalRunes.innerHTML = '';
    gameState.runes.forEach(rune => {
        const runeEl = document.createElement('div');
        runeEl.className = 'final-rune';
        runeEl.textContent = rune;
        finalRunes.appendChild(runeEl);
    });
    
    finalGate.classList.remove('hidden');
    passwordInput.value = '';
    gateMessage.textContent = '';
    
    submitButton.onclick = () => {
        const answer = passwordInput.value.toUpperCase().trim();
        if (answer === 'MANGO') {
            gateMessage.textContent = 'The Winter Gate opens! You have proven yourself worthy!';
            gateMessage.className = 'gate-message success';
            gameState.gamePhase = 'complete';
            
            setTimeout(() => {
                showDialogue([
                    "The ancient magic recognizes your wisdom!",
                    "The Five Winter Trials are complete.",
                    "May your journey be blessed with eternal winter's beauty!"
                ], () => {
                    // Game complete!
                });
            }, 2000);
        } else {
            gateMessage.textContent = 'The gate remains sealed. Try again...';
            gateMessage.className = 'gate-message error';
            passwordInput.value = '';
        }
    };
}

// ===================
// LEVEL 1: Watermelon Wasteland
// ===================
class PaperWastelandLevel {
    private hippo = { x: 100, y: 500, width: 40, height: 40 };
    private hoop = { x: 650, y: 200, width: 80, height: 80 };
    private paperBalls: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    private power = 0;
    private charging = false;
    private score = 0;
    private targetScore = 3;
    private angle = -45;
    
    constructor() {
        canvas.addEventListener('mousedown', this.startCharge.bind(this));
        canvas.addEventListener('mouseup', this.shoot.bind(this));
        canvas.addEventListener('mousemove', this.updateAngle.bind(this));
    }
    
    startCharge() {
        if (gameState.gamePhase === 'playing') {
            this.charging = true;
        }
    }
    
    updateAngle(e: MouseEvent) {
        if (gameState.gamePhase !== 'playing') return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const dx = mouseX - (this.hippo.x + this.hippo.width / 2);
        const dy = mouseY - (this.hippo.y + this.hippo.height / 2);
        this.angle = Math.atan2(dy, dx) * 180 / Math.PI;
    }
    
    shoot() {
        if (this.charging && gameState.gamePhase === 'playing') {
            const speed = this.power * 0.15;
            const angleRad = this.angle * Math.PI / 180;
            this.paperBalls.push({
                x: this.hippo.x + this.hippo.width / 2,
                y: this.hippo.y + this.hippo.height / 2,
                vx: Math.cos(angleRad) * speed,
                vy: Math.sin(angleRad) * speed,
                radius: 10
            });
            this.charging = false;
            this.power = 0;
        }
    }
    
    update() {
        if (this.charging) {
            this.power = Math.min(this.power + 3, 100);
        }
        
        // Update paper balls
        for (let i = this.paperBalls.length - 1; i >= 0; i--) {
            const ball = this.paperBalls[i];
            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.vy += 0.3; // gravity
            
            // Check if in hoop
            if (ball.x > this.hoop.x && ball.x < this.hoop.x + this.hoop.width &&
                ball.y > this.hoop.y && ball.y < this.hoop.y + this.hoop.height) {
                this.score++;
                this.paperBalls.splice(i, 1);
                
                if (this.score >= this.targetScore) {
                    this.cleanup();
                    completeLevel();
                }
            }
            // Remove if off screen
            else if (ball.x < 0 || ball.x > 800 || ball.y > 600) {
                this.paperBalls.splice(i, 1);
            }
        }
    }
    
    draw() {
        // Draw watermelon wasteland background
        if (watermelonWastelandLoaded) {
            ctx.imageSmoothingEnabled = false;
            const canvasAspect = canvas.width / canvas.height;
            const imageAspect = watermelonWastelandImage.width / watermelonWastelandImage.height;
            
            let drawWidth, drawHeight, offsetX, offsetY;
            
            if (imageAspect > canvasAspect) {
                drawHeight = canvas.height;
                drawWidth = watermelonWastelandImage.width * (canvas.height / watermelonWastelandImage.height);
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = watermelonWastelandImage.height * (canvas.width / watermelonWastelandImage.width);
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }
            
            ctx.drawImage(watermelonWastelandImage, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            // Fallback if image not loaded
            ctx.fillStyle = '#e8f4f8';
            ctx.fillRect(0, 0, 800, 600);
        }
        
        // Title
        ctx.fillStyle = '#2d4563';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Watermelon Wasteland', 400, 40);
        
        ctx.font = '12px "Press Start 2P"';
        ctx.fillText(`Score: ${this.score}/${this.targetScore}`, 400, 70);
        
        // Hippo
        ctx.fillStyle = '#8b7aa8';
        ctx.fillRect(this.hippo.x, this.hippo.y, this.hippo.width, this.hippo.height);
        ctx.fillStyle = '#6a5a88';
        ctx.fillRect(this.hippo.x + 5, this.hippo.y + 5, 10, 10); // eye
        ctx.fillRect(this.hippo.x + 25, this.hippo.y + 5, 10, 10); // eye
        
        // Aim line
        if (gameState.gamePhase === 'playing') {
            ctx.strokeStyle = 'rgba(255, 100, 100, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const startX = this.hippo.x + this.hippo.width / 2;
            const startY = this.hippo.y + this.hippo.height / 2;
            const angleRad = this.angle * Math.PI / 180;
            const endX = startX + Math.cos(angleRad) * (this.power + 50);
            const endY = startY + Math.sin(angleRad) * (this.power + 50);
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
        
        // Power bar
        if (this.charging) {
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(this.hippo.x, this.hippo.y - 20, this.power * 0.4, 10);
            ctx.strokeStyle = '#2d4563';
            ctx.strokeRect(this.hippo.x, this.hippo.y - 20, 40, 10);
        }
        
        // Hoop
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.hoop.x + this.hoop.width / 2, this.hoop.y + this.hoop.height / 2, this.hoop.width / 2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Paper balls
        this.paperBalls.forEach(ball => {
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    cleanup() {
        canvas.removeEventListener('mousedown', this.startCharge.bind(this));
        canvas.removeEventListener('mouseup', this.shoot.bind(this));
        canvas.removeEventListener('mousemove', this.updateAngle.bind(this));
    }
}

// ===================
// LEVEL 2: Orchard of Oddities
// ===================
class OrchardLevel {
    private basket = { x: 360, y: 520, width: 80, height: 40 };
    private fallingItems: Array<{ x: number; y: number; type: 'good' | 'bad'; speed: number; emoji: string }> = [];
    private score = 0;
    private targetScore = 5;
    private spawnTimer = 0;
    private goodItems = ['⭐', '❄️', '🎄', '🎁', '✨'];
    private badItems = ['🔥', '☀️', '🌵', '🦂', '💥'];
    
    constructor() {
        canvas.addEventListener('mousemove', this.moveBasket.bind(this));
    }
    
    moveBasket(e: MouseEvent) {
        if (gameState.gamePhase !== 'playing') return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        this.basket.x = Math.max(0, Math.min(720, mouseX - this.basket.width / 2));
    }
    
    update() {
        this.spawnTimer++;
        if (this.spawnTimer > 60) {
            this.spawnTimer = 0;
            const isGood = Math.random() > 0.4;
            const items = isGood ? this.goodItems : this.badItems;
            this.fallingItems.push({
                x: Math.random() * 750,
                y: -20,
                type: isGood ? 'good' : 'bad',
                speed: 2 + Math.random() * 2,
                emoji: items[Math.floor(Math.random() * items.length)]
            });
        }
        
        // Update falling items
        for (let i = this.fallingItems.length - 1; i >= 0; i--) {
            const item = this.fallingItems[i];
            item.y += item.speed;
            
            // Check collision with basket
            if (item.y + 20 > this.basket.y && 
                item.x > this.basket.x && 
                item.x < this.basket.x + this.basket.width) {
                if (item.type === 'good') {
                    this.score++;
                    if (this.score >= this.targetScore) {
                        this.cleanup();
                        completeLevel();
                    }
                } else {
                    this.score = Math.max(0, this.score - 1);
                }
                this.fallingItems.splice(i, 1);
            }
            // Remove if off screen
            else if (item.y > 600) {
                this.fallingItems.splice(i, 1);
            }
        }
    }
    
    draw() {
        ctx.fillStyle = '#c7e6ff';
        ctx.fillRect(0, 0, 800, 600);
        
        // Title
        ctx.fillStyle = '#2d4563';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Orchard of Oddities', 400, 40);
        
        ctx.font = '12px "Press Start 2P"';
        ctx.fillText(`Caught: ${this.score}/${this.targetScore}`, 400, 70);
        
        // Trees (background)
        for (let i = 0; i < 5; i++) {
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(i * 180 + 20, 400, 40, 120);
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(i * 180 + 40, 380, 50, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Basket
        ctx.fillStyle = '#a0522d';
        ctx.fillRect(this.basket.x, this.basket.y, this.basket.width, this.basket.height);
        ctx.fillStyle = '#8b4513';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(this.basket.x + i * 20, this.basket.y, 3, this.basket.height);
        }
        
        // Falling items
        this.fallingItems.forEach(item => {
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.emoji, item.x, item.y);
        });
    }
    
    cleanup() {
        canvas.removeEventListener('mousemove', this.moveBasket.bind(this));
    }
}

// ===================
// LEVEL 3: Mirror Meadow
// ===================
class MirrorMeadowLevel {
    private lightSource = { x: 50, y: 50 };
    private target = { x: 700, y: 500, width: 60, height: 60 };
    private mirrors: Array<{ x: number; y: number; angle: number; width: 60; height: 10 }> = [
        { x: 200, y: 200, angle: 45, width: 60, height: 10 },
        { x: 400, y: 350, angle: 135, width: 60, height: 10 },
        { x: 600, y: 200, angle: 45, width: 60, height: 10 }
    ];
    private selectedMirror: number | null = null;
    private lightPath: Array<{ x: number; y: number }> = [];
    
    constructor() {
        canvas.addEventListener('mousedown', this.selectMirror.bind(this));
        canvas.addEventListener('mousemove', this.rotateMirror.bind(this));
    }
    
    selectMirror(e: MouseEvent) {
        if (gameState.gamePhase !== 'playing') return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        this.selectedMirror = null;
        this.mirrors.forEach((mirror, i) => {
            const dx = mouseX - mirror.x;
            const dy = mouseY - mirror.y;
            if (Math.sqrt(dx * dx + dy * dy) < 40) {
                this.selectedMirror = i;
            }
        });
    }
    
    rotateMirror(e: MouseEvent) {
        if (this.selectedMirror === null || gameState.gamePhase !== 'playing') return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const mirror = this.mirrors[this.selectedMirror];
        const angle = Math.atan2(mouseY - mirror.y, mouseX - mirror.x) * 180 / Math.PI;
        mirror.angle = angle;
    }
    
    update() {
        this.calculateLightPath();
    }
    
    calculateLightPath() {
        this.lightPath = [{ x: this.lightSource.x, y: this.lightSource.y }];
        let currentAngle = 45; // Initial light direction
        let currentPos = { x: this.lightSource.x, y: this.lightSource.y };
        
        for (let bounce = 0; bounce < 10; bounce++) {
            // Trace ray
            const ray = this.traceRay(currentPos, currentAngle);
            if (!ray) break;
            
            this.lightPath.push({ x: ray.x, y: ray.y });
            
            if (ray.hitTarget) {
                this.cleanup();
                completeLevel();
                break;
            }
            
            if (ray.hitMirror !== null) {
                const mirror = this.mirrors[ray.hitMirror];
                // Reflect angle
                currentAngle = 2 * mirror.angle - currentAngle;
                currentPos = { x: ray.x, y: ray.y };
            } else {
                break;
            }
        }
    }
    
    traceRay(start: { x: number; y: number }, angle: number): { x: number; y: number; hitMirror: number | null; hitTarget: boolean } | null {
        const dirX = Math.cos(angle * Math.PI / 180);
        const dirY = Math.sin(angle * Math.PI / 180);
        
        let closestDist = 2000;
        let closestPoint = null;
        let hitMirror: number | null = null;
        let hitTarget = false;
        
        // Check mirrors
        this.mirrors.forEach((mirror, i) => {
            const t = ((mirror.x - start.x) * dirX + (mirror.y - start.y) * dirY);
            if (t > 0) {
                const x = start.x + dirX * t;
                const y = start.y + dirY * t;
                const dx = x - mirror.x;
                const dy = y - mirror.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 30 && t < closestDist) {
                    closestDist = t;
                    closestPoint = { x, y };
                    hitMirror = i;
                }
            }
        });
        
        // Check target
        const targetCenterX = this.target.x + this.target.width / 2;
        const targetCenterY = this.target.y + this.target.height / 2;
        const t = ((targetCenterX - start.x) * dirX + (targetCenterY - start.y) * dirY);
        if (t > 0 && t < closestDist) {
            const x = start.x + dirX * t;
            const y = start.y + dirY * t;
            if (x > this.target.x && x < this.target.x + this.target.width &&
                y > this.target.y && y < this.target.y + this.target.height) {
                closestPoint = { x, y };
                hitTarget = true;
                hitMirror = null;
            }
        }
        
        // Default to edge of screen
        if (!closestPoint) {
            const maxDist = 1000;
            closestPoint = {
                x: start.x + dirX * maxDist,
                y: start.y + dirY * maxDist
            };
        }
        
        return closestPoint ? { ...closestPoint, hitMirror, hitTarget } : null;
    }
    
    draw() {
        ctx.fillStyle = '#d4e9f7';
        ctx.fillRect(0, 0, 800, 600);
        
        // Title
        ctx.fillStyle = '#2d4563';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Mirror Meadow', 400, 40);
        
        ctx.font = '10px "Press Start 2P"';
        ctx.fillText('Rotate mirrors to guide light to the target', 400, 70);
        
        // Light path
        if (this.lightPath.length > 1) {
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(this.lightPath[0].x, this.lightPath[0].y);
            for (let i = 1; i < this.lightPath.length; i++) {
                ctx.lineTo(this.lightPath[i].x, this.lightPath[i].y);
            }
            ctx.stroke();
        }
        
        // Light source
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(this.lightSource.x, this.lightSource.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.lightSource.x, this.lightSource.y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Mirrors
        this.mirrors.forEach((mirror, i) => {
            ctx.save();
            ctx.translate(mirror.x, mirror.y);
            ctx.rotate(mirror.angle * Math.PI / 180);
            ctx.fillStyle = this.selectedMirror === i ? '#6dd5ed' : '#c0c0c0';
            ctx.fillRect(-mirror.width / 2, -mirror.height / 2, mirror.width, mirror.height);
            ctx.strokeStyle = '#808080';
            ctx.lineWidth = 2;
            ctx.strokeRect(-mirror.width / 2, -mirror.height / 2, mirror.width, mirror.height);
            ctx.restore();
        });
        
        // Target
        ctx.fillStyle = '#f87171';
        ctx.fillRect(this.target.x, this.target.y, this.target.width, this.target.height);
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.target.x + 20, this.target.y + 20, 20, 20);
    }
    
    cleanup() {
        canvas.removeEventListener('mousedown', this.selectMirror.bind(this));
        canvas.removeEventListener('mousemove', this.rotateMirror.bind(this));
    }
}

// ===================
// LEVEL 4: Cipher Stones
// ===================
class CipherStonesLevel {
    private stones = [
        { x: 150, y: 200, glyph: '◆', correct: true, selected: false },
        { x: 250, y: 200, glyph: '◇', correct: false, selected: false },
        { x: 350, y: 200, glyph: '●', correct: true, selected: false },
        { x: 450, y: 200, glyph: '○', correct: false, selected: false },
        { x: 550, y: 200, glyph: '■', correct: true, selected: false },
        { x: 650, y: 200, glyph: '□', correct: false, selected: false },
        { x: 200, y: 350, glyph: '▲', correct: false, selected: false },
        { x: 300, y: 350, glyph: '▼', correct: true, selected: false },
        { x: 400, y: 350, glyph: '★', correct: true, selected: false },
        { x: 500, y: 350, glyph: '☆', correct: false, selected: false },
        { x: 600, y: 350, glyph: '✦', correct: true, selected: false }
    ];
    
    constructor() {
        canvas.addEventListener('click', this.selectStone.bind(this));
    }
    
    selectStone(e: MouseEvent) {
        if (gameState.gamePhase !== 'playing') return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        this.stones.forEach(stone => {
            const dx = mouseX - stone.x;
            const dy = mouseY - stone.y;
            if (Math.sqrt(dx * dx + dy * dy) < 35) {
                stone.selected = !stone.selected;
            }
        });
        
        this.checkSolution();
    }
    
    checkSolution() {
        const allCorrectSelected = this.stones.filter(s => s.correct).every(s => s.selected);
        const noIncorrectSelected = this.stones.filter(s => !s.correct).every(s => !s.selected);
        
        if (allCorrectSelected && noIncorrectSelected) {
            this.cleanup();
            completeLevel();
        }
    }
    
    update() {}
    
    draw() {
        ctx.fillStyle = '#b8d4e8';
        ctx.fillRect(0, 0, 800, 600);
        
        // Title
        ctx.fillStyle = '#2d4563';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Cipher Stones', 400, 40);
        
        ctx.font = '10px "Press Start 2P"';
        ctx.fillText('Select the glowing stones (filled symbols)', 400, 70);
        
        // Hint
        ctx.font = '8px "Press Start 2P"';
        ctx.fillStyle = '#6dd5ed';
        ctx.fillText('Hint: Choose solid shapes over hollow ones', 400, 520);
        
        // Stones
        this.stones.forEach(stone => {
            ctx.save();
            
            // Stone base
            if (stone.selected) {
                ctx.fillStyle = stone.correct ? '#4ade80' : '#f87171';
            } else {
                ctx.fillStyle = '#8b8b8b';
            }
            ctx.beginPath();
            ctx.arc(stone.x, stone.y, 35, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow for correct stones
            if (stone.correct && !stone.selected) {
                ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(stone.x, stone.y, 40, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Glyph
            ctx.fillStyle = '#fff';
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(stone.glyph, stone.x, stone.y);
            
            ctx.restore();
        });
    }
    
    cleanup() {
        canvas.removeEventListener('click', this.selectStone.bind(this));
    }
}

// ===================
// LEVEL 5: Sky Bridge
// ===================
class SkyBridgeLevel {
    private tiles = [
        { x: 100, y: 500, number: 1, active: false },
        { x: 200, y: 450, number: 5, active: false },
        { x: 300, y: 400, number: 2, active: false },
        { x: 400, y: 350, number: 4, active: false },
        { x: 500, y: 300, number: 3, active: false },
        { x: 600, y: 250, number: 6, active: false },
        { x: 700, y: 200, number: 7, active: false }
    ];
    private sequence: number[] = [];
    private correctSequence = [1, 2, 3, 4, 5, 6, 7];
    
    constructor() {
        canvas.addEventListener('click', this.clickTile.bind(this));
    }
    
    clickTile(e: MouseEvent) {
        if (gameState.gamePhase !== 'playing') return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        this.tiles.forEach(tile => {
            const dx = mouseX - tile.x;
            const dy = mouseY - tile.y;
            if (Math.abs(dx) < 40 && Math.abs(dy) < 20) {
                if (!tile.active) {
                    tile.active = true;
                    this.sequence.push(tile.number);
                    this.checkSequence();
                }
            }
        });
    }
    
    checkSequence() {
        // Check if current sequence matches correct sequence so far
        for (let i = 0; i < this.sequence.length; i++) {
            if (this.sequence[i] !== this.correctSequence[i]) {
                // Wrong! Reset
                this.sequence = [];
                this.tiles.forEach(tile => tile.active = false);
                return;
            }
        }
        
        // Check if complete
        if (this.sequence.length === this.correctSequence.length) {
            this.cleanup();
            completeLevel();
        }
    }
    
    update() {}
    
    draw() {
        ctx.fillStyle = '#a8d0e6';
        ctx.fillRect(0, 0, 800, 600);
        
        // Clouds
        for (let i = 0; i < 5; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(i * 200 - 50, 100 + i * 30, 40, 0, Math.PI * 2);
            ctx.arc(i * 200, 90 + i * 30, 50, 0, Math.PI * 2);
            ctx.arc(i * 200 + 50, 100 + i * 30, 40, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Title
        ctx.fillStyle = '#2d4563';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Sky Bridge', 400, 40);
        
        ctx.font = '10px "Press Start 2P"';
        ctx.fillText('Step on tiles in ascending order (1-7)', 400, 70);
        
        // Tiles
        this.tiles.forEach(tile => {
            ctx.fillStyle = tile.active ? '#4ade80' : '#6dd5ed';
            ctx.fillRect(tile.x - 40, tile.y - 20, 80, 40);
            
            ctx.strokeStyle = '#2d4563';
            ctx.lineWidth = 3;
            ctx.strokeRect(tile.x - 40, tile.y - 20, 80, 40);
            
            ctx.fillStyle = '#2d4563';
            ctx.font = '24px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(tile.number.toString(), tile.x, tile.y);
        });
        
        // Progress
        ctx.fillStyle = '#2d4563';
        ctx.font = '12px "Press Start 2P"';
        ctx.fillText(`Steps: ${this.sequence.length}/${this.correctSequence.length}`, 400, 560);
    }
    
    cleanup() {
        canvas.removeEventListener('click', this.clickTile.bind(this));
    }
}

// Level management
let currentLevelInstance: any = null;

function startLevel(levelIndex: number) {
    gameState.gamePhase = 'dialogue';
    
    // Set background for level dialogues
    if (levelIndex === 0) {
        currentDialogueBackground = 'level1'; // Use watermelon wasteland background
    } else {
        currentDialogueBackground = 'intro'; // Use hippo-hero for other levels
    }
    
    const levelIntros = [
        ["Welcome, brave traveler, to the Watermelon Wasteland!", "I cannot guide you until I have regained my strength. These lands have drained me. Bring me fuel—sweet, juicy fuel..."],
        ["You have reached the Orchard of Oddities!", "Catch the winter items (stars, snowflakes, trees) but avoid the summer ones!"],
        ["Behold, the Mirror Meadow!", "Click and drag the mirrors to reflect the light beam to the red target."],
        ["The Cipher Stones await your wisdom!", "Select all the solid glyphs and avoid the hollow ones."],
        ["The final trial: the Sky Bridge!", "Step on the floating tiles in ascending order, from 1 to 7."]
    ];
    
    showDialogue(levelIntros[levelIndex], () => {
        gameState.gamePhase = 'playing';
        
        switch (levelIndex) {
            case 0:
                currentLevelInstance = new PaperWastelandLevel();
                break;
            case 1:
                currentLevelInstance = new OrchardLevel();
                break;
            case 2:
                currentLevelInstance = new MirrorMeadowLevel();
                break;
            case 3:
                currentLevelInstance = new CipherStonesLevel();
                break;
            case 4:
                currentLevelInstance = new SkyBridgeLevel();
                break;
        }
    });
}

// Main game loop
function gameLoop() {
    if (gameState.gamePhase === 'playing' && currentLevelInstance) {
        currentLevelInstance.update();
        currentLevelInstance.draw();
    } else if (gameState.gamePhase === 'intro') {
        // Show title screen with winter background on home screen
        drawTitleScreen();
    } else if (gameState.gamePhase === 'dialogue') {
        // Show hippo hero background during dialogue
        drawDialogueScreen();
    }
    
    requestAnimationFrame(gameLoop);
}

// Update UI visibility based on game phase
function updateUIVisibility() {
    const restartButton = document.getElementById('restart-button')!;
    const runeDisplay = document.getElementById('rune-display')!;
    
    if (gameState.gamePhase === 'intro' || gameState.gamePhase === 'customization') {
        // Hide everything on home screen and customization screen
        restartButton.classList.add('hidden');
        runeDisplay.classList.add('hidden');
    } else {
        // Show restart button during gameplay, but keep rune display hidden
        restartButton.classList.remove('hidden');
        runeDisplay.classList.add('hidden');
    }
}

// Restart game function
function restartGame() {
    // Clean up current level instance if any
    if (currentLevelInstance && currentLevelInstance.cleanup) {
        currentLevelInstance.cleanup();
    }
    currentLevelInstance = null;
    
    // Reset game state
    gameState.currentLevel = 0;
    gameState.runes = [];
    gameState.levelComplete = false;
    gameState.gamePhase = 'intro';
    
    // Clear rune display
    updateRuneDisplay();
    
    // Hide final gate if showing
    const finalGate = document.getElementById('final-gate')!;
    finalGate.classList.add('hidden');
    
    // Hide dialogue box
    dialogueBox.classList.add('hidden');
    
    // Show start game overlay (home screen)
    const startGameOverlay = document.getElementById('start-game-overlay')!;
    startGameOverlay.classList.remove('hidden');
    
    // Update UI visibility
    updateUIVisibility();
}

// Update character preview image
function updateCharacterPreview() {
    const previewImage = document.getElementById('character-preview') as HTMLImageElement;
    const filename = `${gameState.selectedSprite}-${gameState.selectedCape}-${gameState.selectedTransport}.png`;
    previewImage.src = filename;
}

// Show customization screen
function showCustomizationScreen() {
    const startGameOverlay = document.getElementById('start-game-overlay')!;
    const customizationScreen = document.getElementById('customization-screen')!;
    
    startGameOverlay.classList.add('hidden');
    customizationScreen.classList.remove('hidden');
    gameState.gamePhase = 'customization';
    
    // Set default selections
    document.querySelector('[data-character="penguin"]')?.classList.add('selected');
    document.querySelector('[data-scarf="red"]')?.classList.add('selected');
    document.querySelector('[data-transport="sled"]')?.classList.add('selected');
    
    // Update preview with defaults
    updateCharacterPreview();
}

// Show name input screen
function showNameInputScreen() {
    const customizationScreen = document.getElementById('customization-screen')!;
    const nameInputScreen = document.getElementById('name-input-screen')!;
    const selectedSpritePreview = document.getElementById('selected-sprite-preview') as HTMLImageElement;
    
    customizationScreen.classList.add('hidden');
    nameInputScreen.classList.remove('hidden');
    
    // Update the sprite preview
    const filename = `${gameState.selectedSprite}-${gameState.selectedCape}-${gameState.selectedTransport}.png`;
    selectedSpritePreview.src = filename;
}

// Go back to sprite selection
function backToSpriteSelection() {
    const customizationScreen = document.getElementById('customization-screen')!;
    const nameInputScreen = document.getElementById('name-input-screen')!;
    
    nameInputScreen.classList.add('hidden');
    customizationScreen.classList.remove('hidden');
}

// Handle customization selections
function setupCustomization() {
    // Character selection
    document.querySelectorAll('[data-character]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('[data-character]').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            gameState.selectedSprite = card.getAttribute('data-character') || 'penguin';
            updateCharacterPreview();
        });
    });
    
    // Scarf selection
    document.querySelectorAll('[data-scarf]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('[data-scarf]').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            gameState.selectedCape = card.getAttribute('data-scarf') || 'red';
            updateCharacterPreview();
        });
    });
    
    // Transport selection
    document.querySelectorAll('[data-transport]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('[data-transport]').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            gameState.selectedTransport = card.getAttribute('data-transport') || 'sled';
            updateCharacterPreview();
        });
    });
    
    // Next button - go to name input
    const nextButton = document.getElementById('next-to-name-button')!;
    nextButton.addEventListener('click', () => {
        showNameInputScreen();
    });
    
    // Back button - return to sprite selection
    const backButton = document.getElementById('back-to-sprite-button')!;
    backButton.addEventListener('click', () => {
        backToSpriteSelection();
    });
    
    // Confirm button - start game with name
    const confirmButton = document.getElementById('confirm-name-button')!;
    const nameInput = document.getElementById('player-name-input') as HTMLInputElement;
    
    confirmButton.addEventListener('click', () => {
        gameState.playerName = nameInput.value.trim() || 'Hero';
        startGameIntro();
    });
}

// Start the intro dialogue and first level
function startGameIntro() {
    const customizationScreen = document.getElementById('customization-screen')!;
    const nameInputScreen = document.getElementById('name-input-screen')!;
    customizationScreen.classList.add('hidden');
    nameInputScreen.classList.add('hidden');
    
    // Update game phase and set intro background
    gameState.gamePhase = 'dialogue';
    currentDialogueBackground = 'intro'; // Use hippo-hero background
    updateUIVisibility();
    
    const greeting = gameState.playerName ? `Greetings, ${gameState.playerName}! I am the Winter Spirit.` : "Greetings, traveler! I am the Winter Spirit.";
    
    showDialogue([
        greeting,
        "The land is frozen in eternal winter, and only you can restore balance.",
        "Complete the Five Winter Trials to earn the Runes of Winter.",
        "With these runes, you shall unlock the ancient Winter Gate.",
        "Your journey begins now... Good luck!"
    ], () => {
        startLevel(0);
    });
}

// Set up start game button
const startGameButton = document.getElementById('start-game-button')!;
startGameButton.addEventListener('click', () => {
    showCustomizationScreen();
});

// Set up customization screen
setupCustomization();

// Set up restart button
const restartButton = document.getElementById('restart-button')!;
restartButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to start over? All progress will be lost.')) {
        restartGame();
    }
});

// Initialize UI visibility
updateUIVisibility();

// Set up music toggle button
const musicToggleButton = document.getElementById('music-toggle-button')!;
musicToggleButton.addEventListener('click', () => {
    toggleMusicMute();
});

// Try to start background music on page load
// Note: Some browsers may block autoplay until user interaction
startBackgroundMusic();

// Ensure music plays on first user interaction if autoplay was blocked
document.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        startBackgroundMusic();
    }
}, { once: true });

// Start game loop (shows home screen initially)
gameLoop();

