import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Tab = (props) => {
    const { selected, setSelected } = props;
    return (
        <div className="tab-group">
            <div
                className={selected === 1 ? 'tab-item active' : 'tab-item'}
                onClick={() => setSelected(1)} >
                <span className="icon icon-cancel icon-close-tab" />
                Login
            </div>
            <div
                className={selected === 2 ? 'tab-item active' : 'tab-item'}
                onClick={() => setSelected(2)} >
                <span className="icon icon-cancel icon-close-tab" />
                Register
            </div>
        </div>
    );
};

const RegLogPage = () => {
    const [selected, setSelected] = useState(1);

    return (
        <div>
            <Tab selected={selected} setSelected={setSelected} />
            <Container className='mt-5'>
                <Row className='justify-content-center'>
                    <Col sm={12} md={6} className="border p-3">
                        {selected === 1 ? <LoginForm /> : <RegisterForm />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegLogPage;