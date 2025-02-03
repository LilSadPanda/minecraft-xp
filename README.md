
# minecraft-xp

[![npm version](https://badge.fury.io/js/minecraft-xp.svg)](https://badge.fury.io/js/minecraft-xp)

A Node.js module that implements Minecraft's XP system. Calculate the XP required to level up, determine your current level from a total XP value, simulate XP gains, and visualize your progress with an ASCII progress bar.

## Installation

Install via npm:

```bash
npm install minecraft-xp
```

Or simply download the `minecraft-xp.js` file and include it in your project.

## Usage

Require the module in your project:

```js
const minecraftXP = require('minecraft-xp');
```

## API

### xpForNextLevel(level)

**Description:** Returns the XP required to progress from the specified level to the next level.

**Parameters:**
- `level` (number): The current level.

**Returns:** (number) XP required for the next level.

**Example:**

```js
const xpNeeded = minecraftXP.xpForNextLevel(10);
console.log(xpNeeded);
// Example output: 27
```

---

### totalXPForLevel(level)

**Description:** Returns the total cumulative XP required to reach the specified level.

**Parameters:**
- `level` (number): The target level.

**Returns:** (number) Total XP required to reach that level.

**Example:**

```js
const totalXP = minecraftXP.totalXPForLevel(10);
console.log(totalXP);
// Example output: 160
```

---

### getLevelFromXP(totalXP)

**Description:** Determines the current level based on the total XP.

**Parameters:**
- `totalXP` (number): The accumulated XP.

**Returns:** (number) The current level.

**Example:**

```js
const level = minecraftXP.getLevelFromXP(1500);
console.log(level);
// Example output: 30
```

---

### renderProgressBar(current, total, barWidth = 20)

**Description:** Returns an ASCII progress bar for the current level progress.

**Parameters:**
- `current` (number): XP earned in the current level.
- `total` (number): Total XP required for the next level.
- `barWidth` (number, optional): Width of the progress bar (default is 20).

**Returns:** (string) ASCII progress bar.

**Example:**

```js
const bar = minecraftXP.renderProgressBar(5, 20);
console.log(bar);
// Example output: [#####---------------]
```

---

### getXPStatus(totalXP, barWidth = 20)

**Description:** Returns an object with detailed XP status, including level, progress, and an ASCII progress bar.

**Parameters:**
- `totalXP` (number): The accumulated XP.
- `barWidth` (number, optional): Width of the progress bar.

**Returns:** (object) XP status details.

**Example:**

```js
const status = minecraftXP.getXPStatus(1500);
console.log(status);
/* Example output:
{
  totalXP: 1500,
  level: 30,
  xpAtCurrentLevelStart: 1395,
  xpInLevel: 105,
  xpForLevelUp: 112,
  xpNeeded: 7,
  progressRatio: 0.9375,
  progressBar: '[###################-]'
}
*/
```

---

### displayXPStatus(totalXP, barWidth = 20)

**Description:** Logs the formatted XP status to the console.

**Parameters:**
- `totalXP` (number): The accumulated XP.
- `barWidth` (number, optional): Width of the progress bar.

**Example:**

```js
minecraftXP.displayXPStatus(1500);
/* Example console output:
Total XP: 1500
Current Level: 30
XP at start of current level: 1395
XP in current level: 105 / 112
XP needed to reach next level: 7
Progress: [###################-] (93%)
*/
```

---

### xpBetweenLevels(startLevel, endLevel)

**Description:** Returns the total XP required to go from `startLevel` to `endLevel`.

**Parameters:**
- `startLevel` (number): The starting level.
- `endLevel` (number): The target level.

**Returns:** (number) XP difference between the two levels.

**Example:**

```js
const xpDiff = minecraftXP.xpBetweenLevels(10, 15);
console.log(xpDiff);
// Example output: 155
```

---

### xpAtPercent(level, percent)

**Description:** Returns the XP amount corresponding to a given percentage of progress toward the next level.

**Parameters:**
- `level` (number): The current level.
- `percent` (number): A decimal (0 to 1) representing the percentage.

**Returns:** (number) XP corresponding to that percentage progress.

**Example:**

```js
const xpProgress = minecraftXP.xpAtPercent(10, 0.5); // 50% progress
console.log(xpProgress);
// Example output: 14
```

---

### simulateXPGain(initialXP, gains)

**Description:** Simulates leveling up by applying an array of XP gains.

**Parameters:**
- `initialXP` (number): Starting XP.
- `gains` (number[]): Array of XP gains.

**Returns:** (object) An object with:
  - `finalXP`: Final total XP.
  - `steps`: An array of XP status objects after each gain.

**Example:**

```js
const simulation = minecraftXP.simulateXPGain(1000, [50, 200, 300]);
console.log(simulation);
/* Example output:
{
  finalXP: 1550,
  steps: [
    { ... }, // XP status after gaining 50 XP (total = 1050)
    { ... }, // XP status after gaining 200 XP (total = 1250)
    { ... }  // XP status after gaining 300 XP (total = 1550)
  ]
}
*/
```

---

### formatXPStatus(totalXP, barWidth = 20)

**Description:** Returns a formatted string with detailed XP status information.

**Parameters:**
- `totalXP` (number): The accumulated XP.
- `barWidth` (number, optional): Width of the progress bar.

**Returns:** (string) Formatted XP status.

**Example:**

```js
const formatted = minecraftXP.formatXPStatus(1500);
console.log(formatted);
/* Example output:
Total XP: 1500
Current Level: 30
XP at start of current level: 1395
XP in current level: 105 / 112
XP needed to reach next level: 7
Progress: [###################-] (93%)
*/
```

---

### getNextLevelXP(totalXP)

**Description:** Returns the remaining XP required to reach the next level.

**Parameters:**
- `totalXP` (number): The accumulated XP.

**Returns:** (number) XP required for the next level.

**Example:**

```js
const xpNeeded = minecraftXP.getNextLevelXP(1500);
console.log(xpNeeded);
// Example output: 7
```

---

### getPercentageComplete(totalXP)

**Description:** Returns the percentage (0 to 100) of progress made within the current level.

**Parameters:**
- `totalXP` (number): The accumulated XP.

**Returns:** (number) Progress percentage.

**Example:**

```js
const percent = minecraftXP.getPercentageComplete(1500);
console.log(percent);
// Example output: 93
```

---

### levelThresholds(upToLevel)

**Description:** Returns an array of level thresholds, where each threshold is an object containing the level and the total XP required to reach that level.

**Parameters:**
- `upToLevel` (number): The highest level to include.

**Returns:** (object[]) Array of thresholds.

**Example:**

```js
const thresholds = minecraftXP.levelThresholds(20);
console.log(thresholds);
/* Example output:
[
  { level: 0, totalXP: 0 },
  { level: 1, totalXP: 7 },
  { level: 2, totalXP: 20 },
  ...
  { level: 20, totalXP: 550 }
]
*/
```

---

## Example

Below is a complete example demonstrating several functions:

```js
const minecraftXP = require('minecraft-xp');

// Example total XP value
const xpValue = 1500;

// Get detailed XP status as an object
const status = minecraftXP.getXPStatus(xpValue);
console.log('Detailed XP Status:', status);
/* Example output:
Detailed XP Status: {
  totalXP: 1500,
  level: 30,
  xpAtCurrentLevelStart: 1395,
  xpInLevel: 105,
  xpForLevelUp: 112,
  xpNeeded: 7,
  progressRatio: 0.9375,
  progressBar: '[###################-]'
}
*/

// Display the XP status directly to the console
minecraftXP.displayXPStatus(xpValue);
/* Example console output:
Total XP: 1500
Current Level: 30
XP at start of current level: 1395
XP in current level: 105 / 112
XP needed to reach next level: 7
Progress: [###################-] (93%)
*/

// Simulate a series of XP gains
const simulation = minecraftXP.simulateXPGain(1000, [50, 200, 300]);
console.log('Simulation Steps:', simulation);
/* Example output:
Simulation Steps: {
  finalXP: 1550,
  steps: [
    { ... }, // Status after gaining 50 XP (total = 1050)
    { ... }, // Status after gaining 200 XP (total = 1250)
    { ... }  // Status after gaining 300 XP (total = 1550)
  ]
}
*/

// Get XP difference between level 10 and 15
const diff = minecraftXP.xpBetweenLevels(10, 15);
console.log(`XP from level 10 to 15: ${diff}`);
/* Example output:
XP from level 10 to 15: <calculated value>
*/

// Get formatted XP status as a string
console.log(minecraftXP.formatXPStatus(xpValue));
/* Example output:
Total XP: 1500
Current Level: 30
XP at start of current level: 1395
XP in current level: 105 / 112
XP needed to reach next level: 7
Progress: [###################-] (93%)
*/
```

---

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This module is provided as-is without any warranty. Check GitHub for details.
