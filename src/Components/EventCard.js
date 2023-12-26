import React from "react";
import { Button, CardImg, Carousel, CarouselItem, Col } from 'react-bootstrap';
import { Card, CardBody, CardHeader } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { EVENT_ROUTE } from "../Utils/consts";
import noImage from '../Assets/noimage.jpg'

const EventCard = ({ event }) => {
    const history = useNavigate()

    return (
        <Col md={6}>
            <Card className="mb-3">
                <CardHeader>
                    {event.eventName}
                </CardHeader>
                <CardBody>
                    {event.eventImages && event.eventImages.length > 0 ? (
                        <Carousel interval={null}>
                            {event.eventImages.map((e) => (
                                <CarouselItem key={e.id}>
                                    <CardImg
                                        className="carousel-image"
                                        style={{
                                            width: "100%",
                                            height: "300px",
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
                        <CardImg
                            className="carousel-image"
                            src={noImage}
                            style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover"
                            }}
                        />
                    )}
                    <p>Место: {event.place}</p>
                    <p>
                        Дата проведения: {event.eventTime &&
                            new Date(event.eventTime).toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        <br />
                        Время: {event.eventTime.split('T')[1].split(':')[0] + ":" + event.eventTime.split('T')[1].split(':')[1]}
                        <br />
                        Описание: {event.description}
                        <br />
                        Категория: {event.eventCategory.name}
                    </p>
                    <Button
                        variant="outline-primary"
                        onClick={() => history(EVENT_ROUTE + "/" + event.id)}
                        style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                        Подробнее
                    </Button>
                </CardBody>
            </Card>
        </Col >
    );
};

export default EventCard