import React, { useContext } from 'react';
import { userContext } from '../App';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { HOST, PORT, DOMAIN } from '../config';
import { LinkContainer } from 'react-router-bootstrap';
// import { withRouter } from 'react-router-dom';   //O.V.
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const { history } = props;
    const { user, setUser, auth, setAuth } = useContext(userContext);
    const navigate = useNavigate();

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
            if (res.ok) {
                setAuth(false);
                setUser({});
                navigate("/");
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const Avatar = () => (
        <div>
            <img src={user.avatar ? `${HOST}:${PORT}/upload/${user.avatar}` : `${HOST}:${PORT}/img/avatar.jpeg`}
                alt='avatar'
                width={32}
                height={32}
                className='rounded' />
            <span style={{ color: 'white' }} onClick={() => logout()}>Exit</span>
        </div>
    );

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="ml-2">
            <Navbar.Brand href="#" className="ml-5">FlyBBS</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' >
                <Nav className="mr-auto">
                    <LinkContainer to="/home/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/threads">
                        <Nav.Link>Threads</Nav.Link>
                    </LinkContainer>
                    {auth ?
                        <NavDropdown title="Personal Center" id="basic-nav-dropdown">
                            <LinkContainer to={`/profile/${user.username}`} >
                                <NavDropdown.Item>Personal Info</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/setting/" >
                                <NavDropdown.Item>Modify Info</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        : null}
                </Nav>
                <div className='m1-auto'>
                    {auth ? <Avatar /> : null}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

// export default withRouter(Header);   //O.V.
export default Header;
