import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap'
import { useContext } from 'react';
import { Context } from '..';
import { useState } from 'react';
import { useEffect } from 'react';
import { createEvent, fatchAllCategores } from '../http/eventApi';
import { observer } from 'mobx-react-lite';

const CreateEvent = () => {
    const { event } = useContext(Context)
    const { user } = useContext(Context)
    const [photos, setPhotos] = useState([]);
    const [eventName, setEventName] = useState();
    const [place, setPlace] = useState();
    const [eventTime, setEventTime] = useState();
    const [description, setDescription] = useState();
    const [isOpenEvent, setIsOpen] = useState();
    const [eventCategory, setEventCategory] = useState();
    const [organizerId, setOrganizerId] = useState(user);
    const [categoryId, setCategoryId] = useState();

    const handlePhotoChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setPhotos([...photos, ...selectedFiles]);
    };

    const handleRemovePhoto = (index) => {
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);
    };

    useEffect(() => {
        fatchAllCategores().then(data => event.setCategory(data))
    }, [event])

    const addEvent = () => {
        const eventData = {
            eventName: eventName,
            place: place,
            eventTime: new Date(eventTime).toISOString(),
            description: description,
            isOpenEvent: isOpenEvent,
            eventCategory: {
                name: "name"
            },
            organizerId: localStorage.getItem('userId'),
            eventImages: [],
            categoryId: categoryId
        };
        const jsonData = JSON.stringify(eventData);
        // console.log(jsonData);
        createEvent(jsonData, categoryId)
    }

    return (
        <Container className='mt-2'>
            <Row>
                <Col md={6}>
                    <h2 className='h2'>
                        Создать мероприяние
                    </h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Название</Form.Label>
                            <Form.Control type="text" onChange={(e) => setEventName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Местро проведения</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => setPlace(e.target.value)} rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Дата проведения</Form.Label>
                            <Form.Control type='date' onChange={(e) => setEventTime(e.target.value)} rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => setDescription(e.target.value)} rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                label="Открытый" onChange={(e) => setIsOpen(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Select
                            style={{ cursor: "pointer" }}
                            value={categoryId || ""}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option disabled value="">
                                Выберите категорию
                            </option>
                            {event.categories.map((e) => (
                                <option
                                    key={e.id}
                                    value={e.id}
                                >
                                    {e.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form>
                </Col>
                <Col md={4} className='mt-2'>
                    <Form>
                        <Form.Group className="mb-3" controlId="date" style={{
                            display: "grid", gridTemplateColumns: "repeat(3, 200px)",
                            gap: "10px"
                        }}>
                            {photos.map((photo, index) => (
                                <div key={index}>
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "200px",
                                            height: "160px",
                                            backgroundImage: `url(${URL.createObjectURL(photo)})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                        alt={`Фото ${index + 1}`}
                                    >
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemovePhoto(index)}
                                            style={{
                                                position: "absolute",
                                                top: "0",
                                                right: "0",
                                            }}
                                        >
                                            X
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </Form.Group>
                        <Button variant="primary" onClick={() => document.getElementById('fileInput').click()}>Добавить фото</Button>
                        <input id="fileInput" type="file" accept=".png, .jpeg, .jpg" multiple onChange={handlePhotoChange} style={{ display: 'none' }} />
                    </Form>
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col md={2}
                    style={{ marginBottom: "100px" }}
                >
                    <Button onClick={addEvent} variant='dark' className='me-2'>
                        Создать
                    </Button>
                    <Button variant='danger' >
                        Отмена
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default observer(CreateEvent)