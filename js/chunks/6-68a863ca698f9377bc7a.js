(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{390:function(n,t,e){"use strict";e.r(t);var i=e(31),a=e(409),r=e.n(a),o=e(397),s=e.n(o),c=e(116),d=e(402),u=e(410),l=e.n(u),p=e(420),m=e.n(p),v=e(448),f=e.n(v);function A(n,t,e,i,a,r,o){try{var s=n[r](o),c=s.value}catch(n){return void e(n)}s.done?t(c):Promise.resolve(c).then(i,a)}function h(n){return function(){var t=this,e=arguments;return new Promise((function(i,a){var r=n.apply(t,e);function o(n){A(r,i,a,o,s,"next",n)}function s(n){A(r,i,a,o,s,"throw",n)}o(void 0)}))}}var _={name:"Admins",components:{Actions:l.a,ActionButton:m.a,Avatar:f.a},directives:{ClickOutside:r.a},data:function(){return{admins:[],newAdditionalAdminInputField:"",isLoading:!0,isAdding:!1,isSavingChanges:!1}},mounted:function(){var n=this;return h(regeneratorRuntime.mark((function t(){var e,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=Object(c.generateUrl)("/apps/privacy/api/admins"),t.prev=1,t.next=4,s.a.get(e);case 4:a=t.sent,i.default.set(n,"admins",a.data),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),console.error(t.t0),Object(d.a)("Error loading additional administrator.");case 12:return t.prev=12,n.isLoading=!1,t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[1,8,12,15]])})))()},methods:{openNewAdmin:function(){this.isAdding=!0},closeNewAdmin:function(){this.isAdding=!1,this.newAdditionalAdminInputField=""},addAdditionalAdmin:function(){var n=this;return h(regeneratorRuntime.mark((function t(){var e,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=Object(c.generateUrl)("/apps/privacy/api/admins"),n.isSavingChanges=!0,t.prev=2,t.next=5,s.a.post(e,{name:n.newAdditionalAdminInputField});case 5:i=t.sent,n.admins.push(i.data),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(2),console.error(t.t0),Object(d.a)("Error adding new administrator.");case 13:return t.prev=13,n.isSavingChanges=!1,n.isAdding=!1,n.newAdditionalAdminInputField="",t.finish(13);case 18:case"end":return t.stop()}}),t,null,[[2,9,13,18]])})))()},deleteAdditionalAdmin:function(n){var t=this;return h(regeneratorRuntime.mark((function e(){var i,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=Object(c.generateUrl)("/apps/privacy/api/admins/{id}",{id:n.id}),e.prev=1,e.next=4,s.a.delete(i);case 4:-1!==(a=t.admins.indexOf(n))&&t.admins.splice(a,1),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0),Object(d.a)("Error deleting new administrator.");case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()}}},g=e(401),w=Object(g.a)(_,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"who-has-access"},[e("span",{staticClass:"icon icon-loading",class:{hidden:!n.isLoading}}),n._v(" "),n._l(n.admins,(function(t){return e("div",{key:t.id,staticClass:"admin-avatar-container"},[e("Avatar",{attrs:{user:t.internal?t.id:null,"display-name":t.displayname,size:64,"is-no-user":!t.internal,"show-user-status":!1}}),n._v(" "),t.internal?n._e():e("Actions",[e("ActionButton",{attrs:{icon:"icon-close"},on:{click:function(e){return n.deleteAdditionalAdmin(t)}}},[n._v("\n\t\t\t\t"+n._s(n.$t("privacy","Remove external admin"))+"\n\t\t\t")])],1)],1)})),n._v(" "),n.$is_admin?e("div",[n.isAdding?n._e():e("Actions",{staticClass:"addAdditionalAdmin"},[e("ActionButton",{attrs:{icon:"icon-add"},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),n.openNewAdmin.apply(null,arguments)}}},[n._v("\n\t\t\t\t"+n._s(n.$t("privacy","Add external admin"))+"\n\t\t\t")])],1),n._v(" "),n.isAdding?e("form",{directives:[{name:"click-outside",rawName:"v-click-outside",value:n.closeNewAdmin,expression:"closeNewAdmin"}],staticClass:"addAdditionalAdminFormContainer",on:{submit:function(t){return t.preventDefault(),n.addAdditionalAdmin.apply(null,arguments)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:n.newAdditionalAdminInputField,expression:"newAdditionalAdminInputField"}],attrs:{type:"text",maxlength:"64",autocomplete:"new-password",autocorrect:"off",autocapitalize:"off",spellcheck:"false",placeholder:n.$t("privacy","Name of external admin")},domProps:{value:n.newAdditionalAdminInputField},on:{input:function(t){t.target.composing||(n.newAdditionalAdminInputField=t.target.value)}}}),n._v(" "),e("input",{staticClass:"icon-confirm",attrs:{type:"submit",value:""}})]):n._e()],1):n._e()],2)}),[],!1,null,null,null);t.default=w.exports},409:function(n,t){function e(n){return"function"==typeof n.value||(console.warn("[Vue-click-outside:] provided expression",n.expression,"is not a function."),!1)}function i(n){return void 0!==n.componentInstance&&n.componentInstance.$isServer}n.exports={bind:function(n,t,a){if(!e(t))return;function r(t){if(a.context){var e=t.path||t.composedPath&&t.composedPath();e&&e.length>0&&e.unshift(t.target),n.contains(t.target)||function(n,t){if(!n||!t)return!1;for(var e=0,i=t.length;e<i;e++)try{if(n.contains(t[e]))return!0;if(t[e].contains(n))return!1}catch(n){return!1}return!1}(a.context.popupItem,e)||n.__vueClickOutside__.callback(t)}}n.__vueClickOutside__={handler:r,callback:t.value};const o="ontouchstart"in document.documentElement?"touchstart":"click";!i(a)&&document.addEventListener(o,r)},update:function(n,t){e(t)&&(n.__vueClickOutside__.callback=t.value)},unbind:function(n,t,e){const a="ontouchstart"in document.documentElement?"touchstart":"click";!i(e)&&n.__vueClickOutside__&&document.removeEventListener(a,n.__vueClickOutside__.handler),delete n.__vueClickOutside__}}}}]);
//# sourceMappingURL=6-68a863ca698f9377bc7a.js.map