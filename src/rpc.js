/**
 * Developed by S. M. Mahmud Iqbal
 * https://github.com/SMMahmudIqbal
 */

export const CHAIN_CONFIG = {
  ethereum: {
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    thresholds: {
      clear: 1.0,      // < 1 Gwei
      pleasant: 15.0,  // < 15 Gwei
      cloudy: 35.0,    // < 35 Gwei
      stormy: 75.0,    // < 75 Gwei
    },
    rpcs: [
      'https://ethereum-rpc.publicnode.com',
      'https://1rpc.io/eth',
      'https://eth.drpc.org',
    ],
  },
  polygon: {
    name: 'Polygon PoS',
    symbol: 'POL',
    thresholds: {
      clear: 50.0,
      pleasant: 150.0,
      cloudy: 300.0,
      stormy: 600.0,
    },
    rpcs: [
      'https://polygon-bor-rpc.publicnode.com',
      'https://1rpc.io/matic',
      'https://polygon.drpc.org',
    ],
  },
  base: {
    name: 'Base Mainnet',
    symbol: 'BASE',
    thresholds: {
      clear: 0.005,
      pleasant: 0.02,
      cloudy: 0.08,
      stormy: 0.25,
    },
    rpcs: [
      'https://base-rpc.publicnode.com',
      'https://1rpc.io/base',
      'https://base.drpc.org',
    ],
  },
  arbitrum: {
    name: 'Arbitrum One',
    symbol: 'ARB',
    thresholds: {
      clear: 0.015,
      pleasant: 0.05,
      cloudy: 0.15,
      stormy: 0.50,
    },
    rpcs: [
      'https://arbitrum-one-rpc.publicnode.com',
      'https://1rpc.io/arb',
      'https://arbitrum.drpc.org',
    ],
  },
  optimism: {
    name: 'Optimism Mainnet',
    symbol: 'OP',
    thresholds: {
      clear: 0.005,
      pleasant: 0.02,
      cloudy: 0.08,
      stormy: 0.25,
    },
    rpcs: [
      'https://optimism-rpc.publicnode.com',
      'https://1rpc.io/op',
      'https://optimism.drpc.org',
    ],
  },
};

/**
 * Fetch current gas price for a given chain with failover support.
 * @param {string} chainKey - 'ethereum', 'polygon', 'base', 'arbitrum', etc.
 * @returns {Promise<{ gwei: number, chain: string, symbol: string, rpc: string, timestamp: number }>}
 */
export async function fetchGasPrice(chainKey = 'ethereum') {
  const normalizedKey = chainKey.toLowerCase();
  const config = CHAIN_CONFIG[normalizedKey];

  if (!config) {
    const supported = Object.keys(CHAIN_CONFIG).join(', ');
    throw new Error(`Unsupported chain: "${chainKey}". Supported chains: ${supported}`);
  }

  let lastError = null;

  for (const rpc of config.rpcs) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_gasPrice',
          params: [],
          id: 1,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const json = await res.json();
      if (!json || !json.result) {
        throw new Error('Invalid JSON-RPC response format');
      }

      const wei = BigInt(json.result);
      const gwei = Number(wei) / 1e9;

      return {
        chain: config.name,
        key: normalizedKey,
        symbol: config.symbol,
        gwei,
        rpc,
        timestamp: Date.now(),
      };
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`Failed to fetch gas price from all RPCs for ${config.name}: ${lastError?.message || 'Timeout'}`);
}
