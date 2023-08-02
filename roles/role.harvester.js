var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        /*
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[creep.memory.targetSource]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.targetSource], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        if(creep.store.getFreeCapacity == 0){
            creep.drop(RESOURCE_ENERGY);
        }
        */
        var harvestersTarget = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(!creep.memory.target) {
            var sources = creep.room.find(FIND_SOURCES);
            
            findTargetIndex:
            for(let i = 0; i < harvestersTarget.length;i++) {
                findTargetIndexInner:
                for(let j = 0; j < sources.length;j++){
                    if(sources[j].id == harvestersTarget[i].memory.target) {
                        console.log(sources[j])
                        continue findTargetIndexInner;
                    } else {
                        console.log(sources[j])
                        creep.memory.target = sources[j].id;
                        break findTargetIndex;
                    }
                }
            }

        } else {
            const target = Game.getObjectById(creep.memory.target);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
    }
}
module.exports = roleHarvester;