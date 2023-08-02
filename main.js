var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleGuard = require('role.guard');
var roleHauler = require('role.hauler');
var creepSpawner = require('creepSpawner');
var towers = require('towers');
var roleMiner = require('role.miner');

module.exports.loop = function () {

    for(var name in Memory.creeps) {                                      //DELETES MEMORY OF A DEAD CREEP
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    creepSpawner.run()
    towers.tick()
    
    //THIS SORTS AN ARRAY OF STRUCTURES FROM HIGH. AMOUNT OF ENERGY TO LOW. AMOUNT OF ENERGY
    /*
    const comparer = (a, b) => b.amount - a.amount;
    const resources = Game.spawns['Spawn1'].room.find(FIND_DROPPED_RESOURCES);
    resources.sort(comparer);
    console.log(resources[1].amount);
    */
    let roomTotalEnergy = Game.spawns['Spawn1'].room.energyAvailable;              //EXECUTES ROLE CODES FOR EACH CREEP
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'guard') {
            roleGuard.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if ((roomTotalEnergy > (Game.spawns['Spawn1'].room.energyCapacityAvailable / 1.5))){
            if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            }
            if(creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
        }
    }
    if((roomTotalEnergy !== (Game.spawns['Spawn1'].room.energyCapacityAvailable))){
        console.log('Spawn needs to collect more energy');
    } else {
        console.log('Spawn has full energy reserves');
    }
}