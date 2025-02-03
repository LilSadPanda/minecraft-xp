/**
 * Minecraft XP Module
 * 
 * Provides functions for working with the Minecraft experience (XP) system.
 * 
 * Functions:
 *  - xpForNextLevel(level): Returns the XP required to progress from a given level to the next level.
 *  - totalXPForLevel(level): Returns the total cumulative XP required to reach a given level.
 *  - getLevelFromXP(totalXP): Determines the current level based on a total XP value.
 *  - renderProgressBar(current, total, barWidth): Returns an ASCII progress bar for progress within the current level.
 *  - getXPStatus(totalXP, barWidth): Returns an object with detailed XP status based on a total XP value.
 *  - displayXPStatus(totalXP, barWidth): Logs the XP status information to the console.
 *  - xpBetweenLevels(startLevel, endLevel): Returns the XP difference between two levels.
 *  - xpAtPercent(level, percent): Returns the XP amount corresponding to a percentage of the XP needed for the next level.
 *  - simulateXPGain(initialXP, gains): Simulates leveling up with an array of XP gains.
 *  - formatXPStatus(totalXP, barWidth): Returns a formatted string of XP status information.
 *  - getNextLevelXP(totalXP): Returns the XP needed to reach the next level.
 *  - getPercentageComplete(totalXP): Returns the percentage of progress within the current level.
 *  - levelThresholds(upToLevel): Returns an array of level thresholds up to a given level.
 */

/**
 * Returns the XP required to advance from the given level to the next level.
 * 
 * @param {number} level - The current level.
 * @returns {number} XP required for the next level.
 */
