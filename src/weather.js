/**
 * Developed by S. M. Mahmud Iqbal
 * https://github.com/SMMahmudIqbal
 */

import { CHAIN_CONFIG } from './rpc.js';

// ANSI Color Helpers (Zero-dependency)
export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',

  // Foreground
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  gray: '\x1b[90m',

  // Bright
  brightYellow: '\x1b[93m',
  brightCyan: '\x1b[96m',
  brightGreen: '\x1b[92m',
  brightRed: '\x1b[91m',
};

export const ASCII_ART = {
  SUNNY: [
    `    ${colors.brightYellow}\\   /        ${colors.reset}`,
    `     ${colors.brightYellow}.-.         ${colors.reset}`,
    `  ${colors.brightYellow}― (   ) ―      ${colors.reset}`,
    `     ${colors.brightYellow}\`-'         ${colors.reset}`,
    `    ${colors.brightYellow}/   \\        ${colors.reset}`,
  ],
  PLEASANT: [
    `   ${colors.brightYellow}\\  /${colors.reset}           `,
    ` _ ${colors.brightYellow}/""\\${colors.cyan}_..._     ${colors.reset}`,
    `   ${colors.cyan}.-\`'     \`-.  ${colors.reset}`,
    `  ${colors.cyan}(             )${colors.reset}`,
    `   ${colors.cyan}\`~-.......-~' ${colors.reset}`,
  ],
  OVERCAST: [
    `     ${colors.gray}.-~~~-.     ${colors.reset}`,
    `   ${colors.gray}.-'       '-. ${colors.reset}`,
    `  ${colors.gray}(             )${colors.reset}`,
    `   ${colors.gray}\`~-.......-~' ${colors.reset}`,
    `    ${colors.blue}'  '  '  '   ${colors.reset}`,
  ],
  STORMY: [
    `     ${colors.gray}.-~~~-.     ${colors.reset}`,
    `   ${colors.gray}.-'       '-. ${colors.reset}`,
    `  ${colors.gray}(             )${colors.reset}`,
    `   ${colors.gray}\`~-..${colors.brightYellow}/ /${colors.gray}..-~' ${colors.reset}`,
    `       ${colors.brightYellow}/ /_      ${colors.reset}`,
    `      ${colors.brightYellow}/_/ ${colors.blue}'  '   ${colors.reset}`,
  ],
  HURRICANE: [
    `    ${colors.brightRed} .--~~~~--.  ${colors.reset}`,
    `   ${colors.brightRed}/  ${colors.magenta}@      @  ${colors.brightRed}\\ ${colors.reset}`,
    `  ${colors.brightRed}|   ${colors.brightYellow}>-(*)-<   ${colors.brightRed}| ${colors.reset}`,
    `   ${colors.brightRed}\\  ${colors.magenta}@      @  ${colors.brightRed}/ ${colors.reset}`,
    `    ${colors.brightRed} '--....--'  ${colors.reset}`,
    `      ${colors.brightYellow}/_/_/      ${colors.reset}`,
  ],
};

/**
 * Determine weather conditions based on gwei and chain thresholds
 */
export function determineCondition(chainKey, gwei) {
  const config = CHAIN_CONFIG[chainKey.toLowerCase()] || CHAIN_CONFIG.ethereum;
  const t = config.thresholds;

  if (gwei <= t.clear) {
    return {
      type: 'SUNNY',
      headline: '☀️ Clear Skies & Gentle Breeze',
      color: colors.brightYellow,
      advisory: 'Optimal weather! Gas is practically free. Safe to deploy contracts, mint NFTs, and execute complex swaps.',
      congestion: 'Low (~8%)',
      windSpeed: 'Calm (< 0.05 Gwei tip)',
    };
  }

  if (gwei <= t.pleasant) {
    return {
      type: 'PLEASANT',
      headline: '⛅ Pleasant & Mild On-Chain Climate',
      color: colors.brightCyan,
      advisory: 'Standard operating conditions. Quick confirmations with minimal slippage or priority fee requirements.',
      congestion: 'Moderate (~32%)',
      windSpeed: 'Light Breeze (0.1 - 0.5 Gwei tip)',
    };
  }

  if (gwei <= t.cloudy) {
    return {
      type: 'OVERCAST',
      headline: '🌦️ Foggy with Scattered Fee Showers',
      color: colors.blue,
      advisory: 'Rising network temperature. Watch out for mempool frontrunning on popular DEX routes.',
      congestion: 'Elevated (~64%)',
      windSpeed: 'Gusty (1 - 2 Gwei tip)',
    };
  }

  if (gwei <= t.stormy) {
    return {
      type: 'STORMY',
      headline: '⛈️ Severe Gas Thunderstorm Warning',
      color: colors.magenta,
      advisory: 'High congestion! A popular token launch or NFT mint is flooding the mempool. Batten down the hatches.',
      congestion: 'Severe (~88%)',
      windSpeed: 'Gale Force (5 - 10 Gwei tip)',
    };
  }

  return {
    type: 'HURRICANE',
    headline: '🌪️ Category 5 Gas Hurricane Detected',
    color: colors.brightRed,
    advisory: 'EXTREME ADVISORY: Whales and liquidators have seized the network. Stay indoors unless you enjoy 3-figure gas burns!',
    congestion: 'Critical (~99%)',
    windSpeed: 'Tornado Winds (> 25 Gwei tip)',
  };
}

/**
 * Render a formatted retro terminal weather card
 */
export function renderWeatherCard(gasInfo) {
  const condition = determineCondition(gasInfo.key, gasInfo.gwei);
  const artLines = ASCII_ART[condition.type];
  const dateStr = new Date(gasInfo.timestamp).toLocaleTimeString();

  const formattedGwei = gasInfo.gwei < 0.01 
    ? gasInfo.gwei.toFixed(4) 
    : gasInfo.gwei < 1 
      ? gasInfo.gwei.toFixed(3) 
      : gasInfo.gwei.toFixed(2);

  const lines = [
    `${colors.dim}┌─────────────────────────────────────────────────────────────┐${colors.reset}`,
    `${colors.dim}│${colors.reset}  ${colors.bold}${colors.brightCyan}⚡ GWEI WEATHER STATION${colors.reset} ${colors.gray}•${colors.reset} ${colors.bold}${gasInfo.chain.toUpperCase()}${colors.reset} ${colors.dim}│${colors.reset}`,
    `${colors.dim}├─────────────────────────────────────────────────────────────┤${colors.reset}`,
  ];

  // Merge ASCII Art on left, stats on right
  const statLines = [
    `${condition.color}${colors.bold}${condition.headline}${colors.reset}`,
    `${colors.white}Temperature (Gas):${colors.reset} ${colors.bold}${colors.brightGreen}${formattedGwei} Gwei${colors.reset} ${colors.dim}(${gasInfo.symbol})${colors.reset}`,
    `${colors.white}Mempool Congestion:${colors.reset} ${colors.cyan}${condition.congestion}${colors.reset}`,
    `${colors.white}Tip Velocity:${colors.reset}       ${colors.yellow}${condition.windSpeed}${colors.reset}`,
    `${colors.gray}Observed at:${colors.reset}        ${colors.dim}${dateStr}${colors.reset}`,
  ];

  const maxRows = Math.max(artLines.length, statLines.length);
  for (let i = 0; i < maxRows; i++) {
    const art = artLines[i] || '                 ';
    const stat = statLines[i] || '';
    lines.push(`${colors.dim}│${colors.reset}  ${art}   ${stat}`);
  }

  lines.push(`${colors.dim}├─────────────────────────────────────────────────────────────┤${colors.reset}`);
  lines.push(`${colors.dim}│${colors.reset}  ${colors.bold}${colors.brightYellow}ADVISORY:${colors.reset} ${condition.advisory}`);
  lines.push(`${colors.dim}├─────────────────────────────────────────────────────────────┤${colors.reset}`);
  lines.push(`${colors.dim}│${colors.reset}  ${colors.dim}Source:${colors.reset} ${gasInfo.rpc} ${colors.dim}│${colors.reset}`);
  lines.push(`${colors.dim}│${colors.reset}  ${colors.bold}${colors.cyan}Developed by S. M. Mahmud Iqbal${colors.reset} ${colors.dim}• @smmahmudiqbal${colors.reset}    ${colors.dim}│${colors.reset}`);
  lines.push(`${colors.dim}└─────────────────────────────────────────────────────────────┘${colors.reset}`);

  return lines.join('\n');
}

/**
 * Render a single-line compact status string (great for tmux, starship, prompt)
 */
export function renderCompact(gasInfo) {
  const condition = determineCondition(gasInfo.key, gasInfo.gwei);
  const icon = condition.type === 'SUNNY' ? '☀️'
    : condition.type === 'PLEASANT' ? '⛅'
    : condition.type === 'OVERCAST' ? '🌦️'
    : condition.type === 'STORMY' ? '⛈️' : '🌪️';

  const formattedGwei = gasInfo.gwei < 0.01 
    ? gasInfo.gwei.toFixed(4) 
    : gasInfo.gwei < 1 
      ? gasInfo.gwei.toFixed(3) 
      : gasInfo.gwei.toFixed(2);

  return `${icon} ${gasInfo.symbol}: ${formattedGwei} Gwei (${condition.type.toLowerCase()})`;
}
