(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/Shares.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/Shares.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nextcloud-axios */ "./node_modules/nextcloud-axios/dist/client.js");
/* harmony import */ var nextcloud_axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nextcloud-server/dist/router */ "./node_modules/nextcloud-server/dist/router.js");
/* harmony import */ var nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nextcloud_vue_dist_Components_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nextcloud-vue/dist/Components/Avatar */ "./node_modules/nextcloud-vue/dist/Components/Avatar.js");
/* harmony import */ var nextcloud_vue_dist_Components_Avatar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nextcloud_vue_dist_Components_Avatar__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Shares',
  components: {
    Avatar: nextcloud_vue_dist_Components_Avatar__WEBPACK_IMPORTED_MODULE_3___default.a
  },
  data: function data() {
    return {
      uniqueShareUIDs: [],
      uidDisplaynameMap: {},
      isLoading: true
    };
  },
  computed: {
    isEmptyList: function isEmptyList() {
      return this.isLoading === false && this.uniqueShareUIDs.length === 0;
    },
    emptyLabel: function emptyLabel() {
      return t('privacy', 'You don\'t have any shares with individual users.');
    }
  },
  mounted: function mounted() {
    var _this = this;

    var url = Object(nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_2__["generateOcsUrl"])('/apps/files_sharing/api/v1/shares?format=json&shared_with_me=false');
    var currentUserId = OC.getCurrentUser();
    nextcloud_axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(function (resp) {
      resp.data.ocs.data.forEach(function (d) {
        if (d.share_with === currentUserId) {
          return;
        }

        switch (d.share_type) {
          case 0:
            if (_this.uniqueShareUIDs.indexOf(d.share_with) === -1) {
              _this.uniqueShareUIDs.push(d.share_with);

              vue__WEBPACK_IMPORTED_MODULE_1__["default"].set(_this.uidDisplaynameMap, d.share_with, d.share_with_displayname);
            }

            break;

          default:
            break;
        }
      });
      _this.isLoading = false;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Shares.vue?vue&type=template&id=32d8f8a6&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Shares.vue?vue&type=template&id=32d8f8a6& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "who-has-access" },
    [
      _c("span", {
        staticClass: "icon icon-loading",
        class: { hidden: !_vm.isLoading }
      }),
      _vm._v(" "),
      _c("span", { class: { hidden: !_vm.isEmptyList } }, [
        _vm._v("\n\t\t" + _vm._s(_vm.emptyLabel) + "\n\t")
      ]),
      _vm._v(" "),
      _vm._l(_vm.uniqueShareUIDs, function(uid) {
        return _c("Avatar", {
          key: uid,
          attrs: {
            user: uid,
            "display-name": _vm.uidDisplaynameMap[uid],
            size: 64
          }
        })
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/Shares.vue":
/*!************************!*\
  !*** ./src/Shares.vue ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Shares_vue_vue_type_template_id_32d8f8a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shares.vue?vue&type=template&id=32d8f8a6& */ "./src/Shares.vue?vue&type=template&id=32d8f8a6&");
/* harmony import */ var _Shares_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shares.vue?vue&type=script&lang=js& */ "./src/Shares.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Shares_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Shares_vue_vue_type_template_id_32d8f8a6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Shares_vue_vue_type_template_id_32d8f8a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Shares.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Shares.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./src/Shares.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Shares_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./Shares.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/Shares.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Shares_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Shares.vue?vue&type=template&id=32d8f8a6&":
/*!*******************************************************!*\
  !*** ./src/Shares.vue?vue&type=template&id=32d8f8a6& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Shares_vue_vue_type_template_id_32d8f8a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./Shares.vue?vue&type=template&id=32d8f8a6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Shares.vue?vue&type=template&id=32d8f8a6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Shares_vue_vue_type_template_id_32d8f8a6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Shares_vue_vue_type_template_id_32d8f8a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=privacy.6.6b6f01e65f47207d035a.js.map