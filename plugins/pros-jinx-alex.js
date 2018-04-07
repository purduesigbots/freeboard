() => { // ES6 way to do an IIFE (immediately interpreted function expression- this just runs all the code as soon as
		// the script is included in a file). note that if this doesn't work, you can try adding extra parentheses
		// starting before the first `(` on the first line and before the `(` on the last line

// why can we use a class? well freeboard expects to load a plugin using the `new` keyword, and since ES6 javascript,
// there is no need to do all that weird functional prototypical shit that's in the docs (and basically all browsers
// support this now: http://kangax.github.io/compat-table/es6/#test-class). IOW, this just works, don't worry about it
// too much.

class JINXDataSourcePlugin {
	constructor(settings, updateCallback) {
		this.currentSettings = settings
		this.update = updateCallback

		// connect to websocket (socket address should be something like `ws://localhost:${this.currentSettings.port}`)
		// set up event listener on websocket:
		// websocket.on('data', newData => {
		// 		// do something with data?
		//		this.update(newData)
		// })
	}
	onSettingsChanged(newSettings) { // called by freeboard when settings change
		this.settings = newSettings
	}
	onDispose() { // called by freeboard when plugin deleted
		// close websocket
	}
}

freeboard.loadDatasourcePlugin({
	type_name: "jinx_ds_plugin",
	display_name: "JINX Datasource Plugin",
	description: "description",
	external_scripts: [], // any scripts that need to be loaded first; probably more useful for the widget
	settings: [
		{
			name: "socket",
			display_name: "Socket",
			type: "text",
			default_value: 9001,
			description: "description"
		},
		{
			// anything else needed to configure this plugin. as far as i know, we just need the websocket port
			// more documentation on this can be found here: http://freeboard.github.io/freeboard/docs/plugin_example.html
		}
	]
})

}()
