import { useState, useEffect } from 'react';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";



const Rating = props => {
  const starColor = {color:'#b88130'};
  const [rating,setRating] = useState(1);
  const [stars,setStars] = useState([]);


  useEffect(() => {
    if(props.presentation) {
      let halfStar = false;
      if(props.rating % 1 >= 0.5) {
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
    }
  },[]);

  const dispatchRating = (rating) => {
    setRating(rating);
    props.updateRating(props.id,rating);
  }


  return (
    props.presentation
    ?
      <>
        <div className="rating-container">
          {
            stars.map((star,i) => (
              <div key={i}>
                {star}
              </div>
            ))
          }
        </div>
        <p>
          {
            props.rating
            ? parseFloat(props.rating).toFixed(1)
            : "Not Rated"
          }
        </p>
      </>
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
