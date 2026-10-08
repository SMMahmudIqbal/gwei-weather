#!/usr/bin/env node
/**
 * Developed by S. M. Mahmud Iqbal
 * https://github.com/SMMahmudIqbal
 */

import { getGasWeather, getAllChainsWeather, CHAIN_CONFIG, colors } from '../src/index.js';

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
${colors.bold}${colors.brightCyan}⚡ GWEI WEATHER CLI${colors.reset} ${colors.gray}v1.0.0${colors.reset}
${colors.dim}Developed by S. M. Mahmud Iqbal${colors.reset}

${colors.bold}USAGE:${colors.reset}
  $ gwei-weather [options]
  $ npx @smmahmudiqbal/gwei-weather [options]

${colors.bold}OPTIONS:${colors.reset}
  --chain, -c <name>   Specify target chain (default: ethereum)
                       Supported: ${Object.keys(CHAIN_CONFIG).join(', ')}
  --all, -a            Report weather for all supported blockchains
  --compact, -s        Single-line compact output (ideal for tmux, starship)
  --json, -j           Output raw weather data in JSON format
  --watch, -w          Live weather radar (updates every 5 seconds)
  --help, -h           Show this help manual
  --version, -v        Display package version

${colors.bold}EXAMPLES:${colors.reset}
  $ gwei-weather
  $ gwei-weather --chain polygon
  $ gwei-weather --all
  $ gwei-weather --compact
  $ gwei-weather --watch
`);
}

function printVersion() {
  console.log('gwei-weather v1.0.0 - Developed by S. M. Mahmud Iqbal');
}

async function runOnce(options) {
  try {
    if (options.all) {
      if (options.json) {
        const all = await getAllChainsWeather();
        console.log(JSON.stringify(all, null, 2));
        return;
      }

      console.log(`\n${colors.bold}${colors.brightCyan}⚡ GLOBAL ON-CHAIN WEATHER RADAR${colors.reset}\n`);
      const all = await getAllChainsWeather();
      for (const item of all) {
        if (item.card) {
          if (options.compact) {
            console.log(item.compact);
          } else {
            console.log(item.card);
            console.log('');
          }
        } else {
          console.log(`${colors.red}✗ Failed ${item.chainKey}: ${item.error}${colors.reset}`);
        }
      }
      return;
    }

    const weather = await getGasWeather(options.chain);

    if (options.json) {
      console.log(JSON.stringify(weather, null, 2));
      return;
    }

    if (options.compact) {
      console.log(weather.compact);
      return;
    }

    console.log('\n' + weather.card + '\n');
  } catch (err) {
    console.error(`\n${colors.brightRed}Error:${colors.reset} ${err.message}\n`);
    if (!options.watch) {
      process.exit(1);
    }
  }
}

async function main() {
  const options = {
    chain: 'ethereum',
    all: false,
    compact: false,
    json: false,
    watch: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      printHelp();
      return;
    }
    if (arg === '--version' || arg === '-v') {
      printVersion();
      return;
    }
    if (arg === '--all' || arg === '-a') {
      options.all = true;
    } else if (arg === '--compact' || arg === '-s') {
      options.compact = true;
    } else if (arg === '--json' || arg === '-j') {
      options.json = true;
    } else if (arg === '--watch' || arg === '-w') {
      options.watch = true;
    } else if (arg === '--chain' || arg === '-c') {
      options.chain = args[++i] || 'ethereum';
    }
  }

  if (options.watch) {
    console.clear();
    await runOnce(options);
    setInterval(async () => {
      console.clear();
      await runOnce(options);
    }, 5000);
  } else {
    await runOnce(options);
  }
}

main();
