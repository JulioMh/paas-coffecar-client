import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";



class Trips extends Component {

    constructor() {
        super();
        this.state = {
            trips: [],
            layout: 'list',
            selectedCar: null,
            visible: false,
            sortKey: null,
            sortOrder: null,
            name: '',
            comment: ''
        };
       /* this.serviceTrips = new ServiceTrips();*/
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }


    componentDidMount() {
       /* this.serviceTrips.getAllTrips().then(data => this.setState({ trips: data }));
        console.log(this.trips);*/
    }



    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1,
                sortField: value.substring(1, value.length),
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1,
                sortField: value,
                sortKey: value
            });
        }
    }

    renderListItem(trip) {
        return (
            <div className="p-col-12">
                <div className="car-details">
                    <div>

                        <div class="p-grid">
                            <div className="p-col-12">Vin: <b>{trip.name}</b></div>
                            <div className="p-col-12">Year: <b>{trip.username}</b></div>
                            <div className="p-col-12">Brand: <b>{trip.phone}</b></div>
                            <div className="p-col-12">Color: <b>{trip.email}</b></div>
                        </div>
                    </div>
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedCar: trip, visible: true })}></Button>
                </div>
            </div>
        );
    }

    renderGridItem(trip) {
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                <Panel header={trip.name} style={{ textAlign: 'center' }}>

                    <div className="car-detail">{trip.year} - {trip.phone}</div>
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedCar: trip, visible: true })}></Button>
                </Panel>
            </div>
        );
    }

    itemTemplate(trip, layout) {
        if (!trip) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(trip);
        else if (layout === 'grid')
            return this.renderGridItem(trip);
    }

    renderCarDialogContent() {
        if (this.state.selectedCar) {
            return (
                <div className="p-grid" style={{ fontSize: '16px', textAlign: 'center', padding: '20px' }}>
                    <div className="p-col-12" style={{ textAlign: 'center' }}>

                    </div>

                    <div className="p-col-4">Vin: </div>
                    <div className="p-col-8">{this.state.selectedCar.name}</div>

                    <div className="p-col-4">Year: </div>
                    <div className="p-col-8">{this.state.selectedCar.username}</div>

                    <div className="p-col-4">Brand: </div>
                    <div className="p-col-8">{this.state.selectedCar.phone}</div>

                    <div className="p-col-4">Color: </div>
                    <div className="p-col-8">{this.state.selectedCar.email}</div>
                </div>
            );
        }
        else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            { label: 'Newest First', value: '!year' },
            { label: 'Oldest First', value: 'year' },
            { label: 'Brand', value: 'brand' }
        ];

        return (
            <div className="p-grid">
                <div className="p-col-6" style={{ textAlign: 'left' }}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({ layout: e.value })} />
                </div>
            </div>
        );
    }

    

    render() {
        const header = this.renderHeader();

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>{this.state.name}</h1>
                        <p>{this.state.comment}</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataView value={this.state.trips} layout={this.state.layout} header={header}
                        itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={20}
                        sortOrder={this.state.sortOrder} sortField={this.state.sortField} />

                    <Dialog header="Car Details" visible={this.state.visible} width="225px" modal={true} onHide={() => this.setState({ visible: false })}>
                        {this.renderCarDialogContent()}
                    </Dialog>
                </div>


            </div>
        );
    }
}

export default Trips;