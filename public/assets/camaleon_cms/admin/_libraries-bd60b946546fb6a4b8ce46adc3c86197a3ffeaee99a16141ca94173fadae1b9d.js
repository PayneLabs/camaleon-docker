function log(e){console.log&&console.log(e)}jQuery(function(){$.fn.flash_message=function(e,a){a||(a=e?"danger":"success"),e||(e=I18n("msg.success_action","Action completed successfully."));var n='<div class="alert alert-'+a+'"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> '+e+" </div>";return $(this).prepend(n),this}});var init_form_validations=function(e,a){a=a||{},(e?e:$("#admin_content")).find("input.slug").each(function(){var e=$(this).attr("data-parent");if(e){var a=$("#"+e);if(a.hasClass("translated-item")){var n=a.siblings(".trans_panel:first");if($(this).hasClass("no_translate"))$(this).slugify("#"+n.find(".tab-content .tab-pane:first input:first").attr("id"));else{$(this).addClass("translatable").Translatable(ADMIN_TRANSLATIONS);var i=$(this).siblings(".trans_panel:first");n.find(".tab-content .tab-pane").each(function(e,a){var n=$(a).children("input").attr("id");i.find(".tab-content .tab-pane:eq("+e+") input:first").slugify("#"+n)}),n.find(".nav > li a").each(function(e,a){$(a).click(function(){i.find(".nav > li:eq("+e+") a").click()})})}}else $(this).slugify("#"+e)}}),(e?e:$("#admin_content form")).each(function(){var e=$(this);e.find(".translatable").size()>0&&e.find(".translatable").Translatable()}).filter(".validate").each(function(){$(this).validate(a.validate_settings)})};!function(e){e.fn.input_upload=function(a){var n={label:I18n("msg.upload_image"),type:"image",ext:"none",icon:"upload",full_url:!0,height:"100px"};n=e.extend({},n,a||{}),e(this).each(function(){var a=e(this),i=e.extend({},n,a.data()||{}),t=e("<div class='content-upload-plugin'><a style='' href='#' target='_blank'><img src=''><br><span class='rm-file btn btn-xs btn-danger'><i class='fa fa-trash'></i></span></a></div>").hide();"image"!=i.type&&t.find("img").remove();var r=e('<a class="btn btn-default" href="#"><i class="fa fa-upload"></i> '+i.label+"</a>");t.find("img").css("max-height",i.height),t.find(".rm-file").click(function(){return a.val("").trigger("change"),!1}),r.click(function(){return e.fn.upload_filemanager({formats:i.type,selected:function(e){a.val(e.url).trigger("change")},dimension:a.attr("data-dimension")||i.dimension,versions:a.attr("data-versions")||i.versions,thumb_size:a.attr("data-thumb_size")||i.thumb_size,title:a.attr("title")||i.title}),!1}),a.after(t).after(r),a.change(function(){var e=a.val();e?(t.find("img").attr("src",e),t.find("a").attr("href",e),t.show()):t.hide()}).trigger("change")})},e.fn.input_upload_field=function(a){this.each(function(){var n=e(this),i={formats:n.attr("data-format")||"image",selected:function(e){n.val(e.url)}};n.parent().hasClass("input-group")||(n.wrap('<div class="group-input-fields-content input-group"></div>'),n.after('<span class="input-group-addon btn_upload"><i class="fa fa-upload"></i> </span>'),n.addClass("form-control")),n.next("span").click(function(){e.fn.upload_filemanager(e.extend({},i,a||{}))})})}}(jQuery),function(e){jQuery.fn.serializeObject=function(){var a={};return jQuery.map(jQuery(this).serializeArray(),function(n,i){if(n.name.indexOf("[")>-1){var t=a;_name=n.name.replace(/\]/gi,"").split("[");for(var i=0,r=_name.length;i<r;i++)i==r-1?t[_name[i]]&&""==e.trim(_name[i])?("string"==typeof t[_name[i]]&&(t[_name[i]]=[t[_name[i]]]),t[_name[i]].push(n.value)):t[_name[i]]=n.value||"":t=t[_name[i]]=t[_name[i]]||{}}else a[n.name]!==undefined?(a[n.name].push||(a[n.name]=[a[n.name]]),a[n.name].push(n.value||"")):a[n.name]=n.value||""}),a}}(jQuery),function(e){"function"==typeof define&&define.amd?define(["jquery"],function(a){e(a)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=e(require("jquery")):e(window.jQuery)}(function(e){"use strict";function a(e){void 0===e&&(e=window.navigator.userAgent),e=e.toLowerCase();var a=/(edge)\/([\w.]+)/.exec(e)||/(opr)[\/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n=/(ipad)/.exec(e)||/(ipod)/.exec(e)||/(iphone)/.exec(e)||/(kindle)/.exec(e)||/(silk)/.exec(e)||/(android)/.exec(e)||/(windows phone)/.exec(e)||/(win)/.exec(e)||/(mac)/.exec(e)||/(linux)/.exec(e)||/(cros)/.exec(e)||/(playbook)/.exec(e)||/(bb)/.exec(e)||/(blackberry)/.exec(e)||[],i={},t={browser:a[5]||a[3]||a[1]||"",version:a[2]||a[4]||"0",versionNumber:a[4]||a[2]||"0",platform:n[0]||""};if(t.browser&&(i[t.browser]=!0,i.version=t.version,i.versionNumber=parseInt(t.versionNumber,10)),t.platform&&(i[t.platform]=!0),(i.android||i.bb||i.blackberry||i.ipad||i.iphone||i.ipod||i.kindle||i.playbook||i.silk||i["windows phone"])&&(i.mobile=!0),(i.cros||i.mac||i.linux||i.win)&&(i.desktop=!0),(i.chrome||i.opr||i.safari)&&(i.webkit=!0),i.rv||i.edge){var r="msie";t.browser=r,i[r]=!0}if(i.safari&&i.blackberry){var s="blackberry";t.browser=s,i[s]=!0}if(i.safari&&i.playbook){var o="playbook";t.browser=o,i[o]=!0}if(i.bb){var l="blackberry";t.browser=l,i[l]=!0}if(i.opr){var c="opera";t.browser=c,i[c]=!0}if(i.safari&&i.android){var f="android";t.browser=f,i[f]=!0}if(i.safari&&i.kindle){var d="kindle";t.browser=d,i[d]=!0}if(i.safari&&i.silk){var u="silk";t.browser=u,i[u]=!0}return i.name=t.browser,i.platform=t.platform,i}return window.jQBrowser=a(window.navigator.userAgent),window.jQBrowser.uaMatch=a,e&&(e.browser=window.jQBrowser),window.jQBrowser});