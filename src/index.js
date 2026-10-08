/**
 * Developed by S. M. Mahmud Iqbal
 * https://github.com/SMMahmudIqbal
 */

import { fetchGasPrice, CHAIN_CONFIG } from './rpc.js';
import { determineCondition, renderWeatherCard, renderCompact, colors } from './weather.js';

/**
 * Get weather report object for a single blockchain
 * @param {string} chain - 'ethereum', 'polygon', 'base', 'arbitrum', etc.
 */
export async function getGasWeather(chain = 'ethereum') {
  const gasInfo = await fetchGasPrice(chain);
  const condition = determineCondition(gasInfo.key, gasInfo.gwei);
  const card = renderWeatherCard(gasInfo);
  const compact = renderCompact(gasInfo);

  return {
    gasInfo,
    condition,
    card,
    compact,
    author: 'Developed by S. M. Mahmud Iqbal',
  };
}

/**
 * Get weather reports for all supported blockchains
 */
export async function getAllChainsWeather() {
  const chainKeys = Object.keys(CHAIN_CONFIG);
  const results = await Promise.allSettled(
    chainKeys.map((key) => getGasWeather(key))
  );

  return results.map((res, i) => {
    if (res.status === 'fulfilled') {
      return res.value;
    }
    return {
      chainKey: chainKeys[i],
      error: res.reason?.message || 'Failed to fetch',
    };
  });
}

export {
  CHAIN_CONFIG,
  fetchGasPrice,
  determineCondition,
  renderWeatherCard,
  renderCompact,
  colors,
};
