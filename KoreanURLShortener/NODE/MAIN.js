KoreanURLShortener.MAIN = METHOD({

	run : function(addRequestListener) {
		'use strict';

		var
		//IMPORT: child_process
		child_process = require('child_process'),
		
		// uri matcher
		uriMatcher = URI_MATCHER('{id}'),
		
		// capture uri matcher
		captureURIMatcher = URI_MATCHER('__CAPTURE/{url}');

		addRequestListener(function(requestInfo, response, onDisconnected, replaceRootPath, next) {

			var
			// uri
			uri = requestInfo.uri,

			// uri match result
			uriMatchResult = uriMatcher.check(uri),
			
			// capture uri match result
			catureURIMatchResult,
			
			// url
			url;
			
			if (uriMatchResult.checkIsMatched() === true) {
				
				KoreanURLShortener.LinkModel.update({
					id : decodeURIComponent(uriMatchResult.getURIParams().id),
					$inc : {
						count : 1
					}
				}, {
					
					notExists : function() {
						
						response({
							statusCode : 302,
							headers : {
								'Location' : 'http://' + encodeURIComponent('짧.한국')
							}
						});
					},
					
					success : function(savedData) {

						response({
							statusCode : 302,
							headers : {
								'Location' : savedData.url
							}
						});
					}
				});
				
				return false;
			
			} else {
				
				catureURIMatchResult = captureURIMatcher.check(uri);
				
				if (catureURIMatchResult.checkIsMatched() === true) {
					
					url = catureURIMatchResult.getURIParams().url;
					url = url.substring(0, url.length - 4);
					
					CHECK_IS_EXISTS_FILE(NODE_CONFIG.rootPath + '/__CAPTURE/' + url + '.png', function(isExists) {
						
						var
						// phantom
						phantom;
						
						if (isExists === true) {
							
							replaceRootPath(NODE_CONFIG.rootPath);
							next();
							
						} else {
							
							phantom = child_process.spawn('phantomjs', [NODE_CONFIG.rootPath + '/screencapture.js', url]);
						    
						    phantom.on('error', function() {
								// ignore.
						    });
						    
						    phantom.on('exit', function() {
								replaceRootPath(NODE_CONFIG.rootPath);
								next();
						    });
						}
					});
					
					return false;
					
				} else if (uri !== '') {
					
					response({
						statusCode : 302,
						headers : {
							'Location' : 'http://' + encodeURIComponent('짧.한국')
						}
					});
	
					return false;
				}
			}
		});
	}
});
