KoreanURLShortener.LinkModel=OBJECT({preset:function(){"use strict";return KoreanURLShortener.MODEL},params:function(){"use strict";var e={url:{notEmpty:!0,size:{max:2e3}},count:{notEmpty:!0,integer:!0}};return{name:"Link",isNotUsingObjectId:!0,initData:{count:0},methodConfig:{create:{valid:VALID(e)},update:!1,remove:!1}}}});