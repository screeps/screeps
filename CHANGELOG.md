#### 1.0.5
* Replaced `moddir` launch option with `modfile`. The `mods.json` file is moved to the same folder as `.screepsrc`. The `mods` folder is no longer used now.
* Added new modding option `config.backend.welcomeText`.
* Added `DRIVER_MODULE` env var to `engine` processes to explicitly tell which module should be loaded.

#### 1.0.4
* Fixed an issue that caused some processes to start before the storage process is ready to accept connections.