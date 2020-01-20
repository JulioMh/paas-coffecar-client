import React from 'react';
import Card from 'react-bootstrap/Card';
import Reply from '../Reply/Reply'
import Button from 'react-bootstrap/Button';

const comment = (props) => {
    let reply = false;
    replay ? <Reply id={props.id} isReply={true} /> : null;
    return (
        <Card style={{ width: '75%', margin: 'auto', marginTop: '20px', boxShadow: "5px 5px 5px grey" }}>
            <Card.Body>
                <Card.Title>{props.user}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.date}</Card.Subtitle>
                <Card.Text>
                    {props.text}
                </Card.Text>
                <Button onClick={() => replay = !reply}>Responder</Button>
            </Card.Body>
            {replay}
            {props.responses.map(re => (
                comment(
                    key = re.id,
                    id = re.id,
                    user = re.user,
                    date = re.date,
                    text = re.text)
            ))}
        </Card>
    )
}

export default comment;