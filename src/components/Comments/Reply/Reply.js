import React, { Component } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import Button from 'react-bootstrap/Button';
import {classes} from './Reply.module.css'

class Reply extends Component {
    state = {
        value: 'Escribe tu comentario'
    };

    handleSubmit() {

    }

    render() {
        return (
            <div className={classes.reply}>
                <form onSubmit={this.handleSubmit}>
                    <InputTextarea value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} rows={3} cols={50} autoResize={true}></InputTextarea>
                    <Button type='submit' value='Comentar'></Button>
                </form>
            </div>
        );
    }
}

export default reply;