import {useState, useContext, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import {isFileTypeValid} from '../helpers/validation';
import {Context} from '../context/SmashUpContext';



const AddShow = () => {
  const [show,setShow] = useState('');
  const [errMessage,setErrorMessage] = useState('');
  const [imgSrc,setImgSrc] = useState('');

  const {addShow, resetShowSuccess, state:{errorMessage, addedShow}} = useContext(Context);

  useEffect(() => {
    console.log('RESETTING');
    resetShowSuccess();
  },[]);

  const handleChangeShow = (e) => {
    setShow(e.target.value);
  }

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    setErrorMessage('');

    //files = filesCopy;
    console.log(isFileTypeValid(image));
    if(isFileTypeValid(image)) {
        let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
            setImgSrc(e.target.result);
        };
    } else {
        setErrorMessage('Please enter a valid file type, eg. PNG, JPEG, JPG');
    }
  }


  const handleAddShow = async () => {
    console.log('IMAGE SRC', imgSrc);
    const fd = new FormData();
    fd.append('name',show);
    await fetch(imgSrc)
      .then(res => res.blob())
      .then(blob => {
          console.log('Here I am');
          let ext = blob.type.split('/')[1];
          const file = new File([blob], `filename.${ext}`);
          fd.append('picture', file);
    });
    console.log(fd.values());
    addShow(fd);
  }


  const resetShowScreen = async () => {
    resetShowSuccess();
  }


  return (
    <Container>
    <Row>
      <Col><h1>Add New Show</h1></Col>
    </Row>
    {
      addedShow
      ?
        <>
          <Row>
            <Col>
              <p>{addedShow.message}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={resetShowScreen}>Add Another</Button>
            </Col>
          </Row>
        </>
      :
        <>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Show</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Enter the name of a TV show"
                  aria-label="show"
                  aria-describedby="basic-addon1"
                  onChange={handleChangeShow}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <input type="file" onChange={onFileSelected} />
            </Col>
          </Row>
          <Row>
            <Col>
              {
                imgSrc !== ''
                ? <img className="show-select-img" src={imgSrc} />
                : null
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={handleAddShow}>Add Show</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {
                errMessage
                ? <p className="error">{errMessage}</p>
                : null
              }
              {
                errorMessage
                ? <p className="error">{errorMessage}</p>
                : null
              }
            </Col>
          </Row>
        </>
    }

    </Container>
  );
}

export default AddShow;
