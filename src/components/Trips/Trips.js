import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import Card from 'react-bootstrap/Card';


export class Trips extends Component {

  constructor() {
    super();
    this.state = {
      trips: [],


    };
    this.carTemplate = this.carTemplate.bind(this);

    this.responsiveSettings = [
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  static getDerivedStateFromProps(props, state) {
    return ({
      trips: props.trips
    })
  }


  saveId = (trip) => {
    this.props.redirectToTrip(trip.id);
  }



  carTemplate(trip) {
    return (

      <div className="car-details">
        <div
          className="p-grid p-nogutter"
          aling-items="center" justify-content="center"
        >
          <div className="p-col-12">
            <img
              src={trip.imgLink}
              alt={trip.imgLink}
              style={{ width: "200px" }}
            />
          </div>
          <div className="p-col-12 car-data">
            <div className="car-title">
              <h2>{trip.title}</h2>
            </div>
            <div className="car-subtitle">
              <b>
                {trip.departureTime} | {trip.arrivalDate}
              </b>
            </div>
              <Card
                style={{ width: "75%", margin: "auto", marginTop: "50px", boxShadow: "5px 5px 5px grey" }}
              >
                <Card.Body>
                  <Card.Title>Descripcion</Card.Title>
                  {trip.description}
                </Card.Body>
              </Card>
            <div className="car-buttons">
              <br></br>
              <Button
                label="Details"
                className="p-button-rounded"
                onClick={() => this.saveId(trip)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const verticalHeader = <h2>{this.props.name}</h2>;

    return (
      <div className="carousel-demo">
        <div className="content-section implementation">
          <Carousel
            value={this.state.trips}
            itemTemplate={this.carTemplate}
            orientation="vertical"
            style={{
              width: "75%",
              heigth: "100%",
              margin: "auto",
              marginTop: "50px",
              textAlign: "center",
              alignContent: "center"
            }}
            numVisible={1}
            numScroll={1}
            responsive={this.responsiveSettings}
            verticalViewPortHeight="400px"
            header={verticalHeader}
          ></Carousel>
        </div>
      </div>
    );
  }
}

export default Trips;
