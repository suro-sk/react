import React from "react";
import {Row, Col} from "react-bootstrap";
import img from '../../../assets/about.jpg'

export default function About() {
    return (
        <>
            <h1 className="text-center">About Us</h1>
            <Row className="mt-5">
                <Col sm={12} lg={6}>
                    <figure className="text-center">
                        <img src={img} alt=""/>
                    </figure>
                </Col>
                <Col sm={12} lg={6}>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters, as opposed to using 'Content here, content here', making it look like
                        readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
                        their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
                        their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).</p>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation by H.
                        Rackham.</p>
                </Col>
            </Row>
        </>
    )
}