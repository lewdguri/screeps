
var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        console.log(creep)
        if(!creep.memory.target) {
            var minerals = creep.room.find(FIND_MINERALS);     
            creep.memory.target = minerals[0];
        } else {
            const target = Game.getObjectById(creep.memory.target);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
    }
} 
module.exports = roleMiner;
