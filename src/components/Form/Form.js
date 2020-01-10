import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const form = (props) => (
    <Form>
        <Form.Group as={Col} controlId="titulo">
            <Form.Label column sm="2">
                Titulo
            </Form.Label>
            <Col sm="10">
                <Form.Control plaintext={props.edit} readOnly={props.edit} placeholder="Titulo" /> 
            </Col>
        </Form.Group>

        <Form.Group as={Col} controlId="asientos">
            <Form.Label column sm="2">
                Asientos
                </Form.Label>
            <Col sm="10">
                <Form.Control plaintext={props.edit} readOnly={props.edit} placeholder="Asientos" type="range" min="1" max="14" />
            </Col>
        </Form.Group>

        <Form.Row noGutters>
            <Form.Group as={Col} controlId="departureDate">
                <Form.Label column sm="2">Fecha de salida</Form.Label>
                <Col sm="4">
                    <Form.Control plaintext={props.edit} readOnly={props.edit} type="datetime-local" />
                </Col>
            </Form.Group>

            <Form.Group as={Col} controlId="arrivalDate">
                <Form.Label column sm="2">Fecha de llegada</Form.Label>
                <Col sm="4">
                    <Form.Control plaintext={props.edit} readOnly={props.edit} type="datetime-local" />
                </Col>
            </Form.Group>
        </Form.Row>

        <Form.Group as={Col} controlId="descripcion">
            <Form.Label column sm="2">
                Descripción
            </Form.Label>
            <Col sm="10">
                <Form.Control plaintext={props.edit} readOnly={props.edit} as="textarea" rows="3" />
            </Col>
        </Form.Group>
    </Form >
);

export default form;
