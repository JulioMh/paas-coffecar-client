/*global google*/
import React from 'react';
import Form from 'react-bootstrap/Form';
import Label from 'react-bootstrap/FormLabel';
import Input from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Map from '../../components/UI/Map/Map';


class TripRoot extends React.Component {
    state = {
        writable: false,
        overlays: null,
        selectedPosition: null,
        mapTitle: "Desde...",
        mapSubtitle: "Haz click para marcar tu punto de salida",

        id: 0,
        title: '',
        departureTime: '',
        arrivalDate: '',
        arrivalLatitude: '',
        arrivalLongitude: '',
        departureLatitude: '',
        departureLongitude: '',
        description: '',
        imgLink: '',
        seats: '',
        driver: {
            "id": "5e1768e1494e0738fe566ac7",
            "name": "abcd",
            "email": "abcd",
            "ownedAnnounces": null,
            "joinedAnnounces": null
        },
        passengers: null
    }

    onMapClick = e => {
        if (this.state.departureLatitude && !this.state.arrivalLatitude) {
            this.setState({
                selectedPosition: e.latLng,
                arrivalLatitude: e.latLng.lat(),
                arrivalLongitude: e.latLng.lng(),
                mapTitle: '¿Te has equivocado?',
                mapSubtitle: '¡Arregla tu desastre moviendo las marcas!'
            });
            this.addArrivalMarker();
        } else if (!this.state.arrivalLatitude) {
            this.setState({
                selectedPosition: e.latLng,
                departureLatitude: e.latLng.lat(),
                departureLongitude: e.latLng.lng(),
                mapTitle: 'Hasta...',
                mapSubtitle: 'Haz click aqui para marcar tu destino'
            });
            this.addDepartureMarker();
        }
    }

    onOverlayDragEnd = e => {
        if (e.overlay.label === "A") {
            this.setState({
                departureLatitude: e.originalEvent.latLng.lat(),
                departureLongitude: e.originalEvent.latLng.lng(),
            });
        } else {
            this.setState({
                arrivalLatitude: e.originalEvent.latLng.lat(),
                arrivalLongitude: e.originalEvent.latLng.lng()
            })
        }
    }

    addArrivalMarker = () => {
        let newMarker = new google.maps.Marker({
            position: {
                lat: this.state.selectedPosition.lat(),
                lng: this.state.selectedPosition.lng()
            },
            label: 'B',
            draggable: true,
            animation: google.maps.Animation.DROP,
        });
        this.setState({
            overlays: [...this.state.overlays, newMarker],
        });
    }

    addDepartureMarker = () => {
        let newMarker = new google.maps.Marker({
            position: {
                lat: this.state.selectedPosition.lat(),
                lng: this.state.selectedPosition.lng()
            },
            label: 'A',
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        this.setState({
            overlays: [newMarker]
        });
        console.log(this.state)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch('https://coffeecar.herokuapp.com/api/announces', {
            method: (this.props.item ? 'put' : 'post'),
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                seats: this.state.seats,
                departureTime: this.state.departureTime,
                arrivalDate: this.state.arrivalDate,
                arrivalLatitude: this.state.arrivalLatitude,
                arrivalLongitude: this.state.arrivalLongitude,
                departureLatitude: this.state.departureLatitude,
                departureLongitude: this.state.departureLongitude,
                description: this.state.description,
                imgLink: this.state.imgLink,
                driver: this.state.driver,
                passengers: this.state.passengers
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    console.log(item[0])
                    this.props.updateState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        if (this.props.item) {
            const {
                id,
                title,
                departureTime,
                arrivalDate,
                arrivalLatitude,
                arrivalLongitude,
                departureLatitude,
                departureLongitude,
                description,
                imgLink,
                seats,
                driver,
                passengers
            } = this.props.item
            this.setState({
                id,
                title,
                departureTime,
                arrivalDate,
                arrivalLatitude,
                arrivalLongitude,
                departureLatitude,
                departureLongitude,
                description,
                imgLink,
                seats,
                driver,
                passengers
            })
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Card style={{ width: '75%', margin: 'auto', marginTop: '70px', boxShadow: "5px 5px 5px grey" }}>
                    <Card.Body>
                        <Card.Title>{this.props.item ? 'Información del viaje' : '¡Publica tu viaje ahora!'}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Que no se te olviden las llaves :P</Card.Subtitle>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Titulo</Label>
                                        <Input
                                            type="text"
                                            name="title"
                                            id="title"
                                            plaintext={this.state.writable}
                                            readOnly={this.state.writable}
                                            onChange={this.onChange}
                                            value={this.state.title === null ? '' : this.state.title} />
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
                                                plaintext={this.state.writable}
                                                readOnly={this.state.writable}
                                                onChange={this.onChange}
                                                value={this.state.seats === null ? '' : this.state.seats} />
                                        </FormGroup>
                                        <FormGroup as={Col} md="auto">
                                            <Input
                                                style={{ width: "50px" }}
                                                type="text"
                                                name="seats"
                                                id="seats"
                                                plaintext={this.state.writable}
                                                readOnly={this.state.writable}
                                                onChange={this.onChange}
                                                value={this.state.seats === null ? '' : this.state.seats} />
                                        </FormGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <FormGroup as={Col}>
                                            <Label>Fecha de salida</Label>
                                            <Input
                                                type="datetime-local"
                                                name="departureTime"
                                                id="departureTime"
                                                plaintext={this.state.writable}
                                                readOnly={this.state.writable}
                                                onChange={this.onChange}
                                                value={this.state.departureTime === null ? '' : this.state.departureTime} />
                                        </FormGroup>
                                        <FormGroup as={Col}>
                                            <Label>Fecha de llegada</Label>
                                            <Input
                                                type="datetime-local"
                                                name="arrivalDate"
                                                id="arrivalDate"
                                                plaintext={this.state.writable}
                                                readOnly={this.state.writable}
                                                onChange={this.onChange}
                                                value={this.state.arrivalDate === null ? '' : this.state.arrivalDate} />
                                        </FormGroup>
                                    </Form.Row>
                                    <FormGroup>
                                        <Label>Descripción</Label>
                                        <Input
                                            as="textarea"
                                            name="description"
                                            id="description"
                                            row="3"
                                            plaintext={this.state.writable}
                                            readOnly={this.state.writable}
                                            onChange={this.onChange}
                                            value={this.state.description === null ? '' : this.state.description} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Card style={{ height: "97%", width: '100%', margin: 'auto' }}>
                                        <Card.Body>
                                            <Card.Title>{this.state.mapTitle}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{this.state.mapSubtitle}</Card.Subtitle>
                                            <Map 
                                                onOverlayDragEnd={this.onOverlayDragEnd} 
                                                onMapClick={this.onMapClick} 
                                                overlays={this.state.overlays} 
                                                style={{ width: '100%', minHeight: "365px" }} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <Button variant="dark" style={{ marginLeft: "auto" }} type="submit" >Confirmar</Button>
                                </Col>
                            </Row>
                    </Card.Body>
                </Card >
            </Form>
        );
    }
}

export default TripRoot;
