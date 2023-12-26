import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Image, NavLink, Row } from 'react-bootstrap';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fatchOneEvent } from '../http/eventApi';
import noImage from '../Assets/noimage.jpg'
import { Spinner } from 'react-bootstrap';
import '../Assets/css/alert.css'

const EventPage = () => {
    const [event, setEvent] = useState()
    const [showAlert, setShowAlert] = useState(false);

    const { id } = useParams()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fatchOneEvent(id)
            .then(data => setEvent(data))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return <Spinner animation={'grow'} />
    }

    const handleButtonClick = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };


    return (
        <Container className='mt-3' style={{height: "100vh"}}>
            <Row>
                <Col md={7}>
                    {event.eventImages && event.eventImages.length > 0 ? (
                        <Carousel >
                            {event.eventImages.map((e) => (
                                <CarouselItem key={e.id}>
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: "400px",
                                            objectFit: "cover"
                                        }}
                                        src={
                                            process.env.REACT_APP_API_URL +
                                            "Event/getFile?FileName=" +
                                            e.imgaePath
                                        }
                                    />
                                </CarouselItem>
                            ))}
                        </Carousel>
                    ) : (
                        <Image
                            className="carousel-image"
                            src={noImage}
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover"
                            }}
                        />
                    )}
                </Col>
                <Col md={5}>
                    <h4>{event.eventName}</h4>
                    <p>Место: {event.place}</p>
                    <p>Дата проведения: {event.eventTime.split('T')[0]
                        + " " + event.eventTime.split('T')[1].split(':')[0]
                        + ":" + event.eventTime.split('T')[1].split(':')[1]
                    }
                        <br></br> Описание: {event.description}
                        <br></br>Категория: {event.eventCategory.name}
                    </p>
                    <NavLink className='mb-3'>
                        Организатор: {event.organizerId}
                    </NavLink>
                    <Button
                        onClick={handleButtonClick}
                        variant='dark'
                    >
                        Заригестрироваться
                    </Button>
                    <div className={`alert-container ${showAlert ? 'show' : ''} mt-3`}>
                        <Alert variant='success' dismissible onClose={() => setShowAlert(false)}>
                            <Alert.Heading>Успешно!</Alert.Heading>
                            <p>Вы зарегистрироваться на мероприятие</p>
                        </Alert>
                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default EventPage