function xpForNextLevel(level) {
    if (level >= 0 && level < 16) {
      return 2 * level + 7;
    } else if (level >= 16 && level < 31) {
      return 5 * level - 38;
    } else { // level >= 31
      return 9 * level - 158;
    }
  }
  
  /**
   * Returns the total cumulative XP required to reach a given level.
   * 
   * @param {number} level - The target level.
   * @returns {number} Total XP required to reach that level.
   */
  function totalXPForLevel(level) {
    if (level <= 0) return 0;
    if (level <= 16) {
      return level * level + 6 * level;
    } else if (level <= 31) {
      return (5 * level * level - 81 * level + 720) / 2;
    } else {
      return (9 * level * level - 325 * level + 4440) / 2;
    }
  }
  
  /**
   * Determines the player's current level based on a provided total XP value.
   * 
   * @param {number} totalXP - The total XP accumulated.
   * @returns {number} The current level.
   */
  function getLevelFromXP(totalXP) {
    let level = 0;
    while (totalXPForLevel(level + 1) <= totalXP) {
      level++;
    }
    return level;
  }
  
  /**
   * Renders an ASCII progress bar representing progress toward the next level.
   * 
   * @param {number} current - The XP earned in the current level.
   * @param {number} total - The total XP required for the next level.
   * @param {number} [barWidth=20] - The width of the progress bar in characters.
   * @returns {string} An ASCII progress bar.
   */
  function renderProgressBar(current, total, barWidth = 20) {
    const progressRatio = Math.min(current / total, 1);
    const filledLength = Math.round(progressRatio * barWidth);
    const emptyLength = barWidth - filledLength;
    return `[${"#".repeat(filledLength)}${"-".repeat(emptyLength)}]`;
  }
  
  /**
   * Returns an object containing detailed XP status information based on the provided total XP.
   * 
   * @param {number} totalXP - The total XP accumulated.
   * @param {number} [barWidth=20] - The width of the progress bar.
   * @returns {object} An object with properties:
   *   - totalXP: The provided XP.
   *   - level: The current level.
   *   - xpAtCurrentLevelStart: Total XP required to have just reached the current level.
   *   - xpInLevel: XP earned within the current level.
   *   - xpForLevelUp: XP required to progress to the next level.
   *   - xpNeeded: XP remaining to level up.
   *   - progressRatio: Fraction of XP earned in the current level.
   *   - progressBar: ASCII progress bar as a string.
   */
  function getXPStatus(totalXP, barWidth = 20) {
    const level = getLevelFromXP(totalXP);
    const xpAtCurrentLevelStart = totalXPForLevel(level);
    const xpInLevel = totalXP - xpAtCurrentLevelStart;
    const xpForLevelUp = xpForNextLevel(level);
    const xpNeeded = xpForLevelUp - xpInLevel;
    const progressRatio = xpInLevel / xpForLevelUp;
    const progressBar = renderProgressBar(xpInLevel, xpForLevelUp, barWidth);
    
    return {
      totalXP,
      level,
      xpAtCurrentLevelStart,
      xpInLevel,
      xpForLevelUp,
      xpNeeded,
      progressRatio,
      progressBar
    };
  }
  
  /**
   * Logs the XP status to the console, including level, progress, and an ASCII progress bar.
   * 
   * @param {number} totalXP - The total XP accumulated.
   * @param {number} [barWidth=20] - The width of the progress bar.
   */
  function displayXPStatus(totalXP, barWidth = 20) {
    console.log(formatXPStatus(totalXP, barWidth));
  }
  
  /**
   * Returns the total XP required to move from startLevel to endLevel.
   * 
   * @param {number} startLevel - The starting level.
   * @param {number} endLevel - The target level.
   * @returns {number} The XP difference between the two levels.
   */
  function xpBetweenLevels(startLevel, endLevel) {
    if (startLevel > endLevel) {
      throw new Error("startLevel cannot be greater than endLevel");
    }
    return totalXPForLevel(endLevel) - totalXPForLevel(startLevel);
  }
  
  /**
   * Returns the XP amount corresponding to a given percentage of the XP needed to level up.
   * 
   * @param {number} level - The current level.
   * @param {number} percent - A decimal representing the percentage (0 to 1).
   * @returns {number} XP corresponding to that percentage progress.
   */
  function xpAtPercent(level, percent) {
    const xpForLevelUp = xpForNextLevel(level);
    return Math.round(percent * xpForLevelUp);
  }
  
  /**
   * Simulates XP gains over multiple steps.
   * 
   * @param {number} initialXP - The starting total XP.
   * @param {number[]} gains - An array of XP amounts to add sequentially.
   * @returns {object} An object with:
   *   - finalXP: Final total XP.
   *   - steps: An array of XP status objects after each gain.
   */
  function simulateXPGain(initialXP, gains) {
    let xp = initialXP;
    const steps = [];
    for (let i = 0; i < gains.length; i++) {
      xp += gains[i];
      steps.push(getXPStatus(xp));
    }
    return { finalXP: xp, steps };
  }
  
  /**
   * Returns a formatted string showing the XP status.
   * 
   * @param {number} totalXP - The total XP accumulated.
   * @param {number} [barWidth=20] - The width of the progress bar.
   * @returns {string} A formatted string containing the XP status details.
   */
  function formatXPStatus(totalXP, barWidth = 20) {
    const status = getXPStatus(totalXP, barWidth);
    return `Total XP: ${status.totalXP}
  Current Level: ${status.level}
  XP at start of current level: ${status.xpAtCurrentLevelStart}
  XP in current level: ${status.xpInLevel} / ${status.xpForLevelUp}
  XP needed to reach next level: ${status.xpNeeded}
  Progress: ${status.progressBar} (${Math.floor(status.progressRatio * 100)}%)`;
  }
  
  /**
   * Returns the remaining XP required to reach the next level from the current total XP.
   * 
   * @param {number} totalXP - The total XP accumulated.
   * @returns {number} XP required for the next level.
   */
  function getNextLevelXP(totalXP) {
    const status = getXPStatus(totalXP);
    return status.xpNeeded;
  }
  
  /**
   * Returns the percentage (0 to 100) of progress made within the current level.
   * 
   * @param {number} totalXP - The total XP accumulated.
   * @returns {number} The percentage of progress within the current level.
   */
  function getPercentageComplete(totalXP) {
    const status = getXPStatus(totalXP);
    return Math.floor(status.progressRatio * 100);
  }
  
  /**
   * Returns an array of level thresholds up to a given level.
   * Each element in the array is an object containing:
   *   - level: the level number.
   *   - totalXP: the cumulative XP required to reach that level.
   * 
   * @param {number} upToLevel - The highest level to include.
   * @returns {object[]} Array of level thresholds.
   */
  function levelThresholds(upToLevel) {
    const thresholds = [];
    for (let level = 0; level <= upToLevel; level++) {
      thresholds.push({ level, totalXP: totalXPForLevel(level) });
    }
    return thresholds;
  }
  
  module.exports = {
    xpForNextLevel,
    totalXPForLevel,
    getLevelFromXP,
    renderProgressBar,
    getXPStatus,
    displayXPStatus,
    xpBetweenLevels,
    xpAtPercent,
    simulateXPGain,
    formatXPStatus,
    getNextLevelXP,
    getPercentageComplete,
    levelThresholds
  };
  