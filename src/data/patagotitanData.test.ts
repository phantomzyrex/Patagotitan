import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSeasonState,
  getSizeComparisonData,
  getFloodplainPhaseDetails,
  ANATOMY_HOTSPOTS,
  MYTH_CARDS,
  TIMELINE_EVENTS,
  FAST_FACTS,
  SCIENTIFIC_SOURCES,
} from './patagotitanData';
import { COLOR_TOKENS, calculateFitTextSizePx } from '../styles/tokens';
import { resolveKeyboardSectionJump, SECTION_ORDER } from '../utils/sectionNavigation';

test('calculateSeasonState transitions accurately from DRY to TRANSITION to WET', () => {
  const dry = calculateSeasonState(0);
  assert.equal(dry.phase, 'DRY');
  assert.equal(dry.sublabel, 'SEMI-ARID');
  assert.equal(dry.dropletYPercent, 0);
  assert.ok(dry.shimmerOpacity > 0.8);

  const transition = calculateSeasonState(0.5);
  assert.equal(transition.phase, 'TRANSITION');
  assert.equal(transition.dropletYPercent, 50);
  assert.equal(transition.shimmerOpacity, 0);

  const wet = calculateSeasonState(0.95);
  assert.equal(wet.phase, 'WET');
  assert.equal(wet.sublabel, 'HUMID');
  assert.ok(wet.mistOpacity > 0.2);
});

test('getSizeComparisonData toggles between later estimate (31m) and 2017 estimate (37m) and Argentinosaurus', () => {
  const laterList = getSizeComparisonData('later', false);
  const patagoLater = laterList.find((item) => item.id === 'patagotitan');
  assert.ok(patagoLater);
  assert.equal(patagoLater.lengthMeters, 31);
  assert.equal(laterList.some((item) => item.id === 'argentinosaurus'), false);

  const desc2017WithArg = getSizeComparisonData('2017', true);
  const patago2017 = desc2017WithArg.find((item) => item.id === 'patagotitan');
  assert.ok(patago2017);
  assert.equal(patago2017.lengthMeters, 37);
  assert.equal(desc2017WithArg.some((item) => item.id === 'argentinosaurus'), true);
});

test('getFloodplainPhaseDetails computes dry, transition, and wet parameters cleanly', () => {
  const dry = getFloodplainPhaseDetails(10);
  assert.ok(dry.phaseTitle.includes('Dry Phase'));
  assert.ok(dry.mudCrackOpacity > 0.5);

  const wet = getFloodplainPhaseDetails(90);
  assert.ok(wet.phaseTitle.includes('Wet Phase'));
  assert.equal(wet.mudCrackOpacity, 0);
  assert.ok(wet.sheetFloodOpacity > 0.8);
});

test('scientific rules: skull hotspot is marked as dashed reconstruction, myths=6, facts=8, sources=18', () => {
  const skull = ANATOMY_HOTSPOTS.find((h) => h.id === 'skull');
  assert.ok(skull);
  assert.equal(skull.isDashedReconstruction, true);
  assert.ok(skull.summary.toLowerCase().includes('not preserved'));
  assert.equal(MYTH_CARDS.length, 6);
  assert.equal(TIMELINE_EVENTS.length, 13);
  assert.equal(FAST_FACTS.length, 8);
  assert.equal(SCIENTIFIC_SOURCES.length, 18);
});

test('design tokens and fit-text calculation scale wordmark to ~85% of viewport width', () => {
  assert.equal(COLOR_TOKENS.glow, '#F6B27A');
  assert.equal(COLOR_TOKENS.bone, '#FFF6EA');
  const sizeAt1440 = calculateFitTextSizePx(1408, 11, 0.85);
  assert.ok(sizeAt1440 >= 140 && sizeAt1440 <= 165);
});

test('resolveKeyboardSectionJump navigates sections with Arrow keys and Space key', () => {
  assert.equal(SECTION_ORDER.length, 13);

  const fromHeroDown = resolveKeyboardSectionJump('hero', 'ArrowDown');
  assert.equal(fromHeroDown?.id, 'overview');

  const fromOverviewSpace = resolveKeyboardSectionJump('overview', ' ', false);
  assert.equal(fromOverviewSpace?.id, 'discovery');

  const fromDiscoveryShiftSpace = resolveKeyboardSectionJump('discovery', ' ', true);
  assert.equal(fromDiscoveryShiftSpace?.id, 'overview');

  const fromDiscoveryUp = resolveKeyboardSectionJump('discovery', 'ArrowUp');
  assert.equal(fromDiscoveryUp?.id, 'overview');

  const fromOverviewLeft = resolveKeyboardSectionJump('overview', 'ArrowLeft');
  assert.equal(fromOverviewLeft?.id, 'hero');

  const fromHeroRight = resolveKeyboardSectionJump('hero', 'ArrowRight');
  assert.equal(fromHeroRight?.id, 'overview');
});
