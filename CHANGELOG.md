#### 3.1.0
 * Added game changes support according to this [changelog](https://blog.screeps.com/2018/09/changelog-2018-09-22/).

#### 2.13.1
* Hotfixes. 

#### 2.13.0
* Added game changes support according to this [changelog](http://blog.screeps.com/2018/03/changelog-2018-03-05/).
 
#### 2.12.1
* Hotfixes.

#### 2.12.0
* Add support for binary modules according to this [changelog](http://blog.screeps.com/2017/12/changelog-2017-12-14/).

#### 2.11.0
* Add support for new WebGL renderer.

#### 2.10.1 - 2.10.4
* Hotfixes.

#### 2.10.0
* Added game changes support according to this [changelog](http://blog.screeps.com/2017/09/changelog-2017-09-28/).

#### 2.9.0
* Added game changes support according to this [changelog](http://blog.screeps.com/2017/09/changelog-2017-09-19/).

#### 2.8.1
* Sandbox security hotfix

#### 2.8.0
* Added game changes support according to this [changelog](http://blog.screeps.com/2017/08/shards/).

#### 2.7.2
* Fixed a bug with inactive bots.

#### 2.7.1
* Added game changes according to this [changelog](http://blog.screeps.com/2017/06/changelog-2017-06-26/).

#### 2.7.0
* Added public memory segments support according to this [changelog](http://blog.screeps.com/2017/05/changelog-2017-05-26/).

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
