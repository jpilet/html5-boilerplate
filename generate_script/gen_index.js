// Print all of the news items on hackernews
fs = require('fs');
global.jsdom = require('jsdom');
var $ = require('jquery');

var htmlSource = fs.readFileSync("index.html", "utf8");

$(htmlSource).find("section").each(function() {
    console.log('<a href="#' + $(this).attr("id") + '">' + $(this).find("h1").html() + '</a>');
});
