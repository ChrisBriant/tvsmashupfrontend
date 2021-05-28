import React, { useRef, useEffect } from 'react';
import vs from '../assets/vs.svg';


const Canvas = props => {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    //Our first draw
    context.fillStyle = 'white';
    context.fillRect(0, 0, props.width, props.height);

    //Define path to cut diagonally
    let topRght = [props.width, 0];
    let botLeft = [0, props.height];
    let botRght = [props.width,props.height];

    let image1 = new Image();
    image1.src = props.img1;
    image1.onload = function() {
        context.globalAlpha = 0.5;
        context.drawImage(image1,0,0,props.width/2,props.height/2);
        let image2 = new Image();
        image2.src = props.img2;
        image2.onload = function() {
            let vsImage = new Image();
            vsImage.src = vs;

            context.drawImage(image2,props.width/2,props.height/2,props.width/2,props.height/2);
            vsImage.onload = function() {
              context.globalAlpha = 1;
              context.drawImage(vsImage,props.width/6,props.height/6,props.width/1.5,props.height/1.5);
            }
        }
    }
  }, []);

  return (
      <canvas ref={canvasRef} {...props}/>
  );
}

export default Canvas;
