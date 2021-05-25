import {useContext} from 'react';
import {Context} from '../context/SmashUpContext';
import {Context as UIContext} from '../context/UIControlContext';
import {Context as AuthContext} from '../context/AuthContext';

const SearchMenu = props => {
  const {setShow, clearShows, state: {shows}} = useContext(Context);
  const {state:{focusedVsInput}} = useContext(UIContext);
  const {state:{isAdmin}} = useContext(AuthContext);

  const clickShow = (e) => {
    console.log('Clickety');
    let selectedShow = shows.filter((s) => (s.id === parseInt(e.target.id)))[0];
    selectedShow.vsIndex=props.shownumber;
    setShow(selectedShow);
    clearShows();
  }

  console.log("ACTIVE", focusedVsInput);
  console.log("AM I ADMIN", isAdmin);


  return (
    <>
      {
        shows.length > 0 && focusedVsInput === props.shownumber
        ? <div className="search_menu">
            <p>Pick a Show</p>
            {
              shows.map((show) => (
                <p><a key={show.id} id={show.id} href="#" onClick={clickShow}>{show.name}</a></p>
              ))
            }
          </div>
        : <> {
            focusedVsInput === props.shownumber
            ?
              <div className="search_menu">
                <p>There are no shows in existance.</p>
                {
                  !isAdmin
                  ? <p>Sorry only administrators can create shows.</p>
                  : <p>Click <a href="/addsmashup">here</a> to add a show.</p>
                }
              </div>
            : null
        } </>
      }
    </>
  )
}

export default SearchMenu;
