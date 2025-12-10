# Image Naming Guide for Customization Screen

## Required Images

### Individual Component Images (for selection grid)

**Characters:**
- `penguin.png` - Penguin character icon
- `snowman.png` - Snowman character icon  
- `yeti.png` - Yeti character icon

**Scarves:**
- `red.png` - Red scarf icon
- `blue.png` - Blue scarf icon
- `green.png` - Green scarf icon

**Transport:**
- `reindeer.png` - Reindeer icon
- `sled.png` - Sled icon
- `snowboard.png` - Snowboard icon

### Combined Preview Images

The preview image combines all three selections using this naming pattern:
```
{character}-{scarf}-{transport}.png
```

**Required combination images (27 total):**

Penguin combinations:
- `penguin-red-reindeer.png`
- `penguin-red-sled.png`
- `penguin-red-snowboard.png`
- `penguin-blue-reindeer.png`
- `penguin-blue-sled.png`
- `penguin-blue-snowboard.png`
- `penguin-green-reindeer.png`
- `penguin-green-sled.png`
- `penguin-green-snowboard.png`

Snowman combinations:
- `snowman-red-reindeer.png`
- `snowman-red-sled.png`
- `snowman-red-snowboard.png`
- `snowman-blue-reindeer.png`
- `snowman-blue-sled.png`
- `snowman-blue-snowboard.png`
- `snowman-green-reindeer.png`
- `snowman-green-sled.png`
- `snowman-green-snowboard.png`

Yeti combinations:
- `yeti-red-reindeer.png`
- `yeti-red-sled.png`
- `yeti-red-snowboard.png`
- `yeti-blue-reindeer.png`
- `yeti-blue-sled.png`
- `yeti-blue-snowboard.png`
- `yeti-green-reindeer.png`
- `yeti-green-sled.png`
- `yeti-green-snowboard.png`

## Default Selection

The game starts with these defaults:
- Character: `penguin`
- Scarf: `red`
- Transport: `sled`
- Default preview image: `penguin-red-sled.png`

## How It Works

1. User clicks on a character, scarf, or transport option
2. The selected item gets highlighted with a yellow border
3. The preview image on the right updates automatically
4. The preview shows: `{selectedCharacter}-{selectedScarf}-{selectedTransport}.png`
5. User clicks "Next" to proceed with their selections

