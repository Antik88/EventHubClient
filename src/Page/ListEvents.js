import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect } from 'react';
import { Col, Container, Row, } from 'react-bootstrap';
import TypeBar from '../Components/Typebar';
import EventList from '../Components/EventList';
import { fatchAll, fatchAllCategores } from '../http/eventApi';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const ListEvents = () => {
    const { event } = useContext(Context)

    useEffect(() => {
        fatchAll().then(data => event.setEvent(data))
        fatchAllCategores().then(data => event.setCategory(data))
    }, [])

    useEffect(() => {
        fatchAll(event.searchName, event.selectedCategory, event.date, event.isOpen).then(data => event.setEvent(data))
    }, [event.searchName, event.selectedCategory, event.date, event.isOpen])


    return (
        <Container style={{color: "wheat"}} className='d-flex mt-4'>
            <Row>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <EventList />
                </Col>
            </Row>
        </Container>
    );
}

export default observer(ListEvents)