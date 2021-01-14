import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

const LikedImages = ({likedImages, create, goBack, dislikedImages}) => {
    console.log(goBack)

    const selectImagesAgain = () => {
        goBack()
    }

    const createAlbum = () => {
        create(likedImages)
    }

    return (
        <>
            <Button onClick={selectImagesAgain}>back</Button>
            <h2>👍</h2>
                {
                    likedImages.map(image => (
                    <Col sm={6} md={4} lg={3} key={image.id}>
                        <Card className="mb-3">
                                <Card.Img variant="top" src={image} />
                        </Card>
                    </Col>
                ))}

                <hr/>

            <h2>👎</h2>
                {
                    dislikedImages.map(image => (
                    <Col sm={6} md={4} lg={3} key={image.id}>
                        <Card className="mb-3">
                                <Card.Img variant="top" src={image} />
                        </Card>
                    </Col>
                ))}
                

                <Button onClick={createAlbum}>Done</Button>
        </>
    )
}

export default LikedImages
