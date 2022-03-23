# plugins-base
Base Package for Plugins

This package allows to extend ioBroker with a plugin system. Plugins can add specialized functionality and can run inside an adapter or also inside the js-controller.
Plugins are no adapters and so have - by definition - a limited featureset and a mainly static configuration.

## Implementation 

* Plugins are always published as "@iobroker/plugin-MySuperPlugin" as name with "MySuperPlugin" being the plugin name.
* Plugins use this package as core dependency and then extend the "PluginBase" object.
* The main script of the plugin package experts the plugin class directly.
* The plugin needs to implement the following methods:
  * constructor to pass the settings to the parent object, required
  * "init" method is called to initialize the plugin, required
  * "destroy" method is called before adapter/js-controller is stopped and should cleanup all needed resources, optional. If plugin is not able to be deactivated on the fly it needs to return false.
* The plugin always have an "enabled" flag where the user defines if the plugin should be executed or not. This flag is respected.
* Plugins can also interact with objects and states but very limited. The following Methods are available:
  * getState
  * setState
  * getObject
  * setObject
  * extendObject

### Example code:

```
const {PluginBase} = require('@iobroker/plugin-base');

class MySuperPlugin extends PluginBase {

    constructor(settings) {
        super(settings);
    }

    /**
     * Register and initialize Plugin
     *
     * @param pluginConfig {object} plugin configuration from config files
     * @param callback {function} callback when done, signature "(err, initSuccessful)". On err or initSuccessful===false the plugin instance will be discarded
     */
    init(pluginConfig, callback) {
        if (!pluginConfig.enabled) {
            this.log.info('Sentry Plugin disabled by user');
            return void callback(null, false);
        }

        // initialize your code here

        callback(null, true);
    }

    /**
     * Method which is called on a clean end of the process to pot. clean up used resources
     */
    destroy() {
        // Implement in your Plugin instance if needed
    }
}

module.exports = MySuperPlugin;
``` 

The object offers the following "public" variables and methods to be used in your implementation:
* **this.log** as ioBroker style Log class with methods for silly, debug, info, warn and error and will log automatically with a prepended String identifying the adapter and plugin
* **this.pluginScope** contains the scope the plugin runs in. this.SCOPES.ADAPTER and this.SCOPES.CONTROLLER can be used if a plugin provides different functionality.
* **this.pluginNamespace** is the State/Object namespace of the plugin instance, e.g. "system.adapter.name.instance.plugins.MySuperPlugin" or "system.host.name.plugins.MySuperPlugin". Please try to stay inside this namescape if nwe objects are created 
* **this.iobrokerConfig** contains the full ioBroker config object (basically iobroker-data/iobroker.json) 
* **this.parentPackage** contains the package.json of the adapter/controller the plugin runs in
* **this.parentIoPackage** contains the io-package.json when running in js-controller or the instance configuration when running in an adapter
 
## Configuration

Plugins are configured inside io-package.json in common area or in iobroker-data/iobroker.json on main level in a plugins key:

```
"plugins": {
    "MySuperPlugin": {
        "enabled": true,
        "key": "value"
        ...
    }
}
```
The configuration here is enhanced by an "enabled" key and passed to the "init" method. The configuration can also contain "enabled" as boolean field directly which then acts as default value. If "enabled" is not included the plugin will be activated by default!

## Examples
One example is the Sentry plugin available at https://github.com/ioBroker/plugin-sentry

## Changelog

### 1.2.1 (2021-01-24)
* (Apollon77) Add error handling in some places when setting active Status

### 1.2.0 (2020-05-09)
* (Apollon77) Add async methods for Objects and States
* (Apollon77) rework enable detection for plugins

### 1.1.1 (2020-05-01)
* (Apollon77) fix for host lookup to work for all plugins 

### 1.1.0 (2020-05-01)
* (Apollon77) Check host sentry plugin status when no adapter flag exists to allow users to turn it of more easy

### 1.0.0 (2020-04-26)
* (Apollon77) Declare as 1.0.0 for release of js-controller 3.0

### 0.1.1 (2020-03-29)
* (AlCalzone) add type support and optimizations

### 0.1.0 (2020-03-28)
* (Apollon77) initial release to npm