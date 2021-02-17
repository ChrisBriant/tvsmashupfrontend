import React, { useRef, useEffect } from 'react';


const Canvas = props => {

  const canvasRef = useRef(null);

  const changeColor = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'blue';
    context.fillRect(0, 0, props.width, props.height);
    console.log('this smells');
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    //Our first draw
    context.fillStyle = 'white';
    context.fillRect(0, 0, props.width, props.height);

    console.log(context);

    //Define path to cut diagonally
    let topRght = [props.width, 0];
    let botLeft = [0, props.height];
    let botRght = [props.width,props.height];

    let image1 = new Image();
    image1.src = props.img1;
    image1.onload = function() {
        context.drawImage(image1,0,0,props.width/2,props.height/2);
    }


    let image2 = new Image();
    image2.src = props.img2;
    image2.onload = function() {
        context.beginPath();
        context.moveTo(...topRght);
        context.lineTo(...botLeft);
        context.lineTo(...botRght);
        context.lineTo(...topRght);
        context.closePath();
        context.clip();
        context.drawImage(image2,props.width/2,props.height/2,props.width/2,props.height/2);
    }
  }, [])

  return (
      <canvas ref={canvasRef} {...props}/>
  );
}

export default Canvas;
