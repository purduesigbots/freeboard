(function () {
  freeboard.addStyle('.current-light', "border-radius:50%;width:22px;height:22px;border:2px solid #3d3d3d;margin-top:5px;float:left;background-color:#222;margin-right:10px;");
  freeboard.addStyle('.current-light.on', "background-color:#FFC773;box-shadow: 0px 0px 15px #FF9900;border-color:#FDF1DF;");
  freeboard.addStyle('.current-text', "margin-top:10px;");
  freeboard.addStyle('.position-text', "margin-top:10px;");
  freeboard.addStyle('.velocity-text', "margin-top:10px;");
  var motorPlugin = function (settings) {
      var self = this;
      var widgetTitleElement = $('<h2 class="section-title"></h2>');
      var widgetTitleText = "Motor Status Widget";

      var currentTextElement = $('<div class="current-text"></div>');
      var currentIndicatorElement = $('<div class="current-light"></div>');
      var currentSettings = settings;
      var currLimOnText = "Current Limited";
      var currLimOffText = "No Current Limiting";
      var isOn = false;

      var positionTextElement = $('<div class="position-text"></div>');
      var velocityTextElement = $('<div class="velocity-text"></div>');

      function updateState() {
          currentIndicatorElement.toggleClass("on", isOn);

          if (isOn) {
              currentTextElement.text(currLimOnText);
          }
          else {
              currentTextElement.text(currLimOffText);
          }
      }

      this.render = function (element) {
          $(element).append(widgetTitleElement).append(currentIndicatorElement).append(currentTextElement).append(positionTextElement).append(velocityTextElement);
      }

      this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;
          widgetTitleElement.html(widgetTitleText);
          updateState();
      }

      this.onCalculatedValueChanged = function (settingName, newValue) {
          isOn = Boolean(newValue);
          // $(positionTextElement).html(newValue.tilt_y);
          // $(velocityTextElement).html(newValue.tilt_z);

          updateState();
      }

      this.onDispose = function () {
      }

      this.getHeight = function () {
          return 1;
      }

      this.onSettingsChanged(settings);
  };

  freeboard.loadWidgetPlugin({
      type_name: "motor_plugin",
      display_name: "Motor Plugin",
      settings: [
        {
            name: "title",
            display_name: "Title",
            type: "text"
        },
        {
            name: "value",
            display_name: "Value",
            type: "calculated"
        }
      ],
      newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new motorPlugin(settings));
      }
  });
}());
