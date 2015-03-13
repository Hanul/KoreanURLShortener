OVERRIDE(KoreanURLShortener.LinkModel, function(origin) {
	'use strict';

	KoreanURLShortener.LinkModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {

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
					
					// 해당 URL이 이미 있으면 그것을 반환
					self.get({
						filter : {
							url : url
						}
					}, {
						notExists : f,
						success : function(savedData) {
							ret({
								savedData : savedData
							});
						}
					});

					return false;
				}
			});
		}
	});
});
