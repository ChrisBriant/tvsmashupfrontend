//https://react-icons.github.io/react-icons/icons?name=bs
import { useState, useEffect } from 'react';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";



const Rating = props => {
  const starColor = {color:'#b88130'};
  const [rating,setRating] = useState(1);
  //const [id,setId] = useState(0);
  //const [halfStar,setHalfStar] = useState(false);
  const [stars,setStars] = useState([]);


  useEffect(() => {
    //if(props.id) {
      //setId(props.id);
    //}
    //If component is in presntation mode then the code
    // below is used to determine half star
    if(props.presentation) {
      let halfStar = false;
      //console.log('RATING',props.rating, props.rating % 1);
      if(props.rating % 1 === 0.5) {
        halfStar =true;
      }
      let presRating = Math.floor(props.rating);
      //Set an array with the star components
      let components = [];
      for(let i=0;i<5;i++) {
        if(i+1 <= presRating) {
          components.push(<BsStarFill style={starColor}/>);
        } else {
          if(halfStar) {
            components.push(<BsStarHalf style={starColor}/>);
            halfStar = false;
          } else {
            components.push(<BsStar style={starColor} />);
          }
        }
      }
      setStars(components);
      console.log('components are', components);
    }
  },[]);

  const dispatchRating = (rating) => {
    setRating(rating);
    props.updateRating(props.id,rating);
  }


  return (
    props.presentation
    ?
      <div className="rating-container">
        {
          stars.map((star,i) => (
            <div key={i}>
              {star}
            </div>
          ))
        }

      </div>
    :
      <div className="rating-container">
        <div>
        {
          rating >= 1
          ? <BsStarFill style={starColor} onClick={() => dispatchRating(1)} />
          : <BsStar style={starColor} onClick={() => dispatchRating(1)} />
        }
        </div>
        <div>
        {
          rating >= 2
          ? <BsStarFill style={starColor} onClick={() => dispatchRating(2)} />
          : <BsStar style={starColor} onClick={() => dispatchRating(2)} />
        }
        </div>
        <div>
        {
          rating >= 3
          ? <BsStarFill style={starColor} onClick={() => dispatchRating(3)} />
          : <BsStar style={starColor} onClick={() => dispatchRating(3)} />
        }
        </div>
        <div>
        {
          rating >= 4
          ? <BsStarFill style={starColor} onClick={() => dispatchRating(4)} />
          : <BsStar style={starColor} onClick={() => dispatchRating(4)} />
        }
        </div>
        <div>
        {
          rating >= 5
          ? <BsStarFill style={starColor} onClick={() => dispatchRating(5)} />
          : <BsStar style={starColor} onClick={() => dispatchRating(5)} />
        }
        </div>
      </div>
  )
}


export default Rating;
