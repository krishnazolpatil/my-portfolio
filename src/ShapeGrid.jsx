/* Shape-grid backdrop, from ReactBits (reactbits.dev/backgrounds/shape-grid).
   Three adaptations for using it as a whole-page background:
   · mouse tracking reads from window, not the canvas — the canvas sits behind
     the page, so it never receives a pointer event of its own and the hover
     square would otherwise never light up;
   · the backing store is scaled to devicePixelRatio, so the 1px cell borders
     stay crisp on retina instead of being upscaled soft;
   · reduced motion holds the grid still but keeps the hover square live.
   Only the square shape is kept; the hexagon/triangle/circle variants upstream
   are unused here. */
import { useRef, useEffect } from 'react';
import './ShapeGrid.css';

const ShapeGrid = ({
  direction = 'down',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  className = ''
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef(null);
  const cellOpacities = useRef(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = 1;

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(canvas.offsetWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.offsetHeight * dpr));
      /* Draw in CSS pixels; the transform handles the device scale. */
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const cols = Math.ceil(w / squareSize) + 3;
      const rows = Math.ceil(h / squareSize) + 3;

      /* Half-pixel offset puts the stroke on the pixel grid rather than
         straddling it, which is what keeps a 1px line from going 2px grey. */
      ctx.lineWidth = 1;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const sx = col * squareSize + offsetX;
          const sy = row * squareSize + offsetY;

          const alpha = cellOpacities.current.get(`${col},${row}`);
          if (alpha) {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(sx, sy, squareSize, squareSize);
            ctx.globalAlpha = 1;
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(sx + 0.5, sy + 0.5, squareSize, squareSize);
        }
      }
    };

    const updateCellOpacities = () => {
      const hovered = hoveredSquare.current;
      const key = hovered ? `${hovered.x},${hovered.y}` : null;

      if (key && !cellOpacities.current.has(key)) cellOpacities.current.set(key, 0);

      for (const [k, opacity] of cellOpacities.current) {
        const target = k === key ? 1 : 0;
        const next = opacity + (target - opacity) * 0.15;
        if (next < 0.005) cellOpacities.current.delete(k);
        else cellOpacities.current.set(k, next);
      }
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateAnimation = () => {
      if (!reduceMotion) {
        const effectiveSpeed = Math.max(speed, 0.1);
        switch (direction) {
          case 'right':
            gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
            break;
          case 'left':
            gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
            break;
          case 'up':
            gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
            break;
          case 'down':
            gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
            break;
          case 'diagonal':
            gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
            gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
            break;
          default:
            break;
        }
      }

      updateCellOpacities();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = event => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const col = Math.floor((mouseX - offsetX) / squareSize);
      const row = Math.floor((mouseY - offsetY) / squareSize);

      const cur = hoveredSquare.current;
      if (!cur || cur.x !== col || cur.y !== row) hoveredSquare.current = { x: col, y: row };
    };

    const handleMouseLeave = () => { hoveredSquare.current = null; };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let isPageVisible = !document.hidden;

    const tryStart = () => {
      if (isPageVisible && !requestRef.current) {
        requestRef.current = requestAnimationFrame(updateAnimation);
      }
    };
    const tryStop = () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    tryStart();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      tryStop();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className={`shapegrid-canvas ${className}`.trim()} />;
};

export default ShapeGrid;
