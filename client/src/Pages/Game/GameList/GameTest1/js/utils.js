export const mousePostion = (canvas, evt, scale) => {
  let rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / scale,
    y: (evt.clientY - rect.top) / scale,
  };
};
