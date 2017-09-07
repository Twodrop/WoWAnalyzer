import React from 'react';

import Module from 'Parser/Core/Module';
import AbilityTracker from 'Parser/Core/Modules/AbilityTracker';
import Combatants from 'Parser/Core/Modules/Combatants';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';

import { formatPercentage } from 'common/format';
import { formatThousands } from 'common/format';
import { formatDuration } from 'common/format';
import StatisticBox, { STATISTIC_ORDER } from 'Main/StatisticBox';

class ImmolationAura extends Module {
  static dependencies = {
    combatants: Combatants,
    abilityTracker: AbilityTracker,
    };
  statistic() {

    const immolationAuraUptime = this.owner.modules.combatants.getBuffUptime(SPELLS.IMMOLATION_AURA.id);

    const immolationAuraUptimePercentage = immolationAuraUptime / this.owner.fightDuration;

    if(this.owner.modules.abilityTracker.abilities[SPELLS.IMMOLATION_AURA.id]) {

      this.immolationAuraDamage = this.owner.modules.abilityTracker.abilities[SPELLS.IMMOLATION_AURA_FIRST_STRIKE.id].damageEffective + this.owner.modules.abilityTracker.abilities[SPELLS.IMMOLATION_AURA_BUFF.id].damageEffective;
    }

    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.IMMOLATION_AURA.id} />}
        value={`${formatPercentage(immolationAuraUptimePercentage)}%`}
        label='Immolation Aura Uptime'
        tooltip={`The Immolation Aura total damage was ${formatThousands(this.immolationAuraDamage)}.<br/>The Immolation Aura total uptime was ${formatDuration(immolationAuraUptime / 1000)}.`}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(6);
}

export default ImmolationAura;
