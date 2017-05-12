#### 2.6.0
* Added game changes according to this [changelog](http://blog.screeps.com/2017/05/changelog-2017-05-11/).

#### 2.5.0
* Added support for Respawn Areas according to this [changelog](http://support.screeps.com/hc/en-us/articles/115001774029).

#### 2.4.0
* Added support for memory segments and other changes according to this [changelog](https://screeps.zendesk.com/hc/en-us/articles/115001536629).

#### 2.3.0
* Added support for RoomVisual API according to this [changelog](https://screeps.zendesk.com/hc/en-us/articles/115001047425).

#### 2.2.2
* Disallowed `Promise` objects since due to their security vulnerability in virtual machine environment.  
* Fixed a bug with invalid runtime data for a controller signed by another player, but owned by the current player.
* Disabled recycling creeps that are not spawned yet.
* Creeps can be renewed by multiple spawns simultaneously now.

#### 2.2.1
* Updated LokiJS dependency to 1.4.2 version that [fixes](https://github.com/techfort/LokiJS/pull/509) corruption of `db.json` file.
* Fixed a bug with invalid `Map.describeExits` result for newly generated rooms.

#### 2.2.0
* Game changes according to [2016-11-27 changelog](http://support.screeps.com/hc/en-us/articles/213649289).

#### 2.1.3
* Removed respawn delay timer.
 
#### 2.1.2
* Added new CLI `system` object. Moved all methods from `tools` to `system` and `map`.
* Added new CLI method `system.runCronjob`.
* Fixed an incorrect value of `Game.cpu.limit` property.

#### 2.1.1
* Added the title field in the Steam Workshop mods editor.

#### 2.1.0
* Added [Steam Workshop](http://steamcommunity.com/app/464350/workshop/) support for mods and bot AI scripts. 
    Use your Steam client server launcher to submit npm packages to the Workshop.
    
#### 2.0.0
* **Breaking change:** replaced all callback methods in mods `config` object with events. See example mods to learn more.
* Introduced autonomous NPC bot players system, see [README](https://github.com/screeps/screeps#npc-bots).
* Fixed a bug with creeps unable to move in newly generated rooms.   
* New users are created with 100 CPU limit. 

#### 1.0.7
* `config.cli.createSandbox` is deprecated now, use `config.cli.onCliSandbox` instead.
* Fixed permissions for scripts in `node_modules/.hooks` after running `screeps init`.

#### 1.0.6
* Technical release.
 
#### 1.0.5
* Replaced `moddir` launch option with `modfile`. The `mods.json` file is moved to the same folder as `.screepsrc`. The `mods` folder is no longer used now.
* Added new modding option `config.backend.welcomeText`.
* Added `DRIVER_MODULE` env var to `engine` processes to explicitly tell which module should be loaded.

#### 1.0.4
* Fixed an issue that caused some processes to start before the storage process is ready to accept connections.
