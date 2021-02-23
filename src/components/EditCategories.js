import {useState, useContext, useEffect} from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context} from '../context/UIControlContext';


const EditCategories = props => {
  const [categories,setCategories] = useState([]);

  useEffect( () => {
    setCategories(props.categories);
  },[]);

  console.log(categories);

  const handleChange = (e) => {
    let newCategory = categories.filter(cat => cat.id === parseInt(e.target.id));
    newCategory[0].category = e.target.value;
    console.log('Changing', newCategory[0] );
    let newCategories = [...categories]
    let idx = newCategories.findIndex(cat => cat.id === parseInt(e.target.id));
    newCategories[idx] = newCategory[0];

    setCategories(newCategories);
    console.log('These are the new categories',newCategories);
  }

  const removeCategory = (cat) => {

  }

  const addCategory = () => {
    console.log('Adding');
  }

  return (
    <Container>
      <Row>
        <Col>
          {
            categories.length > 0
            ? <>
                {
                  categories.map((cat) => (
                    <Row key={cat.id}>
                      <Col>
                        <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <InputGroup.Text>Category</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            id = {cat.id}
                            placeholder="E.g. Best battle scenes"
                            aria-label="add-category"
                            aria-describedby="basic-addon1"
                            onChange={handleChange}
                            value={cat.category}
                          />
                          <InputGroup.Append>
                            <Button onClick={addCategory}>Add</Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                      <Col><Button onClick={() => removeCategory(cat)}>Remove</Button></Col>
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


export default EditCategories;
