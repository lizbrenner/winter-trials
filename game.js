"use strict";
const gameState = {
    currentLevel: 0,
    runes: [],
    levelComplete: false,
    gamePhase: 'intro',
    playerName: '',
    selectedCharacter: 'yeti',
    selectedHat: 'hat-normal',
    selectedTransport: 'reindeer'
};
// Canvas setup
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
// Load custom images
const hippoHeroImage = new Image();
hippoHeroImage.src = 'hippo-hero.png';
let hippoHeroLoaded = false;
hippoHeroImage.onload = () => {
    hippoHeroLoaded = true;
};
const hippoAvatarImage = new Image();
hippoAvatarImage.src = 'hippo-avatar.png';
let hippoAvatarLoaded = false;
hippoAvatarImage.onload = () => {
    hippoAvatarLoaded = true;
};
const winterBackgroundImage = new Image();
winterBackgroundImage.src = 'home-background.png';
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
const frozenForestImage = new Image();
frozenForestImage.src = 'frozen-forest-background.png';
let frozenForestLoaded = false;
frozenForestImage.onload = () => {
    frozenForestLoaded = true;
};
const frozenForestWithHippoImage = new Image();
frozenForestWithHippoImage.src = 'frozen-forest-background-with-hippo.png';
let frozenForestWithHippoLoaded = false;
frozenForestWithHippoImage.onload = () => {
    frozenForestWithHippoLoaded = true;
};
const iceFieldBackgroundStartImage = new Image();
iceFieldBackgroundStartImage.src = 'ice-field-background-start.jpg';
let iceFieldBackgroundStartLoaded = false;
iceFieldBackgroundStartImage.onload = () => {
    iceFieldBackgroundStartLoaded = true;
};
const goblinGrottoBackgroundImage = new Image();
goblinGrottoBackgroundImage.src = 'goblin-grotto-background.png';
let goblinGrottoBackgroundLoaded = false;
goblinGrottoBackgroundImage.onload = () => {
    goblinGrottoBackgroundLoaded = true;
};
const dungeonDialogueBackgroundImage = new Image();
dungeonDialogueBackgroundImage.src = 'dungeon-dialog-background.png';
let dungeonDialogueBackgroundLoaded = false;
dungeonDialogueBackgroundImage.onload = () => {
    dungeonDialogueBackgroundLoaded = true;
};
const iceGoblinImage = new Image();
iceGoblinImage.src = 'ice-goblin-above.png';
let iceGoblinLoaded = false;
iceGoblinImage.onload = () => {
    iceGoblinLoaded = true;
};
const iceWallImage = new Image();
iceWallImage.src = 'ice-wall.png';
let iceWallLoaded = false;
iceWallImage.onload = () => {
    iceWallLoaded = true;
};
const iceWallTopBottomImage = new Image();
iceWallTopBottomImage.src = 'ice-wall-top-bottom.png';
let iceWallTopBottomLoaded = false;
iceWallTopBottomImage.onload = () => {
    iceWallTopBottomLoaded = true;
};
const torchImage = new Image();
torchImage.src = 'torch.png';
let torchLoaded = false;
torchImage.onload = () => {
    torchLoaded = true;
};
const fireballUpImage = new Image();
fireballUpImage.src = 'fireball-up.png';
let fireballUpLoaded = false;
fireballUpImage.onload = () => {
    fireballUpLoaded = true;
};
const fireballDownImage = new Image();
fireballDownImage.src = 'fireball-down.png';
let fireballDownLoaded = false;
fireballDownImage.onload = () => {
    fireballDownLoaded = true;
};
const iceCaveBackgroundImage = new Image();
iceCaveBackgroundImage.src = 'ice-cave-background.png';
let iceCaveBackgroundLoaded = false;
iceCaveBackgroundImage.onload = () => {
    iceCaveBackgroundLoaded = true;
};
const treeBranchImage = new Image();
treeBranchImage.src = 'tree-branch.png';
let treeBranchLoaded = false;
treeBranchImage.onload = () => {
    treeBranchLoaded = true;
};
const icePatchImage = new Image();
icePatchImage.src = 'ice-patch.png';
let icePatchLoaded = false;
icePatchImage.onload = () => {
    icePatchLoaded = true;
};
// Runic Tower level images
const dungeonBackgroundImage = new Image();
dungeonBackgroundImage.src = 'dungeon-background.png';
let dungeonBackgroundLoaded = false;
dungeonBackgroundImage.onload = () => {
    dungeonBackgroundLoaded = true;
};
const columnImage = new Image();
columnImage.src = 'column.png';
let columnLoaded = false;
columnImage.onload = () => {
    columnLoaded = true;
};
// Base sprite images (without transport)
const yetiImage = new Image();
yetiImage.src = 'yeti.png';
const bearImage = new Image();
bearImage.src = 'bear.png';
const penguinImage = new Image();
penguinImage.src = 'penguin.png';
// Hat images
const hatNormalImage = new Image();
hatNormalImage.src = 'hat-normal.png';
const hatVikingImage = new Image();
hatVikingImage.src = 'hat-viking.png';
const hatPlaidImage = new Image();
hatPlaidImage.src = 'hat-plaid.png';
// Serpent images - directional
// Head images
const serpentHeadUpImage = new Image();
serpentHeadUpImage.src = 'serpent-head-up.png';
const serpentHeadDownImage = new Image();
serpentHeadDownImage.src = 'serpent-head-down.png';
const serpentHeadLeftImage = new Image();
serpentHeadLeftImage.src = 'serpent-head-left.png';
const serpentHeadRightImage = new Image();
serpentHeadRightImage.src = 'serpent-head-right.png';
// Body images
const serpentBodyUpImage = new Image();
serpentBodyUpImage.src = 'serpent-body-up.png';
const serpentBodyDownImage = new Image();
serpentBodyDownImage.src = 'serpent-body-down.png';
const serpentBodyLeftImage = new Image();
serpentBodyLeftImage.src = 'serpent-body-left.png';
const serpentBodyRightImage = new Image();
serpentBodyRightImage.src = 'serpent-body-right.png';
// Corner images
const serpentCornerUpLeftImage = new Image();
serpentCornerUpLeftImage.src = 'serpent-corner-up-left.png';
const serpentCornerUpRightImage = new Image();
serpentCornerUpRightImage.src = 'serpent-corner-up-right.png';
const serpentCornerDownLeftImage = new Image();
serpentCornerDownLeftImage.src = 'serpent-corner-down-left.png';
const serpentCornerDownRightImage = new Image();
serpentCornerDownRightImage.src = 'serpent-corner-down-right.png';
const serpentCornerLeftLeftImage = new Image();
serpentCornerLeftLeftImage.src = 'serpent-corner-left-left.png';
const serpentCornerLeftRightImage = new Image();
serpentCornerLeftRightImage.src = 'serpent-corner-left-right.png';
const serpentCornerRightLeftImage = new Image();
serpentCornerRightLeftImage.src = 'serpent-corner-right-left.png';
const serpentCornerRightRightImage = new Image();
serpentCornerRightRightImage.src = 'serpent-corner-right-right.png';
// Tail images
const serpentTailUpImage = new Image();
serpentTailUpImage.src = 'serpent-tail-up.png';
const serpentTailDownImage = new Image();
serpentTailDownImage.src = 'serpent-tail-down.png';
const serpentTailLeftRightImage = new Image();
serpentTailLeftRightImage.src = 'serpent-tail-left-right.png';
const serpentTailRightImage = new Image();
serpentTailRightImage.src = 'serpent-tail-right.png';
const treeLogBackImage = new Image();
treeLogBackImage.src = 'tree-log-back.png';
let treeLogBackLoaded = false;
treeLogBackImage.onload = () => {
    treeLogBackLoaded = true;
};
const treeLogFrontImage = new Image();
treeLogFrontImage.src = 'tree-log-front.png';
let treeLogFrontLoaded = false;
treeLogFrontImage.onload = () => {
    treeLogFrontLoaded = true;
};
// Load slingshot and watermelon images for level 1
const slingshotImage = new Image();
slingshotImage.src = 'slingshot.png';
let slingshotLoaded = false;
slingshotImage.onload = () => {
    slingshotLoaded = true;
};
const slingshotWatermelonImage = new Image();
slingshotWatermelonImage.src = 'slingshot-watermelon.png';
let slingshotWatermelonLoaded = false;
slingshotWatermelonImage.onload = () => {
    slingshotWatermelonLoaded = true;
};
const hippoMouthOpenImage = new Image();
hippoMouthOpenImage.src = 'hippo-mouth-open.png';
let hippoMouthOpenLoaded = false;
hippoMouthOpenImage.onload = () => {
    hippoMouthOpenLoaded = true;
};
const hippoMouthClosedImage = new Image();
hippoMouthClosedImage.src = 'hippo-mouth-closed.png';
let hippoMouthClosedLoaded = false;
hippoMouthClosedImage.onload = () => {
    hippoMouthClosedLoaded = true;
};
const watermelonImage = new Image();
watermelonImage.src = 'watermelon.png';
let watermelonLoaded = false;
watermelonImage.onload = () => {
    watermelonLoaded = true;
};
const watermelonBrokenImage = new Image();
watermelonBrokenImage.src = 'watermelon-broken.png';
let watermelonBrokenLoaded = false;
watermelonBrokenImage.onload = () => {
    watermelonBrokenLoaded = true;
};
// Load rune images for level completions
const runeOImage = new Image();
runeOImage.src = 'rune-o.png';
let runeOLoaded = false;
runeOImage.onload = () => {
    runeOLoaded = true;
};
const runeGImage = new Image();
runeGImage.src = 'rune-g.png';
let runeGLoaded = false;
runeGImage.onload = () => {
    runeGLoaded = true;
};
const runeMImage = new Image();
runeMImage.src = 'rune-m.png';
let runeMLoaded = false;
runeMImage.onload = () => {
    runeMLoaded = true;
};
const runeNImage = new Image();
runeNImage.src = 'rune-n.png';
let runeNLoaded = false;
runeNImage.onload = () => {
    runeNLoaded = true;
};
const runeAImage = new Image();
runeAImage.src = 'rune-a.png';
let runeALoaded = false;
runeAImage.onload = () => {
    runeALoaded = true;
};
// Load ice field images for level 3
const iceFieldBackgroundImage = new Image();
iceFieldBackgroundImage.src = 'ice-field-background.png';
let iceFieldBackgroundLoaded = false;
iceFieldBackgroundImage.onload = () => {
    iceFieldBackgroundLoaded = true;
};
const iceBlockImage = new Image();
iceBlockImage.src = 'ice.png';
let iceBlockLoaded = false;
iceBlockImage.onload = () => {
    iceBlockLoaded = true;
};
const iceCrackImage = new Image();
iceCrackImage.src = 'ice-crack.png';
let iceCrackLoaded = false;
iceCrackImage.onload = () => {
    iceCrackLoaded = true;
};
const splashImage = new Image();
splashImage.src = 'splash.png';
let splashLoaded = false;
splashImage.onload = () => {
    splashLoaded = true;
};

// Load map image for travel transitions
const mapImage = new Image();
mapImage.src = 'map.png';
let mapLoaded = false;
mapImage.onload = () => {
    mapLoaded = true;
};
const towerImage = new Image();
towerImage.src = 'tower-empty.png';
let towerLoaded = false;
towerImage.onload = () => {
    towerLoaded = true;
};
// Load parchment rune images for final gate display
const parchmentRuneImages = {};
const parchmentRuneLetters = ['o', 'g', 'm', 'n', 'a'];
parchmentRuneLetters.forEach(letter => {
    const img = new Image();
    img.src = `parchment-rune-${letter}.png`;
    parchmentRuneImages[letter.toUpperCase()] = img;
});
// Load tower animation images for MANGO reveal
const towerAnimationImages = [];
const towerAnimationFiles = [
    'tower-m.png',
    'tower-ma.png',
    'tower-man.png',
    'tower-mang.png',
    'tower-mango.png',
    'tower-open-mango-free-1.png',
    'tower-open-mango-free-2.png',
    'tower-open-mango-free-3.png'
];
towerAnimationFiles.forEach(filename => {
    const img = new Image();
    img.src = filename;
    towerAnimationImages.push(img);
});
// Load mango and hippo completion image
const mangoAndHippoImage = new Image();
mangoAndHippoImage.src = 'mango-and-hippo.png';
let mangoAndHippoLoaded = false;
mangoAndHippoImage.onload = () => {
    mangoAndHippoLoaded = true;
};
// Load final image
const finalImage = new Image();
finalImage.src = 'final.png';
let finalImageLoaded = false;
finalImage.onload = () => {
    finalImageLoaded = true;
};
// Load rune background image for all rune displays
const runeBackgroundImage = new Image();
runeBackgroundImage.src = 'rune-background.png';
let runeBackgroundLoaded = false;
runeBackgroundImage.onload = () => {
    runeBackgroundLoaded = true;
};
// Load and setup audio
const backgroundMusic = new Audio('intro-background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.4; // 40% volume
backgroundMusic.preload = 'auto'; // Preload the audio
const endCreditsMusic = new Audio('end-credits-music.mp3');
endCreditsMusic.loop = true;
endCreditsMusic.volume = 0.4; // 40% volume
endCreditsMusic.preload = 'auto'; // Preload the audio
// Level 1 sound effects
const watermelonEatSound = new Audio('watermelon-eat.mp3');
watermelonEatSound.volume = 0.6;
watermelonEatSound.preload = 'auto';
const watermelonFailSound = new Audio('watermelon-fail.mp3');
watermelonFailSound.volume = 0.6;
watermelonFailSound.preload = 'auto';
// Level 3 sound effects
const iceCrackingSound = new Audio('ice-cracking.mp3');
iceCrackingSound.volume = 0.6;
iceCrackingSound.preload = 'auto';
const splashEffectSound = new Audio('splash-effect.mp3');
splashEffectSound.volume = 0.6;
splashEffectSound.preload = 'auto';
// Level 5 sound effects
const snakeHissSound = new Audio('snake-hiss.mp3');
snakeHissSound.volume = 0.5;
snakeHissSound.preload = 'auto';
let isMuted = false;
let currentMusic = backgroundMusic; // Track which music is playing
function startBackgroundMusic() {
    backgroundMusic.play().catch(error => {
        console.log("Audio autoplay prevented. Will play after user interaction:", error);
    });
}
function switchToEndCreditsMusic() {
    // Stop background music completely
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    
    // Switch to end credits music
    currentMusic = endCreditsMusic;
    endCreditsMusic.muted = isMuted;
    endCreditsMusic.currentTime = 0; // Start from beginning
    endCreditsMusic.play().catch(error => {
        console.log("End credits music autoplay prevented:", error);
    });
}
function toggleMusicMute() {
    isMuted = !isMuted;
    // Keep both tracks in sync for mute state
    backgroundMusic.muted = isMuted;
    endCreditsMusic.muted = isMuted;
    const musicButton = document.getElementById('music-toggle-button');
    if (isMuted) {
        musicButton.classList.add('muted');
    } else {
        musicButton.classList.remove('muted');
    }
}
// Hippo Character Drawing
function drawHippoCharacter(x, y, scale = 1) {
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
        }
        else {
            // Image is taller - fit to width
            drawWidth = canvas.width;
            drawHeight = winterBackgroundImage.height * (canvas.width / winterBackgroundImage.width);
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }
        ctx.drawImage(winterBackgroundImage, offsetX, offsetY, drawWidth, drawHeight);
    }
    else {
        // Fallback background while image loads
        ctx.fillStyle = '#4a7ba7';
        ctx.fillRect(0, 0, 800, 600);
    }
    // Title - yellow text on one line
    ctx.font = 'bold 24px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const title = '5 Runes of the Winter Trials';
    const titleY = 40;
    // Dark shadow/outline
    ctx.fillStyle = '#000000';
    const shadowOffsets = [
        { x: -3, y: -3 }, { x: 0, y: -3 }, { x: 3, y: -3 },
        { x: -3, y: 0 }, { x: 3, y: 0 },
        { x: -3, y: 3 }, { x: 0, y: 3 }, { x: 3, y: 3 }
    ];
    shadowOffsets.forEach(offset => {
        ctx.fillText(title, 400 + offset.x, titleY + offset.y);
    });
    // Light blue text
    ctx.fillStyle = '#6dd5ed';
    ctx.fillText(title, 400, titleY);
    // Subtitle text - white with black stroke
    ctx.font = '13px "Press Start 2P"';
    ctx.textAlign = 'center';
    const subtitleLines = [
        'Brave the icy realms to solve ancient',
        'trials and collect five magical runes',
        'said to unlock winter\'s greatest treasures'
    ];
    let yPos = 90;
    subtitleLines.forEach(line => {
        // Black stroke/outline
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeText(line, 400, yPos);
        // White fill
        ctx.fillStyle = '#ffffff';
        ctx.fillText(line, 400, yPos);
        yPos += 22;
    });
}
// Dialogue Screen Background
let currentDialogueBackground = 'intro';
let showRuneDisplay = false; // false or level number (0-4) to show rune

