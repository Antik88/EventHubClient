import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LISTEVENT_ROUTE, LOGIN_ROUTE} from '../Utils/consts';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    
    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink
                    style={{ fontSize: "19px", color: "wheat", textDecoration: "none" }}
                    to={LISTEVENT_ROUTE}
                >
                    EventHub
                </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            className="me-2"
                            style={{ color: "grey", textDecoration: "none" }}
                            onClick={() => navigate(ADMIN_ROUTE)}
                            variant='outlined-primary'
                        >
                            Админ
                        </Button>
                        <Button
                            variant='outlined-primary'
                            style={{ color: "grey", textDecoration: "none" }}
                            onClick={() => logout()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button
                            variant='outlined-primary'
                            style={{ color: "grey", textDecoration: "none" }}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar >
    );
});

export default NavBar;
