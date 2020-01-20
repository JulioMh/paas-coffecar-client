import React from 'react';
import Card from 'react-bootstrap/Card';
import Reply from './Reply/Reply'
import Comment from './Comment/Comment'


class Comments extends React.Component {

    state = {
        comments: null
    }

    componentDidMount(){
        if(comments===null){
            const __ =  
            this.set
        }
    }

    



    render() {
        return (
            <Card style={{ width: '75%', margin: 'auto', marginTop: '20px', boxShadow: "5px 5px 5px grey" }}>
                <Card.Body>
                    <Reply id={props.id} isReply={false} />
                    {props.comments.map(co => (
                        <Comment
                            key={co.id}
                            id={co.id}
                            user={co.user}
                            date={co.date}
                            text={co.text}
                        />
                    ))}
                </Card.Body>
            </Card>
        )
    }
}

export default comments;