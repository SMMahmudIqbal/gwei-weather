# ⚡ gwei-weather

> **Retro ASCII Web3 Gas & Chain Weather CLI & Library**  
> *Developed by S. M. Mahmud Iqbal*

[![Test](https://github.com/SMMahmudIqbal/gwei-weather/actions/workflows/test.yml/badge.svg)](https://github.com/SMMahmudIqbal/gwei-weather/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Packages](https://img.shields.io/badge/Registry-GitHub%20Packages-blue)](https://github.com/SMMahmudIqbal?tab=packages)
[![Author](https://img.shields.io/badge/Author-S.%20M.%20Mahmud%20Iqbal-green)](https://github.com/SMMahmudIqbal)

`gwei-weather` transforms real-time blockchain gas prices into an animated retro **Weather Forecast** directly in your terminal. 

Check if on-chain skies are clear for deploying contracts or if a Category 5 gas hurricane is brewing before you submit a transaction!

---

## 📸 Preview

```text
┌─────────────────────────────────────────────────────────────┐
│  ⚡ GWEI WEATHER STATION • ETHEREUM MAINNET                 │
├─────────────────────────────────────────────────────────────┤
│      \   /           ☀️ Clear Skies & Gentle Breeze
│       .-.            Temperature (Gas): 0.128 Gwei (ETH)
│    ― (   ) ―         Mempool Congestion: Low (~8%)
│       `-'            Tip Velocity:       Calm (< 0.05 Gwei tip)
│      /   \           Observed at:        11:21:32 AM
├─────────────────────────────────────────────────────────────┤
│  ADVISORY: Optimal weather! Gas is practically free. Safe to deploy contracts, mint NFTs, and execute complex swaps.
├─────────────────────────────────────────────────────────────┤
│  Source: https://ethereum-rpc.publicnode.com                │
│  Developed by S. M. Mahmud Iqbal • @smmahmudiqbal           │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- 🌤️ **Retro ANSI Weather Visuals:** Dynamic ASCII art for Clear Skies, Partly Cloudy, Fee Showers, Thunderstorms, and Category 5 Hurricanes.
- ⛓️ **Multi-Chain Support:** Ethereum, Polygon (POL), Base, Arbitrum One, and Optimism.
- 📡 **Zero API Keys Required:** Powered by high-speed public JSON-RPC nodes with automatic multi-endpoint failover.
- 🖥️ **Terminal Integrations:** Compact mode for tmux, Starship prompt, or shell status bars.
- 📡 **Live Radar Mode:** `--watch` refreshes every 5 seconds for live on-chain monitoring.
- 📦 **JavaScript / TypeScript API:** Can be imported and used inside any Node.js or web app.

---

## 🚀 Quick Run (No Install)

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

## 🛠️ CLI Options

| Flag | Alias | Description |
| :--- | :--- | :--- |
| `--chain <name>` | `-c` | Target chain (`ethereum`, `polygon`, `base`, `arbitrum`, `optimism`) |
| `--all` | `-a` | Show weather radar for all supported chains |
| `--compact` | `-s` | Output a single-line summary (e.g. `☀️ ETH: 0.128 Gwei (sunny)`) |
| `--watch` | `-w` | Live updating radar mode (updates every 5s) |
| `--json` | `-j` | Output raw data in JSON format for scripting |
| `--help` | `-h` | Display help screen |
| `--version` | `-v` | Display package version |

---

## 💻 Programmatic Usage

You can also use `gwei-weather` as an npm module in your own project:

```javascript
import { getGasWeather, getAllChainsWeather } from '@smmahmudiqbal/gwei-weather';

// Fetch single chain weather
const weather = await getGasWeather('ethereum');
console.log(weather.condition.headline); // '☀️ Clear Skies & Gentle Breeze'
console.log(weather.gasInfo.gwei);       // 0.128
console.log(weather.compact);            // '☀️ ETH: 0.128 Gwei (sunny)'

// Fetch all chains
const all = await getAllChainsWeather();
console.log(all);
```

---

## 📦 Publishing to GitHub Packages

This repository is pre-configured with a GitHub Actions workflow (`.github/workflows/publish.yml`).

To publish new releases to the **GitHub Packages** tab under `@smmahmudiqbal`:
1. In the GitHub repository, click **Releases** > **Draft a new release**.
2. Create a tag (e.g., `v1.0.0`).
3. Click **Publish release**.
4. The workflow will automatically test and publish the package to `https://npm.pkg.github.com`!

---

## 👤 Author & Attribution

**Developed by S. M. Mahmud Iqbal**  
- **GitHub:** [@SMMahmudIqbal](https://github.com/SMMahmudIqbal)  
- **LinkedIn:** [rupaisheikh](https://linkedin.com/in/rupaisheikh)  
- **Email:** smmahmudiqbal@gmail.com  

---

## 📄 License

MIT License © 2026 S. M. Mahmud Iqbal
