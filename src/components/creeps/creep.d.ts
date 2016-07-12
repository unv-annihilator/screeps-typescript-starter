// Used to resolve problems with typings, can remove if no issues
/// <reference path="./../../../typings/globals/screeps/index.d.ts" />
interface Creep {
  _minLifeBeforeNeedsRenew: number;
  renewStation: Spawn;
  action(): boolean;
  needsRenew(): boolean;
  tryRenew(): number;
  moveToRenew(): void;
}