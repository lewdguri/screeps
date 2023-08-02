var roleGuard = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            console.log(`Hostiles found! attacking target: ${target}`);
            creep.say('💢 Enemy');
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }    
        } else {
            if(creep.moveTo(Game.flags.Patrol1) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.flags.Patrol1);
            }
            console.log('we chillin');
        }    
    }
};
module.exports = roleGuard;