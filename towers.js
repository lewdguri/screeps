var towers = {

    /** @param {Game} game **/
    tick: function() {
        towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_TOWER }
                })
        _.forEach(towers, function(tower){                                                     //FINDS DAMAGED STRUCTURES/HOSTILES AND TRIES TO REPAIR/ELIMINATE THEM
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {return (
                (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_STORAGE ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax)          //WILL NOT REPAIR WALLS OR RAMPARTS
            }});
            if(closestHostile) {                                      
            tower.attack(closestHostile);
            console.log(`towers are attacking ${closestHostile}`);
            } else if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            
            }
        })
	}
};

module.exports = towers;