import React, { Component } from 'react';
import Input from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';

class Reply extends Component {
    state = {
        commentBody: '',
    };

    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = e  => {
        e.preventDefault();
        this.props.handleSubmit(this.state.commentBody, this.props.comment);
        this.props.replied();
        this.setState({commentBody:''});
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                    <FormGroup as={Col} >
                        <Input
                            as="textarea"
                            name="commentBody"
                            id="commentBody"
                            placeholder='Y aqui el comentario'
                            value={this.state.commentBody}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                <Col>
                    <Button style={{ marginTop: "10px" }} type='submit' variant='dark'>Comentar</Button>
                </Col>
            </Form>
        );
    }
}

export default Reply;