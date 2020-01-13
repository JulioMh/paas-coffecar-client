import React, { Component } from 'react';

import { TabView, TabPanel } from 'primereact/tabview';
import Trips from '../../components/Trips/Trips';

import { Redirect } from 'react-router-dom';



class Home extends Component {

    render() {
        if (!sessionStorage.getItem('user')) {
            return (<Redirect to={'/'} />)
        }
        return (

            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Home</h1>
                        <p>Start to adventure</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <TabView renderActiveOnly={true}>
                        <TabPanel header="Trips available" leftIcon="pi pi-calendar">
                            <Trips name="nose me cambia" comment="pues eso"></Trips>
                        </TabPanel>
                        <TabPanel header="My Trips" rightIcon="pi pi-user">
                           <Trips name></Trips>
                        </TabPanel>

                        <TabPanel header="no funcional" disabled={true}>

                        </TabPanel>
                    </TabView>
                </div>
            </div>
        )

    }
}

export default Home;