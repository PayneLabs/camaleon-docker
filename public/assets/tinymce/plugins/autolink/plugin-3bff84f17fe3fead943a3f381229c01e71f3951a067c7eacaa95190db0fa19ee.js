tinymce.PluginManager.add("autolink",function(t){function e(t){o(t,-1,"(",!0)}function n(t){o(t,0,"",!0)}function i(t){o(t,-1,"",!1)}function o(t,e,n){function i(t,e){if(e<0&&(e=0),3==t.nodeType){var n=t.data.length;e>n&&(e=n)}return e}function o(t,e){1!=t.nodeType||t.hasChildNodes()?f.setStart(t,i(t,e)):f.setStartBefore(t)}function r(t,e){1!=t.nodeType||t.hasChildNodes()?f.setEnd(t,i(t,e)):f.setEndAfter(t)}var f,s,a,l,c,g,u,h,C,k;if("A"!=t.selection.getNode().tagName){if(f=t.selection.getRng(!0).cloneRange(),f.startOffset<5){if(!(h=f.endContainer.previousSibling)){if(!f.endContainer.firstChild||!f.endContainer.firstChild.nextSibling)return;h=f.endContainer.firstChild.nextSibling}if(C=h.length,o(h,C),r(h,C),f.endOffset<5)return;s=f.endOffset,l=h}else{if(l=f.endContainer,3!=l.nodeType&&l.firstChild){for(;3!=l.nodeType&&l.firstChild;)l=l.firstChild;3==l.nodeType&&(o(l,0),r(l,l.nodeValue.length))}s=1==f.endOffset?2:f.endOffset-1-e}a=s;do{o(l,s>=2?s-2:0),r(l,s>=1?s-1:0),s-=1,k=f.toString()}while(" "!=k&&""!==k&&160!=k.charCodeAt(0)&&s-2>=0&&k!=n);f.toString()==n||160==f.toString().charCodeAt(0)?(o(l,s),r(l,a),s+=1):0===f.startOffset?(o(l,0),r(l,a)):(o(l,s),r(l,a)),g=f.toString(),"."==g.charAt(g.length-1)&&r(l,a-1),g=f.toString(),(u=g.match(d))&&("www."==u[1]?u[1]="http://www.":/@$/.test(u[1])&&!/^mailto:/.test(u[1])&&(u[1]="mailto:"+u[1]),c=t.selection.getBookmark(),t.selection.setRng(f),t.execCommand("createlink",!1,u[1]+u[2]),t.settings.default_link_target&&t.dom.setAttrib(t.selection.getNode(),"target",t.settings.default_link_target),t.selection.moveToBookmark(c),t.nodeChanged())}}var r,d=/^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+\-]+@)(.+)$/i;return t.settings.autolink_pattern&&(d=t.settings.autolink_pattern),t.on("keydown",function(e){if(13==e.keyCode)return i(t)}),tinymce.Env.ie?void t.on("focus",function(){if(!r){r=!0;try{t.execCommand("AutoUrlDetect",!1,!0)}catch(t){}}}):(t.on("keypress",function(n){if(41==n.keyCode)return e(t)}),void t.on("keyup",function(e){if(32==e.keyCode)return n(t)}))});