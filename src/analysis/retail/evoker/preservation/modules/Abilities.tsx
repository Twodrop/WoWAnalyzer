import TALENTS from 'common/TALENTS/evoker';
import CoreAbilities from 'analysis/retail/evoker/shared/modules/Abilities';
import Ability from 'parser/core/modules/Ability';
import SPELL_CATEGORY from 'parser/core/SPELL_CATEGORY';
import SPELLS from 'common/SPELLS';

class Abilities extends CoreAbilities {
  static ABILITY_CLASS = Ability;
  static dependencies = {
    ...CoreAbilities.dependencies,
  };
  spellbook() {
    const combatant = this.selectedCombatant;
    return [
      {
        spell: TALENTS.REVERSION_PRESERVATION_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 9,
        charges: 1,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS.REVERSION_PRESERVATION_TALENT.id),
      },
      {
        spell: SPELLS.DREAM_BREATH.id,
        enabled: combatant.hasTalent(TALENTS.DREAM_BREATH_PRESERVATION_TALENT.id),
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown: 25,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.RENEWING_BREATH.id,
        category: SPELL_CATEGORY.OTHERS,
        enabled: combatant.hasTalent(TALENTS.RENEWING_BREATH_PRESERVATION_TALENT.id),
      },
      {
        spell: TALENTS.ECHO_PRESERVATION_TALENT.id,
        enabled: combatant.hasTalent(TALENTS.ECHO_PRESERVATION_TALENT.id),
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 0,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: TALENTS.TIME_DILATION_PRESERVATION_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS.TIME_DILATION_PRESERVATION_TALENT.id),
      },
      {
        spell: TALENTS.SPIRITBLOOM_PRESERVATION_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS.SPIRITBLOOM_PRESERVATION_TALENT.id),
      },
      {
        spell: TALENTS.TEMPORAL_ANOMALY_PRESERVATION_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown: 6,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS.TEMPORAL_ANOMALY_PRESERVATION_TALENT.id),
      },
      {
        spell: TALENTS.REWIND_PRESERVATION_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 240,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS.REWIND_PRESERVATION_TALENT.id),
      },
      {
        spell: TALENTS.EMERALD_COMMUNION_PRESERVATION_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 180,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS.EMERALD_COMMUNION_PRESERVATION_TALENT.id),
      },
      {
        spell: TALENTS.DREAM_FLIGHT_PRESERVATION_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(TALENTS.DREAM_FLIGHT_PRESERVATION_TALENT.id),
      },
      ...super.spellbook(),
    ];
  }
}

export default Abilities;