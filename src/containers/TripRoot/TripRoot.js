import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Edit from '../../components/Edit/Edit';
import Create from '../../components/Create/Createe';

class TripRoot extends React.Component {
    state = {
        toEdit: false,
    }

    render() {
        return (
            <Aux>
                {this.state.toEdit ? <Edit/> : <Create/>}
            </Aux>);
    }
}

export default TripRoot;