// Map Transition System
let mapTransitionActive = false;
let mapTransitionProgress = 0;
let mapStartPos = { x: 0, y: 0 };
let mapEndPos = { x: 0, y: 0 };
let mapTransitionCallback = null;
let mapTransitionSprite = null;
let mapTransitionDestination = '';

// Final Gate System
let finalGatePhase = 'intro'; // 'intro', 'input', or 'animation'
let finalGateInputValues = ['', '', '', '', '']; // 5 input boxes
let finalGateSelectedInput = 0; // Currently selected input box (0-4)
let finalGateMessage = '';
let finalGateMessageType = ''; // 'success' or 'error'
// Tower animation variables
let towerAnimationActive = false;
let towerAnimationFrame = 0;
let towerAnimationIndex = 0; // Current image in the sequence
const TOWER_ANIMATION_FRAME_DURATION = 60; // 1 second at 60fps

// Credits System
let creditsScrollY = 0;
const CREDITS_SCROLL_SPEED = 0.5; // Pixels per frame
const creditsLines = [
    '',
    '',
    '',
    'THE FIVE WINTER TRIALS',
    '',
    '',
    'A Game of Snow and Courage',
    '',
    '',
    '',
    '',
    'GAME DESIGN',
    'Winter Game Studios',
    '',
    '',
    'PROGRAMMING',
    'Chief Code Architect',
    '',
    '',
    'ART & GRAPHICS',
    'Pixel Perfect Artists',
    '',
    '',
    'MUSIC & SOUND',
    'Frosty Audio Productions',
    '',
    '',
    'SPECIAL THANKS',
    'Frostwaddle the Winter Spirit',
    'Mango the Companion',
    'Queen BooBear',
    '',
    '',
    'FEATURING',
    'Yeti, Penguin, and Bear',
    '',
    '',
    'LEVEL DESIGN',
    'Jollygut Hollow',
    'The Frozen Forest',
    'The Frozen Reach',
    'The Goblin Grotto',
    'The Runic Tower',
    '',
    '',
    'THANK YOU FOR PLAYING!',
    '',
    '',
    'May your journey be blessed',
    'with eternal winters beauty',
    '',
    '',
    '',
    '',
    '',
    ''
];

function showMapTransition(startPos, endPos, destinationName, onComplete) {
    mapTransitionActive = true;
    mapTransitionProgress = 0;
    mapStartPos = startPos;
    mapEndPos = endPos;
    mapTransitionDestination = destinationName;
    mapTransitionCallback = onComplete;
    gameState.gamePhase = 'map-transition';
    
    // Load the sprite image for the character
    mapTransitionSprite = new Image();
    const compositeFilename = `${gameState.selectedCharacter}-${gameState.selectedHat}-${gameState.selectedTransport}.png`;
    mapTransitionSprite.src = compositeFilename;
}

function updateMapTransition() {
    if (!mapTransitionActive) return;
    
    // Animate progress over ~6 seconds (360 frames at 60fps)
    mapTransitionProgress += 1 / 360;
    
    if (mapTransitionProgress >= 1) {
        mapTransitionProgress = 1;
        // Transition complete, wait a moment then call callback
        setTimeout(() => {
            mapTransitionActive = false;
            if (mapTransitionCallback) {
                mapTransitionCallback();
                mapTransitionCallback = null;
            }
        }, 500);
    }
}

function drawMapTransition() {
    if (!mapTransitionActive) return;
    
    // Draw map background
    if (mapLoaded) {
        ctx.imageSmoothingEnabled = false;
        
        // Fill canvas with map image
        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = mapImage.width / mapImage.height;
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imageAspect > canvasAspect) {
            // Image is wider - fit to height
            drawHeight = canvas.height;
            drawWidth = mapImage.width * (canvas.height / mapImage.height);
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Image is taller - fit to width
            drawWidth = canvas.width;
            drawHeight = mapImage.height * (canvas.width / mapImage.width);
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(mapImage, offsetX, offsetY, drawWidth, drawHeight);
        
        // Calculate sprite position (interpolate between start and end)
        const t = mapTransitionProgress;
        // Use easing function for smooth movement
        const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out
        
        const spriteX = mapStartPos.x + (mapEndPos.x - mapStartPos.x) * easedT;
        const spriteY = mapStartPos.y + (mapEndPos.y - mapStartPos.y) * easedT;
        
        // Convert to screen coordinates
        const screenX = offsetX + spriteX * drawWidth;
        const screenY = offsetY + spriteY * drawHeight;
        
        // Draw sprite
        const spriteSize = 80;
        if (mapTransitionSprite && mapTransitionSprite.complete) {
            ctx.drawImage(mapTransitionSprite, 
                screenX - spriteSize / 2, 
                screenY - spriteSize / 2, 
                spriteSize, 
                spriteSize);
        } else {
            // Fallback circle if sprite not loaded
            ctx.fillStyle = '#8b7aa8';
            ctx.beginPath();
            ctx.arc(screenX, screenY, spriteSize / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add a pulsing glow around the sprite
        const glowRadius = spriteSize / 2 + 10 + Math.sin(Date.now() * 0.005) * 5;
        const gradient = ctx.createRadialGradient(screenX, screenY, spriteSize / 2, screenX, screenY, glowRadius);
        gradient.addColorStop(0, 'rgba(109, 213, 237, 0.3)');
        gradient.addColorStop(1, 'rgba(109, 213, 237, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
    } else {
        // Fallback if map not loaded
        ctx.fillStyle = '#4a7ba7';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Traveling...', 400, 300);
    }
    
    // Title
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    const bgX = 150;
    const bgY = 20;
    const bgWidth = 500;
    const bgHeight = 60;
    const borderRadius = 16;
    
    ctx.beginPath();
    ctx.moveTo(bgX + borderRadius, bgY);
    ctx.lineTo(bgX + bgWidth - borderRadius, bgY);
    ctx.arcTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + borderRadius, borderRadius);
    ctx.lineTo(bgX + bgWidth, bgY + bgHeight - borderRadius);
    ctx.arcTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - borderRadius, bgY + bgHeight, borderRadius);
    ctx.lineTo(bgX + borderRadius, bgY + bgHeight);
    ctx.arcTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - borderRadius, borderRadius);
    ctx.lineTo(bgX, bgY + borderRadius);
    ctx.arcTo(bgX, bgY, bgX + borderRadius, bgY, borderRadius);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText(`Journey to ${mapTransitionDestination}`, 400, 55);
}
function drawDialogueScreen() {
    ctx.imageSmoothingEnabled = false;
    // Choose background based on current dialogue context
    let backgroundImage;
    let imageLoaded;
    
    // If showing rune display, use the specific rune image as background
    if (showRuneDisplay !== false) {
        // Use the specific rune image for each level as the background
        switch(showRuneDisplay) {
            case 0: // Level 1 - Jollygut Hollow
                backgroundImage = runeOImage;
                imageLoaded = runeOLoaded;
                break;
            case 1: // Level 2 - Orchard of Oddities
                backgroundImage = runeGImage;
                imageLoaded = runeGLoaded;
                break;
            case 2: // Level 3 - Mirror Meadow
                backgroundImage = runeMImage;
                imageLoaded = runeMLoaded;
                break;
            case 3: // Level 4 - Cipher Stones
                backgroundImage = runeNImage;
                imageLoaded = runeNLoaded;
                break;
            case 4: // Level 5 - The Runic Tower
                backgroundImage = runeAImage;
                imageLoaded = runeALoaded;
                break;
            default:
                backgroundImage = runeBackgroundImage;
                imageLoaded = runeBackgroundLoaded;
        }
    }
    else if (currentDialogueBackground === 'level1' && watermelonWastelandLoaded) {
        backgroundImage = watermelonWastelandImage;
        imageLoaded = watermelonWastelandLoaded;
    }
    else if (currentDialogueBackground === 'level2' && frozenForestLoaded) {
        backgroundImage = frozenForestImage;
        imageLoaded = frozenForestLoaded;
    }
    else if (currentDialogueBackground === 'level3' && iceFieldBackgroundStartLoaded) {
        backgroundImage = iceFieldBackgroundStartImage;
        imageLoaded = iceFieldBackgroundStartLoaded;
    }
    else if (currentDialogueBackground === 'level4' && goblinGrottoBackgroundLoaded) {
        backgroundImage = goblinGrottoBackgroundImage;
        imageLoaded = goblinGrottoBackgroundLoaded;
    }
    else if (currentDialogueBackground === 'level5' && dungeonDialogueBackgroundLoaded) {
        backgroundImage = dungeonDialogueBackgroundImage;
        imageLoaded = dungeonDialogueBackgroundLoaded;
    }
    else if (currentDialogueBackground === 'complete' && mangoAndHippoLoaded) {
        backgroundImage = mangoAndHippoImage;
        imageLoaded = mangoAndHippoLoaded;
    }
    else if (hippoHeroLoaded) {
        backgroundImage = hippoHeroImage;
        imageLoaded = hippoHeroLoaded;
    }
    
    if (!imageLoaded) {
        // Fallback background while image loads
        ctx.fillStyle = '#2d4563';
        ctx.fillRect(0, 0, 800, 600);
        return;
    }
    // Fill the entire canvas with the selected image
    let drawWidth, drawHeight, offsetX, offsetY;
    
    // For rune background, always stretch to fill full canvas (cover mode)
    if (showRuneDisplay !== false) {
        // Stretch to fill entire canvas - full width and height
        drawWidth = canvas.width;   // 800px
        drawHeight = canvas.height; // 600px
        offsetX = 0;
        offsetY = 0;
    } else {
        // For other backgrounds, maintain aspect ratio
        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = backgroundImage.width / backgroundImage.height;
        
        if (imageAspect > canvasAspect) {
            // Image is wider - fit to height
            drawHeight = canvas.height;
            drawWidth = backgroundImage.width * (canvas.height / backgroundImage.height);
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }
        else {
            // Image is taller - fit to width
            drawWidth = canvas.width;
            drawHeight = backgroundImage.height * (canvas.width / backgroundImage.width);
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }
    }
    ctx.drawImage(backgroundImage, offsetX, offsetY, drawWidth, drawHeight);
}
// Dialogue system
const dialogueBox = document.getElementById('dialogue-box');
const dialogueText = document.getElementById('dialogue-text');
const dialogueNext = document.getElementById('dialogue-next');
let currentDialogueQueue = [];
function showDialogue(messages, onComplete) {
    currentDialogueQueue = [...messages];
    gameState.gamePhase = 'dialogue';
    showNextDialogue(onComplete);
}
function showNextDialogue(onComplete) {
    if (currentDialogueQueue.length === 0) {
        dialogueBox.classList.add('hidden');
        onComplete();
        return;
    }
    const message = currentDialogueQueue.shift();
    dialogueText.textContent = message;
    dialogueBox.classList.remove('hidden');
    dialogueNext.onclick = () => showNextDialogue(onComplete);
}
// Rune system
const RUNE_LETTERS = ['O', 'G', 'M', 'N', 'A'];
function awardRune() {
    // Award runes in order: O, G, M, N, A (one per level)
    const runeIndex = gameState.runes.length;
    if (runeIndex < RUNE_LETTERS.length) {
        gameState.runes.push(RUNE_LETTERS[runeIndex]);
    }
    updateRuneDisplay();
}
function updateRuneDisplay() {
    const runeCollection = document.getElementById('rune-collection');
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
    
    // Show the appropriate rune display for each level (0-4)
    showRuneDisplay = gameState.currentLevel;
    
    const levelMessages = [
        "Well done, brave traveler! You have earned a Rune of Winter. The ancient power flows through you. Your journey continues...",
    ];
    showDialogue(levelMessages, () => {
        showRuneDisplay = false; // Reset the rune display flag
        gameState.currentLevel++;
        gameState.levelComplete = false;
        if (gameState.currentLevel >= 5) {
            showFinalGate();
        }
        else {
            // Check if we need to show map transition
            if (gameState.currentLevel === 1) {
                // After level 1, before level 2: Jollygut Hollow -> Frozen Forest
                showMapTransition(
                    { x: 0.75, y: 0.85 }, // Jollygut Hollow (bottom right corner)
                    { x: 0.5, y: 0.5 },   // Frozen Forest (center of map)
                    'Frozen Forest',
                    () => {
                        startLevel(gameState.currentLevel);
                    }
                );
            }
            else if (gameState.currentLevel === 2) {
                // After level 2, before level 3: Frozen Forest -> The Frozen Reach
                showMapTransition(
                    { x: 0.5, y: 0.5 },   // Frozen Forest (center of map)
                    { x: 0.25, y: 0.5 },  // The Frozen Reach (left center)
                    'The Frozen Reach',
                    () => {
                        startLevel(gameState.currentLevel);
                    }
                );
            }
            else if (gameState.currentLevel === 3) {
                // After level 3, before level 4: The Frozen Reach -> Goblin Grotto
                showMapTransition(
                    { x: 0.25, y: 0.5 },  // The Frozen Reach (left, middle)
                    { x: 0.75, y: 0.5 },  // Goblin Grotto (right, middle)
                    'Goblin Grotto',
                    () => {
                        startLevel(gameState.currentLevel);
                    }
                );
            }
            else if (gameState.currentLevel === 4) {
                // After level 4, before level 5: Goblin Grotto -> The Runic Tower
                showMapTransition(
                    { x: 0.75, y: 0.5 },  // Goblin Grotto (right, middle)
                    { x: 0.5, y: 0.2 },   // The Runic Tower (center top, in the sky)
                    'The Runic Tower',
                    () => {
                        startLevel(gameState.currentLevel);
                    }
                );
            }
            else {
                startLevel(gameState.currentLevel);
            }
        }
    });
}
// Final Gate
function showFinalGate() {
    // Hide HTML final gate overlay
    const finalGate = document.getElementById('final-gate');
    finalGate.classList.add('hidden');
    
    // Reset tower image to empty tower
    towerImage.src = 'tower-empty.png';
    towerLoaded = false;
    towerImage.onload = () => {
        towerLoaded = true;
    };
    
    // Set up canvas-based final gate
    gameState.gamePhase = 'final-gate';
    finalGatePhase = 'intro';
    finalGateInputValues = ['', '', '', '', ''];
    finalGateSelectedInput = 0;
    finalGateMessage = '';
    finalGateMessageType = '';
    
    // Reset animation state
    towerAnimationActive = false;
    towerAnimationFrame = 0;
    towerAnimationIndex = 0;
    
    // Add event listener for Continue button (spacebar or Enter during intro)
    // And keyboard input during input phase
}

function updateFinalGate() {
    // Update tower animation if active
    if (towerAnimationActive) {
        towerAnimationFrame++;
        
        // Determine duration for current frame
        // Last image (tower-open-mango-free-3.png) holds for 4 seconds (240 frames)
        const isLastImage = towerAnimationIndex === towerAnimationImages.length - 1;
        const frameDuration = isLastImage ? 240 : TOWER_ANIMATION_FRAME_DURATION;
        
        // Change to next image after duration
        if (towerAnimationFrame >= frameDuration) {
            towerAnimationFrame = 0;
            towerAnimationIndex++;
            
            // If we've shown all animation frames, complete the sequence
            if (towerAnimationIndex >= towerAnimationImages.length) {
                towerAnimationActive = false;
                // Show completion dialogue with mango-and-hippo background
                currentDialogueBackground = 'complete';
                // Switch to end credits music
                switchToEndCreditsMusic();
                showDialogue([
                    "The ancient magic recognizes your wisdom and you have unlocked the Winter Gate!",
                    "Thank you for returning my companion, Mango! He is very special to me and I would have been lost without him.",
                    "As a thank you for your hard work, please seek Queen BooBear in the Winter Palace to receive your reward."
                ], () => {
                    // Start rolling credits
                    gameState.gamePhase = 'credits';
                    creditsScrollY = 0; // Reset scroll position
                    dialogueBox.classList.add('hidden');
                });
            }
        }
    }
}

