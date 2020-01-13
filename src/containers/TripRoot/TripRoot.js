/*global google*/
import React from 'react';
import Form from 'react-bootstrap/Form';
import Label from 'react-bootstrap/FormLabel';
import Input from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import { FileUpload } from 'primereact/fileupload';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Map from '../../components/UI/Map/Map';
import axios from 'axios';


class TripRoot extends React.Component {
    state = {
        writable: true,
        overlays: null,
        mapTitle: "Desde...",
        mapSubtitle: "Haz click para marcar tu punto de salida",
        postingData: false,
        postingImg: false,
        showImg: false,
        id: 0,
        title: '',
        departureTime: '',
        arrivalDate: '',
        arrivalLatitude: '',
        arrivalLongitude: '',
        departureLatitude: '',
        departureLongitude: '',
        availableSeats: '',
        description: '',
        imgLink: '',
        seats: '2',
        driver: null,
        passengers: null,
        joined: null,
    }

    static getDerivedStateFromProps(props, state) {
        if (props.item && state.id === 0) {
            const passengers = props.item.passengers ? props.item.passengers : [];
            return ({
                id: props.item.id,
                title: props.item.title,
                departureTime: props.item.departureTime,
                arrivalDate: props.item.arrivalDate,
                arrivalLatitude: props.item.arrivalLatitude,
                arrivalLongitude: props.item.arrivalLongitude,
                departureLatitude: props.item.departureLatitude,
                departureLongitude: props.item.departureLongitude,
                availableSeats: props.item.seats - passengers.length,
                description: props.item.description,
                imgLink: props.item.imgLink,
                seats: props.item.seats,
                driver: props.item.driver,
                passengers: passengers,
                writable: props.item.driver.id === JSON.parse(sessionStorage.user).id,
                joined: passengers.find(element => element.id === JSON.parse(sessionStorage.user).id)
            });
        } else {
            return ({ driver: JSON.parse(sessionStorage.user) });
        };
    }
    componentDidMount() {
        if (this.state.arrivalLatitude !== '') {
            this.addAllMarkers();
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    uploadHandler = e => {
        this.setState(prevState => ({ postingImg: !prevState.postingImg }))
        const apiUrl = 'https://api.imgur.com/3/upload.json';
        const apiKey = '546c25a59c58ad7';

        const formData = new FormData();
        formData.append("image", e.files[0]);

        axios(apiUrl, {
            method: 'POST',
            headers: {
                authorization: `Client-ID ${apiKey}`
            },
            data: formData
        })
            .then(res =>
                this.setState(prevState => ({ postingImg: !prevState.postingImg, imgLink: res.data.data.link })
                ))
            .catch(error => console.log(error));
    }

    handleModal = () => { this.setState(prevState => ({ showImg: !prevState.showImg })) }

    onMapClick = e => {
        if (this.state.departureLatitude && !this.state.arrivalLatitude) {
            this.setState({
                arrivalLatitude: e.latLng.lat(),
                arrivalLongitude: e.latLng.lng(),
                mapTitle: '¿Te has equivocado?',
                mapSubtitle: '¡Arregla tu desastre moviendo las marcas!',
            });
            this.addArrivalMarker();
        } else if (!this.state.arrivalLatitude) {
            this.setState({
                departureLatitude: e.latLng.lat(),
                departureLongitude: e.latLng.lng(),
                mapTitle: 'Hasta...',
                mapSubtitle: 'Haz click aqui para marcar tu destino',
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
                lat: this.state.arrivalLatitude,
                lng: this.state.arrivalLongitude
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
                lat: this.state.departureLatitude,
                lng: this.state.departureLongitude
            },
            label: 'A',
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        this.setState({
            overlays: [newMarker]
        });
    }

    addAllMarkers = () => {
        let markers = [new google.maps.Marker({
            position: {
                lat: this.state.departureLatitude,
                lng: this.state.departureLongitude
            },
            label: 'A',
            draggable: this.state.writable,
            animation: google.maps.Animation.DROP
        }),
        new google.maps.Marker({
            position: {
                lat: this.state.arrivalLatitude,
                lng: this.state.arrivalLongitude
            },
            label: 'B',
            draggable: this.state.writable,
            animation: google.maps.Animation.DROP,
        })];
        this.setState({
            overlays: markers,
            mapTitle: '¿Quieres cambiar algo?',
            mapSubtitle: '¡Mueve las marcas!'
        })
    }

    handleJoin = () => {
        const passengers = this.state.passengers ? this.state.passengers : [];
        this.setState(prevState => ({
            passengers: [...passengers, JSON.parse(sessionStorage.user)],
            availableSeats: prevState.availableSeats - 1,
            joined: !prevState.joined
        }));
        this.handleSubmit();
    }

    handleUnjoin = () => {
        const passengers = this.state.passengers;
        const passengerIndex = passengers.findIndex(passenger => passenger.id === JSON.parse(sessionStorage.user).id);
        passengers.slice(passengerIndex, 1);
        this.setState(prevState => ({
            passengers: passengers,
            availableSeats: prevState.availableSeats + 1,
            joined: !prevState.joined
        }));
        this.handleSubmit();
    }

    handleSubmit = e => {
        this.setState(prevState => ({ postingData: !prevState.postingData }));
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
            .then(
                this.setState(prevState => ({
                    postingData: !prevState.postingData
                })))
            .catch(err => console.log(err));
    }

    render() {
        const submitButton = this.state.writable ?
            <Button variant="dark" style={{ marginLeft: "auto" }} type="submit" >Confirmar</Button>
            : null;

        const joinButton = this.state.joined ?
            <Button variant="danger" onClick={this.handleUnjoin}>¿Dejar el viaje?</Button>
            : <Button variant="success" onClick={this.handleJoin}>¡Unete al viaje!</Button>;


        const uploader = this.state.postingImg ?
            <Button variant="dark" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            </Button>
            : <FileUpload
                mode="basic"
                chooseLabel={this.state.imgLink === '' ? "¿Alguna imagen del coche?" : "¡Listo! ¿No te convence?"}
                name="imgLink"
                customUpload
                auto
                uploadHandler={this.uploadHandler}
            />;
        const showImgButton = this.state.imgLink ?
            <Button variant="dark" onClick={this.handleModal}>Ver coche</Button>
            : null;


        return (
            <Container>
                <Modal show={this.state.showImg} size="lg"
                    centered onHide={this.handleModal}>
                    <Image src={this.state.imgLink.concat("/171x180")} />
                </Modal>
                <Card style={{ width: '75%', margin: 'auto', marginTop: '50px', boxShadow: "5px 5px 5px grey" }}>
                    <Card.Body>
                        <Card.Title>{this.props.item ? 'Información del viaje' : '¡Publica tu viaje ahora!'}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Que no se te olviden las llaves :P</Card.Subtitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Titulo</Label>
                                        <Input
                                            type="text"
                                            name="title"
                                            id="title"
                                            plaintext={!this.state.writable}
                                            readOnly={!this.state.writable}
                                            onChange={this.onChange}
                                            value={this.state.title === null ? '' : this.state.title} />
                                    </FormGroup>
                                    <FormGroup>
                                        {this.state.writable ? uploader : null}
                                    </FormGroup>
                                    <FormGroup>
                                        {showImgButton}
                                    </FormGroup>
                                    <Label>Asientos {this.state.availableSeats} disponibles de {this.state.seats} </Label>
                                    <Form.Row>
                                        {this.state.writable ?
                                            <FormGroup as={Col}>
                                                <Input
                                                    type="range"
                                                    min="1"
                                                    max="14"
                                                    name="seats"
                                                    id="seats"
                                                    plaintext={!this.state.writable}
                                                    readOnly={!this.state.writable}
                                                    onChange={this.onChange}
                                                    value={this.state.seats === null ? '' : this.state.seats} />
                                            </FormGroup> : null}
                                        <FormGroup as={Col}>
                                            {this.state.writable? null: joinButton}
                                        </FormGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <FormGroup as={Col}>
                                            <Label>Fecha de salida</Label>
                                            <Input
                                                type="datetime-local"
                                                name="departureTime"
                                                id="departureTime"
                                                plaintext={!this.state.writable}
                                                readOnly={!this.state.writable}
                                                onChange={this.onChange}
                                                value={this.state.departureTime === null ? '' : this.state.departureTime} />
                                        </FormGroup>
                                        <FormGroup as={Col}>
                                            <Label>Fecha de llegada</Label>
                                            <Input
                                                type="datetime-local"
                                                name="arrivalDate"
                                                id="arrivalDate"
                                                plaintext={!this.state.writable}
                                                readOnly={!this.state.writable}
                                                onChange={this.onChange}
                                                value={this.state.arrivalDate === null ? '' : this.state.arrivalDate} />
                                        </FormGroup>
                                    </Form.Row>
                                    <Row></Row>
                                    <FormGroup>
                                        <Label>Descripción</Label>
                                        <Input
                                            as="textarea"
                                            name="description"
                                            id="description"
                                            row="3"
                                            plaintext={!this.state.writable}
                                            readOnly={!this.state.writable}
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
                                                lat={this.state.departureLatitude}
                                                lng={this.state.departureLongitude}
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
                                    {submitButton}
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card >
            </Container>
        );
    }
}
export default TripRoot;
