var creepSpawner = {

    /** @param {Creep} creep **/
    run: function() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
        console.log(`Harvesters: ${harvesters.length}\nUpgraders: ${upgraders.length}\nBuilders: ${builders.length}\nRepairers: ${repairers.length}\nGuards: ${guards.length}\nHaulers: ${haulers.length}`);
        
        
        if(harvesters.length < 2){
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});
        }
        if(haulers.length < 3){
            var newName = 'Hauler' + Game.time;   
            console.log('Spawning new hauler: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'hauler'}});
        }
        if(upgraders.length < 3) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,WORK,WORK,MOVE], newName,
                {memory: {role: 'upgrader'}});
        }
        if(builders.length < 2) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,WORK,WORK,MOVE], newName,
                {memory: {role: 'builder'}});
        }
        if(repairers.length < 1) {
            var newName = 'Repairer' + Game.time;
            console.log('Spawning new repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'repairer'}});
        }
        if(guards.length < 1) {
            var newName = 'Guard' + Game.time;
            console.log('Spawning new guard: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE], newName,
                {memory: {role: 'guard'}});
        }
    }
};
module.exports = creepSpawner;