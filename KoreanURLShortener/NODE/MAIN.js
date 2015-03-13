KoreanURLShortener.MAIN = METHOD({

	run : function(addRequestHandler) {
		'use strict';

		var
		// uri matcher
		uriMatcher = URI_MATCHER('{id}');

		addRequestHandler(function(requestInfo, response) {

			var
			// uri
			uri = requestInfo.uri,

			// uri match result
			uriMatchResult = uriMatcher.check(uri);
			
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
			
			} else if (uri !== '') {
				
				response({
					statusCode : 302,
					headers : {
						'Location' : 'http://' + encodeURIComponent('짧.한국')
					}
				});

				return false;
			}
		});
	}
});
