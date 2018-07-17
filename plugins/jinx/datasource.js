(function()
{
	var JINXDatasource = function(settings, updateCallback)
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

			// console.info("WebSocket received %s",data);

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
      if (ws) {
        if(ws.readyState === 1) return;
      }

			var url=currentSettings.url;
			ws=new WebSocket(url);

			ws.onopen=onOpen;
			ws.onclose=onClose;
			ws.onmessage=onMessage;
		}

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
    function createRefreshTimer() {
      if(refreshTimer) {
				clearInterval(refreshTimer);
			}

			refreshTimer = setInterval(createWebSocket, 1000);
    }

    createRefreshTimer();

    createWebSocket();
	};

	freeboard.loadDatasourcePlugin({
		type_name  : "PROS_JINX_Data",
		display_name : "PROS JINX Data",
		description : "Incoming JINX Data from PROS",
		settings   : [
			{
				name        : "url",
				display_name: "port (9001 is used by the CLI)",
				type        : "text",
        default_value: "wss://localhost:9001"
			}
		],
		newInstance: function(settings, newInstanceCallback, updateCallback)
		{
			newInstanceCallback( new  JINXDatasource(settings, updateCallback));
		}
	});
}());
