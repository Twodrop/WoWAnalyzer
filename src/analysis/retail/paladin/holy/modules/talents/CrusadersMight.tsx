import { defineMessage, Trans } from '@lingui/macro';
import SPELLS from 'common/SPELLS';
import TALENTS from 'common/TALENTS/paladin';
import { SpellIcon } from 'interface';
import { SpellLink } from 'interface';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { CastEvent } from 'parser/core/Events';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import GlobalCooldown from 'parser/shared/modules/GlobalCooldown';
import SpellUsable from 'parser/shared/modules/SpellUsable';
import StatTracker from 'parser/shared/modules/StatTracker';
import StatisticBox, { STATISTIC_ORDER } from 'parser/ui/StatisticBox';
import { addInefficientCastReason } from 'parser/core/EventMetaLib';

const COOLDOWN_REDUCTION_MS_PER_POINT = 2000;

class CrusadersMight extends Analyzer {
  static dependencies = {
    spellUsable: SpellUsable,
    statTracker: StatTracker,
    globalCooldown: GlobalCooldown,
  };

  protected spellUsable!: SpellUsable;
  protected statTracker!: StatTracker;
  protected globalCooldown!: GlobalCooldown;

  talentedCooldownReductionMs = 0;
  effectiveHolyShockReductionMs = 0;
  wastedHolyShockReductionMs = 0;
  wastedHolyShockReductionCount = 0;
  holyShocksCastsLost = 0;

  effectiveJudgementReductionMs = 0;
  wastedJudgementReductionMs = 0;
  wastedJudgementReductionCount = 0;
  judgementCastsLost = 0;

