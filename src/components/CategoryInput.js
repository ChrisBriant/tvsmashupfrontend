import {useState, useContext} from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context} from '../context/UIControlContext';
import SearchMenu from './SearchMenu';


const CategoryInput = () => {
  const [category,setCategory] = useState('');
  const {addToCatList, removeFromCatList, state:{catList}} = useContext(Context);


  const handleChange = (e) => {
    setCategory(e.target.value);
  }

  const addCategory = () => {
    console.log('Adding');
    addToCatList(category);
  }

  const removeCategory = (idx) => {
    console.log(idx);
    removeFromCatList(idx);
  }

  return(
    <Container>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Add Category</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="E.g. Best battle scenes"
              aria-label="add-category"
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
            <InputGroup.Append>
              <Button onClick={addCategory}>Add</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            catList.length > 0
            ? <>
                <p>My Categories</p>
                {
                  catList.map((cat,i) => (
                    <Row key={i}>
                      <Col>Category {i}</Col>
                      <Col>{cat}</Col>
                      <Col><Button onClick={() => removeCategory(i)}>Remove</Button></Col>
                    </Row>
                  ))
                }
              </>
            : null
          }
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryInput;
