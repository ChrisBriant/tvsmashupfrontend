import {useState} from 'react';
import {setCookiePolicy} from '../helpers/cookiestorage';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const CookiesModal = props => {
    const [show, setShow] = useState(props.show);

    const performOkAction = () => {
        setShow(false)
        setCookiePolicy();
    }

    const cookieMessage = `
    
    <h4>Cookies</h4>
    <p>
    Please read this cookie policy carefully before using our website,
     operated by TVSmashup.
    </p>
    <h4>What are cookies?</h4>
    <p>
    Cookies are simple text files that are stored on your computer or mobile device by a website’s
    server. Each cookie is unique to your web browser. It will contain some anonymous information
    such as a unique identifier, website’s domain name, and some digits and numbers.
    What types of cookies do we use?
    </p>
    <h4>Necessary cookies</h4>
    <p>
    Necessary cookies allow us to offer you the best possible experience when accessing and
    navigating through our website and using its features. For example, these cookies let us
    recognize that you have created an account and have logged into that account.
    </p>
    <h4>Functionality cookies</h4>
    <p>
    Functionality cookies let us operate the site in accordance with the choices you make. For
    example, we will recognize your username and remember how you customized the site during
    future visits.
    </p>
    <h4>Analytical cookies</h4>
    <p>
    These cookies enable us and third-party services to collect aggregated data for statistical
    purposes on how our visitors use the website. These cookies do not contain personal
    information such as names and email addresses and are used to help us improve your user
    experience of the website.
    </p>
    <h4>How to delete cookies?</h4>
    <p>
    If you want to restrict or block the cookies that are set by our website, you can do so through
    your browser setting. Alternatively, you can visit 
    <a href='https://www.internetcookies.com/' target='_blank'>www.internetcookies.org</a>, which contains
    comprehensive information on how to do this on a wide variety of browsers and devices. You
    will find general information about cookies and details on how to delete cookies from your
    device.
    </p>
    <h4>Contacting us</h4>
    <p>
    If you have any questions about this policy or our use of cookies, please contact us.
    </p>`



    return (
            <>
            <div className="modal-20w">
                <Modal
                show={show}
                dialogClassName="modal-20w"
                >
                <Modal.Header>
                    <Modal.Title>Cookies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                    <Row>
                        <Col>
                            <div className="cookie-content" dangerouslySetInnerHTML={{__html: cookieMessage}}></div>
                        </Col>
                    </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success" 
                        onClick={() => performOkAction()}
                        block
                    >
                    Accept
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
            </>
        );
    }

    export default CookiesModal;
