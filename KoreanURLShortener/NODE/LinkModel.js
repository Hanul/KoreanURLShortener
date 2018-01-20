OVERRIDE(KoreanURLShortener.LinkModel, (origin) => {

	KoreanURLShortener.LinkModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {
			
			var
			//IMPORT: http
			http = require('http'),
			
			//IMPORT: https
			https = require('https');
			
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
							
							self.checkExists({
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
					
					// http나 https가 안붙어 있으면 붙혀줍니다.
					if (url.substring(0, 7) !== 'http://' && url.substring(0, 8) !== 'https://') {
						data.url = url = 'http://' + url;
					}
					
					// 해당 URL이 이미 등록되어 있으면 그것을 반환합니다.
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
						
						// 등록되어 있지 않다면 새로 등록합니다.
						notExists : function() {
							
							// 접속되는 url 인지 확인합니다.
							(url.substring(0, 7) === 'http://' ? http : https).get(url, function(res) {
								
								if (
								// 짧.한국은 안됩니다.
								url.substring(0, 11) !== 'http://짧.한국' 
								// 제대로 된 응답 코드를 반환했나 확인합니다.
								&& (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302)) {
									
									// URL을 등록합니다.
									f();
								
								} else {
									ret({
										validErrors : {
											url : {
												type : 'wrongURL'
											}
										}
									});
								}
								
							}).on('error', function(e) {
								
								ret({
									validErrors : {
										url : {
											type : 'wrongURL'
										}
									}
								});
							});
						}
					});

					return false;
				}
			});
		}
	});
});
