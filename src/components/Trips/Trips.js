import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { CarService } from "../../prueba/pruebaFuncion";
import { axios } from "axios";
import "./Trips.module.css";

export class Trips extends Component {
  constructor() {
    super();
    this.state = {
      trips: []
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
  componentidMount(){
      this.setState({trips: this.props.trips});
  }


  carTemplate(trip) {
    
    return (
        
      <div className="car-details">
        <div
          className="p-grid p-nogutter"
          aling-items="center"
          y
          justify-content="center"
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
              {trip.departureTime} | {trip.arrivalDate}
            </div>
            <div className="car-subtitle">{trip.description}</div>

            <div className="car-buttons">
              <Button label="Details" className="p-button-rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const verticalHeader = <h2>{this.props.name}</h2>;
    console.log(this.state.trips);
    return (
      <div className="carousel-demo">
        <div className="content-section implementation">
          <Carousel
            value={this.state.trips}
            itemTemplate={this.carTemplate}
            orientation="vertical"
            style={{ width: "1000px", marginTop: "2em"}}
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