function drawFinalGate() {
    // Draw tower background - use animation images if in animation phase
    let currentTowerImage = towerImage;
    let imageLoaded = towerLoaded;
    
    if (finalGatePhase === 'animation' && towerAnimationActive) {
        currentTowerImage = towerAnimationImages[towerAnimationIndex];
        imageLoaded = currentTowerImage && currentTowerImage.complete;
    }
    
    if (imageLoaded) {
        ctx.imageSmoothingEnabled = false;
        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = currentTowerImage.width / currentTowerImage.height;
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imageAspect > canvasAspect) {
            drawHeight = canvas.height;
            drawWidth = currentTowerImage.width * (canvas.height / currentTowerImage.height);
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = currentTowerImage.height * (canvas.width / currentTowerImage.width);
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(currentTowerImage, offsetX, offsetY, drawWidth, drawHeight);
    } else {
        // Fallback background
        ctx.fillStyle = '#2d4563';
        ctx.fillRect(0, 0, 800, 600);
    }
    
    if (finalGatePhase === 'intro') {
        // Draw hippo avatar at bottom (only during intro)
        if (hippoAvatarLoaded) {
            const avatarWidth = 150;
            const avatarHeight = 150;
            const avatarX = 50;
            const avatarY = canvas.height - avatarHeight - 20;
            ctx.drawImage(hippoAvatarImage, avatarX, avatarY, avatarWidth, avatarHeight);
        }
        
        // Show intro text in dialogue box
        dialogueBox.classList.remove('hidden');
        dialogueText.textContent = 'The Winter Gate awaits! Unscramble the runes in the right order to unlock the gate.';
        dialogueNext.onclick = () => {
            finalGatePhase = 'input';
            dialogueBox.classList.add('hidden');
        };
        
    } else if (finalGatePhase === 'input') {
        // Hide dialogue box if showing
        dialogueBox.classList.add('hidden');
        
        // Show 5 input boxes in center
        const boxWidth = 60;
        const boxHeight = 70;
        const boxSpacing = 20;
        const startX = (canvas.width - (boxWidth * 5 + boxSpacing * 4)) / 2;
        const startY = 250;
        
        for (let i = 0; i < 5; i++) {
            const x = startX + i * (boxWidth + boxSpacing);
            const y = startY;
            
            // Draw box
            if (i === finalGateSelectedInput) {
                // Selected box - highlighted
                ctx.fillStyle = '#6dd5ed';
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 4;
            } else {
                ctx.fillStyle = '#4a5d6d';
                ctx.strokeStyle = '#2d4563';
                ctx.lineWidth = 2;
            }
            
            ctx.fillRect(x, y, boxWidth, boxHeight);
            ctx.strokeRect(x, y, boxWidth, boxHeight);
            
            // Draw letter if entered
            if (finalGateInputValues[i]) {
                ctx.fillStyle = '#ffffff';
                ctx.font = '32px "Press Start 2P"';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(finalGateInputValues[i], x + boxWidth / 2, y + boxHeight / 2);
            }
        }
        
        // Show collected runes at the bottom (O, G, M, N, A) - but not when success message is showing
        if (finalGateMessageType !== 'success') {
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('Collected Runes:', 400, 520);
            
            // Draw ALL 5 runes using parchment images - always show all of them
            const runeImageSize = 60;
            const runeSpacing = 15;
            const runeStartX = (canvas.width - (runeImageSize * 5 + runeSpacing * 4)) / 2;
            const runeY = 540;
            
            // Always display all 5 runes in the order they were collected
            const allRunes = ['O', 'G', 'M', 'N', 'A']; // All runes in collection order
            for (let i = 0; i < allRunes.length; i++) {
                const x = runeStartX + i * (runeImageSize + runeSpacing);
                const runeLetter = allRunes[i];
                const runeImage = parchmentRuneImages[runeLetter];
                
                // Draw parchment rune image if loaded
                if (runeImage && runeImage.complete) {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(runeImage, x, runeY, runeImageSize, runeImageSize);
                } else {
                    // Fallback: draw box with letter if image not loaded
                    ctx.fillStyle = '#6a5a88';
                    ctx.fillRect(x, runeY, runeImageSize, runeImageSize);
                    ctx.strokeStyle = '#8b7aa8';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x, runeY, runeImageSize, runeImageSize);
                    
                    ctx.fillStyle = '#ffd700';
                    ctx.font = '24px "Press Start 2P"';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(runeLetter, x + runeImageSize / 2, runeY + runeImageSize / 2);
                }
            }
        }
        
        // Show message if any
        if (finalGateMessage) {
            ctx.font = '12px "Press Start 2P"';
            if (finalGateMessageType === 'success') {
                ctx.fillStyle = '#4ade80';
            } else {
                ctx.fillStyle = '#f87171';
            }
            ctx.fillText(finalGateMessage, 400, 420);
        }
    } else if (finalGatePhase === 'animation') {
        // During animation, only show the tower images (no input boxes or runes)
        // The tower images are already drawn above
    }
}

// Credits System Functions
function updateCredits() {
    creditsScrollY += CREDITS_SCROLL_SPEED;
    
    // Calculate total height of credits
    const lineHeight = 30;
    const totalHeight = creditsLines.length * lineHeight;
    
    // When credits have scrolled past the screen, show final image
    if (creditsScrollY > totalHeight + canvas.height) {
        gameState.gamePhase = 'final';
    }
}

function drawCredits() {
    // Black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw credits text
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const lineHeight = 30;
    const startY = canvas.height - creditsScrollY;
    
    creditsLines.forEach((line, index) => {
        const y = startY + (index * lineHeight);
        
        // Only draw lines that are visible on screen
        if (y > -lineHeight && y < canvas.height + lineHeight) {
            // Make section headers (all caps lines) slightly bigger and gold
            if (line.length > 0 && line === line.toUpperCase() && 
                !line.includes('THE FIVE') && !line.includes('THANK YOU')) {
                ctx.fillStyle = '#ffd700';
                ctx.font = '10px "Press Start 2P"';
            } else if (line.includes('THE FIVE WINTER TRIALS')) {
                ctx.fillStyle = '#6dd5ed';
                ctx.font = '16px "Press Start 2P"';
            } else if (line.includes('THANK YOU')) {
                ctx.fillStyle = '#4ade80';
                ctx.font = '14px "Press Start 2P"';
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px "Press Start 2P"';
            }
            
            ctx.fillText(line, canvas.width / 2, y);
        }
    });
}

