import {useContext} from 'react';
import {Context} from '../context/SmashUpContext';

const SearchMenu = props => {
  const {setShow, state: {shows}} = useContext(Context);

  const clickShow = (e) => {
    let selectedShow = shows.filter((s) => (s.id === parseInt(e.target.id)))[0];
    setShow(selectedShow);
  }


  return (
    <>
      {
        shows.length > 0
        ? <div className="search_menu">
            <p>Pick a Show</p>
            {
              shows.map((show) => (
                <a key={show.id} id={show.id} href="#" onClick={clickShow}>{show.name}</a>
              ))
            }
          </div>
        : null
      }
    </>
  )
}

export default SearchMenu;
