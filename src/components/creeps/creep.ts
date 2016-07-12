/// <reference path="./creep.d.ts" />
export namespace Creep { }

import { Bootstrapper } from './../../bootstrapper';
import { Config } from './../../config/config';

class Creep_EXT extends Creep {
  get _minLifeBeforeNeedsRenew(): number {
    return Config.DEFAULT_MIN_LIFE_BEFORE_NEEDS_REFILL;
  }

  get renewStation(): Spawn {
    return <Spawn>Game.getObjectById(this.memory.renew_station_id);
  }

  needsRenew(): boolean {
    return (this.ticksToLive < this._minLifeBeforeNeedsRenew);
  }

  tryRenew(): number {
    return this.renewStation.renewCreep(this);
  }

  moveToRenew(): void {
    if (this.tryRenew() === ERR_NOT_IN_RANGE) {
      this.moveTo(this.renewStation);
    }
  }

  action(): boolean {
    return true;
  }
}

Bootstrapper.safeExtendPrototype(Creep, Creep_EXT);