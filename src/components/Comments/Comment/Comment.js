import React from 'react';
import Card from 'react-bootstrap/Card';
import Reply from '../Reply/Reply'
import Button from 'react-bootstrap/Button';

class Comment extends React.Component {
    state = {
        showReply: false,
    }

    render() {
        let reply = this.state.showReply ?
            <Reply comment={this.props.comment} handleSubmit={this.props.handleSubmit} /> : null

        return (
            <Card style={{ width: '100%', margin: 'auto', marginTop: '20px', boxShadow: "5px 5px 5px grey" }}>
                <Card.Body>
                    <Card.Title>{this.props.comment.author.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.comment.date}</Card.Subtitle>
                    <Card.Text>
                        {this.props.comment.body}
                    </Card.Text>
                    <Button
                        onClick={() => this.setState(prevState => ({ showReply: !prevState.showReply }))}
                        variant='warning'
                        style={{ marginBottom: '20px' }}>Responder</Button>
                    {reply}
                    {this.props.comment.responses.map(re => (
                        <Comment key={re.id} comment = {re} handleSubmit={this.props.handleSubmit}/>
                    ))}
                </Card.Body>
            </Card>
        );
    }
}
export default Comment;