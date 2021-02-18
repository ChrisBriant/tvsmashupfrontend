import {useContext} from 'react';
import {Context} from '../context/SmashUpContext';
import {Context as UIContext} from '../context/UIControlContext';

const SearchMenu = props => {
  const {setShow, clearShows, state: {shows}} = useContext(Context);
  const {state:{focusedVsInput}} = useContext(UIContext);

  const clickShow = (e) => {
    console.log('Clickety');
    let selectedShow = shows.filter((s) => (s.id === parseInt(e.target.id)))[0];
    selectedShow.vsIndex=props.shownumber;
    setShow(selectedShow);
    clearShows();
  }

  console.log("ACTIVE", focusedVsInput);


  return (
    <>
      {
        shows.length > 0 && focusedVsInput === props.shownumber
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
