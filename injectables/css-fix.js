const { minify } = require("terser");

const fn = function () {
  var hasTouchIntent = /iPhone|iPod|iPad/.test(navigator.platform);
  if (hasTouchIntent) {
    var style = document.createElement("style");
    style.innerText = "*{cursor:pointer;}";
    document.head.appendChild(style);
  }
};

const create = () => minify(`(${fn})()`).then(({ code }) => code);
module.exports = { create };
