KoreanURLShortener.LinkModel=OBJECT({preset:function(){"use strict";return KoreanURLShortener.MODEL},params:function(){"use strict";var e={url:{notEmpty:!0,size:{max:2e3}},count:{notEmpty:!0,integer:!0}};return{name:"Link",isNotUsingObjectId:!0,initData:{count:0},methodConfig:{create:{valid:VALID(e)},update:!1,remove:!1}}}});OVERRIDE(KoreanURLShortener.LinkModel,function(t){"use strict";KoreanURLShortener.LinkModel=OBJECT({preset:function(){return t},init:function(t,r,e){var n=require("http"),o=require("https");process.env.NODE_TLS_REJECT_UNAUTHORIZED="0",t.on("create",{before:function(t,e,s){var i=t.url,u=0,c=function(){var n;100>u&&(u+=1,n=String.fromCharCode(RANDOM({min:44032,max:55203}))+String.fromCharCode(RANDOM({min:44032,max:55203})),r.checkIsExists({filter:{id:n}},function(r){r===!0?c():(t.id=n,e())}))};return"http://"!==i.substring(0,7)&&"https://"!==i.substring(0,8)&&(t.url=i="http://"+i),r.get({filter:{url:i}},{success:function(t){s({savedData:t})},notExists:function(){("http://"===i.substring(0,7)?n:o).get(i,function(t){"http://짧.한국"===i.substring(0,11)||200!==t.statusCode&&301!==t.statusCode&&302!==t.statusCode?s({validErrors:{url:{type:"wrongURL"}}}):c()}).on("error",function(t){s({validErrors:{url:{type:"wrongURL"}}})})}}),!1}})}})}),KoreanURLShortener.MAIN=METHOD({run:function(t){"use strict";var r=require("child_process"),e=URI_MATCHER("{id}"),n=URI_MATCHER("__CAPTURE/{url}");t(function(t,o,s,i,u){var c,a,h=t.uri,d=e.check(h);return d.checkIsMatched()===!0?(KoreanURLShortener.LinkModel.update({id:decodeURIComponent(d.getURIParams().id),$inc:{count:1}},{notExists:function(){o({statusCode:302,headers:{Location:"http://"+encodeURIComponent("짧.한국")}})},success:function(t){o({statusCode:302,headers:{Location:t.url}})}}),!1):(c=n.check(h),c.checkIsMatched()===!0?(a=c.getURIParams().url,a=a.substring(0,a.length-4),CHECK_IS_EXISTS_FILE(NODE_CONFIG.rootPath+"/__CAPTURE/"+a+".png",function(t){var e;t===!0?(i(NODE_CONFIG.rootPath),u()):(e=r.spawn("phantomjs",["--ignore-ssl-errors=yes",NODE_CONFIG.rootPath+"/screencapture.js",a]),e.on("error",function(t){}),e.on("exit",function(){i(NODE_CONFIG.rootPath),u()}))}),!1):""!==h?(o({statusCode:302,headers:{Location:"http://"+encodeURIComponent("짧.한국")}}),!1):void 0)})}});