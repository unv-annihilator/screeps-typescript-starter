/// <reference path="./harvester.d.ts" />
import { Config } from './../../config/config';
import { Creep } from './creep';

export class Harvester implements Harvester {
  creep: Creep;
  targetSource: Source;
  targetEnergyDropOff: Spawn | Structure;

  constructor(creep: Creep) {
    this.creep = creep;
    this.targetSource = <Source>Game.getObjectById(this.creep.memory.target_source_id);
    this.targetEnergyDropOff = <Spawn | Structure>Game.getObjectById(this.creep.memory.target_energy_dropoff_id);
  }

  isBagFull(): boolean {
    return (_.sum(this.creep.carry) === this.creep.carryCapacity);
  }

  tryHarvest(): number {
    return this.creep.harvest(this.targetSource);
  }

  moveToHarvest(): void {
    if (this.tryHarvest() === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.targetSource);
    }
  }

  tryEnergyDropOff(): number {
    return this.creep.transfer(this.targetEnergyDropOff, RESOURCE_ENERGY);
  }

  moveToDropEnergy(): void {
    if (this.tryEnergyDropOff() === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.targetEnergyDropOff);
    }
  }

  action(): boolean {
    if (this.creep.needsRenew()) {
      this.creep.moveToRenew();
    } else if (this.isBagFull()) {
      this.moveToDropEnergy;
    } else {
      this.moveToHarvest();
    }
    return true;
  }
}
