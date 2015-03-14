OVERRIDE(KoreanURLShortener.LinkModel, function(origin) {
	'use strict';

	KoreanURLShortener.LinkModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			
			var
			//IMPORT: http
			http = require('http'),
			
			//IMPORT: https
			https = require('https');

			inner.on('create', {

				before : function(data, next, ret) {
					
					var
					// url
					url = data.url,
					
					// i
					i = 0,
					
					// f.
					f = function() {

						var
						// id
						id;
						
						// 최대 백번만 실행
						if (i < 100) {
							i += 1;
							
							id = String.fromCharCode(RANDOM({
								min : 44032,
								max : 55203
							})) + String.fromCharCode(RANDOM({
								min : 44032,
								max : 55203
							}));
							
							self.checkIsExists({
								filter : {
									id : id
								}
							}, function(isExists) {
								
								// 이미 있으면 다시 생성
								if (isExists === true) {
									f();
								} else {
									data.id = id;
									next();
								}
							});
						}
					};
					
					if (url.substring(0, 7) !== 'http://' && url.substring(0, 8) !== 'https://') {
						data.url = url = 'http://' + url;
					}
					
					(url.substring(0, 7) === 'http://' ? http : https).get(url, function(res) {
						
						if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
							
							var
							// phantom
							phantom = require('child_process').spawn('phantomjs', [NODE_CONFIG.rootPath + '/screencapture.js', encodeURIComponent(url)]);
						    
						    phantom.on('error', function() {
								// ignore.
						    });
						    
						    phantom.on('exit', function() {
								
						    });
							
							// 해당 URL이 이미 있으면 그것을 반환
							self.get({
								filter : {
									url : url
								}
							}, {
								success : function(savedData) {
									ret({
										savedData : savedData
									});
								},
								notExists : function() {
									f();
								}
							});
						
						} else {
							ret({
								validErrors : {
									url : {
										type : 'wrongURL'
									}
								}
							});
						}
						
					}).on('error', function() {
						ret({
							validErrors : {
								url : {
									type : 'wrongURL'
								}
							}
						});
					});

					return false;
				}
			});
		}
	});
});
