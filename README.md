# 🦛 Hippo & The Five Winter Trials

A retro-style 8-bit/16-bit browser game inspired by classic Zelda-like adventures, featuring magical winter-themed puzzles and challenges.

## 🎮 Game Overview

Join Frostwaddle on an epic quest through five unique winter trials to find his companion! Guided by a mystical Winter Spirit, you must complete each challenge to earn the legendary Runes of Winter and unlock the ancient Winter Gate where his companion is being held captive.

## ✨ Features

- **Pixel-art aesthetic** with a cozy winter theme
- **Five unique puzzle levels**, each with different mechanics:
  1. **Watermelon Wasteland** - Aim and shoot paper balls into a hoop
  2. **Orchard of Oddities** - Catch winter items while avoiding summer ones
  3. **Mirror Meadow** - Rotate mirrors to reflect a light beam to the target
  4. **Cipher Stones** - Select the correct glowing stones in a logic puzzle
  5. **Sky Bridge** - Step on floating tiles in the correct sequence
- **Rune Collection System** - Earn magical runes after each trial
- **Final Gate Challenge** - Use your collected runes to unlock the ending
- **Whimsical dialogue** from your Winter Spirit guide
- **Beautiful snowfall effects** and frosty atmosphere

## 🚀 How to Play

### Running the Game

1. Open `index.html` in a modern web browser
2. Alternatively, run a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

### Development

If you want to modify the game:

```bash
# Install dependencies
npm install

# Compile TypeScript (if you make changes to game.ts)
npm run build

# Watch mode for development
npm run watch
```

## 🎯 Game Controls

### Level 1: Watermelon Wasteland
- **Click and hold** to charge your shot
- **Move mouse** to aim
- **Release** to shoot paper balls into the hoop

### Level 2: Orchard of Oddities
- **Move mouse** to control the basket
- Catch winter items: ⭐ ❄️ 🎄 🎁 ✨
- Avoid summer items: 🔥 ☀️ 🌵 🦂 💥

### Level 3: Mirror Meadow
- **Click** on a mirror to select it
- **Drag mouse** to rotate the mirror
- Reflect the light beam to hit the red target

### Level 4: Cipher Stones
- **Click** on stones to select/deselect them
- Choose all solid glyphs (filled symbols)
- Avoid hollow glyphs (outline symbols)

### Level 5: Sky Bridge
- **Click** on tiles to step on them
- Step on tiles in ascending order (1 through 7)
- Wrong order resets your progress

### Final Gate
- Use the runes you've collected
- **Type** the correct word to unlock the gate
- *Hint: Rearrange the letters you've earned!*

## 🎨 Technical Details

- **Pure TypeScript/JavaScript** - No framework dependencies
- **HTML5 Canvas** for rendering game graphics
- **CSS3 animations** for UI effects and snowfall
- **Modular level design** - Each level is a self-contained class
- **Pixel-perfect rendering** with image-rendering optimizations
- **Responsive dialogue system** with story progression

## 🎄 Winter Theme

The game features a magical winter atmosphere with:
- Gentle snowfall animations
- Frosty color palette (blues, silvers, whites)
- Glowing magical effects
- Cozy Christmas vibes
- Whimsical fantasy narration

## 📜 Story

*"The land is frozen in eternal winter, and only you can restore balance. Complete the Five Winter Trials to earn the Runes of Winter. With these runes, you shall unlock the ancient Winter Gate and discover the secret that lies beyond..."*

## 🛠️ File Structure

```
game/
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── game.ts             # TypeScript source code
├── game.js             # Compiled JavaScript
├── package.json        # Node.js dependencies
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## 🎮 Tips for Players

1. Take your time - there's no time limit!
2. Listen to the Winter Spirit's guidance
3. Each level requires a different strategy
4. Don't give up if you fail - levels reset automatically
5. Pay attention to the runes you collect
6. The final puzzle requires you to think!

## 📝 Credits

Created with ❄️ by the magic of winter and retro gaming nostalgia.

Font: Press Start 2P (Google Fonts)

---

**Enjoy your winter adventure!** 🦛✨❄️

