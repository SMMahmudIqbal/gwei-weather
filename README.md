# gwei-weather

> **Retro ASCII Web3 Gas and Chain Weather CLI & Library**  
> *Developed by S. M. Mahmud Iqbal*

[![Test](https://github.com/SMMahmudIqbal/gwei-weather/actions/workflows/test.yml/badge.svg)](https://github.com/SMMahmudIqbal/gwei-weather/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Packages](https://img.shields.io/badge/Registry-GitHub%20Packages-blue)](https://github.com/SMMahmudIqbal?tab=packages)
[![Author](https://img.shields.io/badge/Author-S.%20M.%20Mahmud%20Iqbal-green)](https://github.com/SMMahmudIqbal)

`gwei-weather` transforms real-time blockchain gas prices into an animated retro weather forecast directly in your terminal. Check whether on-chain conditions are clear for deploying contracts or if elevated gas fees are occurring before submitting transactions.

---

## Terminal Preview

```text
┌─────────────────────────────────────────────────────────────┐
│  GWEI WEATHER STATION • ETHEREUM MAINNET                    │
├─────────────────────────────────────────────────────────────┤
│      \   /           Clear Skies & Gentle Breeze            │
│       .-.            Temperature (Gas): 0.128 Gwei (ETH)    │
│    ― (   ) ―         Mempool Congestion: Low (~8%)          │
│       `-'            Tip Velocity:       Calm (< 0.05 Gwei) │
│      /   \           Observed at:        11:21:32 AM        │
├─────────────────────────────────────────────────────────────┤
│  ADVISORY: Optimal weather. Low network gas conditions.     │
├─────────────────────────────────────────────────────────────┤
│  Source: https://ethereum-rpc.publicnode.com                │
│  Developed by S. M. Mahmud Iqbal • @smmahmudiqbal           │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

- **Retro ANSI Weather Visuals**: Dynamic ASCII renderings for Clear Skies, Partly Cloudy, Fee Showers, Thunderstorms, and Category 5 Gas Storms.
- **Multi-Chain Support**: Ethereum, Polygon (POL), Base, Arbitrum One, and Optimism.
- **Zero API Keys Required**: Driven by high-speed public JSON-RPC nodes with automatic multi-endpoint failover.
- **Terminal Integrations**: Compact mode formatted for tmux, Starship prompt, or shell status bars.
- **Live Radar Mode**: Optional `--watch` flag refreshing every 5 seconds for live on-chain monitoring.
- **JavaScript & TypeScript API**: Available as an importable module for Node.js backends and web applications.

---

## Quick Run

Run immediately with `npx`:

```bash
# Default (Ethereum Mainnet)
npx @smmahmudiqbal/gwei-weather

# Check Polygon or Base
npx @smmahmudiqbal/gwei-weather --chain polygon
npx @smmahmudiqbal/gwei-weather --chain base

# Global on-chain weather report
npx @smmahmudiqbal/gwei-weather --all

# Compact single-line status (tmux/starship)
npx @smmahmudiqbal/gwei-weather --compact
```

---

## CLI Options

| Flag | Alias | Description |
| :--- | :--- | :--- |
| `--chain <name>` | `-c` | Target chain (`ethereum`, `polygon`, `base`, `arbitrum`, `optimism`) |
| `--all` | `-a` | Show weather radar for all supported chains |
| `--compact` | `-s` | Output a single-line summary (e.g. `ETH: 0.128 Gwei (sunny)`) |
| `--watch` | `-w` | Live updating radar mode (updates every 5s) |
| `--json` | `-j` | Output raw data in JSON format for scripting |
| `--help` | `-h` | Display help screen |
| `--version` | `-v` | Display package version |

---

## Programmatic Usage

You can also use `gwei-weather` as an npm module:

```javascript
import { getGasWeather, getAllChainsWeather } from '@smmahmudiqbal/gwei-weather';

// Fetch single chain weather
const weather = await getGasWeather('ethereum');
console.log(weather.condition.headline); // 'Clear Skies & Gentle Breeze'
console.log(weather.gasInfo.gwei);       // 0.128
console.log(weather.compact);            // 'ETH: 0.128 Gwei (sunny)'

// Fetch all chains
const all = await getAllChainsWeather();
console.log(all);
```

---

## GitHub Packages Integration

This repository is pre-configured with a continuous integration workflow (`.github/workflows/publish.yml`).

To publish new releases to the **GitHub Packages** tab under `@smmahmudiqbal`:
1. In the GitHub repository, navigate to **Releases** > **Draft a new release**.
2. Create a version tag (e.g., `v1.0.0`).
3. Click **Publish release** to run tests and package deployment.

---

## Author and Attribution

**Developed by S. M. Mahmud Iqbal**  
- **GitHub:** [@SMMahmudIqbal](https://github.com/SMMahmudIqbal)  
- **LinkedIn:** [rupaisheikh](https://linkedin.com/in/rupaisheikh)  
- **Email:** smmahmudiqbal@gmail.com  

---

## License

MIT License © 2026 S. M. Mahmud Iqbal
