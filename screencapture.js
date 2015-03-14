var
// page
page = require('webpage').create(),

// system
system = require('system');

page.viewportSize = {
	width : 1024,
	height : 768
};

page.open(decodeURIComponent(system.args[1]), function(status) {
	
	if (status === 'success') {
		page.render('__RF/KoreanURLShortener/' + system.args[1] + '.png');
	}
	
	phantom.exit();
});