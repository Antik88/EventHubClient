import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Row } from 'react-bootstrap';
import EventCard from "./EventCard";

const EventList = observer(() => {
    const { event } = useContext(Context)
    return (
        <Row className="d-flex" style={{minWidth: "1050px"}}>
            {event.events.length !== 0 ?
                event.events.map(e =>
                    <EventCard key={e.id} event={e} />
                )
                :
                <Row className="md-9">
                    <p style={{height: "88vh" , width: "1100px"}}>Ничего не найдено</p>
                </Row>
            }
        </Row>
    );
});

export default EventList
