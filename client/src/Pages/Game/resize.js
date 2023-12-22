const resize = () => {
  const container = document.getElementById("gameContainer");
  const canvasContainer = document.getElementById("canvasContainer");
  const canvas = document.getElementById("canvasGame");

  const windowHeight = window.innerHeight - 10;
  const height = window.innerHeight - 10;
  const width = container.clientWidth - 10;

  let scale = 1;
  let containerHeight = 1;
  let heightScale = height / 1024;
  let widthScale = width / 1024;

  if (heightScale < widthScale) {
    scale = heightScale;
    containerHeight = windowHeight + 10;
  } else {
    scale = widthScale;
    containerHeight = width + 10;
  }

  container.style.height = `${containerHeight}px`;
  canvasContainer.style.height = `${containerHeight}px`;
  canvasContainer.style.width = `${containerHeight}px`;

  canvas.style.transform = `scale(${scale})`;
};

export default resize;
