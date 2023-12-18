const resize = () => {
  const Container = document.getElementById("gameContainer");
  const canvas = document.getElementById("canvasGame");
  const windowHeight = window.innerHeight - 1;
  const height = window.innerHeight - 2;
  const width = Container.clientWidth - 2;

  let scale = 1;
  let containerHeight = 1;
  let heightScale = height / 1024;
  let widthScale = width / 1024;

  if (heightScale < widthScale) {
    scale = heightScale;
    containerHeight = windowHeight;
  } else {
    scale = widthScale;
    containerHeight = width + 2;
  }

  Container.style.height = `${containerHeight}px`;
  canvas.style.transform = `scale(${scale})`;
};

export default resize;
