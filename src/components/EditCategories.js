import {useState, useContext, useEffect} from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context as SmashupContext} from '../context/SmashUpContext';
import Spacer from './Spacer';


const EditCategories = props => {
  const {updateCategories} = useContext(SmashupContext);
  const [categories,setCategories] = useState([]);
  const [addAnother,setAddAnother] = useState(false);
  const [newCategory,setNewCategory] = useState('');
  const [hasBeenUpdated,setHasBeenUpdated] = useState(false);


  useEffect( () => {
    setCategories(props.categories);
  },[]);


  const handleChangeName = (e) => {
    setNewCategory(e.target.value);
  }

  const removeCategory = (idx) => {
    let newCategories = [...categories];
    newCategories.splice(idx,1);
    setCategories(newCategories);
    setHasBeenUpdated(true);
  }

  const addCategory = () => {
    let newCat = {
      already_rated: true,
      average_rating: { rating__avg: 0 },
      category: newCategory,
      id: 0,
      rating_count: 0
    }
    let newCategories = [...categories]
    newCategories.push(newCat);
    setCategories(newCategories);
    setHasBeenUpdated(true);
  }

  const handleUpdateCategories = () => {
    //Partition into two lists existing and new
    let newCategories = categories.filter(cat => cat.id === 0);
    let existingCategories = categories.filter(cat => cat.id !== 0);
    updateCategories(props.smashupId,existingCategories,newCategories);
    props.setUpdated();
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={() => setAddAnother(!addAnother)}>Add Another</Button>
        </Col>
      </Row>
      <Spacer height="1rem"/>
      <Row>
        <Col>
          {
            addAnother || categories.length === 0
            ?
              <Row>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>Category</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="E.g. Best battle scenes"
                      aria-label="add-category"
                      aria-describedby="basic-addon1"
                      onChange={handleChangeName}
                      value={newCategory}
                    />
                    <InputGroup.Append>
                      <Button onClick={addCategory}>Add</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
            : null
          }
          {
            categories.length > 0
            ? <>
                {
                  categories.map((cat,i) => (
                    <Row key={i}>
                      <Col><p>{cat.category}</p></Col>
                      <Col><Button size="sm" onClick={() => removeCategory(i)}>Remove</Button></Col>
                    </Row>
                  ))
                }
              </>
            : null
          }
        </Col>
      </Row>
      {
        hasBeenUpdated
        ?
          <Row>
            <Col><Button onClick={handleUpdateCategories}>Update Categories</Button></Col>
          </Row>
        : null
      }
    </Container>
  );

}


export default EditCategories;
