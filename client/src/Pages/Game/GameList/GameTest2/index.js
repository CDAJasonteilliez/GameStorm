const GameTest2 = () => {
  console.log("Run GameTest2");
  const canvas = document.getElementById("canvasGame");
  const c = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 600;

  const animate = () => {
    window.requestAnimationFrame(animate);
  };
  animate();
};

export default GameTest2;
