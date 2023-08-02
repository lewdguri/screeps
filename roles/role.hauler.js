var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const comparer = (a, b) => b.amount - a.amount;
        const roomTotalEnergy = Game.spawns['Spawn1'].room.energyAvailable;
        if(creep.memory.hauling && creep.store.getUsedCapacity() == 0){
            creep.memory.hauling = false;
            creep.say('🔄 collect');
        } 
        if(!creep.memory.hauling && creep.store.getFreeCapacity() == 0) {
            creep.memory.hauling = true;
            creep.say('⏬ hauling');
        }
        if(!creep.memory.hauling && !creep.memory.target && creep.store.getUsedCapacity() > 0){
            creep.memory.hauling = true;
            creep.say('fixing');
        }
        if(!creep.memory.hauling && !creep.memory.target && creep.store.getFreeCapacity() == 0){
            creep.memory.hauling = false;
            creep.say('fixing');
        }
        /*var transferTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {            //TEMP CODE
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }});
            let storageTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && structure.store.getUsedCapacity() > 0;
                }});
    if(creep.store.getUsedCapacity() == 0){
        if(creep.withdraw(storageTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storageTarget, {visualizePathStyle: {stroke: '#ffffff'}});
    }} else {
        if(creep.transfer(transferTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(transferTarget, {visualizePathStyle: {stroke: '#ffffff'}});
    }}*/
        if(!creep.memory.target) {
            if(!creep.memory.hauling){                                                   // FIND SOURCES TO TAKE FROM
                console.log('looking for new cpus');
                var tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES, {filter: (tombstone) => {return tombstone.store.getUsedCapacity() > 0}});
                var ruin = creep.pos.findClosestByRange(FIND_RUINS, {filter: (ruin) => {return ruin.store.getUsedCapacity() > 0}})
                let looseResources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                var containerTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 300;
                    }});
                let storageTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) && structure.store.getUsedCapacity() > 0;
                    }});
                if(containerTarget) {
                    creep.memory.target = containerTarget.id;
                } else if(ruin && ruin.store.getUsedCapacity() > 0) {
                    creep.memory.target = ruin.id;
                } else if(tombstone && tombstone.store.getUsedCapacity() > 0) {
                    creep.memory.target = tombstone.id;
                } else if(looseResources){
                    creep.memory.target = looseResources.id;
                } else if(storageTarget && roomTotalEnergy < 200){
                    creep.memory.target = storageTarget.id;
                } else {
                    console.log('nothing found');
                }
            } else {                                                                          // FIND CARGO TO DEPOSIT TO
                var storageTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity() > 0;
                    }});
                var transferTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }});
                if(transferTarget && (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0)) {
                    creep.memory.target = transferTarget.id;
                } else if(storageTarget) {
                    creep.memory.target = storageTarget.id;
                }
            }          
        } else {
            const target = Game.getObjectById(creep.memory.target);
            if(!creep.memory.hauling) {                                                            // GO TO SOURCES TO TAKE FROM
                if(target == null) {
                    delete creep.memory.target;
                    creep.say('NULL');
                }
                if(target.structureType == STRUCTURE_CONTAINER){
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else {
                        delete creep.memory.target;
                    }
                } else if(target.resourceType) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else {
                        delete creep.memory.target;
                    }
                } else if(target.structureType == STRUCTURE_STORAGE) {
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else {
                        delete creep.memory.target;
                    }
                } else if(target){
                    for(const resourceType in target.store){
                        if (creep.withdraw(target, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        } else {
                            delete creep.memory.target;
                        }
                    }
                }
            } else {                                                                                   // GO TO CARGO TO DEPOSIT
                const targetStructureTypes = [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER];
                if((roomTotalEnergy == Game.spawns['Spawn1'].room.energyCapacityAvailable) && (target.structureType == STRUCTURE_CONTAINER) && (target.store.getFreeCapacity() > 0)){
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else {
                        delete creep.memory.target;
                    }
                } else if(targetStructureTypes.includes(target.structureType)) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else {
                        delete creep.memory.target;
                    }
                } else {
                    for(const resourceType in creep.carry){
                        if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        } else {
                            delete creep.memory.target;
                        }
                    }
                }
            }
        }
}};
module.exports = roleHauler;