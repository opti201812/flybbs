import React from 'react';
import { Carousel,Jumbotron } from 'react-bootstrap';
import { HOST, PORT } from '../config';

const Intro = () => {
    return (
        <div>
            <Demo />
            <Slogan />
        </div>
    )
};

const Demo = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img className='d-block w-100'
                    src={`${HOST}:${PORT}/img/demo1.jpeg`}
                    alt="First slide" />
                <Carousel.Caption>
                    <h3>Sun</h3>
                    <p>See the view together</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className='d-block w-100'
                    src={`${HOST}:${PORT}/img/demo2.jpeg`}
                    alt="First slide" />
                <Carousel.Caption>
                    <h3>Moon</h3>
                    <p>See the view together</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

const Slogan = () => {
    return (
        <Jumbotron className="flex-fill m-0">
            <h1>FlyBBS</h1>
            <p>
                Welcome to FlyBBS
                <br />
                Speak whatever you wanna to!
            </p>
        </Jumbotron>
    )
}
export { Demo, Slogan };
export default Intro;