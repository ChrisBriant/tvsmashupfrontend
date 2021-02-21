//https://react-icons.github.io/react-icons/icons?name=bs
import { useState } from 'react';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";



const Rating = () => {
  const starColor = {color:'#b88130'};
  const [rating,setRating] = useState(1);


  return (
    <div className="rating-container">
      <div>
      {
        rating >= 1
        ? <BsStarFill style={starColor} onClick={() => setRating(1)} />
        : <BsStar style={starColor} onClick={() => setRating(1)} />
      }
      </div>
      <div>
      {
        rating >= 2
        ? <BsStarFill style={starColor} onClick={() => setRating(2)} />
        : <BsStar style={starColor} onClick={() => setRating(2)} />
      }
      </div>
      <div>
      {
        rating >= 3
        ? <BsStarFill style={starColor} onClick={() => setRating(3)} />
        : <BsStar style={starColor} onClick={() => setRating(3)} />
      }
      </div>
      <div>
      {
        rating >= 4
        ? <BsStarFill style={starColor} onClick={() => setRating(4)} />
        : <BsStar style={starColor} onClick={() => setRating(4)} />
      }
      </div>
      <div>
      {
        rating >= 5
        ? <BsStarFill style={starColor} onClick={() => setRating(5)} />
        : <BsStar style={starColor} onClick={() => setRating(5)} />
      }
      </div>
    </div>
  )
}


export default Rating;
