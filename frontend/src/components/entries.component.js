
    import React, { useState, useEffect } from "react";

    import axios from "axios";

    import Button from'react-bootstrap/Button'
    import { Modal } from "react-bootstrap";


    import Container from 'react-bootstrap/Container'
    import Form from 'react-bootstrap/Form'

    import Entry from './single-entry.component'


    const Entries=() => {

        const [entries, setEntries] = useState([])
        const [addNewEntry, setAddNewEntry] = useState(false)
        const [newEntry, setNewEntry] = useState({patientname: "",disease:"",contactno:0, age:0})
        const [refreshData, setRefreshData] = useState(false)
        const [changeEntry, setChangeEntry] = useState({change:false, id: 0})
        const [changeDisease, setChangeDisease] = useState({change:false, id: 0})
        const [changeDiseaseName, setChangeDiseaseName] = useState({change:false, id: 0})

    useEffect(() => {
        getAllEntries();
        setRefreshData(false); 
        }, [refreshData]);

        
        return(

        <div style={{ backgroundColor: "#FCE38A" }}>
        <Container>
            <Button style={{ backgroundColor: "#FF6F61", color: "#fff" }} onClick={() => setAddNewEntry(true)}>Appointments</Button>
            <Container>
            </Container>
            {entries != null && entries.map((entry, i) => (
            <Entry
                key={entry.id}
                entryData={entry}
                changeEntry={setChangeEntry}
                deleteSingleEntry={deleteSingleEntry}
                setChangeDisease={setChangeDisease}
                setChangeEntry={setChangeEntry}
                newEntry={setNewEntry}
            />
            ))}
        </Container>


                <Modal show = {addNewEntry} onHide={()=> setAddNewEntry(false)} >
                    <Modal.Header closeButton>
                        <Modal.Title> New Appointments</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Control onChange={(event) => setNewEntry({ ...newEntry, patientname: event.target.value })}></Form.Control>
                            <Form.Label>Disease/Symptoms</Form.Label>
                            <Form.Control onChange={(event) => setNewEntry({ ...newEntry, disease: event.target.value })}></Form.Control>
                            <Form.Label>Age</Form.Label>
                            <Form.Control onChange={(event) => setNewEntry({ ...newEntry, contactno: event.target.value })}></Form.Control>
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="number" onChange={(event) => setNewEntry({ ...newEntry, age: event.target.value })}></Form.Control>
                            </Form.Group>
                            <Button onClick={addSingleEntry}>Add</Button>
                            <Button onClick={() => setAddNewEntry(false)}>Cancel</Button>
                    </Modal.Body>
                </Modal> 

                    <Modal show={changeDisease && changeDisease.change} onHide={() => setChangeDisease({change: false, id:0})} >
                    <Modal.Header closeButton>
                        <Modal.Title>Change Diseases</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>New Symptoms</Form.Label>
                                <Form.Control onChange={(event) => { setChangeDiseaseName(event.target.value) }}></Form.Control>
                            </Form.Group> 
                        
                        <Button onClick={()=> changeDiseaseForEntry()}>Update</Button>
                        <Button onClick={()=> setChangeDisease({change: false, id:0})}>Cancel</Button>

                    </Modal.Body>

                    </Modal>

                    <Modal show= {changeEntry && changeEntry.change} onHide={() => setChangeEntry({change: false, id:0})} >
                    <Modal.Header closeButton>
                        <Modal.Title>Change Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, patientname: event.target.value })}></Form.Control>
                        <Form.Label>Disease/Symptoms</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, disease: event.target.value })}></Form.Control>
                        <Form.Label>Age</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, contactno: event.target.value })}></Form.Control>
                        <Form.Label>Contact No.</Form.Label>
                        <Form.Control type="number" onChange={(event) => setNewEntry({ ...newEntry, age: event.target.value })}></Form.Control>
                        </Form.Group>
                        <Button onClick={changeSingleEntry}>Update</Button>
                        <Button onClick={() => setChangeEntry({ change: false, id: 0 })}>Cancel</Button>
                    </Modal.Body>

                </Modal>
            </div>

            
        );

        function changeDiseaseForEntry() {
        if (!changeDisease || !changeDisease.id) {
            return; 
        
        var updatedDisease = {
            change: false,
            id: changeDisease.id
        };

        }
        
        
        setChangeDisease(updatedDisease);
        
        var url = `http://localhost:8080/disease/update/${changeDisease.id}`;
        axios
            .put(url, {
            disease:changeDiseaseName,
            patientname: newEntry.patientname,
            contactno: newEntry.contactno,
            age: parseFloat(newEntry.age)
            })
            .then(response => {
            if (response.status === 200) {
                setRefreshData(true);
            }
            });
        }



        function changeSingleEntry(){
            setChangeEntry({ change: false, id: changeEntry.id });
            var url = `http://localhost:8080/entry/update/${changeEntry.id}`;
            axios.put(url,{
                "disease": newEntry.disease,
                "patientname": newEntry.patientname,
                "contactno": newEntry.contactno,
                "age": parseFloat(newEntry.age),
        })
            .then(respose=>{
                if(respose.status===200){
                    setRefreshData(true)
                }
            })
        }

        function addSingleEntry(){
        setAddNewEntry(false)
        var url = "http://localhost:8080/entry/create"
        axios.post(url,{
            "disease": newEntry.disease,
            "patientname": newEntry.patientname,
            "contactno": newEntry.contactno,
            "age":  parseFloat(newEntry.age),
        }).then(response=>{
            if(response.status === 200){
                setRefreshData(true)
            }
        })
    }

    function deleteSingleEntry(id){
        var url = "http://localhost:8080/entry/delete/" + id
            axios
            .delete(url)        
            .then(response=>{
                if(response.status === 200){
                    setRefreshData(true)
                }
            });
    }



    function getAllEntries(){
        var url = "http://localhost:8080/entries"
        axios.get(url, {
            resposeType:"json",


        }).then(response=>{
            if(response.status === 200){
                setEntries(response.data)
            }
        })
    }





    }

    export default Entries

