import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import backgroundImage from '../Assets/auth_backgraund.png';
import { Form, Button } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LISTEVENT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../Utils/consts';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userApi';
import { useContext, useState } from 'react';
import { Context } from '..';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(userName, password)
            } else {
                data = await registration(userName, email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(LISTEVENT_ROUTE)
        } catch(e) {
            alert(e.response)
        }
    }

    return (
        <Row style={{ width: '100%', height: '94vh', overflowX: 'hidden' }}>
            <Col className='d-flex flex-column justify-content-center align-items-center'>
                <h3 style={{ color: 'wheat' }}>{isLogin ? 'АВТОРИЗАИЯ' : 'РЕГИСТРАЦИЯ'}</h3>
                <Form className='col-7'>
                    <Form.Group className="mb-2">
                        <Form.Control className="mb-2" id="name" type="text" value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="Username" />
                        {isLogin ?
                            <></>
                            :
                            <Form.Control className="mb-2" id="email" type="email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email" />
                        }
                        <Form.Control className="mb-2" id="password" type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password} placeholder="Password" />
                        <Button onClick={click} className='me-2' variant="dark">
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                        {isLogin ?
                            <>
                                <Form.Text className="me-1" style={{"color": "wheat"}}>Нет аккаунта?</Form.Text>
                                <NavLink
									className="text-decoration-none"
									style={{color: "brown"}}
									to={REGISTRATION_ROUTE}
								>
                                    Регистрация
                                </NavLink>
                            </>
                            :
                            <>
							<Form.Text style={{color: "wheat"}}
								className="me-1"
							>
									Есть аккаунт?
							</Form.Text>
                                <NavLink
									className="text-decoration-none"
									style={{color: "brown"}}
									to={LOGIN_ROUTE}
								>
                                    Войти
                                </NavLink>
                            </>
                        }
                    </Form.Group>
                </Form>
            </Col>
            <Col className='d-flex flex-column' style={{
                backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',
            }}>
                <h3 className='mt-4' style={{ color: 'brown' }}>EvenHub</h3>
                <p className='col-8 text-black'>
                    Welcome to EventHub - the all-in-one app that helps you find,
                    create and organize the most amazing events! Whether you're looking for
                    inspiration, professional development, fun or knowledge sharing,
                    EventHub is the perfect partner for you.
                </p>
            </Col>
        </Row>
    );
}

export default observer(Auth);
