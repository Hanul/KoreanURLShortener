KoreanURLShortener.MAIN = METHOD({
	
	run : function() {
		'use strict';
		
		var
		// preview
		preview,
		
		// capture
		capture,
		
		// recent
		recent,
		
		// rank
		rank;
		
		DIV({
			c : [
			
			// title
			H1({
				style : {
					width : 150,
					margin : 'auto',
					marginTop : 40,
					fontWeight : 'bold',
					position : 'relative'
				},
				c : [IMG({
					style : {
						marginLeft : -20,
						width : 150,
						height : 150
					},
					src : KoreanURLShortener.R('logo.png')
				}), DIV({
					style : {
						position : 'absolute',
						right : 10,
						bottom : 20
					},
					c : '.한국'
				})]
			}),
			
			// description
			P({
				style : {
					marginTop : 10,
					textAlign : 'center'
				},
				c : '도메인을 짧게 줄여보자.'
			}),
			
			// form
			FORM({
				style : {
					width : 300,
					margin : 'auto',
					marginTop : 10
				},
				c : [INPUT({
					style : {
						width : '100%',
						height : 40,
						fontSize : 20,
						textAlign : 'center'
					},
					name : 'url',
					placeholder : 'ex) https://github.com/Hanul'
				}), INPUT({
					style : {
						display : 'block',
						width : 150,
						height : 40,
						margin : 'auto',
						marginTop : 10,
						fontWeight : 'bold'
					},
					type : 'submit',
					value : '▼ 짧 아 져 라! ▼'
				})],
				on : {
					submit : function(e, form) {
						
						preview.empty();
						preview.append('짧아지는 중...');
						preview.setHref('http://짧.한국');
						
						KoreanURLShortener.LinkModel.create(form.getData(), {
							
							notValid : function(validErrors) {
								if (validErrors.url !== undefined && validErrors.url.type === 'wrongURL') {
									alert('잘못된 URL 입니다!');
								}
								preview.empty();
								preview.append('http://짧.한국/하늘');
								preview.setHref('http://짧.한국/하늘');
							},
							
							success : function(savedData) {
								
								preview.empty();
								preview.append('http://짧.한국/' + savedData.id);
								preview.setHref('http://짧.한국/' + savedData.id);
								
								capture.empty();
								capture.append(A({
									href : '/__CAPTURE/' + encodeURIComponent(savedData.url) + '.png',
									target : '_blank',
									c : IMG({
										style : {
											marginTop : 20,
											width : 200
										},
										src : '/__CAPTURE/' + encodeURIComponent(savedData.url) + '.png'
									})
								}));
							}
						});
					}
				}
			}),
			
			// preview
			DIV({
				style : {
					marginTop : 20,
					textAlign : 'center'
				},
				c : preview = A({
					style : {
						fontSize : 20,
						fontWeight : 'bold',
						textShadow : '0 0 150px #EFE4B0, 0 0 60px #EFE4B0, 0 0 10px #EFE4B0'
					},
					href : 'http://짧.한국/하늘',
					target : '_blank',
					c : 'http://짧.한국/하늘'
				})
			}),
			
			// capture
			capture = DIV({
				style : {
					textAlign : 'center'
				}
			}),
			
			// recent
			recent = DIV({
				style : {
					width : 300,
					margin : 'auto',
					marginTop : 40
				},
				c : H2({
					style : {
						textAlign : 'center',
						fontWeight : 'bold',
						marginBottom : 10
					},
					c : '최신 URL'
				})
			}),
			
			// rank
			rank = DIV({
				style : {
					width : 300,
					margin : 'auto',
					marginTop : 40
				},
				c : H2({
					style : {
						textAlign : 'center',
						fontWeight : 'bold',
						marginBottom : 10
					},
					c : '인기 URL'
				})
			}),
			
			// footer
			DIV({
				style : {
					marginTop : 40,
					textAlign : 'center',
					paddingBottom : 40
				},
				c : P({
					c : [A({
						href : 'https://github.com/Hanul/KoreanURLShortener',
						target : '_blank',
						c : '짧.한국은 오픈소스 입니다.'
					}), BR(), A({
						href : 'https://www.facebook.com/mr.hanul',
						target : '_blank',
						c : '심영재'
					}), '가 만들었어요.']
				})
			})]
		}).appendTo(BODY);
		
		KoreanURLShortener.LinkModel.find({
			count : 5
		}, EACH(function(savedData) {
			recent.append(DIV({
				style : {
					marginTop : 5
				},
				c : [A({
					style : {
						flt : 'left'
					},
					href : 'http://짧.한국/' + savedData.id,
					target : '_blank',
					c : 'http://짧.한국/' + savedData.id
				}), DIV({
					style : {
						width : 175,
						marginLeft : 10,
						flt : 'right',
						color : '#999'
					},
					c : savedData.url
				}), CLEAR_BOTH()]
			}));
		}));
		
		KoreanURLShortener.LinkModel.find({
			sort : {
				count : -1
			},
			count : 5
		}, EACH(function(savedData) {
			rank.append(DIV({
				style : {
					marginTop : 5
				},
				c : [A({
					style : {
						flt : 'left'
					},
					href : 'http://짧.한국/' + savedData.id,
					target : '_blank',
					c : 'http://짧.한국/' + savedData.id
				}), DIV({
					style : {
						width : 175,
						marginLeft : 10,
						flt : 'right',
						color : '#999'
					},
					c : savedData.url
				}), CLEAR_BOTH()]
			}));
		}));
	}
});
