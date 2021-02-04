import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

const ImagesReviewed = ({likedImages, create, goBack, dislikedImages}) => {
    const GoBack = () => {
        goBack()
    }

    const createAlbum = () => {
        create(likedImages)
    }

    return (
        <>
            <Button onClick={GoBack}>back</Button>
            <h2>👍</h2>
                {
                    likedImages.map(image => (
                    <Col sm={6} md={4} lg={3} key={image}>
                        <Card className="mb-3">
                                <Card.Img variant="top" src={image} />
                        </Card>
                    </Col>
                ))}

                <hr/>

            <h2>👎</h2>
                {
                    dislikedImages.map(image => (
                    <Col sm={6} md={4} lg={3} key={image}>
                        <Card className="mb-3">
                                <Card.Img variant="top" src={image} />
                        </Card>
                    </Col>
                ))}
                

                <Button onClick={createAlbum}>Done</Button>
        </>
    )
}

export default ImagesReviewed