function drawFinalScreen() {
    // Draw final image
    if (finalImageLoaded) {
        ctx.imageSmoothingEnabled = false;
        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = finalImage.width / finalImage.height;
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imageAspect > canvasAspect) {
            drawHeight = canvas.height;
            drawWidth = finalImage.width * (canvas.height / finalImage.height);
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = finalImage.height * (canvas.width / finalImage.width);
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(finalImage, offsetX, offsetY, drawWidth, drawHeight);
    } else {
        // Fallback black screen
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// ===================
// LEVEL 1: Jollygut Hollow
// ===================
class PaperWastelandLevel {
    constructor() {
        this.slingshot = { x: 360, y: 520, width: 80, height: 80 };
        this.hippoTarget = { 
            x: 200, 
            y: 280, 
            width: 100, 
            height: 100, 
            vx: 0.8,
            mouthOpen: true,
            messageTimer: 0,
            message: ''
        };
        this.watermelons = [];
        // Create 5 watermelons in bottom left corner
        for (let i = 0; i < 5; i++) {
            this.watermelons.push({
                x: 50 + i * 50,
                y: 550,
                width: 40,
                height: 40,
                available: true
            });
        }
        this.loadedWatermelon = false;
        this.power = 0;
        this.charging = false;
        this.score = 0;
        this.targetScore = 5;
        this.angle = -45;
        this.projectiles = [];
        this.brokenWatermelons = [];
        
        // Bind event handlers
        this.mouseDownHandler = this.handleMouseDown.bind(this);
        this.mouseUpHandler = this.handleMouseUp.bind(this);
        this.mouseMoveHandler = this.handleMouseMove.bind(this);
        
        canvas.addEventListener('mousedown', this.mouseDownHandler);
        canvas.addEventListener('mouseup', this.mouseUpHandler);
        canvas.addEventListener('mousemove', this.mouseMoveHandler);
    }
    
    handleMouseDown(e) {
        if (gameState.gamePhase !== 'playing') return;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Check if clicking on a watermelon
        if (!this.loadedWatermelon) {
            for (let watermelon of this.watermelons) {
                if (watermelon.available &&
                    mouseX > watermelon.x && mouseX < watermelon.x + watermelon.width &&
                    mouseY > watermelon.y && mouseY < watermelon.y + watermelon.height) {
                    watermelon.available = false;
                    this.loadedWatermelon = true;
                    return;
                }
            }
        }
        
        // If watermelon is loaded, start charging
        if (this.loadedWatermelon) {
            this.charging = true;
        }
    }
    
    handleMouseUp() {
        if (this.charging && this.loadedWatermelon && gameState.gamePhase === 'playing') {
            const speed = this.power * 0.15;
            const angleRad = this.angle * Math.PI / 180;
            this.projectiles.push({
                x: this.slingshot.x + this.slingshot.width / 2,
                y: this.slingshot.y + 20,
                vx: Math.cos(angleRad) * speed,
                vy: Math.sin(angleRad) * speed,
                radius: 15
            });
            this.charging = false;
            this.power = 0;
            this.loadedWatermelon = false;
        }
    }
    
    handleMouseMove(e) {
        if (gameState.gamePhase !== 'playing') return;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        if (this.loadedWatermelon) {
            const dx = mouseX - (this.slingshot.x + this.slingshot.width / 2);
            const dy = mouseY - (this.slingshot.y + 20);
            this.angle = Math.atan2(dy, dx) * 180 / Math.PI;
        }
    }
    
    update() {
        // Update charging power
        if (this.charging) {
            this.power = Math.min(this.power + 2, 100);
        }
        
        // Move hippo target back and forth
        this.hippoTarget.x += this.hippoTarget.vx;
        if (this.hippoTarget.x <= 150 || this.hippoTarget.x >= 550) {
            this.hippoTarget.vx *= -1;
        }
        
        // Update message timer
        if (this.hippoTarget.messageTimer > 0) {
            this.hippoTarget.messageTimer--;
            if (this.hippoTarget.messageTimer === 0) {
                this.hippoTarget.message = '';
                this.hippoTarget.mouthOpen = true;
            }
        }
        
        // Check if we need to replenish watermelons
        const availableWatermelons = this.watermelons.filter(w => w.available).length;
        const projectilesInFlight = this.projectiles.length;
        
        // If no watermelons available, none loaded, no projectiles in flight, and haven't won yet
        if (availableWatermelons === 0 && !this.loadedWatermelon && projectilesInFlight === 0 && this.score < this.targetScore) {
            // Replenish all watermelons
            this.watermelons.forEach(w => w.available = true);
        }
        
        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const proj = this.projectiles[i];
            
            // Pre-check for ground collision sound (trigger before visual impact for responsiveness)
            const watermelonRadius = 20; // Half of watermelon size (40px)
            const groundY = 580;
            if (!proj.groundSoundPlayed && proj.y + watermelonRadius >= groundY - 30) {
                // Will hit ground soon - play sound now for better sync
                if (!isMuted && this.hippoTarget.mouthOpen) { // Only if didn't hit hippo
                    const failSound = watermelonFailSound.cloneNode();
                    failSound.volume = 0.6;
                    failSound.play().catch(err => console.log("Audio play failed:", err));
                    proj.groundSoundPlayed = true;
                }
            }
            
            proj.x += proj.vx;
            proj.y += proj.vy;
            proj.vy += 0.4; // gravity
            
            // Check collision with hippo (with anticipation for sound)
            const anticipation = 25; // pixels to anticipate collision for sound
            if (this.hippoTarget.mouthOpen &&
                proj.x > this.hippoTarget.x - anticipation && 
                proj.x < this.hippoTarget.x + this.hippoTarget.width + anticipation &&
                proj.y > this.hippoTarget.y - anticipation && 
                proj.y < this.hippoTarget.y + this.hippoTarget.height + anticipation) {
                // Hit! Play sound immediately
                if (!isMuted && !proj.hitSoundPlayed) {
                    const eatSound = watermelonEatSound.cloneNode();
                    eatSound.volume = 0.6;
                    eatSound.play().catch(err => console.log("Audio play failed:", err));
                    proj.hitSoundPlayed = true;
                }
                
                // Only score if actually inside the hitbox
                if (proj.x > this.hippoTarget.x && 
                    proj.x < this.hippoTarget.x + this.hippoTarget.width &&
                    proj.y > this.hippoTarget.y && 
                    proj.y < this.hippoTarget.y + this.hippoTarget.height) {
                    this.score++;
                    this.hippoTarget.mouthOpen = false;
                    this.hippoTarget.message = 'Yum, that was delicious!';
                    this.hippoTarget.messageTimer = 180; // Show message for 3 seconds
                    this.projectiles.splice(i, 1);
                    
                    if (this.score >= this.targetScore) {
                        this.cleanup();
                        completeLevel();
                    }
                    continue;
                }
            }
            
            // Check if hit ground (visual impact)
            if (proj.y >= groundY) {
                this.brokenWatermelons.push({ x: proj.x, y: groundY });
                if (this.hippoTarget.messageTimer === 0) {
                    this.hippoTarget.message = 'Not quite, try again!';
                    this.hippoTarget.messageTimer = 150; // Show message for 2.5 seconds
                }
                this.projectiles.splice(i, 1);
            }
            // Remove if off screen
            else if (proj.x < 0 || proj.x > 800 || proj.y > 600) {
                this.projectiles.splice(i, 1);
            }
        }
    }
    
    draw() {
        // Draw Jollygut Hollow background
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
            }
            else {
                drawWidth = canvas.width;
                drawHeight = watermelonWastelandImage.height * (canvas.width / watermelonWastelandImage.width);
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }
            ctx.drawImage(watermelonWastelandImage, offsetX, offsetY, drawWidth, drawHeight);
        }
        else {
            // Fallback if image not loaded
            ctx.fillStyle = '#e8f4f8';
            ctx.fillRect(0, 0, 800, 600);
        }
        
        // Title with semi-transparent background with padding and rounded corners
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        // Draw rounded rectangle (x, y, width, height with 16px padding on sides)
        const bgX = 234;
        const bgY = 10;
        const bgWidth = 332;
        const bgHeight = 75;
        const borderRadius = 24;
        
        ctx.beginPath();
        ctx.moveTo(bgX + borderRadius, bgY);
        ctx.lineTo(bgX + bgWidth - borderRadius, bgY);
        ctx.arcTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + borderRadius, borderRadius);
        ctx.lineTo(bgX + bgWidth, bgY + bgHeight - borderRadius);
        ctx.arcTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - borderRadius, bgY + bgHeight, borderRadius);
        ctx.lineTo(bgX + borderRadius, bgY + bgHeight);
        ctx.arcTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - borderRadius, borderRadius);
        ctx.lineTo(bgX, bgY + borderRadius);
        ctx.arcTo(bgX, bgY, bgX + borderRadius, bgY, borderRadius);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Jollygut Hollow', 400, 40);
        ctx.font = '12px "Press Start 2P"';
        ctx.fillText(`Score: ${this.score}/${this.targetScore}`, 400, 70);
        
        // Draw hippo target
        ctx.imageSmoothingEnabled = false;
        if (this.hippoTarget.mouthOpen && hippoMouthOpenLoaded) {
            ctx.drawImage(hippoMouthOpenImage, this.hippoTarget.x, this.hippoTarget.y, 
                         this.hippoTarget.width, this.hippoTarget.height);
        } else if (!this.hippoTarget.mouthOpen && hippoMouthClosedLoaded) {
            ctx.drawImage(hippoMouthClosedImage, this.hippoTarget.x, this.hippoTarget.y, 
                         this.hippoTarget.width, this.hippoTarget.height);
        } else {
            // Fallback
            ctx.fillStyle = '#8b7aa8';
            ctx.fillRect(this.hippoTarget.x, this.hippoTarget.y, this.hippoTarget.width, this.hippoTarget.height);
        }
        
        // Draw hippo message
        if (this.hippoTarget.message) {
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#2d4563';
            ctx.lineWidth = 3;
            ctx.font = '14px "Press Start 2P"';
            ctx.textAlign = 'center';
            const messageX = this.hippoTarget.x + this.hippoTarget.width / 2;
            const messageY = this.hippoTarget.y - 20;
            ctx.strokeText(this.hippoTarget.message, messageX, messageY);
            ctx.fillText(this.hippoTarget.message, messageX, messageY);
        }
        
        // Draw broken watermelons
        this.brokenWatermelons.forEach(broken => {
            if (watermelonBrokenLoaded) {
                ctx.drawImage(watermelonBrokenImage, broken.x - 20, broken.y - 20, 40, 40);
            } else {
                ctx.fillStyle = '#8b4513';
                ctx.beginPath();
                ctx.arc(broken.x, broken.y, 15, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Draw available watermelons in corner
        this.watermelons.forEach(watermelon => {
            if (watermelon.available) {
                if (watermelonLoaded) {
                    ctx.drawImage(watermelonImage, watermelon.x, watermelon.y, 
                                 watermelon.width, watermelon.height);
                } else {
                    ctx.fillStyle = '#4ade80';
                    ctx.fillRect(watermelon.x, watermelon.y, watermelon.width, watermelon.height);
                }
            }
        });
        
        // Draw slingshot
        if (this.loadedWatermelon && slingshotWatermelonLoaded) {
            ctx.drawImage(slingshotWatermelonImage, this.slingshot.x, this.slingshot.y, 
                         this.slingshot.width, this.slingshot.height);
        } else if (!this.loadedWatermelon && slingshotLoaded) {
            ctx.drawImage(slingshotImage, this.slingshot.x, this.slingshot.y, 
                         this.slingshot.width, this.slingshot.height);
        } else {
            // Fallback
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(this.slingshot.x, this.slingshot.y, this.slingshot.width, this.slingshot.height);
        }
        
        // Aim line
        if (this.loadedWatermelon && gameState.gamePhase === 'playing') {
            ctx.strokeStyle = 'rgba(255, 100, 100, 0.6)';
            ctx.fillStyle = 'rgba(255, 100, 100, 0.8)';
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            const startX = this.slingshot.x + this.slingshot.width / 2;
            const startY = this.slingshot.y + 20;
            const angleRad = this.angle * Math.PI / 180;
            const lineLength = this.power + 100;
            const endX = startX + Math.cos(angleRad) * lineLength;
            const endY = startY + Math.sin(angleRad) * lineLength;
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Draw arrow at the end of the aim line
            const arrowSize = 15;
            ctx.save();
            ctx.translate(endX, endY);
            ctx.rotate(angleRad);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-arrowSize, -arrowSize / 2);
            ctx.lineTo(-arrowSize, arrowSize / 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        
        // Power bar
        if (this.charging) {
            const barWidth = 100;
            const barHeight = 15;
            const barX = this.slingshot.x + (this.slingshot.width - barWidth) / 2;
            const barY = this.slingshot.y - 30;
            
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(barX, barY, (this.power / 100) * barWidth, barHeight);
            ctx.strokeStyle = '#2d4563';
            ctx.lineWidth = 2;
            ctx.strokeRect(barX, barY, barWidth, barHeight);
        }
        
        // Draw projectiles
        this.projectiles.forEach(proj => {
            if (watermelonLoaded) {
                ctx.drawImage(watermelonImage, proj.x - proj.radius, proj.y - proj.radius, 
                             proj.radius * 2, proj.radius * 2);
            } else {
                ctx.fillStyle = '#4ade80';
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
    
    cleanup() {
        canvas.removeEventListener('mousedown', this.mouseDownHandler);
        canvas.removeEventListener('mouseup', this.mouseUpHandler);
        canvas.removeEventListener('mousemove', this.mouseMoveHandler);
    }
}
// ===================
// LEVEL 2: Frozen Forest
// ===================
class FrozenForestLevel {
    constructor() {
        // Load player sprite composite image
        this.playerSprite = new Image();
        const compositeFilename = `${gameState.selectedCharacter}-${gameState.selectedHat}-${gameState.selectedTransport}.png`;
        this.playerSprite.src = compositeFilename;
        this.playerSpriteLoaded = false;
        this.playerSprite.onload = () => {
            this.playerSpriteLoaded = true;
        };
        
        // Player properties
        this.player = {
            x: 150,
            y: 400,
            width: 120,
            height: 180,
            normalHeight: 180,
            duckHeight: 90,
            vx: 2, // Auto-run speed
            vy: 0,
            normalSpeed: 2,
            slowSpeed: 1,
            fastSpeed: 3.5,
            onGround: true,
            isDucking: false,
            isJumping: false
        };
        
        // Physics
        this.gravity = 0.25;
        this.jumpPower = -12;
        this.groundY = 400;
        
        // Obstacles
        this.fallingBranches = [];
        this.icePatches = [];
        
        // Spawn timers with random initial interval
        this.branchSpawnTimer = 0;
        this.branchSpawnInterval = 120 + Math.random() * 230; // Random frames between branch spawns
        
        // Level timer (20 seconds = 1200 frames at 60fps)
        this.levelTimer = 1200;
        this.timerStarted = false;
        
        // Input tracking
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false
        };
        
        // Initialize obstacles
        this.initializeObstacles();
        
        // Bind event handlers
        this.keyDownHandler = this.handleKeyDown.bind(this);
        this.keyUpHandler = this.handleKeyUp.bind(this);
        
        window.addEventListener('keydown', this.keyDownHandler);
        window.addEventListener('keyup', this.keyUpHandler);
        
        // Start timer
        this.timerStarted = true;
    }
    
    initializeObstacles() {
        // Place ice patches along the ground with random spacing
        // Randomize number of ice patches between 7-10
        const numPatches = 7 + Math.floor(Math.random() * 4);
        let currentX = 700 + Math.random() * 300; // Random starting position
        
        for (let i = 0; i < numPatches; i++) {
            // Add random spacing between 350-850 pixels
            currentX += 350 + Math.random() * 500;
            this.icePatches.push({
                x: currentX,
                y: this.groundY + this.player.normalHeight - 20,
                width: 90,
                height: 20
            });
        }
    }
    
    handleKeyDown(e) {
        if (gameState.gamePhase !== 'playing') return;
        
        if (e.key === 'ArrowLeft') {
            this.keys.left = true;
        }
        if (e.key === 'ArrowRight') {
            this.keys.right = true;
        }
        if (e.key === 'ArrowUp' && this.player.onGround && !this.player.isDucking) {
            this.keys.up = true;
            this.player.vy = this.jumpPower;
            this.player.onGround = false;
            this.player.isJumping = true;
        }
        if (e.key === 'ArrowDown' && this.player.onGround) {
            this.keys.down = true;
            this.player.isDucking = true;
            this.player.height = this.player.duckHeight;
            this.player.y = this.groundY + this.player.normalHeight - this.player.duckHeight;
        }
    }
    
    handleKeyUp(e) {
        if (gameState.gamePhase !== 'playing') return;
        
        if (e.key === 'ArrowLeft') {
            this.keys.left = false;
        }
        if (e.key === 'ArrowRight') {
            this.keys.right = false;
        }
        if (e.key === 'ArrowUp') {
            this.keys.up = false;
        }
        if (e.key === 'ArrowDown') {
            this.keys.down = false;
            if (this.player.isDucking && this.player.onGround) {
                this.player.isDucking = false;
                this.player.height = this.player.normalHeight;
                this.player.y = this.groundY;
            }
        }
    }
    
    update() {
        // Update timer
        if (this.timerStarted) {
            this.levelTimer--;
            if (this.levelTimer <= 0) {
                this.levelTimer = 0;
                this.cleanup();
                completeLevel();
                return;
            }
        }
        
        // Update player speed based on input
        if (this.keys.right) {
            this.player.vx = this.player.fastSpeed;
        } else if (this.keys.left) {
            this.player.vx = this.player.slowSpeed;
        } else {
            this.player.vx = this.player.normalSpeed;
        }
        
        // Move player forward
        this.player.x += this.player.vx;
        
        // Apply gravity
        if (!this.player.onGround) {
            this.player.vy += this.gravity;
            this.player.y += this.player.vy;
            
            // Check ground collision
            if (this.player.y >= this.groundY) {
                this.player.y = this.groundY;
                this.player.vy = 0;
                this.player.onGround = true;
                this.player.isJumping = false;
            }
        }
        
        // Spawn falling branches with more randomization
        this.branchSpawnTimer++;
        if (this.branchSpawnTimer > this.branchSpawnInterval) {
            this.branchSpawnTimer = 0;
            // More varied spawn intervals: between 120-350 frames
            this.branchSpawnInterval = 120 + Math.random() * 230;
            
            // Find a safe position that's not above an ice patch
            const safeX = this.findSafeBranchPosition();
            
            this.fallingBranches.push({
                x: safeX,
                y: -80,
                width: 60,
                height: 120,
                speed: 3
            });
        }
        
        // Update falling branches
        for (let i = this.fallingBranches.length - 1; i >= 0; i--) {
            const branch = this.fallingBranches[i];
            branch.y += branch.speed;
            
            // Check collision with player (smaller hitbox with padding)
            const branchPadding = 15;
            if (this.checkCollision(
                this.player.x + 10, this.player.y + 10, this.player.width - 20, this.player.height - 20,
                branch.x + branchPadding, branch.y + branchPadding, 
                branch.width - branchPadding * 2, branch.height - branchPadding * 2
            )) {
                this.restartLevel();
                return;
            }
            
            // Remove if off screen
            if (branch.y > 600 || branch.x < this.player.x - 200) {
                this.fallingBranches.splice(i, 1);
            }
        }
        
        // Check ice patch collisions (smaller hitbox with padding)
        const icePadding = 15;
        for (const ice of this.icePatches) {
            if (this.checkCollision(
                this.player.x + 10, this.player.y + 10, this.player.width - 20, this.player.height - 20,
                ice.x + icePadding, ice.y, 
                ice.width - icePadding * 2, ice.height
            )) {
                this.restartLevel();
                return;
            }
        }
    }
    
    checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x1 < x2 + w2 &&
               x1 + w1 > x2 &&
               y1 < y2 + h2 &&
               y1 + h1 > y2;
    }
    
    isPositionAboveIcePatch(x, branchWidth) {
        // Check if a branch at position x would fall on any ice patch
        // Add a buffer zone of 50 pixels on each side for safety
        const buffer = 50;
        for (const ice of this.icePatches) {
            if (x + branchWidth + buffer > ice.x && x - buffer < ice.x + ice.width) {
                return true;
            }
        }
        return false;
    }
    
    findSafeBranchPosition() {
        // Try to find a position that's not above an ice patch
        // Try up to 10 times before giving up
        const branchWidth = 60;
        for (let attempt = 0; attempt < 10; attempt++) {
            const x = this.player.x + 100 + Math.random() * 600;
            if (!this.isPositionAboveIcePatch(x, branchWidth)) {
                return x;
            }
        }
        // If we can't find a safe spot after 10 tries, return a far position
        return this.player.x + 400;
    }
    
    restartLevel() {
        // Reset player position
        this.player.x = 150;
        this.player.y = this.groundY;
        this.player.vy = 0;
        this.player.onGround = true;
        this.player.isDucking = false;
        this.player.isJumping = false;
        this.player.height = this.player.normalHeight;
        
        // Reset timer
        this.levelTimer = 1200;
        this.timerStarted = true;
        
        // Clear and reinitialize obstacles
        this.fallingBranches = [];
        this.icePatches = [];
        this.initializeObstacles();
        
        // Reset spawn timer with randomization
        this.branchSpawnTimer = 0;
        // Start with a random interval so branches don't always spawn at the same time
        this.branchSpawnInterval = 120 + Math.random() * 230;
    }
    
    draw() {
        // Camera offset - follow player but keep them centered-ish
        const cameraX = this.player.x - 200;
        
        // Scrolling background - frozen forest image that repeats
        if (frozenForestLoaded) {
            ctx.imageSmoothingEnabled = false;
            
            // Scale background to fit canvas height
            const scale = canvas.height / frozenForestImage.height;
            const scaledWidth = frozenForestImage.width * scale;
            const scaledHeight = canvas.height;
            
            // Calculate scroll position (slower than player movement for parallax effect)
            const bgScrollX = -(cameraX * 0.5) % scaledWidth;
            
            // Draw background twice to create seamless scrolling
            ctx.drawImage(frozenForestImage, bgScrollX, 0, scaledWidth, scaledHeight);
            ctx.drawImage(frozenForestImage, bgScrollX + scaledWidth, 0, scaledWidth, scaledHeight);
            
            // Draw a third instance if needed to cover the canvas
            if (bgScrollX + scaledWidth * 2 < canvas.width) {
                ctx.drawImage(frozenForestImage, bgScrollX + scaledWidth * 2, 0, scaledWidth, scaledHeight);
            }
        }
        else {
            // Fallback if image not loaded
            ctx.fillStyle = '#d4e9f7';
            ctx.fillRect(0, 0, 800, 600);
        }
        
        // Title with background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        const bgX = 250;
        const bgY = 10;
        const bgWidth = 300;
        const bgHeight = 75;
        const borderRadius = 24;
        
        ctx.beginPath();
        ctx.moveTo(bgX + borderRadius, bgY);
        ctx.lineTo(bgX + bgWidth - borderRadius, bgY);
        ctx.arcTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + borderRadius, borderRadius);
        ctx.lineTo(bgX + bgWidth, bgY + bgHeight - borderRadius);
        ctx.arcTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - borderRadius, bgY + bgHeight, borderRadius);
        ctx.lineTo(bgX + borderRadius, bgY + bgHeight);
        ctx.arcTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - borderRadius, borderRadius);
        ctx.lineTo(bgX, bgY + borderRadius);
        ctx.arcTo(bgX, bgY, bgX + borderRadius, bgY, borderRadius);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Frozen Forest', 400, 40);
        ctx.font = '12px "Press Start 2P"';
        const timeLeft = Math.ceil(this.levelTimer / 60);
        ctx.fillText(`Time: ${timeLeft}s`, 400, 70);
        
        // Draw ice patches (in world space, adjusted by camera)
        ctx.imageSmoothingEnabled = false;
        for (const ice of this.icePatches) {
            const screenX = ice.x - cameraX;
            if (screenX > -150 && screenX < 900) {
                if (icePatchLoaded) {
                    ctx.drawImage(icePatchImage, screenX, ice.y, ice.width, ice.height);
                } else {
                    // Fallback
                    ctx.fillStyle = '#6dd5ed';
                    ctx.fillRect(screenX, ice.y, ice.width, ice.height);
                    ctx.fillStyle = '#a8e6f7';
                    ctx.fillRect(screenX + 8, ice.y + 4, ice.width - 16, 6);
                }
            }
        }
        
        // Draw player sprite (in world space, adjusted by camera)
        ctx.imageSmoothingEnabled = false;
        const playerScreenX = this.player.x - cameraX;
        if (this.playerSpriteLoaded) {
            // Draw the user's selected sprite composite
            ctx.drawImage(this.playerSprite, playerScreenX, this.player.y, this.player.width, this.player.height);
        } else {
            // Fallback rectangle if sprite not loaded
            if (this.player.isDucking) {
                ctx.fillStyle = '#ff6b6b';
            } else if (this.player.isJumping) {
                ctx.fillStyle = '#4ecdc4';
            } else {
                ctx.fillStyle = '#8b7aa8';
            }
            ctx.fillRect(playerScreenX, this.player.y, this.player.width, this.player.height);
            
            // Player details (simple face)
            ctx.fillStyle = '#2d3748';
            ctx.fillRect(playerScreenX + 30, this.player.y + 45, 18, 18); // Eye
            ctx.fillRect(playerScreenX + 72, this.player.y + 45, 18, 18); // Eye
        }
        
        // Draw falling branches (in world space, adjusted by camera)
        ctx.imageSmoothingEnabled = false;
        for (const branch of this.fallingBranches) {
            const screenX = branch.x - cameraX;
            if (screenX > -100 && screenX < 900) {
                if (treeBranchLoaded) {
                    ctx.drawImage(treeBranchImage, screenX, branch.y, branch.width, branch.height);
                } else {
                    // Fallback
                    ctx.fillStyle = '#4a7a98';
                    ctx.fillRect(screenX + 20, branch.y, 15, branch.height);
                    ctx.fillRect(screenX, branch.y + 30, 30, 9);
                    ctx.fillRect(screenX + 30, branch.y + 60, 30, 9);
                }
            }
        }
    }
    
    cleanup() {
        window.removeEventListener('keydown', this.keyDownHandler);
        window.removeEventListener('keyup', this.keyUpHandler);
    }
}
// ===================
// LEVEL 3: The Frozen Reach
// ===================
class IceFieldLevel {
    constructor() {
        // Load player sprite composite image
        this.playerSprite = new Image();
        const compositeFilename = `${gameState.selectedCharacter}-${gameState.selectedHat}-${gameState.selectedTransport}.png`;
        this.playerSprite.src = compositeFilename;
        this.playerSpriteLoaded = false;
        this.playerSprite.onload = () => {
            this.playerSpriteLoaded = true;
        };
        
        // Grid configuration
        this.gridCols = 10;
        this.gridRows = 6;
        this.blockSize = 60;
        this.gridStartX = 100;
        this.gridStartY = 150;
        
        // Player position (grid coordinates)
        this.playerGridX = 0;
        this.playerGridY = Math.floor(this.gridRows / 2);
        
        // Goal position (reach rightmost column)
        this.goalColumn = this.gridCols - 1;
        
        // Create ice grid
        this.iceBlocks = [];
        this.initializeGrid();
        
        // Select 3-5 random blocks to be unstable, ensuring level is solvable
        this.unstableBlocks = [];
        this.selectUnstableBlocks();
        
        // Warning phase
        this.warningPhase = true;
        this.warningTimer = 120; // 2.0 seconds at 60fps
        this.warningShakeOffset = 0;
        this.crackingSoundPlayed = false; // Track if cracking sound has played
        
        // Animation states
        this.crackingBlock = null; // Block that's currently cracking
        this.crackAnimationFrame = 0;
        this.playerFalling = false;
        this.fallingAnimationFrame = 0;
        
        // Movement
        this.canMove = false; // Can't move during warning phase
        this.moveDelay = 0;
        
        // Bind event handlers
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener('keydown', this.keyDownHandler);
    }
    
    initializeGrid() {
        // Create all ice blocks
        for (let row = 0; row < this.gridRows; row++) {
            for (let col = 0; col < this.gridCols; col++) {
                this.iceBlocks.push({
                    col: col,
                    row: row,
                    x: this.gridStartX + col * this.blockSize,
                    y: this.gridStartY + row * this.blockSize,
                    stable: true, // Will be set to false for unstable blocks
                    broken: false
                });
            }
        }
    }
    
    getBlockAt(col, row) {
        return this.iceBlocks.find(b => b.col === col && b.row === row);
    }
    
    selectUnstableBlocks() {
        // Select 12-15 blocks to be unstable
        const numUnstable = 12 + Math.floor(Math.random() * 4);
        
        // Try up to 100 times to find a valid configuration
        for (let attempt = 0; attempt < 100; attempt++) {
            const candidates = [];
            
            // Don't place unstable blocks on start position or goal column
            for (let i = 0; i < numUnstable; i++) {
                const col = 1 + Math.floor(Math.random() * (this.gridCols - 2));
                const row = Math.floor(Math.random() * this.gridRows);
                
                // Don't select start position
                if (col === 0 && row === this.playerGridY) continue;
                
                candidates.push({ col, row });
            }
            
            // Check if path exists with these unstable blocks
            if (this.isPathSolvable(candidates)) {
                // Mark these blocks as unstable
                candidates.forEach(pos => {
                    const block = this.getBlockAt(pos.col, pos.row);
                    if (block) {
                        block.stable = false;
                        this.unstableBlocks.push(block);
                    }
                });
                break;
            }
        }
    }
    
    isPathSolvable(unstablePositions) {
        // Simple BFS pathfinding to check if goal is reachable
        const queue = [{ col: this.playerGridX, row: this.playerGridY }];
        const visited = new Set();
        visited.add(`${this.playerGridX},${this.playerGridY}`);
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            // Check if we reached goal column
            if (current.col === this.goalColumn) {
                return true;
            }
            
            // Check all 4 directions
            const directions = [
                { col: current.col + 1, row: current.row }, // right
                { col: current.col - 1, row: current.row }, // left
                { col: current.col, row: current.row + 1 }, // down
                { col: current.col, row: current.row - 1 }  // up
            ];
            
            for (const next of directions) {
                if (next.col < 0 || next.col >= this.gridCols || 
                    next.row < 0 || next.row >= this.gridRows) {
                    continue;
                }
                
                const key = `${next.col},${next.row}`;
                if (visited.has(key)) continue;
                
                // Check if this block is unstable
                const isUnstable = unstablePositions.some(
                    u => u.col === next.col && u.row === next.row
                );
                
                if (!isUnstable) {
                    visited.add(key);
                    queue.push(next);
                }
            }
        }
        
        return false;
    }
    
    handleKeyDown(e) {
        if (!this.canMove || gameState.gamePhase !== 'playing' || this.playerFalling) return;
        if (this.moveDelay > 0) return;
        
        let newX = this.playerGridX;
        let newY = this.playerGridY;
        
        if (e.key === 'ArrowUp') {
            newY--;
        } else if (e.key === 'ArrowDown') {
            newY++;
        } else if (e.key === 'ArrowLeft') {
            newX--;
        } else if (e.key === 'ArrowRight') {
            newX++;
        } else {
            return;
        }
        
        // Check bounds
        if (newX < 0 || newX >= this.gridCols || newY < 0 || newY >= this.gridRows) {
            return;
        }
        
        // Move player
        this.playerGridX = newX;
        this.playerGridY = newY;
        this.moveDelay = 10; // Small delay between moves
        
        // Check if stepped on unstable block
        const currentBlock = this.getBlockAt(this.playerGridX, this.playerGridY);
        if (currentBlock && !currentBlock.stable && !currentBlock.broken) {
            // Start cracking animation
            this.crackingBlock = currentBlock;
            this.crackAnimationFrame = 0;
            this.playerFalling = true;
            // Play splash sound when stepping on cracked ice
            if (!isMuted) {
                splashEffectSound.currentTime = 0;
                splashEffectSound.play().catch(err => console.log("Audio play failed:", err));
            }
        }
        
        // Check win condition - reached goal column
        if (this.playerGridX === this.goalColumn) {
            this.cleanup();
            completeLevel();
        }
    }
    
    update() {
        // Warning phase countdown
        if (this.warningPhase) {
            this.warningTimer--;
            this.warningShakeOffset = Math.sin(Date.now() * 0.05) * 3;
            
            // Play ice cracking sound 1.7 seconds before movement starts (102 frames)
            if (this.warningTimer === 102 && !this.crackingSoundPlayed && !isMuted) {
                iceCrackingSound.currentTime = 0;
                iceCrackingSound.play().catch(err => console.log("Audio play failed:", err));
                this.crackingSoundPlayed = true;
            }
            
            if (this.warningTimer <= 0) {
                this.warningPhase = false;
                this.canMove = true;
            }
            return;
        }
        
        // Move delay countdown
        if (this.moveDelay > 0) {
            this.moveDelay--;
        }
        
        // Cracking animation
        if (this.crackingBlock && this.playerFalling) {
            this.crackAnimationFrame++;
            
            // After 90 frames (1.5 seconds), restart level
            // This gives time to see the splash effect
            if (this.crackAnimationFrame > 90) {
                this.restartLevel();
            }
        }
    }
    
    restartLevel() {
        // Reset player position
        this.playerGridX = 0;
        this.playerGridY = Math.floor(this.gridRows / 2);
        
        // Reset all blocks to stable and not broken
        this.iceBlocks.forEach(block => {
            block.stable = true;
            block.broken = false;
        });
        
        // Clear previous unstable blocks
        this.unstableBlocks = [];
        
        // Select NEW random unstable blocks for this attempt
        this.selectUnstableBlocks();
        
        // Reset animation states
        this.crackingBlock = null;
        this.crackAnimationFrame = 0;
        this.playerFalling = false;
        
        // Restart warning phase
        this.warningPhase = true;
        this.warningTimer = 120; // 2.0 seconds at 60fps
        this.canMove = false;
        this.crackingSoundPlayed = false; // Reset sound flag for replay
    }
    
    draw() {
        // Background - medieval winter landscape
        if (iceFieldBackgroundLoaded) {
            ctx.imageSmoothingEnabled = false;
            const canvasAspect = canvas.width / canvas.height;
            const imageAspect = iceFieldBackgroundImage.width / iceFieldBackgroundImage.height;
            let drawWidth, drawHeight, offsetX, offsetY;
            
            if (imageAspect > canvasAspect) {
                drawHeight = canvas.height;
                drawWidth = iceFieldBackgroundImage.width * (canvas.height / iceFieldBackgroundImage.height);
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = iceFieldBackgroundImage.height * (canvas.width / iceFieldBackgroundImage.width);
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }
            ctx.drawImage(iceFieldBackgroundImage, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            // Fallback background while image loads
            ctx.fillStyle = '#b8c9d8';
            ctx.fillRect(0, 0, 800, 600);
            
            // Draw darker ground below ice
            ctx.fillStyle = '#4a5d6d';
            ctx.fillRect(0, 400, 800, 200);
        }
        
        // Title with semi-transparent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        const bgX = 180;
        const bgY = 10;
        const bgWidth = 440;
        const bgHeight = 95;
        const borderRadius = 24;
        
        ctx.beginPath();
        ctx.moveTo(bgX + borderRadius, bgY);
        ctx.lineTo(bgX + bgWidth - borderRadius, bgY);
        ctx.arcTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + borderRadius, borderRadius);
        ctx.lineTo(bgX + bgWidth, bgY + bgHeight - borderRadius);
        ctx.arcTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - borderRadius, bgY + bgHeight, borderRadius);
        ctx.lineTo(bgX + borderRadius, bgY + bgHeight);
        ctx.arcTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - borderRadius, borderRadius);
        ctx.lineTo(bgX, bgY + borderRadius);
        ctx.arcTo(bgX, bgY, bgX + borderRadius, bgY, borderRadius);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('The Frozen Reach', 400, 35);
        
        if (this.warningPhase) {
            ctx.font = '11px "Press Start 2P"';
            ctx.fillStyle = '#ffcc00';
            ctx.fillText('Winter reveals its weakness...', 400, 65);
            ctx.font = '10px "Press Start 2P"';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('Watch carefully!', 400, 88);
        } else {
            ctx.font = '10px "Press Start 2P"';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('Step where the ice remembers its strength', 400, 65);
            ctx.font = '9px "Press Start 2P"';
            ctx.fillText('Arrow keys to move', 400, 88);
        }
        
        // Draw ice blocks
        this.iceBlocks.forEach(block => {
            let offsetX = 0;
            let offsetY = 0;
            
            // Warning phase effects for unstable blocks
            if (this.warningPhase && !block.stable) {
                offsetX = this.warningShakeOffset;
                offsetY = Math.sin(Date.now() * 0.03 + block.col * 0.5) * 2;
            }
            
            const x = block.x + offsetX;
            const y = block.y + offsetY;
            
            // Don't draw broken blocks
            if (block.broken) {
                return;
            }
            
            // Draw block shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(x + 4, y + 4, this.blockSize - 8, this.blockSize - 8);
            
            // Determine block appearance
            ctx.imageSmoothingEnabled = false;
            
            if (this.crackingBlock === block && this.playerFalling) {
                // Breaking animation - show splash after initial crack
                if (this.crackAnimationFrame > 15 && splashLoaded) {
                    // Show splash effect after 15 frames (0.25 seconds)
                    ctx.drawImage(splashImage, x, y, this.blockSize, this.blockSize);
                } else if (iceCrackLoaded) {
                    // Show cracked ice initially
                    ctx.drawImage(iceCrackImage, x, y, this.blockSize, this.blockSize);
                    // Add red tint for breaking
                    ctx.fillStyle = 'rgba(255, 100, 100, 0.4)';
                    ctx.fillRect(x, y, this.blockSize, this.blockSize);
                } else {
                    // Fallback breaking animation
                    ctx.fillStyle = '#ff6b6b';
                    ctx.fillRect(x, y, this.blockSize, this.blockSize);
                    
                    ctx.strokeStyle = '#8b0000';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + this.blockSize, y + this.blockSize);
                    ctx.moveTo(x + this.blockSize, y);
                    ctx.lineTo(x, y + this.blockSize);
                    ctx.stroke();
                }
            } else if (this.warningPhase && !block.stable) {
                // Unstable block during warning - show cracks
                if (iceCrackLoaded) {
                    ctx.drawImage(iceCrackImage, x, y, this.blockSize, this.blockSize);
                    
                    // Flicker effect
                    if (Math.random() > 0.7) {
                        ctx.fillStyle = 'rgba(255, 100, 100, 0.2)';
                        ctx.fillRect(x, y, this.blockSize, this.blockSize);
                    }
                } else {
                    // Fallback
                    ctx.fillStyle = '#c0d8e8';
                    ctx.fillRect(x, y, this.blockSize, this.blockSize);
                    
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.fillRect(x + 8, y + 8, this.blockSize - 16, 10);
                    
                    ctx.strokeStyle = '#666666';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(x + this.blockSize / 2, y);
                    ctx.lineTo(x + this.blockSize / 2 - 10, y + this.blockSize);
                    ctx.moveTo(x + this.blockSize / 2, y);
                    ctx.lineTo(x + this.blockSize / 2 + 15, y + this.blockSize);
                    ctx.stroke();
                    
                    if (Math.random() > 0.7) {
                        ctx.fillStyle = 'rgba(255, 100, 100, 0.2)';
                        ctx.fillRect(x, y, this.blockSize, this.blockSize);
                    }
                }
            } else {
                // Normal stable ice block
                if (iceBlockLoaded) {
                    ctx.drawImage(iceBlockImage, x, y, this.blockSize, this.blockSize);
                } else {
                    // Fallback
                    ctx.fillStyle = '#d8e9f5';
                    ctx.fillRect(x, y, this.blockSize, this.blockSize);
                    
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.fillRect(x + 8, y + 8, this.blockSize - 16, 12);
                    
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x + 2, y + 2, this.blockSize - 4, this.blockSize - 4);
                    
                    ctx.strokeStyle = '#7a9db8';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, this.blockSize, this.blockSize);
                }
            }
        });
        
        // Draw player
        const playerBlock = this.getBlockAt(this.playerGridX, this.playerGridY);
        if (playerBlock) {
            // Keep player at block position (no falling animation)
            const playerY = playerBlock.y;
            const playerX = playerBlock.x;
            const playerWidth = this.blockSize;
            const playerHeight = this.blockSize;
            
            // Shadow
            if (!this.playerFalling) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(playerX + this.blockSize / 2, playerBlock.y + this.blockSize - 5, 20, 6, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw player sprite
            ctx.imageSmoothingEnabled = false;
            if (this.playerSpriteLoaded) {
                ctx.drawImage(this.playerSprite, playerX, playerY, playerWidth, playerHeight);
            } else {
                // Fallback if sprite not loaded
                ctx.fillStyle = '#8b7aa8';
                ctx.fillRect(playerX + 10, playerY + 10, playerWidth - 20, playerHeight - 20);
                
                // Simple face
                ctx.fillStyle = '#2d3748';
                ctx.fillRect(playerX + 18, playerY + 20, 8, 8);
                ctx.fillRect(playerX + 34, playerY + 20, 8, 8);
            }
        }
        
    }
    
    cleanup() {
        window.removeEventListener('keydown', this.keyDownHandler);
    }
}
// =======================
// LEVEL 4: Goblin Grotto (Pong-Style Reflection Puzzle)
// =======================================================
class GoblinGrottoLevel {
    constructor() {
        // Load player's composite character sprite
        this.playerSprite = new Image();
        const compositeFilename = `${gameState.selectedCharacter}-${gameState.selectedHat}-${gameState.selectedTransport}.png`;
        this.playerSprite.src = compositeFilename;
        this.playerSpriteLoaded = false;
        this.playerSprite.onload = () => {
            this.playerSpriteLoaded = true;
        };
        
        // Shooter (left side, stationary)
        this.shooter = {
            x: 100,
            y: 300,
            angle: 0  // Radians, controlled by mouse
        };
        
        // Goblin (right side, behind wall)
        this.goblin = {
            x: 700,
            y: 300,
            radius: 25,
            alive: true,
            hit: false
        };
        
        // Wall (blocks direct shots to goblin)
        this.wall = {
            x: 620,
            y: 225,
            width: 15,
            height: 150
        };
        
        // Moving crystals (Pong-style paddles)
        this.crystals = [
            {
                x: 400,
                y: 100,
                width: 80,
                height: 12,
                speed: 2,
                direction: 1,  // 1 = right/down, -1 = left/up
                minX: 150,
                maxX: 650,
                vertical: false
            },
            {
                x: 300,
                y: 500,
                width: 100,
                height: 12,
                speed: 3,
                direction: -1,
                minX: 150,
                maxX: 650,
                vertical: false
            },
            {
                x: 750,
                y: 300,
                width: 12,
                height: 80,
                speed: 2.5,
                direction: 1,
                minY: 120,
                maxY: 480,
                vertical: true
            }
        ];
        
        // Projectile
        this.projectile = null; // {x, y, vx, vy, bounces}
        
        // Mouse tracking
        this.mouseX = 0;
        this.mouseY = 0;
        
        // Event handlers
        this.mouseMoveHandler = this.handleMouseMove.bind(this);
        this.mouseClickHandler = this.handleMouseClick.bind(this);
        
        canvas.addEventListener('mousemove', this.mouseMoveHandler);
        canvas.addEventListener('click', this.mouseClickHandler);
    }
    
    handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
        
        // Calculate angle from shooter to mouse
        const dx = this.mouseX - this.shooter.x;
        const dy = this.mouseY - this.shooter.y;
        this.shooter.angle = Math.atan2(dy, dx);
    }
    
    handleMouseClick(e) {
        if (gameState.gamePhase !== 'playing') return;
        if (this.projectile !== null) return; // Already have an active projectile
        if (!this.goblin.alive) return;
        
        // Fire projectile
        const speed = 8;
        this.projectile = {
            x: this.shooter.x,
            y: this.shooter.y,
            vx: Math.cos(this.shooter.angle) * speed,
            vy: Math.sin(this.shooter.angle) * speed,
            bounces: 0
        };
    }
    
    update() {
        if (!this.goblin.alive) return;
        
        // Update moving crystals
        this.crystals.forEach(crystal => {
            if (crystal.vertical) {
                // Vertical movement (up/down)
                crystal.y += crystal.speed * crystal.direction;
                
                // Bounce at boundaries
                if (crystal.y <= crystal.minY || crystal.y + crystal.height >= crystal.maxY) {
                    crystal.direction *= -1;
                }
            } else {
                // Horizontal movement (left/right)
                crystal.x += crystal.speed * crystal.direction;
                
                // Bounce at boundaries
                if (crystal.x <= crystal.minX || crystal.x + crystal.width >= crystal.maxX) {
                    crystal.direction *= -1;
                }
            }
        });
        
        // Update projectile
        if (this.projectile) {
            this.projectile.x += this.projectile.vx;
            this.projectile.y += this.projectile.vy;
            
            // Check collision with crystals (reflection)
            this.crystals.forEach(crystal => {
                if (this.checkProjectileCrystalCollision(this.projectile, crystal)) {
                    if (crystal.vertical) {
                        // Vertical crystal - reflect horizontally
                        this.projectile.vx = -this.projectile.vx;
                        this.projectile.bounces++;
                        
                        // Move projectile out of crystal to prevent double-bounce
                        if (this.projectile.vx > 0) {
                            this.projectile.x = crystal.x + crystal.width + 5;
                        } else {
                            this.projectile.x = crystal.x - 5;
                        }
                    } else {
                        // Horizontal crystal - reflect vertically
                        this.projectile.vy = -this.projectile.vy;
                        this.projectile.bounces++;
                        
                        // Move projectile out of crystal to prevent double-bounce
                        if (this.projectile.vy > 0) {
                            this.projectile.y = crystal.y + crystal.height + 5;
                        } else {
                            this.projectile.y = crystal.y - 5;
                        }
                    }
                }
            });
            
            // Check collision with wall (destroy projectile)
            if (this.checkProjectileWallCollision(this.projectile, this.wall)) {
                this.projectile = null;
                return;
            }
            
            // Check collision with goblin
            if (this.checkProjectileGoblinCollision(this.projectile, this.goblin)) {
                this.goblin.alive = false;
                this.goblin.hit = true;
                this.projectile = null;
                
                // Complete level after delay
                setTimeout(() => {
                    this.cleanup();
                    completeLevel();
                }, 1500);
                return;
            }
            
            // Check if projectile left screen (destroy it)
            if (this.projectile.x < 0 || this.projectile.x > 800 || 
                this.projectile.y < 0 || this.projectile.y > 600) {
                this.projectile = null;
            }
        }
    }
    
    checkProjectileCrystalCollision(proj, crystal) {
        if (crystal.vertical) {
            // Vertical crystal - check x collision with tolerance on y
            return proj.x > crystal.x - 5 && 
                   proj.x < crystal.x + crystal.width + 5 &&
                   proj.y > crystal.y && 
                   proj.y < crystal.y + crystal.height;
        } else {
            // Horizontal crystal - check y collision with tolerance on x
            return proj.x > crystal.x && 
                   proj.x < crystal.x + crystal.width &&
                   proj.y > crystal.y - 5 && 
                   proj.y < crystal.y + crystal.height + 5;
        }
    }
    
    checkProjectileWallCollision(proj, wall) {
        return proj.x > wall.x && 
               proj.x < wall.x + wall.width &&
               proj.y > wall.y && 
               proj.y < wall.y + wall.height;
    }
    
    checkProjectileGoblinCollision(proj, goblin) {
        if (!goblin.alive) return false;
        const dx = proj.x - goblin.x;
        const dy = proj.y - goblin.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < goblin.radius + 5;
    }
    
    draw() {
        // Black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 800, 600);
        
        // Ice cave background (maintain aspect ratio)
        if (iceCaveBackgroundLoaded) {
            const canvasAspect = 800 / 600;
            const imageAspect = iceCaveBackgroundImage.width / iceCaveBackgroundImage.height;
            let drawWidth, drawHeight, offsetX, offsetY;
            
            if (imageAspect > canvasAspect) {
                // Image is wider - fit to height
                drawHeight = 600;
                drawWidth = iceCaveBackgroundImage.width * (600 / iceCaveBackgroundImage.height);
                offsetX = (800 - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Image is taller - fit to width
                drawWidth = 800;
                drawHeight = iceCaveBackgroundImage.height * (800 / iceCaveBackgroundImage.width);
                offsetX = 0;
                offsetY = (600 - drawHeight) / 2;
            }
            ctx.drawImage(iceCaveBackgroundImage, offsetX, offsetY, drawWidth, drawHeight);
        }
        
        // Title with semi-transparent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        const bgX = 250;
        const bgY = 10;
        const bgWidth = 300;
        const bgHeight = 50;
        const borderRadius = 24;
        
        ctx.beginPath();
        ctx.moveTo(bgX + borderRadius, bgY);
        ctx.lineTo(bgX + bgWidth - borderRadius, bgY);
        ctx.arcTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + borderRadius, borderRadius);
        ctx.lineTo(bgX + bgWidth, bgY + bgHeight - borderRadius);
        ctx.arcTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - borderRadius, bgY + bgHeight, borderRadius);
        ctx.lineTo(bgX + borderRadius, bgY + bgHeight);
        ctx.arcTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - borderRadius, borderRadius);
        ctx.lineTo(bgX, bgY + borderRadius);
        ctx.arcTo(bgX, bgY, bgX + borderRadius, bgY, borderRadius);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Goblin Grotto', 400, 40);
        
        // Draw player's character sprite to the left of shooter (maintain aspect ratio)
        if (this.playerSpriteLoaded) {
            const maxSize = 80;
            const aspect = this.playerSprite.width / this.playerSprite.height;
            let spriteWidth, spriteHeight;
            
            if (aspect > 1) {
                // Wider than tall
                spriteWidth = maxSize;
                spriteHeight = maxSize / aspect;
            } else {
                // Taller than wide
                spriteHeight = maxSize;
                spriteWidth = maxSize * aspect;
            }
            
            const spriteX = this.shooter.x - spriteWidth - 20; // 20px gap from shooter
            const spriteY = this.shooter.y - spriteHeight / 2; // Centered vertically
            ctx.drawImage(this.playerSprite, spriteX, spriteY, spriteWidth, spriteHeight);
        }
        
        // Draw torch at shooter position (maintain aspect ratio)
        if (torchLoaded) {
            const maxSize = 60;
            const aspect = torchImage.width / torchImage.height;
            let torchWidth, torchHeight;
            
            if (aspect > 1) {
                torchWidth = maxSize;
                torchHeight = maxSize / aspect;
            } else {
                torchHeight = maxSize;
                torchWidth = maxSize * aspect;
            }
            
            const torchX = this.shooter.x - torchWidth / 2;
            const torchY = this.shooter.y - torchHeight / 2;
            ctx.drawImage(torchImage, torchX, torchY, torchWidth, torchHeight);
        }
        
        // Draw aiming line
        if (!this.projectile && this.goblin.alive) {
            ctx.strokeStyle = 'rgba(255, 102, 0, 0.3)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(this.shooter.x, this.shooter.y);
            ctx.lineTo(
                this.shooter.x + Math.cos(this.shooter.angle) * 100,
                this.shooter.y + Math.sin(this.shooter.angle) * 100
            );
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        // Draw wall (blocks direct shots)
        if (iceWallLoaded) {
            ctx.drawImage(
                iceWallImage,
                this.wall.x,
                this.wall.y,
                this.wall.width,
                this.wall.height
            );
        } else {
            // Fallback: draw placeholder rectangle
            ctx.fillStyle = '#3a3a5e';
            ctx.fillRect(this.wall.x, this.wall.y, this.wall.width, this.wall.height);
            ctx.strokeStyle = '#4a4a6e';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.wall.x, this.wall.y, this.wall.width, this.wall.height);
        }
        
        // Draw moving crystals (paddles)
        this.crystals.forEach(crystal => {
            if (!crystal.vertical && iceWallTopBottomLoaded) {
                // Horizontal crystals - use ice wall top/bottom image
                ctx.drawImage(
                    iceWallTopBottomImage,
                    crystal.x,
                    crystal.y,
                    crystal.width,
                    crystal.height
                );
            } else if (crystal.vertical) {
                // Vertical crystal - use ice wall image
                if (iceWallLoaded) {
                    ctx.drawImage(
                        iceWallImage,
                        crystal.x,
                        crystal.y,
                        crystal.width,
                        crystal.height
                    );
                } else {
                    // Fallback for vertical crystal
                    ctx.fillStyle = '#60c0e0';
                    ctx.fillRect(crystal.x, crystal.y, crystal.width, crystal.height);
                }
            } else {
                // Fallback for horizontal crystals
                ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
                ctx.fillRect(
                    crystal.x - 5, 
                    crystal.y - 5, 
                    crystal.width + 10, 
                    crystal.height + 10
                );
                
                ctx.fillStyle = '#60c0e0';
                ctx.fillRect(crystal.x, crystal.y, crystal.width, crystal.height);
                
                ctx.fillStyle = '#a0d8f0';
                ctx.fillRect(crystal.x, crystal.y, crystal.width, crystal.height / 3);
            }
        });
        
        // Draw goblin (maintain aspect ratio)
        if (this.goblin.alive) {
            if (iceGoblinLoaded) {
                // Draw ice goblin image centered on goblin position
                const maxSize = this.goblin.radius * 3;
                const aspect = iceGoblinImage.width / iceGoblinImage.height;
                let goblinWidth, goblinHeight;
                
                if (aspect > 1) {
                    goblinWidth = maxSize;
                    goblinHeight = maxSize / aspect;
                } else {
                    goblinHeight = maxSize;
                    goblinWidth = maxSize * aspect;
                }
                
                ctx.drawImage(
                    iceGoblinImage,
                    this.goblin.x - goblinWidth / 2,
                    this.goblin.y - goblinHeight / 2,
                    goblinWidth,
                    goblinHeight
                );
            } else {
                // Fallback: draw placeholder circle
                ctx.fillStyle = '#4a7c4e';
                ctx.beginPath();
                ctx.arc(this.goblin.x, this.goblin.y, this.goblin.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (this.goblin.hit) {
            // Victory animation
            ctx.fillStyle = '#ffcc00';
            ctx.font = '30px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('DEFEATED!', 400, 300);
        }
        
        // Draw projectile (maintain aspect ratio)
        if (this.projectile) {
            // Determine which fireball image to use based on vertical direction
            const isGoingUp = this.projectile.vy < 0;
            const fireballImage = isGoingUp ? fireballUpImage : fireballDownImage;
            const fireballLoaded = isGoingUp ? fireballUpLoaded : fireballDownLoaded;
            
            if (fireballLoaded) {
                // Draw fireball image maintaining aspect ratio
                const maxSize = 40;
                const aspect = fireballImage.width / fireballImage.height;
                let fireballWidth, fireballHeight;
                
                if (aspect > 1) {
                    fireballWidth = maxSize;
                    fireballHeight = maxSize / aspect;
                } else {
                    fireballHeight = maxSize;
                    fireballWidth = maxSize * aspect;
                }
                
                ctx.drawImage(
                    fireballImage,
                    this.projectile.x - fireballWidth / 2,
                    this.projectile.y - fireballHeight / 2,
                    fireballWidth,
                    fireballHeight
                );
            } else {
                // Fallback: draw placeholder projectile
                const gradient = ctx.createRadialGradient(
                    this.projectile.x, this.projectile.y, 0,
                    this.projectile.x, this.projectile.y, 10
                );
                gradient.addColorStop(0, '#ffcc00');
                gradient.addColorStop(1, 'rgba(255, 204, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.projectile.x, this.projectile.y, 10, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#ff6600';
                ctx.beginPath();
                ctx.arc(this.projectile.x, this.projectile.y, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    cleanup() {
        canvas.removeEventListener('mousemove', this.mouseMoveHandler);
        canvas.removeEventListener('click', this.mouseClickHandler);
    }
}
// ===================
// LEVEL 5: The Runic Tower
// =========================
class RunicTowerLevel {
    constructor() {
        // Grid settings
        this.gridCols = 15;
        this.gridRows = 11;
        this.tileSize = 40;
        this.gridStartX = 100;
        this.gridStartY = 100;
        
        // Player position (grid coordinates)
        this.playerCol = 1;
        this.playerRow = 1;
        
        // Dragon (snake) state - starts 2 tiles behind player
        this.dragon = {
            segments: [
                { col: 1, row: 3 },  // head (2 tiles below player)
                { col: 1, row: 4 },  // body
                { col: 1, row: 5 }   // tail
            ],
            defeated: false,
            frozenAnimation: 0
        };
        
        // Pillars (static obstacles) - 6 columns evenly spaced
        this.pillars = [
            { col: 3, row: 2 },
            { col: 7, row: 2 },
            { col: 11, row: 2 },
            { col: 3, row: 8 },
            { col: 7, row: 8 },
            { col: 11, row: 8 }
        ];
        
        // Eggs on the grid
        this.eggs = [];
        
        // Movement control
        this.moveDelay = 0;
        this.moveDelayMax = 8; // Frames between moves
        this.turnBased = true; // Player moves, then dragon moves
        this.canMove = true;
        
        // Visual feedback
        this.wrappedPillars = new Set();
        this.glowAnimation = 0;
        
        // Track player's position history for dragon to follow (stays 2 tiles behind)
        // Initialize with positions as if player moved from (1,3) -> (1,2) -> (1,1)
        this.playerHistory = [
            { col: 1, row: 3 },  // 2 moves ago (where dragon head is)
            { col: 1, row: 2 },  // 1 move ago
            { col: 1, row: 1 }   // current position
        ];
        
        // Bind keyboard
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener('keydown', this.keyDownHandler);
    }
    
    handleKeyDown(e) {
        if (!this.canMove || gameState.gamePhase !== 'playing' || this.dragon.defeated) return;
        if (this.moveDelay > 0) return;
        
        let newCol = this.playerCol;
        let newRow = this.playerRow;
        let moved = false;
        let moveCol = 0;
        let moveRow = 0;
        
        // Arrow key movement
        if (e.key === 'ArrowUp') {
            newRow--;
            moveRow = -1;
            moved = true;
        } else if (e.key === 'ArrowDown') {
            newRow++;
            moveRow = 1;
            moved = true;
        } else if (e.key === 'ArrowLeft') {
            newCol--;
            moveCol = -1;
            moved = true;
        } else if (e.key === 'ArrowRight') {
            newCol++;
            moveCol = 1;
            moved = true;
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            // Drop egg at current location
            e.preventDefault();
            this.dropEgg();
            return;
        } else {
            return;
        }
        
        if (moved) {
            e.preventDefault();
            
            // Check bounds
            if (newCol < 0 || newCol >= this.gridCols || newRow < 0 || newRow >= this.gridRows) {
                return;
            }
            
            // Check collision with pillars
            if (this.isPillar(newCol, newRow)) {
                return;
            }
            
            // Check collision with dragon (any segment) - restart level if hit
            if (this.isDragonSegment(newCol, newRow)) {
                this.restartLevel();
                return;
            }
            
            // Move player
            this.playerCol = newCol;
            this.playerRow = newRow;
            this.moveDelay = this.moveDelayMax;
            
            // Add new position to history
            this.playerHistory.push({ col: newCol, row: newRow });
            
            // After player moves, dragon moves
            this.moveDragon();
        }
    }
    
    dropEgg() {
        // Can only drop egg on current tile if no egg already there
        const existingEgg = this.eggs.find(e => e.col === this.playerCol && e.row === this.playerRow);
        if (!existingEgg) {
            this.eggs.push({ col: this.playerCol, row: this.playerRow });
        }
    }
    
    moveDragon() {
        if (this.dragon.defeated) return;
        
        // Dragon follows player's path, staying 2 tiles behind
        // Need at least 3 positions in history to stay 2 behind
        if (this.playerHistory.length < 3) {
            return; // Not enough history yet, dragon waits
        }
        
        // Get the position from 2 moves ago (current is last, -1 is 1 behind, -2 is 2 behind)
        const targetPosition = this.playerHistory[this.playerHistory.length - 3];
        let newCol = targetPosition.col;
        let newRow = targetPosition.row;
        
        const head = this.dragon.segments[0];
        
        // Check if dragon is already at the target (shouldn't happen normally)
        if (head.col === newCol && head.row === newRow) {
            return;
        }
        
        // Check collision with pillar (shouldn't happen if following player path)
        if (this.isPillar(newCol, newRow)) {
            return; // Can't move into pillar
        }
        
        // Check collision with own body (dragon wraps into itself)
        if (this.isDragonSegment(newCol, newRow)) {
            return; // Can't move into own body
        }
        
        // Check if dragon eats an egg
        const eggIndex = this.eggs.findIndex(e => e.col === newCol && e.row === newRow);
        if (eggIndex !== -1) {
            // Remove egg and grow dragon by 2 segments
            this.eggs.splice(eggIndex, 1);
            // Dragon grows: add 2 new tail segments at the current tail position
            const tail = this.dragon.segments[this.dragon.segments.length - 1];
            this.dragon.segments.push({ col: tail.col, row: tail.row });
            this.dragon.segments.push({ col: tail.col, row: tail.row });
        }
        
        // Move dragon: each segment moves to the position of the segment before it
        for (let i = this.dragon.segments.length - 1; i > 0; i--) {
            this.dragon.segments[i].col = this.dragon.segments[i - 1].col;
            this.dragon.segments[i].row = this.dragon.segments[i - 1].row;
        }
        
        // Move head to new position
        this.dragon.segments[0].col = newCol;
        this.dragon.segments[0].row = newRow;
        
        // Play snake hiss sound
        if (!isMuted) {
            snakeHissSound.currentTime = 0; // Reset sound to start
            snakeHissSound.play().catch(error => {
                console.log('Snake hiss sound play failed:', error);
            });
        }
        
        // Check if dragon caught player
        if (newCol === this.playerCol && newRow === this.playerRow) {
            this.restartLevel();
            return;
        }
        
        // Check if dragon is wrapped around enough pillars
        this.checkDragonWrapping();
    }
    
    checkDragonWrapping() {
        // For each pillar, check if it's wrapped by the dragon
        this.wrappedPillars.clear();
        
        for (const pillar of this.pillars) {
            if (this.isPillarWrapped(pillar)) {
                this.wrappedPillars.add(pillar);
            }
        }
        
        // If 3 or more pillars are wrapped, dragon is defeated - complete level!
        if (this.wrappedPillars.size >= 3 && !this.dragon.defeated) {
            this.dragon.defeated = true;
            // Auto-complete the level
            this.cleanup();
            completeLevel();
        }
    }
    
    isPillarWrapped(pillar) {
        // A pillar is "wrapped" if two or more dragon segments are adjacent to it
        // Check the 4 orthogonal positions around the pillar
        const adjacentPositions = [
            { col: pillar.col - 1, row: pillar.row },
            { col: pillar.col + 1, row: pillar.row },
            { col: pillar.col, row: pillar.row - 1 },
            { col: pillar.col, row: pillar.row + 1 }
        ];
        
        let adjacentSegmentCount = 0;
        for (const pos of adjacentPositions) {
            if (this.isDragonSegment(pos.col, pos.row)) {
                adjacentSegmentCount++;
            }
        }
        
        // Need at least 2 segments adjacent to count as wrapped
        return adjacentSegmentCount >= 2;
    }
    
    isPillar(col, row) {
        return this.pillars.some(p => p.col === col && p.row === row);
    }
    
    isDragonSegment(col, row) {
        return this.dragon.segments.some(s => s.col === col && s.row === row);
    }
    
    isDragonBody(col, row) {
        // Check if position is a dragon body segment (not the head)
        for (let i = 1; i < this.dragon.segments.length; i++) {
            if (this.dragon.segments[i].col === col && this.dragon.segments[i].row === row) {
                return true;
            }
        }
        return false;
    }
    
    restartLevel() {
        // Reset player
        this.playerCol = 1;
        this.playerRow = 1;
        this.playerHistory = [
            { col: 1, row: 3 },  // 2 moves ago (where dragon head is)
            { col: 1, row: 2 },  // 1 move ago
            { col: 1, row: 1 }   // current position
        ];
        
        // Reset dragon - starts 2 tiles behind player
        this.dragon.segments = [
            { col: 1, row: 3 },  // head (2 tiles below player)
            { col: 1, row: 4 },  // body
            { col: 1, row: 5 }   // tail
        ];
        this.dragon.defeated = false;
        
        // Clear eggs
        this.eggs = [];
        
        // Clear wrapped pillars
        this.wrappedPillars.clear();
    }
    
    update() {
        if (this.moveDelay > 0) {
            this.moveDelay--;
        }
        
        // Animate glow for wrapped pillars
        this.glowAnimation = (this.glowAnimation + 0.1) % (Math.PI * 2);
        
        // Animate defeated dragon
        if (this.dragon.defeated) {
            this.dragon.frozenAnimation++;
        }
    }
    
    draw() {
        // Draw dungeon background
        if (dungeonBackgroundLoaded) {
            ctx.drawImage(dungeonBackgroundImage, 0, 0, 800, 600);
        } else {
            // Fallback dark background
            ctx.fillStyle = '#2a2a3e';
            ctx.fillRect(0, 0, 800, 600);
        }
        
        // Title with semi-transparent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        const bgX = 250;
        const bgY = 10;
        const bgWidth = 300;
        const bgHeight = 50;
        const borderRadius = 24;
        
        ctx.beginPath();
        ctx.moveTo(bgX + borderRadius, bgY);
        ctx.lineTo(bgX + bgWidth - borderRadius, bgY);
        ctx.arcTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + borderRadius, borderRadius);
        ctx.lineTo(bgX + bgWidth, bgY + bgHeight - borderRadius);
        ctx.arcTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - borderRadius, bgY + bgHeight, borderRadius);
        ctx.lineTo(bgX + borderRadius, bgY + bgHeight);
        ctx.arcTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - borderRadius, borderRadius);
        ctx.lineTo(bgX, bgY + borderRadius);
        ctx.arcTo(bgX, bgY, bgX + borderRadius, bgY, borderRadius);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('The Runic Tower', 400, 40);
        
        // Draw columns (pillars)
        for (const pillar of this.pillars) {
            const x = this.gridStartX + pillar.col * this.tileSize;
            const y = this.gridStartY + pillar.row * this.tileSize;
            
            const isWrapped = this.wrappedPillars.has(pillar);
            
            // Draw column image
            if (columnLoaded) {
                ctx.drawImage(columnImage, x, y, this.tileSize, this.tileSize);
            } else {
                // Fallback pillar rendering
                ctx.fillStyle = '#696969';
                ctx.fillRect(x + 5, y + 5, this.tileSize - 10, this.tileSize - 10);
            }
            
            // Glow effect for wrapped pillars
            if (isWrapped) {
                const glowIntensity = Math.sin(this.glowAnimation) * 0.3 + 0.7;
                ctx.strokeStyle = `rgba(255, 215, 0, ${glowIntensity})`;
                ctx.lineWidth = 4;
                ctx.strokeRect(x, y, this.tileSize, this.tileSize);
            }
        }
        
        // Draw eggs
        for (const egg of this.eggs) {
            const x = this.gridStartX + egg.col * this.tileSize;
            const y = this.gridStartY + egg.row * this.tileSize;
            
            ctx.fillStyle = '#f5f5dc';
            ctx.beginPath();
            ctx.ellipse(x + this.tileSize / 2, y + this.tileSize / 2, 8, 12, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = '#d3d3d3';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        // Draw serpent
        for (let i = this.dragon.segments.length - 1; i >= 0; i--) {
            const segment = this.dragon.segments[i];
            const x = this.gridStartX + segment.col * this.tileSize;
            const y = this.gridStartY + segment.row * this.tileSize;
            
            const isHead = i === 0;
            const isTail = i === this.dragon.segments.length - 1;
            
            // Determine direction and which image to use
            let serpentImage;
            
            if (isHead) {
                // Head: determine direction by looking at segment behind it
                if (this.dragon.segments.length > 1) {
                    const nextSegment = this.dragon.segments[1];
                    if (segment.row < nextSegment.row) {
                        serpentImage = serpentHeadUpImage;
                    } else if (segment.row > nextSegment.row) {
                        serpentImage = serpentHeadDownImage;
                    } else if (segment.col < nextSegment.col) {
                        serpentImage = serpentHeadLeftImage;
                    } else if (segment.col > nextSegment.col) {
                        serpentImage = serpentHeadRightImage;
                    } else {
                        serpentImage = serpentHeadRightImage; // default
                    }
                } else {
                    serpentImage = serpentHeadRightImage; // default for single segment
                }
            } else if (isTail) {
                // Tail: determine direction by looking at segment in front of it
                const prevSegment = this.dragon.segments[i - 1];
                if (segment.row < prevSegment.row) {
                    serpentImage = serpentTailDownImage;
                } else if (segment.row > prevSegment.row) {
                    serpentImage = serpentTailUpImage;
                } else if (segment.col < prevSegment.col) {
                    serpentImage = serpentTailRightImage;
                } else if (segment.col > prevSegment.col) {
                    serpentImage = serpentTailLeftRightImage;
                } else {
                    serpentImage = serpentTailLeftRightImage; // default
                }
            } else {
                // Body: check if this is a corner piece or straight segment
                const prevSegment = this.dragon.segments[i - 1];
                const nextSegment = this.dragon.segments[i + 1];
                
                // Determine direction the serpent was TRAVELING (from next to current)
                let comingFrom = '';
                if (segment.row < nextSegment.row) comingFrom = 'up';      // came from below (moving up)
                else if (segment.row > nextSegment.row) comingFrom = 'down'; // came from above (moving down)
                else if (segment.col < nextSegment.col) comingFrom = 'left';  // came from right (moving left)
                else if (segment.col > nextSegment.col) comingFrom = 'right'; // came from left (moving right)
                
                // Determine direction the serpent is GOING (from current to previous)
                let goingTo = '';
                if (prevSegment.row < segment.row) goingTo = 'up';      // going up
                else if (prevSegment.row > segment.row) goingTo = 'down'; // going down
                else if (prevSegment.col < segment.col) goingTo = 'left';  // going left
                else if (prevSegment.col > segment.col) goingTo = 'right'; // going right
                
                // Check if this is a corner (direction changes)
                if (comingFrom !== goingTo && comingFrom && goingTo) {
                    // This is a corner piece
                    // Map based on: moving [direction] then turns [left/right]
                    
                    // Moving right then turns left (up) or right (down)
                    if (comingFrom === 'right' && goingTo === 'up') serpentImage = serpentCornerRightLeftImage;
                    else if (comingFrom === 'right' && goingTo === 'down') serpentImage = serpentCornerRightRightImage;
                    
                    // Moving down then turns left (right) or right (left)
                    else if (comingFrom === 'down' && goingTo === 'right') serpentImage = serpentCornerDownLeftImage;
                    else if (comingFrom === 'down' && goingTo === 'left') serpentImage = serpentCornerDownRightImage;
                    
                    // Moving left then turns left (down) or right (up)
                    else if (comingFrom === 'left' && goingTo === 'down') serpentImage = serpentCornerLeftLeftImage;
                    else if (comingFrom === 'left' && goingTo === 'up') serpentImage = serpentCornerLeftRightImage;
                    
                    // Moving up then turns left (left) or right (right)
                    else if (comingFrom === 'up' && goingTo === 'left') serpentImage = serpentCornerUpLeftImage;
                    else if (comingFrom === 'up' && goingTo === 'right') serpentImage = serpentCornerUpRightImage;
                    
                    else {
                        // Fallback to straight body piece
                        if (comingFrom === 'up') serpentImage = serpentBodyUpImage;
                        else if (comingFrom === 'down') serpentImage = serpentBodyDownImage;
                        else if (comingFrom === 'left') serpentImage = serpentBodyLeftImage;
                        else serpentImage = serpentBodyRightImage;
                    }
                } else {
                    // Straight segment - use regular body piece based on travel direction
                    if (comingFrom === 'up') serpentImage = serpentBodyUpImage;
                    else if (comingFrom === 'down') serpentImage = serpentBodyDownImage;
                    else if (comingFrom === 'left') serpentImage = serpentBodyLeftImage;
                    else if (comingFrom === 'right') serpentImage = serpentBodyRightImage;
                    else serpentImage = serpentBodyRightImage; // default
                }
            }
            
            // Apply defeated effect
            if (this.dragon.defeated) {
                ctx.globalAlpha = 0.5;
            } else {
                ctx.globalAlpha = 1.0;
            }
            
            // Draw serpent segment
            if (serpentImage && serpentImage.complete) {
                ctx.drawImage(serpentImage, x, y, this.tileSize, this.tileSize);
            } else {
                // Fallback rendering
                ctx.fillStyle = isHead ? '#dc143c' : '#8b0000';
                ctx.fillRect(x + 6, y + 6, this.tileSize - 12, this.tileSize - 12);
            }
            
            ctx.globalAlpha = 1.0;
        }
        
        // Draw player (sprite only - no hat or transport on this level)
        const playerX = this.gridStartX + this.playerCol * this.tileSize;
        const playerY = this.gridStartY + this.playerRow * this.tileSize;
        
        // Get selected sprite image
        let spriteImage;
        if (gameState.selectedCharacter === 'yeti') {
            spriteImage = yetiImage;
        } else if (gameState.selectedCharacter === 'bear') {
            spriteImage = bearImage;
        } else if (gameState.selectedCharacter === 'penguin') {
            spriteImage = penguinImage;
        }
        
        // Draw sprite only (no hat or transport)
        if (spriteImage && spriteImage.complete) {
            ctx.drawImage(spriteImage, playerX, playerY, this.tileSize, this.tileSize);
        } else {
            // Fallback blue dot
            ctx.fillStyle = '#4169e1';
            ctx.beginPath();
            ctx.arc(playerX + this.tileSize / 2, playerY + this.tileSize / 2, 12, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    cleanup() {
        window.removeEventListener('keydown', this.keyDownHandler);
    }
}
// Level management
let currentLevelInstance = null;
function startLevel(levelIndex) {
    gameState.gamePhase = 'dialogue';
    // Set background for level dialogues
    if (levelIndex === 0) {
        currentDialogueBackground = 'level1'; // Use Jollygut Hollow background
    }
    else if (levelIndex === 1) {
        currentDialogueBackground = 'level2'; // Use Frozen Forest with Hippo background
    }
    else if (levelIndex === 2) {
        currentDialogueBackground = 'level3'; // Use Ice Field background with Hippo
    }
    else if (levelIndex === 3) {
        currentDialogueBackground = 'level4'; // Use Goblin Grotto background
    }
    else if (levelIndex === 4) {
        currentDialogueBackground = 'level5'; // Use Dungeon dialogue background
    }
    else {
        currentDialogueBackground = 'intro'; // Use hippo-hero for other levels
    }
    const levelIntros = [
        ["Welcome, brave traveler, to Jollygut Hollow!", "I cannot guide you until I have regained my strength. These lands have drained me. Bring me fuel - sweet, juicy fuel..."],
        ["You have reached the Frozen Forest!", "The journey is quick, but be warned...", "It is covered with treacherous ice patches and falling tree branches, which you must avoid.", "Use Arrow Keys: ← to slow down, → to speed up, ↑ to jump."],
        ["The Frozen Reach is ahead!", "You must cross the icy river. Yet not all ice is sworn to hold. Winter reveals its cracks only once.", "Those who rush will not see it. Step where the ice remembers its strength."],
        ["You stand at the threshold of Goblin Grotto!", "Dark and frost-bound creatures lurk behind stone enclosures deep within these caves. Only the warmth of true light may undo them.", "Floating ice crystals cling to the cavern walls. Take up my torch, and guide your firelight to shatter the goblins. Good luck!"],
        ["The final trial: The Runic Tower!", "A dragon serpent guards the way to the Winter Gate. You must slay it to get through.", "Be warned: It shadows your trail and is deadly if touched.", "Cast eggs with the Spacebar to feed the beast and lengthen its form. When it can coil around three columns, it shall be bound forever — clearing your path to the Winter Gate."]
    ];
    showDialogue(levelIntros[levelIndex], () => {
        gameState.gamePhase = 'playing';
        switch (levelIndex) {
            case 0:
                currentLevelInstance = new PaperWastelandLevel();
                break;
            case 1:
                currentLevelInstance = new FrozenForestLevel();
                break;
            case 2:
                currentLevelInstance = new IceFieldLevel();
                break;
            case 3:
                currentLevelInstance = new GoblinGrottoLevel();
                break;
            case 4:
                currentLevelInstance = new RunicTowerLevel();
                break;
        }
    });
}
// Main game loop
function gameLoop() {
    if (gameState.gamePhase === 'playing' && currentLevelInstance) {
        currentLevelInstance.update();
        currentLevelInstance.draw();
    }
    else if (gameState.gamePhase === 'intro') {
        // Show title screen with winter background on home screen
        drawTitleScreen();
    }
    else if (gameState.gamePhase === 'dialogue') {
        // Show hippo hero background during dialogue
        drawDialogueScreen();
    }
    else if (gameState.gamePhase === 'map-transition') {
        // Show map transition animation
        updateMapTransition();
        drawMapTransition();
    }
    else if (gameState.gamePhase === 'final-gate') {
        // Show final gate puzzle
        updateFinalGate();
        drawFinalGate();
    }
    else if (gameState.gamePhase === 'credits') {
        // Show rolling credits
        updateCredits();
        drawCredits();
    }
    else if (gameState.gamePhase === 'final') {
        // Show final image while music finishes
        drawFinalScreen();
    }
    else if (gameState.gamePhase === 'end') {
        // Clear canvas - game is complete
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(gameLoop);
}
// Update UI visibility based on game phase
function updateUIVisibility() {
    const restartButton = document.getElementById('restart-button');
    const runeDisplay = document.getElementById('rune-display');
    // Always show restart button on every page
    restartButton.classList.remove('hidden');
    
    // Always hide rune display (it's shown separately when needed)
    runeDisplay.classList.add('hidden');
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
    // Reset tower image to empty
    towerImage.src = 'tower-empty.png';
    // Reset credits
    creditsScrollY = 0;
    // Reset music to background music
    endCreditsMusic.pause();
    endCreditsMusic.currentTime = 0;
    currentMusic = backgroundMusic;
    if (!backgroundMusic.paused) {
        // Music already playing, do nothing
    } else {
        backgroundMusic.currentTime = 0;
        startBackgroundMusic();
    }
    // Clear rune display
    updateRuneDisplay();
    // Hide final gate if showing
    const finalGate = document.getElementById('final-gate');
    finalGate.classList.add('hidden');
    // Hide dialogue box
    dialogueBox.classList.add('hidden');
    // Show start game overlay (home screen)
    const startGameOverlay = document.getElementById('start-game-overlay');
    startGameOverlay.classList.remove('hidden');
    // Update UI visibility
    updateUIVisibility();
}
// Update layered preview
function updateLayeredPreview() {
    // Construct composite image filename: character-hat-transport.png
    const compositeFilename = `${gameState.selectedCharacter}-${gameState.selectedHat}-${gameState.selectedTransport}.png`;
    document.getElementById('preview-composite').src = compositeFilename;
}
// Show customization screen
function showCustomizationScreen() {
    const startGameOverlay = document.getElementById('start-game-overlay');
    const customizationScreen = document.getElementById('customization-screen');
    startGameOverlay.classList.add('hidden');
    customizationScreen.classList.remove('hidden');
    gameState.gamePhase = 'customization';
    // Update preview with defaults
    updateLayeredPreview();
}
// Show name input screen
function showNameInputScreen() {
    const customizationScreen = document.getElementById('customization-screen');
    const nameInputScreen = document.getElementById('name-input-screen');
    customizationScreen.classList.add('hidden');
    nameInputScreen.classList.remove('hidden');
    // Update the composite preview on name screen
    const compositeFilename = `${gameState.selectedCharacter}-${gameState.selectedHat}-${gameState.selectedTransport}.png`;
    document.getElementById('name-preview-composite').src = compositeFilename;
}
// Go back to sprite selection
function backToSpriteSelection() {
    const customizationScreen = document.getElementById('customization-screen');
    const nameInputScreen = document.getElementById('name-input-screen');
    nameInputScreen.classList.add('hidden');
    customizationScreen.classList.remove('hidden');
}
// Handle customization selections with carousels
function setupCustomization() {
    // Carousel options
    const carouselOptions = {
        character: ['yeti', 'penguin', 'bear'],
        hat: ['hat-normal', 'hat-viking', 'hat-plaid'],
        transport: ['reindeer', 'sled', 'snowboard']
    };
    
    const carouselIndices = {
        character: 0,
        hat: 0,
        transport: 0
    };
    
    // Function to update carousel display
    function updateCarousel(type) {
        const index = carouselIndices[type];
        const options = carouselOptions[type];
        const item = options[index];
        
        // Update display image
        const displayImg = document.getElementById(`${type}-display`);
        displayImg.src = `${item}.png`;
        
        // Update game state
        if (type === 'character') gameState.selectedCharacter = item;
        else if (type === 'hat') gameState.selectedHat = item;
        else if (type === 'transport') gameState.selectedTransport = item;
        
        // Update layered preview
        updateLayeredPreview();
    }
    
    // Set up carousel buttons
    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const carouselType = btn.getAttribute('data-carousel');
            const isPrev = btn.classList.contains('carousel-prev');
            
            if (isPrev) {
                carouselIndices[carouselType]--;
                if (carouselIndices[carouselType] < 0) {
                    carouselIndices[carouselType] = carouselOptions[carouselType].length - 1;
                }
            } else {
                carouselIndices[carouselType]++;
                if (carouselIndices[carouselType] >= carouselOptions[carouselType].length) {
                    carouselIndices[carouselType] = 0;
                }
            }
            
            updateCarousel(carouselType);
        });
    });
    
    // Next button - go to name input
    const nextButton = document.getElementById('next-to-name-button');
    nextButton.addEventListener('click', () => {
        showNameInputScreen();
    });
    // Back button - return to sprite selection
    const backButton = document.getElementById('back-to-sprite-button');
    backButton.addEventListener('click', () => {
        backToSpriteSelection();
    });
    // Confirm button - start game with name
    const confirmButton = document.getElementById('confirm-name-button');
    const nameInput = document.getElementById('player-name-input');
    confirmButton.addEventListener('click', () => {
        gameState.playerName = nameInput.value.trim() || 'Hero';
        startGameIntro();
    });
}
// Start the intro dialogue and first level
function startGameIntro() {
    const customizationScreen = document.getElementById('customization-screen');
    const nameInputScreen = document.getElementById('name-input-screen');
    customizationScreen.classList.add('hidden');
    nameInputScreen.classList.add('hidden');
    // Update game phase and set intro background
    gameState.gamePhase = 'dialogue';
    currentDialogueBackground = 'intro'; // Use hippo-hero background
    updateUIVisibility();
    const greeting = gameState.playerName ? `Greetings, ${gameState.playerName}! I am Frostwaddle, the winter spirit.` : "Greetings, traveler! I am Frostwaddle, the winter spirit.";
    showDialogue([
        greeting,
        "The land is frozen in eternal winter and I have lost my companion in the midst of the winter storm.",
        "Only you can restore balance and bring my companion back.",
        "The villagers say he was last seen inside the Winter Tower, locked behind a gate.",
        "Complete the Five Winter Trials to earn the Runes of Winter. With these runes, you shall unlock the ancient gate to the Winter Tower.",
        "Bountiful treasures await if you can bring my companinion back safely.",
        "Your journey begins now... Good luck!"
    ], () => {
        // Show map transition from The Village to Jollygut Hollow before starting level 1
        showMapTransition(
            { x: 0.5, y: 0.85 },  // The Village (bottom center of map)
            { x: 0.75, y: 0.85 }, // Jollygut Hollow (bottom right corner)
            "Jollygut Hollow",
            () => {
                startLevel(0);
            }
        );
    });
}
// Set up start game button
const startGameButton = document.getElementById('start-game-button');
startGameButton.addEventListener('click', () => {
    showCustomizationScreen();
});
// Set up customization screen
setupCustomization();
// Set up keyboard handler for final gate
window.addEventListener('keydown', (e) => {
    if (gameState.gamePhase !== 'final-gate' || finalGatePhase !== 'input') return;
    
    // Handle letter input
    if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        const letter = e.key.toUpperCase();
        // Find first empty box
        const emptyIndex = finalGateInputValues.findIndex(val => val === '');
        if (emptyIndex !== -1) {
            finalGateInputValues[emptyIndex] = letter;
            finalGateSelectedInput = Math.min(4, emptyIndex + 1);
        }
    }
    // Handle backspace
    else if (e.key === 'Backspace') {
        // Find last filled box
        for (let i = 4; i >= 0; i--) {
            if (finalGateInputValues[i] !== '') {
                finalGateInputValues[i] = '';
                finalGateSelectedInput = i;
                finalGateMessage = '';
                break;
            }
        }
    }
    // Handle Enter - submit answer
    else if (e.key === 'Enter') {
        const answer = finalGateInputValues.join('');
        if (answer.length === 5) {
            if (answer === 'MANGO') {
                // Start tower animation sequence
                finalGatePhase = 'animation';
                towerAnimationActive = true;
                towerAnimationFrame = 0;
                towerAnimationIndex = 0;
                finalGateMessage = '';
                finalGateMessageType = '';
            } else {
                finalGateMessage = 'The gate remains sealed. Try again...';
                finalGateMessageType = 'error';
                // Clear after a moment
                setTimeout(() => {
                    finalGateInputValues = ['', '', '', '', ''];
                    finalGateSelectedInput = 0;
                    finalGateMessage = '';
                }, 1500);
            }
        }
    }
});

// Set up restart button
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to start over? All progress will be lost.')) {
        restartGame();
    }
});
// Initialize UI visibility
updateUIVisibility();
// Set up music toggle button
const musicToggleButton = document.getElementById('music-toggle-button');
musicToggleButton.addEventListener('click', () => {
    toggleMusicMute();
});
// Try to start background music on page load immediately
// Note: Some browsers may block autoplay until user interaction
startBackgroundMusic();

// Ensure music plays on ANY user interaction if autoplay was blocked
const ensureMusicPlays = () => {
    // Only try to play background music if we haven't switched to end credits yet
    if (backgroundMusic.paused && !isMuted && currentMusic === backgroundMusic) {
        startBackgroundMusic();
    }
};

// Try on multiple event types to ensure music starts
document.addEventListener('click', ensureMusicPlays);
document.addEventListener('keydown', ensureMusicPlays);
document.addEventListener('touchstart', ensureMusicPlays);

// Also try to start music after a short delay
setTimeout(() => {
    if (backgroundMusic.paused && !isMuted && currentMusic === backgroundMusic) {
        startBackgroundMusic();
    }
}, 100);
// Start game loop (shows home screen initially)
gameLoop();

// =====================
// ADMIN PANEL
// =====================
const adminToggle = document.getElementById('admin-toggle');
const adminPanel = document.getElementById('admin-panel');
const adminClose = document.getElementById('admin-close');

// Toggle admin panel
adminToggle.addEventListener('click', () => {
    adminPanel.classList.toggle('open');
});

adminClose.addEventListener('click', () => {
    adminPanel.classList.remove('open');
});

// Admin functions to jump to different game states
function jumpToLevelStart(levelIndex) {
    // Clean up current level if any
    if (currentLevelInstance && currentLevelInstance.cleanup) {
        currentLevelInstance.cleanup();
    }
    currentLevelInstance = null;
    
    // Hide all overlays
    document.getElementById('start-game-overlay').classList.add('hidden');
    document.getElementById('customization-screen').classList.add('hidden');
    document.getElementById('name-input-screen').classList.add('hidden');
    document.getElementById('final-gate').classList.add('hidden');
    dialogueBox.classList.add('hidden');
    
    // Set game state
    gameState.currentLevel = levelIndex;
    gameState.levelComplete = false;
    gameState.playerName = 'Admin';
    showRuneDisplay = false;
    
    // Update UI
    updateUIVisibility();
    
    // Start the level
    startLevel(levelIndex);
    
    // Close admin panel
    adminPanel.classList.remove('open');
}

function jumpToLevelEnd(levelIndex) {
    // Clean up current level if any
    if (currentLevelInstance && currentLevelInstance.cleanup) {
        currentLevelInstance.cleanup();
    }
    currentLevelInstance = null;
    
    // Hide all overlays
    document.getElementById('start-game-overlay').classList.add('hidden');
    document.getElementById('customization-screen').classList.add('hidden');
    document.getElementById('name-input-screen').classList.add('hidden');
    document.getElementById('final-gate').classList.add('hidden');
    
    // Set game state
    gameState.currentLevel = levelIndex;
    gameState.levelComplete = true;
    gameState.playerName = 'Admin';
    
    // Add a rune if not already at max
    if (gameState.runes.length <= levelIndex) {
        const neededRunes = levelIndex + 1 - gameState.runes.length;
        for (let i = 0; i < neededRunes; i++) {
            awardRune();
        }
    }
    
    // Update UI
    updateUIVisibility();
    
    // Show completion dialogue with appropriate rune image for the level (0-4)
    showRuneDisplay = levelIndex;
    
    const levelMessages = [
        "Well done, brave traveler! You have earned a Rune of Winter. The ancient power flows through you. Your journey continues...",
    ];
    
    showDialogue(levelMessages, () => {
        showRuneDisplay = false;
        gameState.currentLevel++;
        gameState.levelComplete = false;
        if (gameState.currentLevel >= 5) {
            showFinalGate();
        } else {
            // Check if we need to show map transition
            if (gameState.currentLevel === 1) {
                // After level 1, before level 2: Jollygut Hollow -> Frozen Forest
                showMapTransition(
                    { x: 0.75, y: 0.85 }, // Jollygut Hollow (bottom right corner)
                    { x: 0.5, y: 0.5 },   // Frozen Forest (center of map)
                    'Frozen Forest',
                    () => {
                        startLevel(gameState.currentLevel);
                    }
                );
            } else if (gameState.currentLevel === 2) {
                // After level 2, before level 3: Frozen Forest -> The Frozen Reach
                showMapTransition(
                    { x: 0.5, y: 0.5 },   // Frozen Forest (center of map)
                    { x: 0.25, y: 0.5 },  // The Frozen Reach (left center)
                    'The Frozen Reach',
                    () => {
                        startLevel(gameState.currentLevel);
                    }
                );
            } else if (gameState.currentLevel === 3) {
                // After level 3, before level 4: The Frozen Reach -> Goblin Grotto
                showMapTransition(
                    { x: 0.25, y: 0.5 },  // The Frozen Reach (left, middle)
                    { x: 0.75, y: 0.5 },  // Goblin Grotto (right, middle)
                    'Goblin Grotto',
                    () => {
                        startLevel(gameState.currentLevel);
                    }
                );
            } else if (gameState.currentLevel === 4) {
                // After level 4, before level 5: Goblin Grotto -> The Runic Tower
                showMapTransition(
                    { x: 0.75, y: 0.5 },  // Goblin Grotto (right, middle)
                    { x: 0.5, y: 0.2 },   // The Runic Tower (center top, in the sky)
                    'The Runic Tower',
                    () => {
                        startLevel(gameState.currentLevel);
                    }
                );
            } else {
                startLevel(gameState.currentLevel);
            }
        }
    });
    
    // Close admin panel
    adminPanel.classList.remove('open');
}

// Add event listeners for admin buttons
document.querySelectorAll('.admin-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        
        if (action === 'level1-start') {
            jumpToLevelStart(0);
        } else if (action === 'level1-end') {
            jumpToLevelEnd(0);
        } else if (action === 'level2-start') {
            jumpToLevelStart(1);
        } else if (action === 'level2-end') {
            jumpToLevelEnd(1);
        } else if (action === 'level3-start') {
            jumpToLevelStart(2);
        } else if (action === 'level3-end') {
            jumpToLevelEnd(2);
        } else if (action === 'level4-start') {
            jumpToLevelStart(3);
        } else if (action === 'level4-end') {
            jumpToLevelEnd(3);
        } else if (action === 'level5-start') {
            jumpToLevelStart(4);
        } else if (action === 'level5-end') {
            jumpToLevelEnd(4);
        }
    });
});

