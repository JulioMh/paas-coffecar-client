import React from 'react';
import Form from 'react-bootstrap/Form';
import Label from 'react-bootstrap/FormLabel';
import Input from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Map from '../UI/Map/Map';


const form = (props) => {

    return (
        <Card style={{ width: '75%', margin: 'auto', marginTop: '70px', boxShadow: "5px 5px 5px grey" }}>
            <Card.Body>
                <Card.Title>{props.item ? 'Información del viaje' : '¡Publica tu viaje ahora!'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Que no se te olviden las llaves :P</Card.Subtitle>
                <Form onSubmit={props.item ? props.submitFormEdit : props.submitFormAdd}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Titulo</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    plaintext={props.writable}
                                    readOnly={props.writable}
                                    onChange={props.onChange}
                                    value={props.title === null ? '' : props.title} />
                            </FormGroup>
                            <Label>Asientos</Label>
                            <Form.Row>
                                <FormGroup as={Col}>
                                    <Input
                                        type="range"
                                        min="1"
                                        max="14"
                                        name="seats"
                                        id="seats"
                                        plaintext={props.writable}
                                        readOnly={props.writable}
                                        onChange={props.onChange}
                                        value={props.seats === null ? '' : props.seats} />
                                </FormGroup>
                                <FormGroup as={Col} md="auto">
                                    <Input
                                        style={{ width: "50px" }}
                                        type="text"
                                        name="seats"
                                        id="seats"
                                        plaintext={props.writable}
                                        readOnly={props.writable}
                                        onChange={props.onChange}
                                        value={props.seats === null ? '' : props.seats} />
                                </FormGroup>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col}>
                                    <Label>Fecha de salida</Label>
                                    <Input
                                        type="datetime-local"
                                        name="departureTime"
                                        id="departureTime"
                                        plaintext={props.writable}
                                        readOnly={props.writable}
                                        onChange={props.onChange}
                                        value={props.departureTime === null ? '' : props.departureTime} />
                                </FormGroup>
                                <FormGroup as={Col}>
                                    <Label>Fecha de llegada</Label>
                                    <Input
                                        type="datetime-local"
                                        name="arrivalDate"
                                        id="arrivalDate"
                                        plaintext={props.writable}
                                        readOnly={props.writable}
                                        onChange={props.onChange}
                                        value={props.arrivalDate === null ? '' : props.arrivalDate} />
                                </FormGroup>
                            </Form.Row>
                            <FormGroup>
                                <Label>Descripción</Label>
                                <Input
                                    as="textarea"
                                    name="description"
                                    id="description"
                                    row="3"
                                    plaintext={props.writable}
                                    readOnly={props.writable}
                                    onChange={props.onChange}
                                    value={props.description === null ? '' : props.description} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <Card style={{ height: "97%", width: '100%', margin: 'auto' }}>
                                <Card.Body>
                                <Card.Title>{props.mapChanged ? "Hasta..." : "Desde..." }</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Haz click para {props.mapChanged ? " tu destino" : " marcar tu punto de salida" }</Card.Subtitle>
                                    <Map onOverlayDragEnd={props.onOverlayDragEnd} onOverlayDragStart={props.onOverlayDragStart} onMapClick={props.onMapClick} overlays={props.overlays} style={{ width: '100%', minHeight: "365px" }} />
                                </Card.Body>
                            </Card>
                        </Col>                    
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button variant="dark" style={{ marginLeft: "auto" }} type="submit" >Confirmar</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card >
    );
}

export default form;