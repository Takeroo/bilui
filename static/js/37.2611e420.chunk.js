(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{1222:function(e,a,t){"use strict";t.r(a);var r=t(5),l=t(6),s=t(8),c=t(7),n=t(0),o=t.n(n),i=t(49),m=t(116),_=t(148),d=t.n(_),u=t(493),h=t(188),f=t(119),E=t(58),v=t(984),y=t.n(v),N=function(e){Object(s.a)(t,e);var a=Object(c.a)(t);function t(e){var l;Object(r.a)(this,t),(l=a.call(this,e)).loadArticle=function(){var e=l.state.id;f.a.getArticleById(e).then(function(e){l.setState({article:e,author:e.user})}).catch(function(){l.setState({redirect:!0})})};var s,c=new URLSearchParams(l.props.location.search).get("id"),n=!1;return c?s=c:n=!0,l.state={id:s,redirect:n,article:{},author:{}},l}return Object(l.a)(t,[{key:"componentDidMount",value:function(){this.loadArticle()}},{key:"render",value:function(){var e=this.state,a=e.article,t=e.author;return e.redirect?o.a.createElement(i.b,{component:h.a}):o.a.createElement("div",null,o.a.createElement(m.Helmet,{title:"Details"}),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-2"}),o.a.createElement("div",{className:"col-lg-8"},o.a.createElement("section",{className:"card"},o.a.createElement("div",{className:"card-header"},o.a.createElement("div",{className:y.a.information},o.a.createElement("div",{className:"".concat(y.a.title," mb-3")},o.a.createElement("h1",null,o.a.createElement("a",{href:"javascript: void(0);"},a.title)),o.a.createElement("ul",{className:y.a.meta},o.a.createElement("li",{className:y.a.metaInf},o.a.createElement("span",{className:y.a.articleAuthor},a.subtitle)))),o.a.createElement("div",{className:"clearfix"},o.a.createElement("div",{className:"".concat(y.a.commentAvatar," mr-2")},t.avatar&&o.a.createElement(u.a,{size:"50",src:"".concat(E.a.apiUrl,"/users/").concat(t.id,"/avatar"),border:!1,href:"/author/profile?id=".concat(t.id)}),!t.avatar&&o.a.createElement(u.a,{size:"50",src:"/resources/images/avatar.jpg",border:!1,href:"/author/profile?id=".concat(t.id)})),o.a.createElement("div",{className:"pull-left"},o.a.createElement("a",{href:"/#/author/profile?id=".concat(t.id)},o.a.createElement("strong",null,"".concat(t.name," ").concat(t.surname))),o.a.createElement("br",null),o.a.createElement("small",{className:"text-muted"},d()(a.createdAt).fromNow())),o.a.createElement("div",{className:"pull-right"},o.a.createElement("ul",{className:y.a.share},o.a.createElement("li",{className:y.a.shareItem},o.a.createElement("a",{href:"javascript: void(0);"},o.a.createElement("i",{className:"fa fa-facebook"}))),o.a.createElement("li",{className:y.a.shareItem},o.a.createElement("a",{href:"javascript: void(0);"},o.a.createElement("i",{className:"fa fa-twitter"}))),o.a.createElement("li",{className:y.a.shareItem},o.a.createElement("a",{href:"javascript: void(0);"},o.a.createElement("i",{className:"fa fa-pinterest-p"}))))))),a.imageId&&o.a.createElement("div",{className:"article-media"},o.a.createElement("img",{src:"".concat(E.a.apiUrl,"/images/").concat(a.imageId),alt:a.title}))),o.a.createElement("div",{className:"card-body"},o.a.createElement("div",{className:y.a.blogFeed},o.a.createElement("article",{className:y.a.article},o.a.createElement("div",{className:y.a.content,dangerouslySetInnerHTML:{__html:a.body}}),o.a.createElement("footer",{className:y.a.footer},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-8"},o.a.createElement("div",{className:y.a.hashtags},a.tags&&a.tags.map(function(e){return o.a.createElement("a",{href:"javascript: void(0);",key:e.id},e.name)}))),o.a.createElement("div",{className:"col-4"},o.a.createElement("ul",{className:y.a.share},o.a.createElement("li",{className:y.a.shareItem},o.a.createElement("a",{href:"javascript: void(0);"},o.a.createElement("i",{className:"fa fa-facebook"}))),o.a.createElement("li",{className:y.a.shareItem},o.a.createElement("a",{href:"javascript: void(0);"},o.a.createElement("i",{className:"fa fa-twitter"}))),o.a.createElement("li",{className:y.a.shareItem},o.a.createElement("a",{href:"javascript: void(0);"},o.a.createElement("i",{className:"fa fa-pinterest-p"})))))))),o.a.createElement("div",{className:"".concat(y.a.authorCard," clearfix")},o.a.createElement("div",{className:y.a.authorPhoto},o.a.createElement(u.a,{src:"".concat(E.a.apiUrl,"/users/").concat(t.id,"/avatar"),size:"110",href:"/author/profile?id=".concat(t.id)})),o.a.createElement("div",{className:y.a.authorInf},o.a.createElement("a",{href:"/#/author/profile?id=".concat(t.id)},o.a.createElement("span",{className:y.a.authorName},"".concat(t.name," ").concat(t.surname))),o.a.createElement("p",{className:y.a.authorWords},"\u201c",t.bio,"\u201d"))))))),o.a.createElement("div",{className:"col-lg-2"})))}}]),t}(o.a.Component);a.default=N},493:function(e,a,t){"use strict";var r=t(5),l=t(6),s=t(8),c=t(7),n=t(0),o=t.n(n),i=t(507),m=t.n(i),_=function(e){Object(s.a)(t,e);var a=Object(c.a)(t);function t(){return Object(r.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){var e=this.props,a=e.size,t=e.borderColor,r=e.src,l=e.border,s=e.href;return o.a.createElement("a",{className:"".concat(m.a.avatar," ").concat(a?m.a["size".concat(a)]:""," ").concat(l?m.a.border:""),href:s,style:{borderColor:t}},o.a.createElement("img",{src:r,alt:"User"}))}}]),t}(o.a.Component);_.defaultProps={size:!1,border:!1,borderColor:"#d2d9e5",src:""},a.a=_},507:function(e,a,t){e.exports={avatar:"style_avatar__25Nyi",size20:"style_size20__3LEnO",size25:"style_size25__3W71c",size50:"style_size50__3HDLS",size70:"style_size70__UUeBG",size90:"style_size90__2l7nu",size110:"style_size110__GiE3G",border:"style_border__2CKlK"}},984:function(e,a,t){e.exports={blogFeed:"style_blogFeed__2kylR",article:"style_article__1Gp--",link:"style_link__2CUHM",information:"style_information__xLMu5",title:"style_title__1LnlH",meta:"style_meta__3UdXM",metaInf:"style_metaInf__3g5WR",content:"style_content__2Lff2",more:"style_more__1T5_R",footer:"style_footer__1Cw5O",hashtags:"style_hashtags__3KGkV",share:"style_share__g-YYj",shareItem:"style_shareItem__339Bt",sidebar:"style_sidebar__3zJ5l",partition:"style_partition__16HqT",partitionHead:"style_partitionHead__3GdgL",partitionName:"style_partitionName__1GCU4",categoriesList:"style_categoriesList__NytAF",categoriesItem:"style_categoriesItem__1aS7B",categoriesLink:"style_categoriesLink__JyD4h",latestPost:"style_latestPost__3js1Q",latestImg:"style_latestImg__3TjPh",latestData:"style_latestData__249FP",latestName:"style_latestName__1joDQ",latestArticleMeta:"style_latestArticleMeta___Fdbz",articleAuthor:"style_articleAuthor__Tqbzg",articleDate:"style_articleDate__1voSc",groupAddon:"style_groupAddon__nOr2X",authorCard:"style_authorCard__317q1",authorPhoto:"style_authorPhoto__13DnR",authorInf:"style_authorInf__1FnQW",authorName:"style_authorName__17cbI",authorWords:"style_authorWords__1UL9v",commentsTitle:"style_commentsTitle__TFQm7",addCommentTitle:"style_addCommentTitle__216Bq",addCommentForm:"style_addCommentForm__2Fw1q",articleMore:"style_articleMore__3wNRG",commentItem:"style_commentItem__V5V3e",commentAvatar:"style_commentAvatar__1NW0g",commentContent:"style_commentContent__zr8v-",subcommentsContent:"style_subcommentsContent__17GcI"}}}]);
//# sourceMappingURL=37.2611e420.chunk.js.map