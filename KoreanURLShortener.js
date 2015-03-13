require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {

		isDevMode : true,

		defaultBoxName : 'KoreanURLShortener',
		
		title : '짧.한국',
		description : '한글 단축 URL',

		webServerPort : 8314,
		
		baseBackgroundColor : '#fff',
		baseColor : '#000'
	},

	NODE_CONFIG : {
		dbName : 'KoreanURLShortener-test'
	}
});
