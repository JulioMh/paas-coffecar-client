import React from 'react';
import Form from 'react-bootstrap/Form';
import Label from 'react-bootstrap/FormLabel';
import Input from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


class TripRoot extends React.Component {
    state = {
        writable: true,
        id: 0,
        title: '',
        departureTime: '',
        arrivalTime: '',
        arrivalLatitude: '',
        arrivalLongitude: '',
        departureLatitude: '',
        departureLongitude: '',
        description: '',
        imgLink: '',
        seats: '',
        driver: '5e1768e1494e0738fe566ac7',
        passengers: ''
    }

onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
}

submitFormAdd = e => {
    e.preventDefault()
    fetch('https://coffeecar.herokuapp.com/api/announces', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        seats: this.state.seats,
        departureTime: this.state.departureTime,
        arrivalTime: this.state.arrivalTime,
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
        if(Array.isArray(item)) {
          console.log('success')
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

componentDidMount(){
    if (this.props.item) {
        const { 
            id, 
            title, 
            departureTime, 
            arrivalTime, 
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
            arrivalTime, 
            arrivalLatitude, 
            arrivalLongitude, 
            departureLatitude, 
            departureLongitude, 
            description, 
            imgLink, 
            seats, 
            driver, 
            passengers})
    }
}

render() {
    return (
        <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
            <FormGroup>
                <Label>Titulo</Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    plaintext={this.props.writable}
                    readOnly={this.props.writable}
                    onChange={this.onChange}
                    value={this.state.title === null ? '' : this.state.title} />
            </FormGroup>

            <FormGroup>
                <Label>Asientos</Label>
                <Input
                    type="range"
                    min="1"
                    max="14"
                    name="seats"
                    id="seats"
                    plaintext={this.props.writable}
                    readOnly={this.props.writable}
                    onChange={this.onChange}
                    value={this.state.seats === null ? '' : this.state.seats} />
            </FormGroup>

            <Form.Row>
                <FormGroup as={Col}>
                    <Label>Fecha de salida</Label>
                    <Input
                        type="datetime-local"
                        name="departureTime"
                        id="departureTime"
                        plaintext={this.props.writable}
                        readOnly={this.props.writable}
                        onChange={this.onChange}
                        value={this.state.departureTime === null ? '' : this.state.departureTime} />
                </FormGroup>
                <FormGroup as={Col}>
                    <Label>Fecha de llegada</Label>
                    <Input
                        type="datetime-local"
                        name="arrivalTime"
                        id="arrivalTime"
                        plaintext={this.props.writable}
                        readOnly={this.props.writable}
                        onChange={this.onChange}
                        value={this.state.arrivalTime === null ? '' : this.state.arrivalTime} />
                </FormGroup>
            </Form.Row>

            <FormGroup>
                <Label>Descripción</Label>
                <Input
                    as="textarea"
                    name="description"
                    id="description"
                    row="3"
                    plaintext={this.props.writable}
                    readOnly={this.props.writable}
                    onChange={this.onChange}
                    value={this.state.description === null ? '': this.state.description} />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
}
}

export default TripRoot;