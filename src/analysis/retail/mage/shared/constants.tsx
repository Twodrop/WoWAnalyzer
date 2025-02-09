import SPELLS from 'common/SPELLS';
import TALENTS from 'common/TALENTS/mage';

export const MS_BUFFER_1000 = 1000;

//Frost
export const COMET_STORM_AOE_MIN_TARGETS = 2;
export const SHATTER_DEBUFFS = [
  SPELLS.WINTERS_CHILL,
  SPELLS.FROST_NOVA,
  TALENTS.ICE_NOVA_TALENT,
  SPELLS.GLACIAL_SPIKE_DAMAGE,
  SPELLS.RING_OF_FROST_DAMAGE,
  SPELLS.FREEZE,
];

//Fire
export const FEEL_THE_BURN_MAX_STACKS = 3;
export const IMPROVED_SCORCH_MAX_STACKS = 2;
export const FIRESTARTER_THRESHOLD = 0.9;
export const SEARING_TOUCH_THRESHOLD = 0.3;
export const COMBUSTION_END_BUFFER = 3000;
export const COMBUSTION_DURATION = 12000;
export const SKB_COMBUST_DURATION = 6000;
export const FIRE_DIRECT_DAMAGE_SPELLS = [
  SPELLS.FIREBALL,
  TALENTS.PYROBLAST_TALENT,
  SPELLS.FIRE_BLAST,
  SPELLS.SCORCH,
  TALENTS.PHOENIX_FLAMES_TALENT,
];

//Arcane
export const ARCANE_CHARGE_MAX_STACKS = 4;
export const ARCANE_TEMPO_MAX_STACKS = 5;
export const ARCANE_TEMPO_HASTE_PER_STACK = 0.02;
export const UNERRING_PROFICIENCY_MAX_STACKS = 30;
export const ARCANE_MISSILES_MAX_TICKS = 8;
export const CLEARCASTING_MAX_STACKS = 3;
export const ARCANE_BLAST_BASE_MANA_COST = 1375;
export const ARCANE_EXPLOSION_BASE_MANA_COST = 5000;
export const TOUCH_OF_MAGI_DURATION = 12000;
export const ARCANE_TEMPO_DURATION = 12000;

//Mage Generic
export const SHIFTING_POWER_MS_REDUCTION_PER_TICK = 3000;
export const SHIFTING_POWER_REDUCTION_SPELLS = [
  //General
  SPELLS.FROST_NOVA,
  SPELLS.BLINK,
  TALENTS.SHIMMER_TALENT,
  TALENTS.ICE_FLOES_TALENT,
  TALENTS.ICE_BLOCK_TALENT,
  SPELLS.INVISIBILITY,
  TALENTS.GREATER_INVISIBILITY_TALENT,
  SPELLS.COUNTERSPELL,
  TALENTS.MIRROR_IMAGE_TALENT,
  TALENTS.REMOVE_CURSE_TALENT,
  SPELLS.TIME_WARP,
  TALENTS.ALTER_TIME_TALENT,
  TALENTS.DRAGONS_BREATH_TALENT,
  TALENTS.METEOR_TALENT,
  TALENTS.SPELLSTEAL_TALENT,
  TALENTS.BLAST_WAVE_TALENT,
  SPELLS.ARCANE_EXPLOSION,
  SPELLS.SLOW_FALL,
  SPELLS.CONE_OF_COLD,
  SPELLS.TIME_WARP,
  TALENTS.MASS_POLYMORPH_TALENT,
  TALENTS.ICE_NOVA_TALENT,
  TALENTS.RING_OF_FROST_TALENT,
  TALENTS.DISPLACEMENT_TALENT,
  TALENTS.RAY_OF_FROST_TALENT,
  TALENTS.ICE_BARRIER_TALENT,
  SPELLS.BLIZZARD,
  SPELLS.COLD_SNAP,
  TALENTS.ICY_VEINS_TALENT,
  TALENTS.FROZEN_ORB_TALENT,
  TALENTS.COMET_STORM_TALENT,
  TALENTS.FLURRY_TALENT,
  TALENTS.BLAZING_BARRIER_TALENT,
  TALENTS.PHOENIX_FLAMES_TALENT,
  TALENTS.COMBUSTION_TALENT,
  SPELLS.FIRE_BLAST,
  TALENTS.EVOCATION_TALENT,
  TALENTS.PRESENCE_OF_MIND_TALENT,
  TALENTS.PRISMATIC_BARRIER_TALENT,
  TALENTS.ARCANE_SURGE_TALENT,
  TALENTS.TOUCH_OF_THE_MAGI_TALENT,
  TALENTS.ARCANE_FAMILIAR_TALENT,
  SPELLS.ARCANE_ORB,
  TALENTS.SUPERNOVA_TALENT,
  TALENTS.MASS_BARRIER_TALENT,
  TALENTS.MASS_INVISIBILITY_TALENT,
];
