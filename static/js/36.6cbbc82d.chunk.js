(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{1200:function(e,a,t){e.exports={videoPage:"style_videoPage__3zy2Z",card:"style_card__EWU-i",player:"style_player__2y8XB",mainContent:"style_mainContent__1vNXK",descr:"style_descr__2S0Pq",addComment:"style_addComment__3xZas",commentItem:"style_commentItem__1IqNJ",commentAvatar:"style_commentAvatar__3LOPE",commentContent:"style_commentContent__257p2",commentUser:"style_commentUser__15dXl",commentForm:"style_commentForm__rLLPb",commentTime:"style_commentTime__dJi07",commentLike:"style_commentLike__3RYrE",sidebar:"style_sidebar__2kKUF",sidebarHead:"style_sidebarHead__2UALF",sidebarTitle:"style_sidebarTitle__3gooo",watchNext:"style_watchNext__2lHlR",nextItemLink:"style_nextItemLink__1jCeh",itemName:"style_itemName__1pquB",itemAuthor:"style_itemAuthor__1HKOy",nextItem:"style_nextItem__2p-nd",itemThumb:"style_itemThumb__2Up-4",itemThumbImg:"style_itemThumbImg__1vOMM",itemDescr:"style_itemDescr__2IZml",itemViews:"style_itemViews__2lCjE",itemStatus:"style_itemStatus__XUWHi"}},1201:function(e){e.exports={viewData:{url:"http://cleanhtmlplayer.com/cdn/video/media/1.mp4",cover:"http://cleanhtmlplayer.com/cdn/video/media/1.jpg",type:"m4v",date:"Jan 9, 2017",title:"Blond Woman In White Bikini Sitting On Grass",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam dolorum ut quia itaque voluptate officiis, dolorem qui repellat numquam, nam natus, mollitia explicabo minus minima dicta quaerat molestias ab. Tempora nobis nostrum voluptatem voluptatibus libero sint nulla labore aliquid enim et, deleniti distinctio amet aut dolores perferendis eum totam voluptatum.",accountImg:"resources/images/avatars/1.jpg",comments:[{avatar:"resources/images/avatars/3.jpg",name:"Ashley Goodwether",date:"11 May 2016 18:13AM",content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Ipsum is simply dummy lorem",likesCount:26},{avatar:"resources/images/avatars/4.jpg",name:"Blackford May",date:"11 May 2016 19:21AM",content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Ipsum is simply dummy lorem",likesCount:12}]},upNext:[{cover:"resources/images/photos/1.jpeg",name:"Stay in Malibu",author:"Samuel Lewin",views:"682,079"},{cover:"resources/images/photos/2.jpeg",name:"The climb into the mountains",author:"Kayla Mercer",views:"24,921"},{cover:"resources/images/photos/3.jpeg",name:"The art of macro photography",author:"Jennifer Neal",views:"322,234"},{cover:"resources/images/photos/4.jpeg",name:"Downhill",author:"Kevin Addington",views:"864,092"},{cover:"resources/images/photos/5.jpeg",name:"The ascent of Elbrus",author:"Jason Walter",views:"411,011"},{cover:"resources/images/photos/1.jpeg",name:"Trip to the zoo",author:"Trinity Parson",views:"26,013"},{cover:"resources/images/photos/3.jpeg",name:"Downhill",author:"Kevin Addington",views:"864,092"},{cover:"resources/images/photos/4.jpeg",name:"A shadow in the night",author:"Isaac Owen",views:"342,852"}]}},1246:function(e,a,t){"use strict";t.r(a);t(147);var s=t(85),m=(t(117),t(52)),n=(t(64),t(38)),r=t(5),l=t(6),c=t(8),i=t(7),o=(t(53),t(4)),u=(t(145),t(19)),d=(t(146),t(86)),p=t(0),_=t.n(p),v=t(116),y=t(493),E=t(1200),h=t.n(E),N=t(1201),g=d.a.TextArea,b=_.a.createElement(o.a,null,_.a.createElement(o.a.Item,null,_.a.createElement(u.a,{type:"edit"})," Edit Post"),_.a.createElement(o.a.Item,null,_.a.createElement(u.a,{type:"delete"})," Delete Post"),_.a.createElement(o.a.Item,null,_.a.createElement(u.a,{type:"frown-o"})," Mark as a Spam")),w=function(e){Object(c.a)(t,e);var a=Object(i.a)(t);function t(){var e;Object(r.a)(this,t);for(var s=arguments.length,m=new Array(s),n=0;n<s;n++)m[n]=arguments[n];return(e=a.call.apply(a,[this].concat(m))).state={viewData:N.viewData,upNext:N.upNext},e}return Object(l.a)(t,[{key:"render",value:function(){var e=this.state,a=e.viewData,t=e.upNext;return _.a.createElement("div",null,_.a.createElement(v.Helmet,{title:"YouTube View"}),_.a.createElement("section",{className:"card"},_.a.createElement("div",{className:"card-header"},_.a.createElement("div",{className:"utils__title"},_.a.createElement("strong",null,"YouTube View"))),_.a.createElement("div",{className:"card-body"},_.a.createElement("div",{className:"".concat(h.a.videoPage," clearfix")},_.a.createElement("div",{className:h.a.mainContent},_.a.createElement("div",{className:h.a.player},_.a.createElement("img",{src:"resources/images/photos/4.jpeg",alt:""})),_.a.createElement("div",{className:h.a.descr},_.a.createElement("div",{className:h.a.card},_.a.createElement("div",{className:"mb-2"},_.a.createElement("strong",null,"Published on ",_.a.createElement("span",null,a.date)),_.a.createElement("div",{className:"pull-right"},_.a.createElement(n.a,{overlay:b},_.a.createElement("a",{className:"ant-dropdown-link",href:"javascript: void(0);"},"Actions ",_.a.createElement(u.a,{type:"down"}))))),_.a.createElement("p",{className:"mb-0"},a.description))),_.a.createElement("div",null,_.a.createElement("div",{className:h.a.card},_.a.createElement("div",{className:h.a.addComment},_.a.createElement("div",{className:h.a.commentUser},_.a.createElement(y.a,{size:"50",src:a.accountImg})),_.a.createElement("div",{className:h.a.commentForm},_.a.createElement(g,{rows:3,placeholder:"Write a comment..."}),_.a.createElement("div",{className:"mt-3"},_.a.createElement(m.a,{className:"mr-2",type:"primary",style:{width:200}},_.a.createElement("i",{className:"fa fa-send mr-2"}),"Send")))),_.a.createElement("div",null,a.comments.map(function(e){return _.a.createElement("div",{className:"".concat(h.a.commentItem," clearfix"),key:Math.random()},_.a.createElement("div",{className:h.a.commentAvatar},_.a.createElement(y.a,{src:e.avatar,size:"50",border:"false"})),_.a.createElement("div",{className:h.a.commentContent},_.a.createElement("strong",null,e.name,_.a.createElement("span",{className:"".concat(h.a.commentTime,"text-muted ml-2")},e.date)),_.a.createElement("p",{className:"mb-0"},e.content),_.a.createElement("div",{className:h.a.commentLike},_.a.createElement("a",{className:"mr-2",href:"javascript: void(0);"},_.a.createElement("i",{className:"icmn-heart mr-2"}),e.likesCount>0&&_.a.createElement("span",null,"".concat(e.likesCount," Likes")),0===e.likesCount&&_.a.createElement("span",null,"".concat(e.likesCount," Like"))))))}))))),_.a.createElement("div",{className:"".concat(h.a.sidebar," ").concat(h.a.card)},_.a.createElement("div",{className:h.a.sidebarHead},_.a.createElement("strong",{className:h.a.sidebarTitle},"Up next"),_.a.createElement("div",{className:"pull-right"},_.a.createElement(s.a,null,"Autoplay"))),_.a.createElement("ul",{className:h.a.watchNext},t.map(function(e){return _.a.createElement("li",{className:"".concat(h.a.nextItem," clearfix"),key:Math.random()},_.a.createElement("a",{href:"javascript: void(0);",className:h.a.nextItemLink},_.a.createElement("div",{className:h.a.itemThumb},_.a.createElement("img",{className:h.a.itemThumbImg,src:e.cover,alt:e.name})),_.a.createElement("div",{className:h.a.itemDescr},_.a.createElement("span",{className:h.a.itemName},e.name),_.a.createElement("span",{className:h.a.itemAuthor},e.author),_.a.createElement("span",{className:"".concat(h.a.itemViews," text-muted")},_.a.createElement("span",{className:h.a.itemCount},e.views),"views"))))})))))))}}]),t}(_.a.Component);a.default=w},493:function(e,a,t){"use strict";var s=t(5),m=t(6),n=t(8),r=t(7),l=t(0),c=t.n(l),i=t(507),o=t.n(i),u=function(e){Object(n.a)(t,e);var a=Object(r.a)(t);function t(){return Object(s.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){var e=this.props,a=e.size,t=e.borderColor,s=e.src,m=e.border,n=e.href;return c.a.createElement("a",{className:"".concat(o.a.avatar," ").concat(a?o.a["size".concat(a)]:""," ").concat(m?o.a.border:""),href:n,style:{borderColor:t}},c.a.createElement("img",{src:s,alt:"User"}))}}]),t}(c.a.Component);u.defaultProps={size:!1,border:!1,borderColor:"#d2d9e5",src:""},a.a=u},507:function(e,a,t){e.exports={avatar:"style_avatar__25Nyi",size20:"style_size20__3LEnO",size25:"style_size25__3W71c",size50:"style_size50__3HDLS",size70:"style_size70__UUeBG",size90:"style_size90__2l7nu",size110:"style_size110__GiE3G",border:"style_border__2CKlK"}}}]);
//# sourceMappingURL=36.6cbbc82d.chunk.js.map