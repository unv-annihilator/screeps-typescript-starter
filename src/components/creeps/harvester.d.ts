// Used to resolve problems with typings, can remove if no issues
/// <reference path="./../../../typings/globals/screeps/index.d.ts" />
interface Harvester {
  creep: Creep;
  targetSource: Source;
  targetEnergyDropOff: Spawn | Structure;
  isBagFull(): boolean;
  tryHarvest(): number;
  moveToHarvest(): void;
  tryEnergyDropOff(): number;
  moveToDropEnergy(): void;
  action(): boolean;
}