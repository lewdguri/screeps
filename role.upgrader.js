var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const isFull = creep.store.getFreeCapacity() == 0;
        const isEmpty = creep.store.getUsedCapacity() == 0;
        if(creep.memory.upgrading && isEmpty) {
            creep.memory.upgrading = false;
            creep.say('🔄 collect');
        }
        if(!creep.memory.upgrading && isFull) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }
        if(Game.getObjectById(creep.memory.target) === null){
            delete creep.memory.target;
        }
        if(!creep.memory.target){
            console.log('wasting cpu');
            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.memory.target = creep.room.controller.id;
                }
            } else {
                let looseResources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                let targetContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 300;
                }});
                let targetStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }});
                if(targetContainer) {
                    creep.memory.target = targetContainer.id;
                } else if (looseResources) {
                    creep.memory.target = looseResources.id;
                } else if (targetStorage) {
                    creep.memory.target = targetStorage.id;
                }
            }
        } else {
            const target = Game.getObjectById(creep.memory.target);
            if(creep.memory.upgrading) {
                if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if(!creep.memory.upgrading && target.structureType == STRUCTURE_CONTROLLER) {  
                delete creep.memory.target;
            } else {
                if(target.resourceType == RESOURCE_ENERGY) {
                    if(creep.pickup(target, RESOURCE_ENERGY, creep.store.getFreeCapacity()) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    } else {
                        delete creep.memory.target;
                    }
                } else if (target.structureType == STRUCTURE_CONTAINER) {
                    if(creep.withdraw(target, RESOURCE_ENERGY, creep.store.getFreeCapacity()) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    } else {
                        delete creep.memory.target;
                    }
                } else if (target.structureType == STRUCTURE_STORAGE) {
                    if(creep.withdraw(target, RESOURCE_ENERGY, creep.store.getFreeCapacity()) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    } else {
                        delete creep.memory.target;
                    }
                }
            }
        }
    }
        
        /*if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            let looseResources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            let targetContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }});
            let targetStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }});
            if(looseResources) {
                if(creep.pickup(looseResources, RESOURCE_ENERGY, creep.store.getFreeCapacity()) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(looseResources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if (targetContainer) {
                if(creep.withdraw(targetContainer, RESOURCE_ENERGY, creep.store.getFreeCapacity()) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if (targetStorage) {
                if(creep.withdraw(targetStorage, RESOURCE_ENERGY, creep.store.getFreeCapacity()) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }*/
};
module.exports = roleUpgrader;