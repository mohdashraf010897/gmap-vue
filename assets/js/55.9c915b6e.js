(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{340:function(t,a,e){"use strict";e.r(a);var s=e(15),n=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"map-element"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#map-element"}},[t._v("#")]),t._v(" map-element")]),t._v(" "),a("p",[a("a",{attrs:{name:"mapElementMixin"}})]),t._v(" "),a("h2",{attrs:{id:"mapelementmixin"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mapelementmixin"}},[t._v("#")]),t._v(" mapElementMixin")]),t._v(" "),a("p",[t._v("MapElementMixin")]),t._v(" "),a("p",[t._v("Add a inject object to inject $mapPromise and a provide function to the\ncomponent this function save the returned Google Maps object in the $map\nproperty after the $mapPromise is resolved.")]),t._v(" "),a("h2",{attrs:{id:"the-mixin-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#the-mixin-code"}},[t._v("#")]),t._v(" The mixin code:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("inject")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("$mapPromise")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abcdef'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("provide")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$mapPromise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$map "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" map"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("strong",[t._v("Kind")]),t._v(": global class"),a("br"),t._v(" "),a("strong",[t._v("Properties")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("$mapPromise")]),t._v(" "),a("td",[t._v("The map property that should return the "),a("code",[t._v("$map")]),t._v("."),a("br"),t._v(" "),a("strong",[t._v("Note")]),t._v(': although this mixin is not "providing" anything,           components\' expect the '),a("code",[t._v("$map")]),t._v(" property to be present on the component.           In order for that to happen, this mixin must intercept the "),a("code",[t._v("$mapPromise .then(() => )")]),t._v(" first before its component does so.           Since a "),a("code",[t._v("provide()")]),t._v(" on a mixin is executed before a "),a("code",[t._v("provide()")]),t._v(" on the           component, putting this code in "),a("code",[t._v("provide()")]),t._v(" ensures that the "),a("code",[t._v("$map")]),t._v(" is           already set by the time the component's "),a("code",[t._v("provide()")]),t._v(" is called.")])]),t._v(" "),a("tr",[a("td",[t._v("$map")]),t._v(" "),a("td",[t._v("The Google map (valid only after the promise ("),a("code",[t._v("$mapPromise")]),t._v(") returns)")])])])])])}),[],!1,null,null,null);a.default=n.exports}}]);