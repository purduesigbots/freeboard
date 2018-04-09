(function () {
$.getJSON("./dashboard.json", function() {
})
.done(function(data) {
  var dash = JSON.parse(dashText);
  freeboard.loadDashboard(dash);
});
}());
