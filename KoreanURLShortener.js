require(process.env['UPPERCASE_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {

		isDevMode : true,

		defaultBoxName : 'KoreanURLShortener',
		
		title : '짧.한국',
		description : '한글 URL 단축 서비스',

		webServerPort : 8314,
		
		baseBackgroundColor : '#fff',
		baseColor : '#000'
	},

	NODE_CONFIG : {
		dbName : 'KoreanURLShortener-test'
	},
	
	BROWSER_CONFIG : {
		//host : 'xn--ed6b.xn--3e0b707e'
	}
});
