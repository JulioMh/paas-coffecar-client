import React from 'react';
import Card from 'react-bootstrap/Card';
import Reply from './Reply/Reply'
import Comment from './Comment/Comment'
import axios from '../../axios-orders';


class Comments extends React.Component {
    state = {
        comments: []
    }

    componentDidMount() {
        console.log("didmount")
        if (this.state.comments.length === 0) {
            axios.get('comments/' + this.props.announce.id)
                .then(response => this.setState({ comments: response.data.reverse().filter(c => c.announce!==null) }));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.comments.length !== this.state.comments.length) {
            axios.get('comments/' + this.props.announce.id)
                .then(response => this.setState({ comments: response.data.reverse().filter(c => c.announce!==null) }));
        }
    }

    editComment = (child, father) => {
        const responses = father.responses ? father.responses : [];
        axios.post('comments', child)
            .then(response =>{
                responses.push(response.data);
                father.responses = [...responses];
                axios.post('comments', father)
                    .then(this.setState({comments: [...this.state.comments]}))
                    .catch(response => console.log(response))}
            )
            .catch (response=> console.log(response));
    }

    handleSubmit = (body, commentFather) => {
        let comment = {
            body: body,
            author: JSON.parse(sessionStorage.user),
            date: new Date(),
            responses: [],
        }

        if (commentFather) {
            comment.announce = null
            this.editComment(comment, commentFather);
        } else {
            comment.announce = this.props.announce
            axios.post('comments', comment)
                .then(response => {
                    this.setState({ comments: [...this.state.comments, response.data] });
                });
        }
    }

    render() {
        console.log("render")
        const comments = this.state.comments;
        return (
            <Card style={{ width: '75%', margin: 'auto', marginTop: '20px', boxShadow: "5px 5px 5px grey" }}>
                <Card.Body>
                    <Card.Title>¡Comenta algo!</Card.Title>
                    <Reply handleSubmit={this.handleSubmit} replied = {() => {}}/>
                    {comments.map(co => (
                        <Comment 
                        key={co.id} 
                        comment={co} 
                        handleSubmit={this.handleSubmit}                        
                        />
                    ))}
                </Card.Body>
            </Card>
        )
    }
}

export default Comments;