var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 collect');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }
        if(!creep.memory.repairing && !creep.memory.target && creep.store.getUsedCapacity() > 0){
            creep.memory.repairing = true;
            creep.say('fixing');
        }
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {return (
            structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity() > 0}
        });
        let looseResources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        const targetHits = 100000;
        if(creep.memory.repairing == true) {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {return (
                    structure.structureType == STRUCTURE_WALL ||
                    structure.structureType == STRUCTURE_RAMPART) && structure.hits < targetHits
            }});
            if(closestDamagedStructure) {
                console.log(`repairing: ${closestDamagedStructure}`);
                if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        } else {
            if(looseResources){
                if(creep.pickup(looseResources, RESOURCE_ENERGY, creep.store.getFreeCapacity()) == ERR_NOT_IN_RANGE) {
                creep.moveTo(looseResources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                if(creep.withdraw(container, RESOURCE_ENERGY, creep.store.getFreeCapacity()) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};  
module.exports = roleRepairer;