/**
 * Developed by S. M. Mahmud Iqbal
 * Unit tests for gwei-weather
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { determineCondition, renderWeatherCard, renderCompact } from '../src/weather.js';
import { CHAIN_CONFIG } from '../src/rpc.js';

test('CHAIN_CONFIG contains required blockchains', () => {
  assert.ok(CHAIN_CONFIG.ethereum);
  assert.ok(CHAIN_CONFIG.polygon);
  assert.ok(CHAIN_CONFIG.base);
  assert.ok(CHAIN_CONFIG.arbitrum);
  assert.ok(CHAIN_CONFIG.optimism);
});

test('determineCondition categorizes weather based on gwei thresholds', () => {
  const sunny = determineCondition('ethereum', 0.5);
  assert.equal(sunny.type, 'SUNNY');

  const pleasant = determineCondition('ethereum', 12);
  assert.equal(pleasant.type, 'PLEASANT');

  const overcast = determineCondition('ethereum', 25);
  assert.equal(overcast.type, 'OVERCAST');

  const stormy = determineCondition('ethereum', 60);
  assert.equal(stormy.type, 'STORMY');

  const hurricane = determineCondition('ethereum', 150);
  assert.equal(hurricane.type, 'HURRICANE');
});

test('renderCompact generates formatted string with icon', () => {
  const compact = renderCompact({
    key: 'ethereum',
    chain: 'Ethereum Mainnet',
    symbol: 'ETH',
    gwei: 0.8,
  });
  assert.match(compact, /☀️ ETH: 0.800 Gwei \(sunny\)/);
});

test('renderWeatherCard includes developer attribution', () => {
  const card = renderWeatherCard({
    key: 'ethereum',
    chain: 'Ethereum Mainnet',
    symbol: 'ETH',
    gwei: 5.0,
    timestamp: Date.now(),
    rpc: 'https://test-rpc.com',
  });
  assert.ok(card.includes('Developed by S. M. Mahmud Iqbal'));
});
