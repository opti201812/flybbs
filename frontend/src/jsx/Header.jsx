import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { HOST, PORT, DOMAIN } from '../config';
import { LinkContainr } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';

const Header = () => {
    const { history } = props;
    const [user, setUser] = useState([]);
    const [auth, setAuth] = useState([]);

    useEffect(() => {
        const authenticate = async () => {
            try {
                const data = localStorage.getItem(DOMAIN);
                const url = `${HOST}:${PORT}/api/users/auth`;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: data,
                });
                const result = await res.json();
                if (res.ok) {
                    setAuth(true);
                    setUser(result.data);
                }
            } catch (error) {
                alert(error.message);
            }
        };
        authenticate();
    }, []);

    const logout = async () => {
        const url = `${HOST}:${PORT}/api/users/logout`;
        try {
            const data = JSON.parse(localStorage.getItem(DOMAIN));
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            const result = await res.json();
            alert(result.message);
            if (res.ok) {
                setAuth(false);
                setUser({});
                history.push("/");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const Avatar = () => (
        <div>
            <img src={user.avatar ? `${HOST}:${PORT}/upload/${user.avatar}` : 'img/avatar.png'}
                alt='avatar'
                width={32}
                height={32}
                className='rounded' />
            <span style={{ color: 'white' }} onClick={() => logout()}>Exit</span>
        </div>
    );

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="#">FlyBBS</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' >
                <Nav className="mr-auto">
                    <LinkContainr to="/home/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainr>
                    <LinkContainr to="/threads">
                        <Nav.Link>Threads</Nav.Link>
                    </LinkContainr>
                    <NavDropdown title="Personal Center" id="basic-nav-dropdown">
                        <LinkContainr to={`/profile/${user.username}`} >
                            <NavDropdown.Item>Personal Info</NavDropdown.Item>
                        </LinkContainr>
                        <LinkContainr to="/setting/" >
                            <NavDropdown.Item>Modify Info</NavDropdown.Item>
                        </LinkContainr>
                    </NavDropdown>
                </Nav>
                <div className='m1-auto'>
                    {auth ? <Avatar /> : null}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Header);