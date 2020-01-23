import React from 'react';
import { Timeline, Tweet, Follow, Hashtag, Mention } from 'react-twitter-widgets';
import Card from 'react-bootstrap/Card';
import './Twitter.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'



const twitter = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ width: '300px', margin: 'auto', marginTop: '50px', boxShadow: "5px 5px 5px grey" }}>
                        <Card.Body>
                            <Follow
                                username="coffeecarapp"
                                options={{ size: 'large' }}
                            />
                            <Hashtag
                                hashtag="CoffeeCar"
                                options={{ size: 'large' }}
                            />
                            <Mention
                                username="coffeecarapp"
                                options={{ size: 'large' }}
                            />
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '100%', margin: 'auto', marginTop: '50px', boxShadow: "5px 5px 5px grey" }}>
                        <Card.Body>
                            <Timeline
                                dataSource={{
                                    sourceType: 'likes',
                                    screenName: 'coffeecarapp'
                                }}
                                options={{
                                    username: 'CoffeeCar',
                                    height: '400'
                                }}
                                onLoad={() => console.log('Timeline is loaded!')}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card style={{ width: '100%', margin: 'auto', marginTop: '50px', boxShadow: "5px 5px 5px grey" }}>
                        <Card.Body>
                            <Timeline
                                dataSource={{
                                    sourceType: 'profile',
                                    screenName: 'coffeecarapp'
                                }}
                                options={{
                                    username: 'CoffeeCar',
                                    height: '400'
                                }}
                                onLoad={() => console.log('Timeline is loaded!')}
                            />
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '100%', margin: 'auto', marginTop: '50px', boxShadow: "5px 5px 5px grey" }}>
                        <Card.Body>
                            <Tweet
                                tweetId='1219318027595997194'
                            />
                        </Card.Body>
                    </Card>
                    
                </Col>
            </Row>
            <br></br>
            <br></br>
        </Container>

    );
}

export default twitter;