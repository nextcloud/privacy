(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/Encryption.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/Encryption.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nextcloud-axios */ "./node_modules/nextcloud-axios/dist/client.js");
/* harmony import */ var nextcloud_axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_click_outside__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-click-outside */ "./node_modules/vue-click-outside/index.js");
/* harmony import */ var vue_click_outside__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_click_outside__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nextcloud-server/dist/router */ "./node_modules/nextcloud-server/dist/router.js");
/* harmony import */ var nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nextcloud_vue_dist_Components_Actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nextcloud-vue/dist/Components/Actions */ "./node_modules/nextcloud-vue/dist/Components/Actions.js");
/* harmony import */ var nextcloud_vue_dist_Components_Actions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nextcloud_vue_dist_Components_Actions__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nextcloud_vue_dist_Components_ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nextcloud-vue/dist/Components/ActionButton */ "./node_modules/nextcloud-vue/dist/Components/ActionButton.js");
/* harmony import */ var nextcloud_vue_dist_Components_ActionButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nextcloud_vue_dist_Components_ActionButton__WEBPACK_IMPORTED_MODULE_4__);
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
  name: 'Encryption',
  components: {
    Actions: nextcloud_vue_dist_Components_Actions__WEBPACK_IMPORTED_MODULE_3___default.a,
    ActionButton: nextcloud_vue_dist_Components_ActionButton__WEBPACK_IMPORTED_MODULE_4___default.a
  },
  directives: {
    ClickOutside: vue_click_outside__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      fullDiskEncryptionEnabled: false,
      serverSideEncryptionEnabled: false,
      isAdmin: true,
      isEditing: false,
      isSavingChanges: false
    };
  },
  computed: {
    label: function label() {
      if (!this.serverSideEncryptionEnabled && !this.fullDiskEncryptionEnabled) {
        return t('privacy', 'Your files are not protected by encryption.');
      } else if (this.serverSideEncryptionEnabled && !this.fullDiskEncryptionEnabled) {
        return t('privacy', 'Your files are encrypted with {linkopen}server-side-encryption ↗{linkclose}.').replace('{linkopen}', '<a href="https://nextcloud.com/blog/encryption-in-nextcloud/" target="_blank" title="" rel="noreferrer noopener">').replace('{linkclose}', '</a>');
      } else if (!this.serverSideEncryptionEnabled && this.fullDiskEncryptionEnabled) {
        return t('privacy', 'This server is protected with full-disk-encryption.');
      } else {
        return t('privacy', 'Your files are encrypted with {linkopen}server-side-encryption ↗{linkclose}. Additionally, this server is protected with full-disk-encryption.').replace('{linkopen}', '<a href="https://nextcloud.com/blog/encryption-in-nextcloud/" target="_blank" title="" rel="noreferrer noopener">').replace('{linkclose}', '</a>');
      }
    },
    checkboxLabel: function checkboxLabel() {
      return t('privacy', 'This server is using full-disk-encryption.');
    }
  },
  created: function created() {
    this.fullDiskEncryptionEnabled = this.$parent.fullDiskEncryptionEnabled;
    this.serverSideEncryptionEnabled = this.$parent.serverSideEncryptionEnabled;
    this.isAdmin = OC.isUserAdmin();
  },
  methods: {
    openEditFullDiskEncryptionForm: function openEditFullDiskEncryptionForm() {
      var _this = this;

      setTimeout(function () {
        _this.isEditing = true;
      }, 0);
    },
    cancelEditFullDiskEncryptionForm: function cancelEditFullDiskEncryptionForm() {
      this.isEditing = false;
    },
    saveFullDiskEncryptionForm: function saveFullDiskEncryptionForm() {
      var _this2 = this;

      var url = Object(nextcloud_server_dist_router__WEBPACK_IMPORTED_MODULE_2__["generateUrl"])('/apps/privacy/api/fullDiskEncryption');
      this.isSavingChanges = true;
      nextcloud_axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, {
        enabled: this.fullDiskEncryptionEnabled ? '1' : '0'
      }).then(function (resp) {
        _this2.isSavingChanges = false;
        _this2.isEditing = false;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Encryption.vue?vue&type=template&id=0fc4e288&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Encryption.vue?vue&type=template&id=0fc4e288& ***!
  \*****************************************************************************************************************************************************************************************/
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
      _c("p", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: !_vm.isEditing,
            expression: "!isEditing"
          }
        ],
        domProps: { innerHTML: _vm._s(_vm.label) }
      }),
      _vm._v(" "),
      _vm.isAdmin && !_vm.isEditing
        ? _c(
            "Actions",
            [
              _c("ActionButton", {
                attrs: { icon: "icon-rename" },
                on: { click: _vm.openEditFullDiskEncryptionForm }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.isEditing
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "click-outside",
                  rawName: "v-click-outside",
                  value: _vm.cancelEditFullDiskEncryptionForm,
                  expression: "cancelEditFullDiskEncryptionForm"
                }
              ]
            },
            [
              _c("form", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fullDiskEncryptionEnabled,
                      expression: "fullDiskEncryptionEnabled"
                    }
                  ],
                  staticClass: "checkbox",
                  attrs: {
                    id: "fullDiskEncryptionEnabledCheckbox",
                    disabled: _vm.isSavingChanges,
                    type: "checkbox",
                    name: "fullDiskEncryptionEnabledCheckbox"
                  },
                  domProps: {
                    checked: Array.isArray(_vm.fullDiskEncryptionEnabled)
                      ? _vm._i(_vm.fullDiskEncryptionEnabled, null) > -1
                      : _vm.fullDiskEncryptionEnabled
                  },
                  on: {
                    change: [
                      function($event) {
                        var $$a = _vm.fullDiskEncryptionEnabled,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              (_vm.fullDiskEncryptionEnabled = $$a.concat([
                                $$v
                              ]))
                          } else {
                            $$i > -1 &&
                              (_vm.fullDiskEncryptionEnabled = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.fullDiskEncryptionEnabled = $$c
                        }
                      },
                      _vm.saveFullDiskEncryptionForm
                    ]
                  }
                }),
                _vm._v(" "),
                _c(
                  "label",
                  { attrs: { for: "fullDiskEncryptionEnabledCheckbox" } },
                  [
                    _vm._v(
                      "\n\t\t\t\t" + _vm._s(_vm.checkboxLabel) + "\n\t\t\t"
                    )
                  ]
                )
              ])
            ]
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/Encryption.vue":
/*!****************************!*\
  !*** ./src/Encryption.vue ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Encryption_vue_vue_type_template_id_0fc4e288___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Encryption.vue?vue&type=template&id=0fc4e288& */ "./src/Encryption.vue?vue&type=template&id=0fc4e288&");
/* harmony import */ var _Encryption_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Encryption.vue?vue&type=script&lang=js& */ "./src/Encryption.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Encryption_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Encryption_vue_vue_type_template_id_0fc4e288___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Encryption_vue_vue_type_template_id_0fc4e288___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Encryption.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Encryption.vue?vue&type=script&lang=js&":
/*!*****************************************************!*\
  !*** ./src/Encryption.vue?vue&type=script&lang=js& ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Encryption_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./Encryption.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/Encryption.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Encryption_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Encryption.vue?vue&type=template&id=0fc4e288&":
/*!***********************************************************!*\
  !*** ./src/Encryption.vue?vue&type=template&id=0fc4e288& ***!
  \***********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Encryption_vue_vue_type_template_id_0fc4e288___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./Encryption.vue?vue&type=template&id=0fc4e288& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Encryption.vue?vue&type=template&id=0fc4e288&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Encryption_vue_vue_type_template_id_0fc4e288___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Encryption_vue_vue_type_template_id_0fc4e288___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=privacy.5.32d0863eaf9d561a12e3.js.map