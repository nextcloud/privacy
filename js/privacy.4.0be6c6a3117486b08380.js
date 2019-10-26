(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/Admins.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/Admins.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-click-outside */ "./node_modules/vue-click-outside/index.js");
/* harmony import */ var vue_click_outside__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_click_outside__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nextcloud_axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nextcloud-axios */ "./node_modules/nextcloud-axios/dist/client.js");
/* harmony import */ var nextcloud_axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nextcloud_axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var nextcloud_vue_dist_Components_Actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nextcloud-vue/dist/Components/Actions */ "./node_modules/nextcloud-vue/dist/Components/Actions.js");
/* harmony import */ var nextcloud_vue_dist_Components_Actions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nextcloud_vue_dist_Components_Actions__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nextcloud_vue_dist_Components_ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nextcloud-vue/dist/Components/ActionButton */ "./node_modules/nextcloud-vue/dist/Components/ActionButton.js");
/* harmony import */ var nextcloud_vue_dist_Components_ActionButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nextcloud_vue_dist_Components_ActionButton__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var nextcloud_vue_dist_Components_Avatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nextcloud-vue/dist/Components/Avatar */ "./node_modules/nextcloud-vue/dist/Components/Avatar.js");
/* harmony import */ var nextcloud_vue_dist_Components_Avatar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nextcloud_vue_dist_Components_Avatar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! nextcloud-server/dist/router */ "./node_modules/nextcloud-server/dist/router.js");
/* harmony import */ var nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_6__);
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
  name: 'Admins',
  components: {
    Actions: nextcloud_vue_dist_Components_Actions__WEBPACK_IMPORTED_MODULE_3___default.a,
    ActionButton: nextcloud_vue_dist_Components_ActionButton__WEBPACK_IMPORTED_MODULE_4___default.a,
    Avatar: nextcloud_vue_dist_Components_Avatar__WEBPACK_IMPORTED_MODULE_5___default.a
  },
  directives: {
    ClickOutside: vue_click_outside__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      admins: [],
      newAdditionalAdminInputField: '',
      isAdmin: false,
      isLoading: true,
      isAdding: false,
      isSavingChanges: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.isAdmin = OC.isUserAdmin();
    var url = Object(nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_6__["generateUrl"])('/apps/privacy/api/admins');
    nextcloud_axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(function (resp) {
      vue__WEBPACK_IMPORTED_MODULE_2__["default"].set(_this, 'admins', resp.data);
      _this.isLoading = false;
    });
  },
  methods: {
    openNewAdmin: function openNewAdmin() {
      var _this2 = this;

      setTimeout(function () {
        _this2.isAdding = true;
      }, 0);
    },
    closeNewAdmin: function closeNewAdmin() {
      this.isAdding = false;
      this.newAdditionalAdminInputField = '';
    },
    addAdditionalAdmin: function addAdditionalAdmin() {
      var _this3 = this;

      console.warn(this.newAdditionalAdminInputField);
      var url = Object(nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_6__["generateUrl"])('/apps/privacy/api/admins');
      this.isSavingChanges = true;
      nextcloud_axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(url, {
        name: this.newAdditionalAdminInputField
      }).then(function (resp) {
        _this3.admins.push(resp.data);

        _this3.isSavingChanges = false;
        _this3.isAdding = false;
        _this3.newAdditionalAdminInputField = '';
      });
    },
    deleteAdditionalAdmin: function deleteAdditionalAdmin(admin) {
      var _this4 = this;

      var url = Object(nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_6__["generateUrl"])('/apps/privacy/api/admins/{id}', {
        id: admin.id
      });
      nextcloud_axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(url).then(function (resp) {
        var index = _this4.admins.indexOf(admin);

        _this4.admins.splice(index, 1);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-click-outside/index.js":
/*!*************************************************!*\
  !*** ./node_modules/vue-click-outside/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function validate(binding) {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

function isPopup(popupItem, elements) {
  if (!popupItem || !elements)
    return false

  for (var i = 0, len = elements.length; i < len; i++) {
    try {
      if (popupItem.contains(elements[i])) {
        return true
      }
      if (elements[i].contains(popupItem)) {
        return false
      }
    } catch(e) {
      return false
    }
  }

  return false
}

function isServer(vNode) {
  return typeof vNode.componentInstance !== 'undefined' && vNode.componentInstance.$isServer
}

exports = module.exports = {
  bind: function (el, binding, vNode) {
    if (!validate(binding)) return

    // Define Handler and cache it on the element
    function handler(e) {
      if (!vNode.context) return

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      var elements = e.path || (e.composedPath && e.composedPath())
      elements && elements.length > 0 && elements.unshift(e.target)
      
      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return

      el.__vueClickOutside__.callback(e)
    }

    // add Event Listeners
    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value
    }
    !isServer(vNode) && document.addEventListener('click', handler)
  },

  update: function (el, binding) {
    if (validate(binding)) el.__vueClickOutside__.callback = binding.value
  },
  
  unbind: function (el, binding, vNode) {
    // Remove Event Listeners
    !isServer(vNode) && document.removeEventListener('click', el.__vueClickOutside__.handler)
    delete el.__vueClickOutside__
  }
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Admins.vue?vue&type=template&id=7a29763d&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Admins.vue?vue&type=template&id=7a29763d& ***!
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
      _vm._l(_vm.admins, function(admin) {
        return _c(
          "div",
          { key: admin.id, staticClass: "admin-avatar-container" },
          [
            _c("Avatar", {
              attrs: {
                user: admin.internal ? admin.id : null,
                "display-name": admin.displayname,
                size: 64,
                "is-no-user": !admin.internal
              }
            }),
            _vm._v(" "),
            !admin.internal
              ? _c(
                  "Actions",
                  [
                    _c(
                      "ActionButton",
                      {
                        attrs: { icon: "icon-close" },
                        on: {
                          click: function($event) {
                            return _vm.deleteAdditionalAdmin(admin)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t" +
                            _vm._s(_vm.t("privacy", "Remove external admin")) +
                            "\n\t\t\t"
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e()
          ],
          1
        )
      }),
      _vm._v(" "),
      _vm.isAdmin
        ? _c(
            "div",
            [
              !_vm.isAdding
                ? _c(
                    "Actions",
                    { staticClass: "addAdditionalAdmin" },
                    [
                      _c(
                        "ActionButton",
                        {
                          attrs: { icon: "icon-add" },
                          on: { click: _vm.openNewAdmin }
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t" +
                              _vm._s(_vm.t("privacy", "Add external admin")) +
                              "\n\t\t\t"
                          )
                        ]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.isAdding
                ? _c(
                    "form",
                    {
                      directives: [
                        {
                          name: "click-outside",
                          rawName: "v-click-outside",
                          value: _vm.closeNewAdmin,
                          expression: "closeNewAdmin"
                        }
                      ],
                      staticClass: "addAdditionalAdminFormContainer",
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.addAdditionalAdmin($event)
                        }
                      }
                    },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.newAdditionalAdminInputField,
                            expression: "newAdditionalAdminInputField"
                          }
                        ],
                        attrs: {
                          type: "text",
                          maxlength: "64",
                          autocomplete: "new-password",
                          autocorrect: "off",
                          autocapitalize: "off",
                          spellcheck: "false",
                          placeholder: _vm.additionalAdminPlaceholderLabel
                        },
                        domProps: { value: _vm.newAdditionalAdminInputField },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.newAdditionalAdminInputField =
                              $event.target.value
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("input", {
                        staticClass: "icon-confirm",
                        attrs: { type: "submit", value: "" }
                      })
                    ]
                  )
                : _vm._e()
            ],
            1
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/Admins.vue":
/*!************************!*\
  !*** ./src/Admins.vue ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Admins_vue_vue_type_template_id_7a29763d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Admins.vue?vue&type=template&id=7a29763d& */ "./src/Admins.vue?vue&type=template&id=7a29763d&");
/* harmony import */ var _Admins_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Admins.vue?vue&type=script&lang=js& */ "./src/Admins.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Admins_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Admins_vue_vue_type_template_id_7a29763d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Admins_vue_vue_type_template_id_7a29763d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Admins.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Admins.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./src/Admins.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Admins_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./Admins.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/Admins.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Admins_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Admins.vue?vue&type=template&id=7a29763d&":
/*!*******************************************************!*\
  !*** ./src/Admins.vue?vue&type=template&id=7a29763d& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Admins_vue_vue_type_template_id_7a29763d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./Admins.vue?vue&type=template&id=7a29763d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Admins.vue?vue&type=template&id=7a29763d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Admins_vue_vue_type_template_id_7a29763d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Admins_vue_vue_type_template_id_7a29763d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=privacy.4.0be6c6a3117486b08380.js.map