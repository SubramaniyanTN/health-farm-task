module.exports = {
  replaceAttrValues: [
    { "#000": "currentColor" },
    { black: "currentColor" },
    { red: "currentColor" },
    { "#000000": "currentColor" },
    { "#000": "props.stroke" },
    { 1: "{props.strokeWidth}" },
  ],

  svgProps: {
    fill: "currentColor",
    stroke: "{props.stroke}",
    strokeWidth: "{props.strokeWidth}",
    className: "{props.className}",
  },
};
