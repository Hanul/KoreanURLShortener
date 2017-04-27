KoreanURLShortener.LinkModel = OBJECT({

	preset : () => {
		return KoreanURLShortener.MODEL;
	},

	params : () => {

		let validDataSet = {
			
			url : {
				notEmpty : true,
				size : {
					max : 2000
				}
			},
			
			count : {
				notEmpty : true,
				integer : true
			}
		};

		return {
			name : 'Link',
			isNotUsingObjectId : true,
			initData : {
				count : 0
			},
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : false,
				remove : false
			}
		};
	}
});
