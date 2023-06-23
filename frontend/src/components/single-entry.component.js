import React from "react";

import 'bootstrap/dist/css/bootstrap.css'

import { Button, Card, Row, Col } from "react-bootstrap";

const Entry=({entryData, setChangeDisease, deleteSingleEntry, setChangeEntry})=>{
        const changeDisease = () => {
        setChangeDisease({
        change: true,
        id: entryData._id
        });
    };

    const changeEntry = () => {
        setChangeEntry({
        change: true,
        id: entryData._id
        });
    };
    
 return(
        <Card>
            <Row>

                <Col>Patient Name:{entryData!==undefined && entryData.patientname}</Col>
                <Col>Disease/Symptoms:{entryData!==undefined && entryData.disease}</Col>
                <Col>Age:{entryData!==undefined && entryData.contactNo}</Col>
                <Col>Contact No.:{entryData!==undefined && entryData.age}</Col>
                <Col><Button onClick={() => deleteSingleEntry(entryData._id)}>Delete Appointment</Button></Col>
                <Col><Button onClick={changeDisease}>Change Symptoms</Button></Col>
                <Col><Button onClick={changeEntry}>Update Appointment</Button></Col>

            </Row>
        </Card>
    )


    

    

}

export default Entry

