import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { CREATEEVENT_ROUTE } from "../Utils/consts";

const TypeBar = observer(() => {
    const { event } = useContext(Context)
    const { user } = useContext(Context)

    const reset = () => {
        event.setSearchName('')
        event.setSelectedCategory('')
        event.setDate('')
        event.setIsOpen('')
    }

    const history = useNavigate();

    return (
        <>
            <h5>Фильтры</h5>
            <div className="d-flex align-items-center justify-content-center">
                <h6 className="me-2">Категория</h6>
                <Form.Select
                    style={{ cursor: "pointer" }}
                    value={event.selectedCategory || ""}
                    onChange={(e) => event.setSelectedCategory(e.target.value)}
                >
                    <option disabled value="">Выберите категорию</option>
                    {event.categories.map((e) => (
                        <option
                            style={{ cursor: "pointer" }}
                            key={e.id}
                            value={e.id}
                        >
                            {e.name}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <Form.Control
                className="mt-2"
                type="text"
                placeholder="Поиск по имени"
                value={event.searchName || ''}
                onChange={(e) => event.setSearchName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' ? event.setSearchName(e.target.value) : null}
            />
            <Form.Control
                className="mt-2"
                type="date"
                name="date"
                placeholder="дата проведения"
                value={event.date || ''}
                onChange={(e) => event.setDate(e.target.value)}
            />
            <Form.Check
                className="mt-2"
                type="checkbox"
                value={event.isOpen || false}
                onChange={(e) => event.setIsOpen(e.target.checked)}
                label="Открытые"
            />
            <div
                style={{display: "flex", flexDirection: "column"}}
            >
                <Button
                    className="mt-2"
                    variant="dark"
                    onClick={reset}
                >
                   Сбросить 
                </Button>
                {user.isAuth ?
                    <Button
                        className="mt-2"
                        variant="success"
                        onClick={() => history(CREATEEVENT_ROUTE)}
                    >
                        Создать мероприятие
                    </Button>
                    :
                    <></>
                }
            </div>
        </>
    );
});

export default TypeBar
