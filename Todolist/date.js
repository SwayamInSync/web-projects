
module.exports.getDate = function() // instead of using module.exports one can also use exports= function(){}..
{
var today = new Date();
var currentday = today.getDay();
var options = {
  weekday: "long",
  day: "numeric",
  month: "long",
};

var day = today.toLocaleDateString("en-US", options);
return day;
};

module.exports.getDay = function()
{
var today = new Date();
var currentday = today.getDay();
var options = {
  weekday: "long",
};

var day = today.toLocaleDateString("en-US", options);
return day;
};
