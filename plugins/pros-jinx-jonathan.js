(function()
{
	var jsonWebSocketDatasource = function(settings, updateCallback)
	{
		var self = this;
		var currentSettings = settings;
		var ws;

		var onOpen=function()
		{
			console.info("WebSocket(%s) Opened",currentSettings.url);
		}

		var onClose=function()
		{
			console.info("WebSocket Closed");
		}

		var onMessage=function(event)
		{
			var data=event.data;

			console.info("WebSocket received %s",data);

			var objdata=JSON.parse(data);

			if(typeof objdata == "object")
			{
				updateCallback(objdata);
			}
			else
			{
				updateCallback(data);
			}

		}

		function createWebSocket()
		{
			if(ws) ws.close();

			var url=currentSettings.url;
			ws=new WebSocket(url);

			ws.onopen=onOpen;
			ws.onclose=onClose;
			ws.onmessage=onMessage;
		}

		createWebSocket();

		this.updateNow = function()
		{
			createWebSocket();
		}

		this.onDispose = function()
		{
			ws.close();
		}

		this.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;

			createWebSocket();
		}

    var refreshTimer;

		function createRefreshTimer(interval) {
			if  (refreshTimer) {
				clearInterval(refreshTimer);
			}

			refreshTimer = setInterval(function() {
				getData();
			}, interval);
		}
	};

	freeboard.loadDatasourcePlugin({
		type_name  : "PROS_JINX_Data",
		display_name : "PROS JINX Data",
		description : "Incoming JINX Data from PROS",
		settings   : [
			{
				name        : "url",
				display_name: "port",
				type        : "text",
        default_value: "ws://localhost:9001"
			}
		],
		newInstance: function(settings, newInstanceCallback, updateCallback)
		{
			newInstanceCallback( new jsonWebSocketDatasource(settings, updateCallback));
		}
	});
}());
