(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{121:function(e,t,n){e.exports=n(155)},13:function(e,t,n){"use strict";n.d(t,"f",function(){return r}),n.d(t,"g",function(){return a}),n.d(t,"e",function(){return c}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i}),n.d(t,"d",function(){return s});var r=function(){var e=-1,t=Date.now().toString();return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";e+=1;var r="".concat(String(Math.round(1e8*Math.random())),"-").concat(String(Math.round(1e8*Math.random()))),a="".concat(r,"-").concat(t,"-").concat(e);return 0===n.length?a:"".concat(n,"-").concat(a)}}();function a(e){return function(t){t.stopPropagation();for(var n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];return e.apply(void 0,r)}}function c(e){e.stopPropagation()}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"entity",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id",r={},a={},c=[];return r[t]=a,r.refs=c,e.forEach(function(e){var t=e[n];c.push(t),a[t]=e}),r}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"entity",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"refs";return e[n].map(function(n){return e[t][n]})}function i(){return localStorage.getItem("__jwt")||""}function s(e){localStorage.setItem("__jwt",e)}},15:function(e,t,n){"use strict";n.r(t),n.d(t,"CHANGE_TASKS",function(){return r}),n.d(t,"ADD_TASK_TO_TASKS",function(){return a}),n.d(t,"REMOVE_TASK_IN_TASKS",function(){return c}),n.d(t,"CHANGE_CURRENT_TODO_TASK",function(){return u}),n.d(t,"CHANGE_CURRENT_TODO_TASK_BY_ID",function(){return o}),n.d(t,"CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_TASK_ID",function(){return i}),n.d(t,"TOGGLE_TASK_ITEM_CHECKED",function(){return s}),n.d(t,"UPDATE_TASK_IN_TASKS",function(){return l}),n.d(t,"EFFECT_GET_TASK_LIST",function(){return f}),n.d(t,"EFFECT_DELETE_TASK",function(){return d}),n.d(t,"EFFECT_GET_TASK",function(){return T});var r="tasks/CHANGE_TASKS",a="tasks/ADD_TASK_TO_TASKS",c="tasks/REMOVE_TASK_IN_TASKS",u="tasks/CHANGE_CURRENT_TODO_TASK",o="tasks/CHANGE_CURRENT_TODO_TASK_BY_ID",i="tasks/CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_TASK_ID",s="tasks/TOGGLE_TASK_ITEM_CHECKED",l="tasks/UPDATE_TASK_IN_TASKS",f="tasks/EFFECT_GET_TASK_LIST",d="tasks/EFFECT_DELETE_TASK",T="tasks/EFFECT_GET_TASK"},154:function(e,t,n){},155:function(e,t,n){"use strict";n.r(t);var r,a=n(24),c=n.n(a),u=n(0),o=n.n(u),i=n(14),s=n(37),l=n(36),f=n(113),d=n(15),T=n(26),E=n(22),_=n(17),k=n(57),m=n(4),p=n(100),b=n(11),O=Object(b.fromJS)({showSideMenu:!1,showAccountManager:!1,notifications:[]}),g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=void 0===n?null:n,a=t.payload,c=void 0===a?null:a;if(null==r)throw new Error("action: ".concat(t," does not has type!"));switch(t.type){case T.SHOW_SIDE_MENU:return e.set("showSideMenu",!0);case T.HIDE_SIDE_MENU:return e.set("showSideMenu",!1);case T.ADD_ONE_NOTIFICATION:var u=c;return e.set("notifications",e.get("notifications").push(u));case T.REMOVE_THE_TOP_NOTIFICATION:return e.set("notifications",e.get("notifications").shift());default:return e}},S=n(13),C=Object(b.fromJS)({tasks:Object(S.c)([]),currentTodoTask:null}),v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=void 0===n?null:n,a=t.payload,c=void 0===a?null:a;if(null==r)throw new Error("action: {action} does not has type!");var u=e.get("tasks"),o=e.getIn(["tasks","entity"]),i=e.getIn(["tasks","refs"]);switch(t.type){case d.CHANGE_TASKS:var s=c;return e.set("tasks",s);case d.ADD_TASK_TO_TASKS:var l=t.payload,f=l.get("id");return e.set("tasks",u.merge({entity:o.set(f,l),refs:i.push(f)}));case d.REMOVE_TASK_IN_TASKS:var T=c.get("id");return e.set("tasks",u.merge({entity:o.delete(T),refs:i.filter(function(e){return e!==T})}));case d.CHANGE_CURRENT_TODO_TASK:var _=c;return e.set("currentTodoTask",_);case d.CHANGE_CURRENT_TODO_TASK_BY_ID:var k=c;return e.set("currentTodoTask",e.getIn(["tasks","entity",k]));case d.TOGGLE_TASK_ITEM_CHECKED:var m=["currentTodoTask","items","entity",c.get("id"),"checked"];return e.setIn(m,!e.getIn(m));case d.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_TASK_ID:var p=c;return e.setIn(["currentTodoTask","items","entity",p,"checked"],!0);case d.UPDATE_TASK_IN_TASKS:var b=c,O=b.get("id");return e.setIn(["tasks","entity",O],b);case E.LOGOUT:return e.set("tasks",e.get("tasks").merge({entity:o.clear(),refs:i.clear()}));default:return e}},I=Object(b.fromJS)({currentTask:null,futureTasks:[],oldTasks:[]}),A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=void 0===n?null:n,a=t.payload,c=void 0===a?null:a;if(null==r)throw new Error("action: {action} does not has type!");var u=e.getIn(["currentTask","items"]),o=e.getIn(["currentTask","items","entity"]),i=e.getIn(["currentTask","items","refs"]);switch(t.type){case _.CHANGE_CURRENT_TASK:var s=c;return e.set("currentTask",s);case _.ADD_TASK_ITEM_IN_CURRENT_TASK:var l=c,f=l.get("id");return e.setIn(["currentTask","items"],u.merge({entity:o.set(f,l),refs:i.push(f)}));case _.REMOVE_TASK_ITEM_IN_CURRENT_TASK:var d=c.get("id");return e.setIn(["currentTask","items"],u.merge({entity:o.delete(d),refs:i.filter(function(e){return e!==d})}));case _.UNDO_CURRENT_TASK:var T=e.get("oldTasks");if(0!==T.length){var E=e.get("futureTasks"),k=e.get("currentTask"),m=T.last();return e.merge({currentTask:m,futureTasks:E.push(k),oldTasks:T.pop()})}return e;case _.REDO_CURRENT_TASK:var p=e.get("futureTasks");if(0!==p.length){var b=e.get("oldTasks"),O=e.get("currentTask"),g=p.last();return e.merge({currentTask:g,futureTasks:p.pop(),oldTasks:b.push(O)})}return e;case _.SNAPSHOT_CURRENT_TASK:var S=e.get("currentTask");if(null!=S){var C=e.get("oldTasks");return e.set("oldTasks",C.push(S))}return e;case _.CLEAR_FUTURE_TASKS:return e.set("futureTasks",e.get("futureTasks").clear());case _.CLEAR_EDITNG_HISTORY:return e.merge({futureTasks:e.get("futureTasks").clear(),oldTasks:e.get("oldTasks").clear()});default:return e}},y=Object(b.fromJS)({hasLogin:!1,userInfo:null,isLogining:!1,isRegistering:!1}),h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=void 0===n?null:n,a=t.payload,c=void 0===a?null:a;if(null==r)throw new Error("action: ".concat(t," does not has type!"));switch(t.type){case E.EFFECT_LOGIN:return e.set("isLogining",!0);case E.EFFECT_REGISTER:return e.set("isRegistering",!0);case E.LOGIN_SUCCESS:var u=c;return e.merge({hasLogin:!0,isLogining:!1},u);case E.LOGIN_FAIL:return e.set("isLogining",!1);case E.LOGOUT:return Object(S.d)(""),e.merge({hasLogin:!1,userInfo:null,isLogining:!1,isRegistering:!1});case E.REGISTER_SUCCESS:var o=c;return e.merge({hasLogin:!0,isRegistering:!1},o);case E.REGISTER_FAIL:return e.set("isRegistering",!1);default:return e}},j=Object(p.combineReducers)({global:g,task:v,editingTask:A,user:h}),R=n(59),N=n(12),K=n.n(N),F=n(32),D=n(8),w=n(101),U=n.n(w),G=(r=location.host,function(){return["localhost","127.0.0.1"].some(function(e){return r.includes(e)})});var x=U.a.create({baseURL:G()?"http://localhost:3031/":"http://101.37.174.138/",timeout:1e3});x.interceptors.request.use(function(e){var t=Object(S.b)();if(""===t||null==t)return e;var n=e;return n.headers.Authorization="Bearer ".concat(t),n},function(e){return Promise.reject(e)}),x.interceptors.response.use(function(e){return e},function(e){var t=e.response.data;return t.type="error",t.key=Object(S.f)("error"),Promise.reject(t)});var L=n(39),M=K.a.mark($),P=K.a.mark(B),H=K.a.mark(J);function $(){var e,t;return K.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(D.b)(x.get,"/users");case 3:return e=n.sent,t=e.data,n.next=7,Object(D.c)(m.g.loginSuccess({userInfo:Object(b.fromJS)(t)}));case 7:n.next=13;break;case 9:n.prev=9,n.t0=n.catch(0),console.error("\u767b\u5f55\u5931\u8d25",n.t0),Object(S.d)("");case 13:case"end":return n.stop()}},M,null,[[0,9]])}function B(e){var t,n,r,a,c,u,o;return K.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,t=e.payload,i.next=4,Object(D.b)(x.post,"/users/login",t);case 4:return n=i.sent,r=n.data,a=r.user,c=void 0===a?null:a,u=r.token,o=Object(L.a)(r,["user","token"]),Object(S.d)(u),i.next=10,Object(D.c)(m.g.loginSuccess(Object(b.fromJS)(Object(F.a)({token:u,userInfo:c},o))));case 10:return i.next=12,Object(D.c)(m.c.addOneNitification({type:"success",title:"\u767b\u9646\u6210\u529f",key:Object(S.f)("notifi")}));case 12:i.next=20;break;case 14:return i.prev=14,i.t0=i.catch(0),i.next=18,Object(D.c)(m.g.loginFail());case 18:return i.next=20,Object(D.c)(m.c.addOneNitification(i.t0));case 20:case"end":return i.stop()}},P,null,[[0,14]])}function J(e){var t,n,r,a,c,u,o;return K.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,t=e.payload,i.next=4,Object(D.b)(x.post,"/users",t);case 4:return n=i.sent,r=n.data,a=r.user,c=void 0===a?null:a,u=r.token,o=Object(L.a)(r,["user","token"]),Object(S.d)(u),i.next=10,Object(D.c)(m.g.registerSuccess(Object(b.fromJS)(Object(F.a)({token:u,userInfo:c},o))));case 10:return i.next=12,Object(D.c)(m.c.addOneNitification({type:"success",title:"\u6ce8\u518c\u6210\u529f",message:"\u5df2\u7ecf\u4e3a\u60a8\u81ea\u52a8\u767b\u5f55\u5e94\u7528"}));case 12:i.next=20;break;case 14:return i.prev=14,i.t0=i.catch(0),i.next=18,Object(D.c)(m.g.registerFail());case 18:return i.next=20,Object(D.c)(m.c.addOneNitification(i.t0));case 20:case"end":return i.stop()}},H,null,[[0,14]])}var V=[Object(D.d)(E.EFFECT_GET_USERINFO,$),Object(D.e)(E.EFFECT_REGISTER,J),Object(D.e)(E.EFFECT_LOGIN,B)],Y=K.a.mark(W),z=K.a.mark(q);function W(e){var t,n,r,a,c;return K.a.wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.prev=0,u.next=3,Object(D.b)(x.get,"/tasks/".concat(e));case 3:return t=u.sent,n=t.data,r=n.items,a=Object(L.a)(n,["items"]),c=Object(b.fromJS)(Object(F.a)({},a,{items:Object(S.c)(r)})),u.abrupt("return",c);case 10:return u.prev=10,u.t0=u.catch(0),u.next=14,Object(D.c)(m.c.addOneNitification(u.t0));case 14:return u.abrupt("return",null);case 15:case"end":return u.stop()}},Y,null,[[0,10]])}function q(e){var t,n,r,a,c,u,o,i,s,l;return K.a.wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.prev=0,t=e.toJS(),n=t.items,r=Object(L.a)(t,["items"]),a=Object(F.a)({},r,{items:Object(S.a)(n),timestamp:Date.now()}),f.next=5,Object(D.b)(x.put,"/tasks/".concat(a.id),a);case 5:return c=f.sent,u=c.data,o=u.items,i=Object(L.a)(u,["items"]),s=Object(b.fromJS)(Object(F.a)({},i,{items:Object(S.c)(o)})),f.abrupt("return",s);case 12:return f.prev=12,f.t0=f.catch(0),(l=f.t0.data).type="error",l.title="\u7f16\u8f91\u4efb\u52a1\u5931\u8d25",f.next=19,Object(D.c)(m.c.addOneNitification(l));case 19:return f.abrupt("return",null);case 20:case"end":return f.stop()}},z,null,[[0,12]])}var X=K.a.mark(ee),Q=K.a.mark(te),Z=K.a.mark(ne);function ee(){var e,t,n;return K.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Object(D.b)(x.get,"/tasks");case 3:return e=r.sent,t=e.data,n=Object(b.fromJS)(Object(S.c)(t.map(function(e){var t=e.items,n=Object(L.a)(e,["items"]);return Object(F.a)({},n,{items:Object(b.fromJS)(Object(S.c)(t))})}))),r.next=8,Object(D.c)(m.f.changeTasks(n));case 8:r.next=13;break;case 10:r.prev=10,r.t0=r.catch(0),console.error(r.t0);case 13:case"end":return r.stop()}},X,null,[[0,10]])}function te(e){var t;return K.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.payload,n.prev=1,n.next=4,Object(D.b)(x.delete,"/tasks/".concat(t));case 4:n.next=9;break;case 6:n.prev=6,n.t0=n.catch(1),console.error(n.t0);case 9:case"end":return n.stop()}},Q,null,[[1,6]])}function ne(e){var t,n;return K.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.payload,r.next=3,Object(D.b)(W,t);case 3:if(null!=(n=r.sent)){r.next=6;break}return r.abrupt("return");case 6:return r.next=8,Object(D.c)(m.f.changeCurrentTodoTask(n));case 8:return r.next=10,Object(D.c)(m.f.updateTaskInTasks(n));case 10:case"end":return r.stop()}},Z)}var re=[Object(D.d)(d.EFFECT_GET_TASK_LIST,ee),Object(D.d)(d.EFFECT_DELETE_TASK,te),Object(D.d)(d.EFFECT_GET_TASK,ne)],ae=K.a.mark(ue),ce=K.a.mark(oe);function ue(e){var t,n;return K.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.payload,r.next=3,Object(D.b)(q,t);case 3:if(null!=(n=r.sent)){r.next=6;break}return r.abrupt("return");case 6:return r.next=8,Object(D.c)(m.f.updateTaskInTasks(n));case 8:case"end":return r.stop()}},ae)}function oe(e){var t,n;return K.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.payload,r.next=3,Object(D.b)(W,t);case 3:if(null!=(n=r.sent)){r.next=6;break}return r.abrupt("return");case 6:return r.next=8,Object(D.c)(m.a.changeCurrentTask(n));case 8:case"end":return r.stop()}},ce)}var ie=[Object(D.d)(_.EFFECT_UPDATE_TASK,ue),Object(D.d)(_.EFFECT_GET_TASK,oe)],se=K.a.mark(fe),le=function(e){return new Promise(function(t){return setTimeout(t,e)})};function fe(){return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(D.b)(le,3e3);case 2:return e.next=4,Object(D.c)(m.c.removeTheTopNitification());case 4:case"end":return e.stop()}},se)}var de=[Object(D.d)(T.ADD_ONE_NOTIFICATION,fe)],Te=K.a.mark(_e),Ee=K.a.mark(ke);function _e(e){var t,n,r,a;return K.a.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.prev=0,t=e.payload,c.next=4,Object(D.b)(x.post,"/tasks",t);case 4:return n=c.sent,r=n.data,a=r.items,c.next=9,Object(D.c)(m.f.addTaskToTasks(Object(b.fromJS)(Object(F.a)({},r,{items:Object(S.c)(a)}))));case 9:c.next=16;break;case 11:return c.prev=11,c.t0=c.catch(0),console.error("createTask",c.t0),c.next=16,Object(D.c)(m.c.addOneNitification(c.t0));case 16:case"end":return c.stop()}},Te,null,[[0,11]])}function ke(){return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(D.d)(k.EFFECT_CREATE_TASK,_e);case 2:return e.next=4,Object(D.a)([].concat(Object(R.a)(V),Object(R.a)(re),Object(R.a)(ie),Object(R.a)(de)));case 4:case"end":return e.stop()}},Ee)}var me,pe=ke,be=Object(f.a)(),Oe=[be],ge=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.c;G()?(console.log("\u6b63\u5904\u4e8edeveloment\u6a21\u5f0f"),me=Object(l.d)(j,ge(l.a.apply(void 0,Oe)))):me=Object(l.d)(j,l.a.apply(void 0,Oe)),be.run(pe);var Se=n(5),Ce=n.n(Se);function ve(e){var t=e.children,n=Object(i.c)();return Object(u.useEffect)(function(){var e=Object(S.b)();""!==e&&null!=e&&n(m.g.effectGetUserInfo())},[n]),o.a.createElement(o.a.Fragment,null,t)}ve.propTypes={children:Ce.a.node.isRequired};var Ie=ve,Ae=n(45),ye=o.a.lazy(function(){return Promise.all([n.e(0),n.e(6),n.e(5)]).then(n.bind(null,222))});function he(){return o.a.createElement(u.Suspense,{fallback:null},o.a.createElement(ye,null))}var je=n(28),Re=n(65),Ne=n.n(Re),Ke=n(181),Fe=n(182),De=n(183),we=n(46),Ue=n(156),Ge=n(184),xe=n(185),Le=n(197);function Me(e){var t=e.message,n=e.time,r=Object(u.useState)(!1),a=Object(je.a)(r,2),c=a[0],i=a[1],s=Object(u.useState)(0),l=Object(je.a)(s,2),f=l[0],d=l[1];return Object(u.useEffect)(function(){var e=setTimeout(function(){i(!0)},n),t=setInterval(function(){d(function(e){return e+1})},1e3);return function(){clearTimeout(e),clearInterval(t)}},[n,i,d]),c?o.a.createElement(Ae.a,{to:"/"}):o.a.createElement("div",{style:{padding:"20px"}},o.a.createElement("h1",null,t),o.a.createElement("h2",null,Math.round(n/1e3)-f,"\u79d2\u540e\u56de\u5230\u4e3b\u9875"))}Me.defaultProps={message:"404 Not Found",time:3e3};var Pe=Me,He=n(196);function $e(e){return o.a.createElement(He.a,e)}$e.defaultProps={onClick:null,checked:!1,disabled:!1};var Be=$e;function Je(e){var t=e.$taskItem,n=e.onClick,r=e.style,a=Object(u.useCallback)(function(){return n(t)},[t,n]);return o.a.createElement(Ke.a,{style:r,button:!0,onClick:a},o.a.createElement(Be,{edge:"start",checked:t.get("checked")}),o.a.createElement(Fe.a,{primary:t.get("title")}))}function Ve(e){var t=e.match.params.id,n=e.history,r=e.$currentTodoTask,a=e.dispatch;Object(u.useEffect)(function(){return a(m.f.effectGetTask(t)),function(){a(m.f.changeCurrentTodoTask(null))}},[a,t]);var c=Object(u.useMemo)(function(){var e=[],t=[];null!=r&&r.getIn(["items","refs"]).forEach(function(n){r.getIn(["items","entity",n]).get("checked")?t.push(n):e.push(n)});return[e,t]},[r]),i=Object(je.a)(c,2),s=i[0],l=i[1],f=Object(u.useCallback)(function(e){a(m.f.toggleTaskItemPropChecked(e))},[a]),d=Object(u.useCallback)(function(){n.push("/edit/".concat(r.get("id")))},[n,r]);return null==r?o.a.createElement(Pe,{message:"Loding...",time:5e3}):o.a.createElement(o.a.Fragment,null,o.a.createElement(De.a,null,o.a.createElement(Ke.a,{dense:!0},o.a.createElement(we.a,{variant:"h4",gutterBottom:!0},r.get("title")),o.a.createElement(Ue.a,{onClick:d},o.a.createElement(Ne.a,null)))),o.a.createElement(Ge.a,{variant:"fullWidth"}),o.a.createElement(De.a,null,0===s.length?null:o.a.createElement(Ke.a,{dense:!0},o.a.createElement(we.a,{variant:"subtitle1",gutterBottom:!0},"\u5f85\u5b8c\u6210")),o.a.createElement(Le.a,null,0===s.length?null:s.map(function(e){var t=r.getIn(["items","entity",e]);return o.a.createElement(xe.a,{timeout:500,direction:"right",key:t.get("id")},o.a.createElement("div",null,o.a.createElement(Je,{onClick:f,$taskItem:t}),o.a.createElement(Ge.a,{variant:"middle"})))}))),o.a.createElement(De.a,null,0===l.length?null:o.a.createElement(Ke.a,{dense:!0},o.a.createElement(we.a,{variant:"subtitle1",gutterBottom:!0},"\u5df2\u5b8c\u6210")),o.a.createElement(Le.a,null,l.map(function(e){var t=r.getIn(["items","entity",e]);return o.a.createElement(xe.a,{timeout:500,direction:"right",key:t.get("id")},o.a.createElement("div",null,o.a.createElement(Je,{style:{opacity:"0.5"},onClick:f,$taskItem:t}),o.a.createElement(Ge.a,{variant:"middle"})))}))))}Je.defaultProps={style:null},Ve.defaultProps={$currentTodoTask:null};var Ye=Object(Ae.i)(Object(i.b)(function(e){var t=e.get("global"),n=e.get("task");return{showSideMenu:t.get("showSideMenu"),$tasksEntity:n.getIn(["tasks","entity"]),$currentTodoTask:n.get("currentTodoTask")}},null)(Ve)),ze=n(106),We=n.n(ze),qe=n(187),Xe=n(186);function Qe(e){var t=e.onClickTask,n=e.$tasks,r=e.onClickIconButton,a=Object(u.useMemo)(function(){return Object(S.g)(r)},[r]);return o.a.createElement(De.a,{subheader:o.a.createElement(Xe.a,{component:"div"},"\u7f6e\u9876\u4efb\u52a1")},o.a.createElement(Ge.a,null),o.a.createElement(Le.a,null,n.map(function(e){return o.a.createElement(qe.a,{key:e.get("id"),timeout:300},o.a.createElement("div",null,o.a.createElement(Ke.a,{onClick:function(){return t(e)},button:!0},o.a.createElement(Fe.a,{primary:e.get("title")}),o.a.createElement(Ue.a,{onClick:function(t){return a(t,e)}},o.a.createElement(We.a,null)))))})))}Qe.defaultProps={onClickTask:function(){console.log("onClickTask")},onClickIconButton:function(){console.log("onClickIconButton")}};var Ze=Qe,et=n(107),tt=n.n(et);function nt(e){var t=e.onClickTask,n=e.$tasks,r=e.onClickIconButton,a=Object(u.useMemo)(function(){return Object(S.g)(r)},[r]);return o.a.createElement(De.a,{subheader:o.a.createElement(Xe.a,{component:"div"},"\u6700\u8fd1\u4efb\u52a1")},o.a.createElement(Ge.a,null),n.map(function(e){return o.a.createElement(o.a.Fragment,{key:e.get("id")},o.a.createElement(Ke.a,{onClick:function(){return t(e)},button:!0},o.a.createElement(Fe.a,{primary:e.get("title")}),e.get("isPinned")?null:o.a.createElement(Ue.a,{onClick:function(t){return a(t,e)}},o.a.createElement(tt.a,null))))}))}nt.defaultProps={onClickTask:function(){console.log("onClickTask")},onClickIconButton:function(){console.log("onClickIconButton")}};var rt=nt;function at(e){var t=e.$tasksRefs,n=e.dispatch,r=e.history,a=e.$tasksEntity,c=Object(u.useMemo)(function(){return t.map(function(e){return a.get(e)}).sort(function(e,t){var n=e.get("lastVisitTime")||0;return(t.get("lastVisitTime")||0)-n})},[t,a]),i=Object(u.useMemo)(function(){return t.map(function(e){return a.get(e)}).filter(function(e){return e.get("isPinned")})},[t,a]),s=Object(u.useCallback)(function(e){var t=e.set("isPinned",!0);n(m.a.effectUpdateTask(t))},[n]),l=Object(u.useCallback)(function(e){var t=e.set("isPinned",!1);n(m.a.effectUpdateTask(t))},[n]),f=Object(u.useCallback)(function(e){r.push("/todo/".concat(e.get("id")))},[r]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(Ze,{onClickIconButton:l,onClickTask:f,$tasks:i}),o.a.createElement(rt,{onClickIconButton:s,onClickTask:f,$tasks:c}))}at.defaultProps={};var ct=Object(i.b)(function(e){var t=e.get("task");return{$recentTaskIds:t.get("recentTaskIds"),$pinnedTaskIds:t.get("pinnedTaskIds"),$tasksEntity:t.getIn(["tasks","entity"]),$tasksRefs:t.getIn(["tasks","refs"])}},null)(at),ut=n(190),ot=n(191),it=n(109),st=n.n(it),lt=n(188),ft=n(35),dt=function(e){var t,n,r=e.$task,a=e.$tasksItemsEntity,c=e.$tasksItemsRefs,i=e.dispatch,s=e.history,l=Object(u.useMemo)(function(){return c.filter(function(e){return!a.getIn([e,"checked"])}).map(function(e){return a.get(e)})},[a,c]),f=c.size,d=f-l.size,T=f===d,E=0===f,_=Object(u.useCallback)(function(){E?s.push("/edit/".concat(r.get("id"))):T?s.push("/"):i(m.f.checkTaskItemInTaskItemsByTaskId(l.getIn(["0","id"])))},[r,E,T,l,s,i]);return E?(t="\u6dfb\u52a0\u4efb\u52a1\u9879",n=ft.d):T?(t="\u5168\u90e8\u5b8c\u6210(".concat(d,"/").concat(f,")"),n=ft.b):(t="\u5b8c\u6210\u4e00\u4e2a\u4efb\u52a1\u9879(".concat(d,"/").concat(f,")"),n=ft.c),o.a.createElement(lt.a,{style:{backgroundColor:n,color:"#fff",transition:"background-color 300ms"},size:"medium",fullWidth:!0,"aria-label":"add",onClick:_},t)};dt.defaultProps={$tasksItemsRefs:new b.List,$tasksItemsEntity:new b.Map,$task:null};var Tt=Object(i.b)(function(e){var t=e.get("task");return{$tasksItemsEntity:t.getIn(["currentTodoTask","items","entity"]),$tasksItemsRefs:t.getIn(["currentTodoTask","items","refs"]),$task:t.get("currentTodoTask")}},null)(dt),Et=n(189),_t=Object(i.b)(function(e){var t=e.get("editingTask");return{$futureTasks:t.get("futureTasks"),$oldTasks:t.get("oldTasks")}},null)(Object(Ae.i)(function(e){var t=e.$futureTasks,n=e.$oldTasks,r=e.dispatch,a=0===n.size,c=0===t.size,i=Object(u.useCallback)(function(){r(m.a.undoCurrentTask())},[r]),s=Object(u.useCallback)(function(){r(m.a.redoCurrentTask())},[r]);return o.a.createElement(Et.a,{fullWidth:!0,variant:"outlined"},o.a.createElement(lt.a,{onClick:i,disabled:a},"Undo"),o.a.createElement(lt.a,{onClick:s,disabled:c},"Redo"))})),kt=n(108),mt=n.n(kt),pt=n(66);function bt(e){var t=e.onClick,n=e.needDoubleClick,r=e.timeout,a=Object(pt.a)(),c=Object(u.useRef)(null),i=Object(u.useRef)(null),s=Object(u.useCallback)(function(){if(n){c.current+=1;var e=c.current;1===e?(null!=i.current&&clearTimeout(i.current),i.current=setTimeout(function(){c.current=0,i.current=null,a()},r)):2===e&&(null!=i.current&&clearTimeout(i.current),c.current=0,t.apply(void 0,arguments)),a()}else t.apply(void 0,arguments)},[t,n,a,r]),l=1===c.current?"rgba(0, 0, 0, 0.25)":"";return o.a.createElement(Ue.a,{style:{backgroundColor:l,transition:"background-color 300ms linear"},onClick:s,edge:"end"},o.a.createElement(mt.a,null))}bt.defaultProps={needDoubleClick:!1,timeout:1e3};var Ot=bt;var gt=function(e){var t=e.onClick;return o.a.createElement(lt.a,{style:{backgroundColor:ft.a,color:"#fff"},size:"medium",fullWidth:!0,color:"primary","aria-label":"add",onClick:t},"\u5f00\u59cb\u4e00\u9879\u4efb\u52a1")};function St(){var e=Object(Ae.g)(),t=Object(i.c)(),n=Object(u.useCallback)(function(){t(Object(m.e)())},[t]),r=Object(u.useCallback)(function(){t(Object(m.e)())},[t]),a=Object(u.useCallback)(function(){e.push("/")},[e]);return o.a.createElement(ut.a,{style:{backgroundColor:"white",flex:"0 0 60px"},position:"static"},o.a.createElement(ot.a,null,o.a.createElement(Ue.a,{edge:"start",onClick:n},o.a.createElement(st.a,null)),o.a.createElement("div",{className:"appbar-button",style:{flex:"1",padding:"0 5px"}},o.a.createElement(Ae.d,null,o.a.createElement(Ae.b,{path:"/edit/:id",component:_t}),o.a.createElement(Ae.b,{path:"/todo",component:Tt}),o.a.createElement(Ae.b,{render:function(){return o.a.createElement(gt,{onClick:r})}}))),o.a.createElement(Ot,{needDoubleClick:!0,onClick:a})))}St.defaultProps={};var Ct,vt=St,It=n(194),At=n(55),yt=n(111),ht=n.n(yt),jt=n(112),Rt=n.n(jt),Nt=n(110),Kt=n.n(Nt),Ft=n(192),Dt=n(193),wt="success",Ut="error",Gt=(Ct={},Object(At.a)(Ct,wt,ft.b),Object(At.a)(Ct,Ut,ft.d),Object(At.a)(Ct,"warn",ft.e),Ct);var xt=o.a.forwardRef(function(e,t){var n=e.type,r=e.title,a=e.style,c=e.subtitle,u={borderRadius:"50%",overflow:"hidden",color:"#fff",width:"48px",height:"48px",backgroundColor:Gt[n]},i=o.a.createElement(Kt.a,{style:u});return n===Ut&&(i=o.a.createElement(ht.a,{style:u})),n===wt&&(i=o.a.createElement(Rt.a,{style:u})),o.a.createElement(Ft.a,{ref:t,style:a},o.a.createElement(Dt.a,{avatar:i,title:r,subheader:c}))});xt.types={SUCCESS:wt,ERROR:Ut,WARN:"warn"},xt.propTypes={type:Ce.a.oneOf(["warn",Ut,wt]),title:Ce.a.node.isRequired,subtitle:Ce.a.node,style:Ce.a.objectOf(Ce.a.oneOfType([Ce.a.string,Ce.a.number]))},xt.defaultProps={type:"none",subtitle:null,style:void 0};var Lt=xt,Mt=function(e){return e.getIn(["global","notifications"])};function Pt(){var e=Object(i.d)(Mt);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"NotificationsPanelContainer",style:{position:"absolute",top:"0",left:"0",width:"100%",zIndex:"4000",boxSizing:"border-box",padding:"0 20px"}},o.a.createElement(Le.a,null,e.map(function(e){var t=e.title,n=e.key,r=e.detail,a=void 0===r?null:r,c=e.type,u=void 0===c?"warn":c;return o.a.createElement(It.a,{key:n},o.a.createElement(Lt,{style:{marginTop:"20px"},type:u,title:t,subtitle:a}))}))))}Pt.defaultProps={};var Ht=Pt,$t=o.a.lazy(function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,220))});function Bt(e){var t=e.children,n=Object(i.d)(function(e){return e.getIn(["global","showSideMenu"])}),r=Object(pt.b)(n);return o.a.createElement("div",{className:"CommonLayout",style:{position:"relative",height:"100%",display:"flex",flexFlow:"column nowrap"}},o.a.createElement("div",{className:"CommonLayout-content",style:{position:"relative",flex:"1",overflowY:"scroll",overflowX:"hidden"}},t),o.a.createElement("div",{className:"CommonLayout-navbar",style:{flex:"0 0 60px"}},o.a.createElement(vt,null)),o.a.createElement(Ht,null),r?o.a.createElement(u.Suspense,{fallback:null},o.a.createElement($t,null)):null)}Bt.defaultProps={children:null};var Jt=Bt,Vt=n(195),Yt=n(98),zt=n.n(Yt);function Wt(e){var t=e.$task,n=e.onCreateNewTaskItem,r=e.onClickRemoveButton,a=e.onClickEditButton,c=Object(u.useState)(""),i=Object(je.a)(c,2),s=i[0],l=i[1],f=Object(u.useCallback)(function(e){l(e.target.value)},[]),d=Object(u.useCallback)(function(e){var t=e.keyCode,r=void 0===t?-1:t,a=e.target.value;0!==a.length&&13===r&&(n(Object(b.Map)({id:Object(S.f)(),title:a,checked:!1})),l(""))},[l,n]),T=Object(u.useCallback)(function(){a(t.get("id"))},[t,a]);return o.a.createElement(De.a,null,o.a.createElement(Ke.a,{dense:!0},o.a.createElement(we.a,{variant:"h4",gutterBottom:!0},t.get("title")),o.a.createElement(Ue.a,{onClick:T},o.a.createElement(Ne.a,null))),o.a.createElement(Le.a,null,t.getIn(["items","refs"]).map(function(e){var n=t.getIn(["items","entity",e]);return o.a.createElement(qe.a,{key:n.get("id"),timeout:600},o.a.createElement("div",null,o.a.createElement(Ke.a,null,o.a.createElement(Be,{disabled:!0,edge:"start",checked:n.get("checked")}),o.a.createElement(Fe.a,{primary:n.get("title")}),o.a.createElement(Ue.a,{onClick:function(){return r(n)}},o.a.createElement(zt.a,null))),o.a.createElement(Ge.a,{variant:"middle"})))})),o.a.createElement(Ke.a,null,o.a.createElement(Vt.a,{value:s,onKeyUp:d,onChange:f,placeholder:"\u65b0\u589e\u5f85\u505a\u4e8b\u9879",fullWidth:!0})))}Wt.defaultProps={onCreateNewTaskItem:function(){console.log("onCreateNewTaskItem")},onClickRemoveButton:function(){console.log("onCreateNewTaskItem")},onClickCheckbox:function(){console.log("onClickCheckbox")},onClickEditButton:function(){console.log("onClickEditButton")}};var qt=Wt;function Xt(e){var t=e.$currentEditingTask,n=Object(Ae.h)().id,r=Object(u.useState)(!1),a=Object(je.a)(r,2),c=a[0],s=a[1],l=Object(u.useState)(!1),f=Object(je.a)(l,2),d=f[0],T=f[1],E=Object(i.c)();Object(u.useEffect)(function(){c||(E(m.a.effectGetTask(n)),null!=t&&s(!0))},[n,c,s,t]),Object(u.useEffect)(function(){return function(){E(m.a.clearAllEdtingHistory()),E(m.a.changeCurrentTask(null))}},[n]),Object(u.useEffect)(function(){c&&d&&E(m.a.effectUpdateTask(t))},[c,d,t]);var _=Object(u.useCallback)(function(e){E(m.a.snapshotCurrentTask()),E(m.a.addTaskItemInCurrentTask(e)),E(m.a.clearFutureTasks()),T(!0)},[]),k=Object(u.useCallback)(function(e){E(m.a.snapshotCurrentTask()),E(m.a.removeTaskItemInCurrentTask(e)),T(!0)},[]);return null==t?o.a.createElement(Pe,{message:"Loding..."}):o.a.createElement(qt,{onCreateNewTaskItem:_,onClickRemoveButton:k,$task:t,isEditable:!0})}Xt.defaultProps={$currentEditingTask:null};var Qt=Object(i.b)(function(e){var t=e.get("global"),n=e.get("task"),r=e.get("editingTask");return{showSideMenu:t.get("showSideMenu"),$tasksEntity:n.getIn(["tasks","entity"]),$currentEditingTask:r.get("currentTask")}},null)(Xt),Zt=function(e){return e.getIn(["user","hasLogin"])};function en(){var e=Object(i.d)(Zt),t=Object(i.c)();return Object(u.useEffect)(function(){e&&t(m.f.effectGetTaskList())},[e]),o.a.createElement(Jt,null,o.a.createElement(Ae.d,null,o.a.createElement(Ae.b,{path:"/todo/:id",component:Ye}),o.a.createElement(Ae.b,{path:"/edit/:id",component:Qt}),o.a.createElement(Ae.b,{component:ct})))}var tn=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(Ae.b,{path:"/",component:en}),o.a.createElement(Ae.b,{path:"/account",component:he}))};var nn=function(){return o.a.createElement(i.a,{store:me},o.a.createElement(Ie,null,o.a.createElement("div",{id:"app-main",style:{height:"100vh",overflow:"hidden"}},o.a.createElement(s.a,null,o.a.createElement(tn,null)))))};n(154);c.a.render(o.a.createElement(nn),document.getElementById("root"))},17:function(e,t,n){"use strict";n.r(t),n.d(t,"CHANGE_CURRENT_TASK",function(){return r}),n.d(t,"ADD_TASK_ITEM_IN_CURRENT_TASK",function(){return a}),n.d(t,"REMOVE_TASK_ITEM_IN_CURRENT_TASK",function(){return c}),n.d(t,"SNAPSHOT_CURRENT_TASK",function(){return u}),n.d(t,"UNDO_CURRENT_TASK",function(){return o}),n.d(t,"REDO_CURRENT_TASK",function(){return i}),n.d(t,"CLEAR_FUTURE_TASKS",function(){return s}),n.d(t,"CLEAR_EDITNG_HISTORY",function(){return l}),n.d(t,"EFFECT_UPDATE_TASK",function(){return f}),n.d(t,"EFFECT_GET_TASK",function(){return d});var r="editingTask/CHANGE_CURRENT_TASK",a="editingTask/ADD_TASK_ITEM_IN_CURRENT_TASK",c="editingTask/REMOVE_TASK_ITEM_IN_CURRENT_TASK",u="editingTask/SNAPSHOT_CURRENT_TASK",o="editingTask/UNDO_CURRENT_TASK",i="editingTask/REDO_CURRENT_TASK",s="editingTask/CLEAR_FUTURE_TASKS",l="editingTask/CLEAR_EDITNG_HISTORY",f="editingtask/EFFECT_UPDATE_TASK",d="editingTask/EFFECT_GET_TASK"},22:function(e,t,n){"use strict";n.r(t),n.d(t,"LOGIN_SUCCESS",function(){return r}),n.d(t,"LOGIN_FAIL",function(){return a}),n.d(t,"LOGOUT",function(){return c}),n.d(t,"REGISTER_SUCCESS",function(){return u}),n.d(t,"REGISTER_FAIL",function(){return o}),n.d(t,"EFFECT_GET_USERINFO",function(){return i}),n.d(t,"EFFECT_LOGIN",function(){return s}),n.d(t,"EFFECT_REGISTER",function(){return l});var r="LOGIN_SUCCESS",a="LOGIN_FAIL",c="LOGOUT",u="REGISTER_SUCCESS",o="REGISTER_FAIL",i="EFFECT_GET_USERINFO",s="EFFECT_LOGIN",l="EFFECT_REGISTER"},26:function(e,t,n){"use strict";n.r(t),n.d(t,"SHOW_SIDE_MENU",function(){return r}),n.d(t,"HIDE_SIDE_MENU",function(){return a}),n.d(t,"ADD_ONE_NOTIFICATION",function(){return c}),n.d(t,"REMOVE_THE_TOP_NOTIFICATION",function(){return u});var r="global/SHOW_SIDE_MENU",a="global/HIDE_SIDE_MENU",c="ADD_ONE_NOTIFICATION",u="REMOVE_THE_TOP_NOTIFICATION"},35:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a}),n.d(t,"e",function(){return c}),n.d(t,"c",function(){return u}),n.d(t,"d",function(){return o});var r="#2196f3",a="#43a047",c="#fdd835",u="#ff5722",o="#f44336"},4:function(e,t,n){"use strict";var r={};n.r(r),n.d(r,"changeTasks",function(){return s}),n.d(r,"addTaskToTasks",function(){return l}),n.d(r,"removeTaskInTasks",function(){return f}),n.d(r,"changeCurrentTodoTask",function(){return d}),n.d(r,"changeCurrentTodoTaskById",function(){return T}),n.d(r,"checkTaskItemInTaskItemsByTaskId",function(){return E}),n.d(r,"toggleTaskItemPropChecked",function(){return _}),n.d(r,"updateTaskInTasks",function(){return k}),n.d(r,"effectGetTaskList",function(){return m}),n.d(r,"effectDeleteTask",function(){return p}),n.d(r,"effectGetTask",function(){return b});var a={};n.r(a),n.d(a,"showSideMenu",function(){return g}),n.d(a,"hideSideMenu",function(){return S}),n.d(a,"addOneNitification",function(){return C}),n.d(a,"removeTheTopNitification",function(){return v});var c={};n.r(c),n.d(c,"changeCurrentTask",function(){return A}),n.d(c,"addTaskItemInCurrentTask",function(){return y}),n.d(c,"removeTaskItemInCurrentTask",function(){return h}),n.d(c,"undoCurrentTask",function(){return j}),n.d(c,"redoCurrentTask",function(){return R}),n.d(c,"snapshotCurrentTask",function(){return N}),n.d(c,"clearFutureTasks",function(){return K}),n.d(c,"clearAllEdtingHistory",function(){return F}),n.d(c,"effectUpdateTask",function(){return D}),n.d(c,"effectGetTask",function(){return w});var u={};n.r(u),n.d(u,"createTask",function(){return G}),n.d(u,"updateTask",function(){return x});var o={};n.r(o),n.d(o,"loginSuccess",function(){return M}),n.d(o,"loginFail",function(){return P}),n.d(o,"logout",function(){return H}),n.d(o,"registerSuccess",function(){return $}),n.d(o,"registerFail",function(){return B}),n.d(o,"effectGetUserInfo",function(){return J}),n.d(o,"effectLogin",function(){return V}),n.d(o,"effectRegister",function(){return Y});var i=n(15),s=function(e){return{type:i.CHANGE_TASKS,payload:e}},l=function(e){return{type:i.ADD_TASK_TO_TASKS,payload:e}},f=function(e){return{type:i.REMOVE_TASK_IN_TASKS,payload:e}},d=function(e){return{type:i.CHANGE_CURRENT_TODO_TASK,payload:e}},T=function(e){return{type:i.CHANGE_CURRENT_TODO_TASK_BY_ID,payload:e}},E=function(e){return{type:i.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_TASK_ID,payload:e}},_=function(e){return{type:i.TOGGLE_TASK_ITEM_CHECKED,payload:e}},k=function(e){return{type:i.UPDATE_TASK_IN_TASKS,payload:e}},m=function(){return{type:i.EFFECT_GET_TASK_LIST}},p=function(e){return{type:i.EFFECT_DELETE_TASK,payload:e}},b=function(e){return{type:i.EFFECT_GET_TASK,payload:e}},O=n(26),g=function(){return{type:O.SHOW_SIDE_MENU}},S=function(){return{type:O.HIDE_SIDE_MENU}},C=function(e){return{type:O.ADD_ONE_NOTIFICATION,payload:e}},v=function(){return{type:O.REMOVE_THE_TOP_NOTIFICATION}},I=n(17),A=function(e){return{type:I.CHANGE_CURRENT_TASK,payload:e}},y=function(e){return{type:I.ADD_TASK_ITEM_IN_CURRENT_TASK,payload:e}},h=function(e){return{type:I.REMOVE_TASK_ITEM_IN_CURRENT_TASK,payload:e}},j=function(){return{type:I.UNDO_CURRENT_TASK}},R=function(){return{type:I.REDO_CURRENT_TASK}},N=function(){return{type:I.SNAPSHOT_CURRENT_TASK}},K=function(){return{type:I.CLEAR_FUTURE_TASKS}},F=function(){return{type:I.CLEAR_EDITNG_HISTORY}},D=function(e){return{type:I.EFFECT_UPDATE_TASK,payload:e}},w=function(e){return{type:I.EFFECT_GET_TASK,payload:e}},U=n(57),G=function(e){return{type:U.EFFECT_CREATE_TASK,payload:e}},x=function(e){return{type:U.EFFECT_UPDATE_TASK,payload:e}},L=n(22),M=function(e){return{type:L.LOGIN_SUCCESS,payload:e}},P=function(e){return{type:L.LOGIN_FAIL,payload:e}},H=function(){return{type:L.LOGOUT}},$=function(e){return{type:L.REGISTER_SUCCESS,payload:e}},B=function(e){return{type:L.REGISTER_FAIL,payload:e}},J=function(){return{type:L.EFFECT_GET_USERINFO}},V=function(e){return{type:L.EFFECT_LOGIN,payload:e}},Y=function(e){return{type:L.EFFECT_REGISTER,payload:e}};n.d(t,"e",function(){return g}),n.d(t,"d",function(){return S}),n.d(t,"f",function(){return r}),n.d(t,"c",function(){return a}),n.d(t,"a",function(){return c}),n.d(t,"g",function(){return o}),n.d(t,"b",function(){return u})},57:function(e,t,n){"use strict";n.r(t),n.d(t,"EFFECT_CREATE_TASK",function(){return r}),n.d(t,"EFFECT_UPDATE_TASK",function(){return a});var r="EFFECT_CREATE_TASK",a="EFFECT_UPDATE_TASK"},66:function(e,t,n){"use strict";n.d(t,"c",function(){return c}),n.d(t,"b",function(){return u}),n.d(t,"a",function(){return o});var r=n(28),a=n(0);function c(){var e=Object(a.useState)(navigator.onLine),t=Object(r.a)(e,2),n=t[0],c=t[1],u=Object(a.useCallback)(function(){c(!0)},[]),o=Object(a.useCallback)(function(){c(!1)},[c]);return Object(a.useEffect)(function(){return window.addEventListener("online",u),window.addEventListener("offline",o),function(){window.removeEventListener("online",u),window.removeEventListener("offline",o)}},[c,u,o]),n}function u(e){var t=Object(a.useRef)(e);return e&&(t.current=e),t.current}function o(){var e=Object(a.useState)(0),t=Object(r.a)(e,2)[1];return Object(a.useCallback)(function(){t(function(e){return e+1})},[t])}}},[[121,3,4]],[0,1]]);
//# sourceMappingURL=main.25677fee.chunk.js.map