  constructor(options: Options) {
    super(options);
    this.talentedCooldownReductionMs =
      this.selectedCombatant.getTalentRank(TALENTS.CRUSADERS_MIGHT_TALENT) *
      COOLDOWN_REDUCTION_MS_PER_POINT;
    this.active = this.talentedCooldownReductionMs > 0;
    if (!this.active) {
      return;
    }
    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(SPELLS.CRUSADER_STRIKE),
      this.onCast,
    );
  }

  onCast(event: CastEvent) {
    const effectiveCdrHolyShock = this.spellUsable.reduceCooldown(
      TALENTS.HOLY_SHOCK_TALENT.id,
      this.talentedCooldownReductionMs,
    );

    const effectiveCdrJudgement = this.spellUsable.reduceCooldown(
      SPELLS.JUDGMENT_CAST_HOLY.id,
      this.talentedCooldownReductionMs,
    );

    const wastedCdrHolyShock = this.talentedCooldownReductionMs - effectiveCdrHolyShock;
    const wastedCdrJudgement = this.talentedCooldownReductionMs - effectiveCdrJudgement;

    this.effectiveHolyShockReductionMs += effectiveCdrHolyShock;
    this.wastedHolyShockReductionMs += wastedCdrHolyShock;

    this.effectiveJudgementReductionMs += effectiveCdrJudgement;
    this.wastedJudgementReductionMs += wastedCdrJudgement;

    if (effectiveCdrHolyShock === 0) {
      this.wastedHolyShockReductionCount += 1;
      const timeWasted =
        this.talentedCooldownReductionMs +
        this.globalCooldown.getGlobalCooldownDuration(SPELLS.CRUSADER_STRIKE.id);
      const holyShockCooldown = this.spellUsable.fullCooldownDuration(TALENTS.HOLY_SHOCK_TALENT.id);
      this.holyShocksCastsLost += timeWasted / holyShockCooldown;

      /*mark the event on the timeline
      addInefficientCastReason(
        event,
        defineMessage({
          id: 'paladin.holy.modules.talents.crusadersMight.inefficientCast',
          message:
            'Holy Shock was off cooldown when you cast Crusader Strike. You should cast Holy Shock before Crusader Strike for maximum healing or damage.',
        }),
      );
      */
    }

    if (effectiveCdrJudgement === 0) {
      this.wastedJudgementReductionCount += 1;
      const timeWasted =
        this.talentedCooldownReductionMs +
        this.globalCooldown.getGlobalCooldownDuration(SPELLS.CRUSADER_STRIKE.id);
      const judgementCooldown = this.spellUsable.fullCooldownDuration(SPELLS.JUDGMENT_CAST_HOLY.id);
      this.judgementCastsLost += timeWasted / judgementCooldown;

      // mark the event on the timeline
      addInefficientCastReason(
        event,
        defineMessage({
          id: 'paladin.holy.modules.talents.crusadersMight.inefficientCast',
          message:
            'Holy Shock was off cooldown when you cast Crusader Strike. You should cast Holy Shock before Crusader Strike for maximum healing or damage.',
        }),
      );
    }
  }

  get holyShocksMissedThresholds() {
    return {
      actual: this.wastedHolyShockReductionCount,
      isGreaterThan: {
        minor: 0,
        average: 2,
        major: 5,
      },
      style: ThresholdStyle.NUMBER,
    };
  }

  get holyJudgementMissedThresholds() {
    return {
      actual: this.wastedJudgementReductionCount,
      isGreaterThan: {
        minor: 0,
        average: 2,
        major: 5,
      },
      style: ThresholdStyle.NUMBER,
    };
  }
  suggestions(when: When) {
    when(this.holyShocksMissedThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          <Trans id="paladin.holy.modules.talents.crusadersMight.suggestion">
            You cast <SpellLink spell={SPELLS.CRUSADER_STRIKE} />{' '}
            {this.wastedHolyShockReductionCount} times when
            <SpellLink spell={TALENTS.HOLY_SHOCK_TALENT} /> was off cooldown.{' '}
            <SpellLink spell={SPELLS.CRUSADER_STRIKE} /> should be used to reduce the cooldown of
            <SpellLink spell={TALENTS.HOLY_SHOCK_TALENT} /> and should never be cast when{' '}
            <SpellLink spell={TALENTS.HOLY_SHOCK_TALENT} /> is avalible.
            <a
              href="https://questionablyepic.com/glimmer-of-light/"
              target="_blank"
              rel="noopener noreferrer"
            >
              build.
            </a>
          </Trans>
        </>,
      )
        .icon(TALENTS.HOLY_SHOCK_TALENT.icon)
        .actual(
          defineMessage({
            id: 'paladin.holy.modules.talents.crusadersMight.actual',

            message: `${Math.floor(this.holyShocksCastsLost)} Holy Shock cast${
              Math.floor(this.holyShocksCastsLost) === 1 ? '' : 's'
            } missed.`,
          }),
        )
        .recommended(
          defineMessage({
            id: 'paladin.holy.modules.talents.crusadersMight.recommended',
            message: `Casting Holy Shock on cooldown is recommended.`,
          }),
        ),
    );
  }

  statistic() {
    const formatSeconds = (seconds: string) => (
      <Trans id="paladin.holy.modules.talents.crusadersMight.formatSeconds">{seconds}s</Trans>
    );

    return (
      <StatisticBox
        icon={<SpellIcon spell={SPELLS.JUDGMENT_CAST_HOLY} />}
        label="Crusader's Might CDR"
        position={STATISTIC_ORDER.OPTIONAL(6)}
        value={
          <>
            Holy Shock: {formatSeconds((this.wastedHolyShockReductionMs / 1000).toFixed(1))} <br />
            Judgement: {formatSeconds((this.wastedJudgementReductionMs / 1000).toFixed(1))}{' '}
          </>
        }
        tooltip={
          <>
            The overpower buff caps at two stacks. When at cap, casting Overpower will waste a buff
            stack. This is not important during execute phase as Mortal Strike is replaced with
            Execute which does not consume Overpower buff stacks.
          </>
        }
      />
    );

    /*
    const formatSeconds = (seconds: string) => (
      <Trans id="paladin.holy.modules.talents.crusadersMight.formatSeconds">{seconds}s</Trans>
    );





    
    return (
      <StatisticBox
        position={STATISTIC_ORDER.OPTIONAL(75)}
        icon={<SpellIcon spell={TALENTS.CRUSADERS_MIGHT_TALENT} />}
        value={
          <>
            {formatSeconds((this.effectiveHolyShockReductionMs / 1000).toFixed(1))}{' '}
            <SpellIcon
              spell={TALENTS.HOLY_SHOCK_TALENT}
              style={{
                height: '1.3em',
                marginTop: '-.1em',
              }}
            />{' '}
          </>
        }
        label={
          "Cooldown reduction!"
        }
        tooltip={
          <>
            <Trans id="paladin.holy.modules.talents.crusadersMight.tooltip">
              You cast Crusader Strike <b>{this.wastedHolyShockReductionCount}</b> timeeeee
              {this.wastedHolyShockReductionCount === 1 ? '' : 's'} when Holy Shock was off
              cooldown.
              <br />
              This wasted <b>{(this.wastedHolyShockReductionMs / 1000).toFixed(1)}</b> seconds of
              Holy Shock cooldown reduction,
              <br />
              preventing you from <b>{Math.floor(this.holyShocksCastsLost)}</b> additional Holy
              Shock cast{this.holyShocksCastsLost === 1 ? '' : 's'}.<br />
            </Trans>
          </>
        }
      />
    );*/
  }
}

export default CrusadersMight;
