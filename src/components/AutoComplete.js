import {useState, useContext} from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import {Context} from '../context/SmashUpContext';
import SearchMenu from './SearchMenu';


const AutoComplete = props => {
  const {searchShows,clearShows, state: {shows}} = useContext(Context);
  const [show,setShow] = useState('');

  const handleChange = (e) => {
    setShow(e.target.value);
    if(show.length > 2) {
      searchShows(show);
    } else {
      clearShows();
    }
  }


  return(
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">{props.label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={props.placeholder}
          aria-label={props.ariaLabel}
          aria-describedby="basic-addon1"
          onChange={handleChange}
        />
      </InputGroup>
      <SearchMenu />
    </div>
  );
}


export default AutoComplete;
