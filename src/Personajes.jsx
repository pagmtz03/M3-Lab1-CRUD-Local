import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const imageBasePath = "/images/";

const personajesDanganronpaV3 = [
    { id: 1, name: "Shuichi Saihara", talent: "Detective", gender: "Male", height: "171 cm", weight: "58 kg", birthday: "September 7", image: `${imageBasePath}shuichi.jpg` },
    { id: 2, name: "Kaede Akamatsu", talent: "Pianist", gender: "Female", height: "167 cm", weight: "53 kg", birthday: "March 26", image: `${imageBasePath}kaede.jpg` },
    { id: 3, name: "Kaito Momota", talent: "Astronaut", gender: "Male", height: "184 cm", weight: "74 kg", birthday: "April 12", image: `${imageBasePath}kaito.jpg` },
    { id: 4, name: "Maki Harukawa", talent: "Child Caregiver", gender: "Female", height: "162 cm", weight: "44 kg", birthday: "February 2", image: `${imageBasePath}maki.jpg` },
    { id: 5, name: "Kokichi Oma", talent: "Supreme Leader", gender: "Male", height: "156 cm", weight: "44 kg", birthday: "June 21", image: `${imageBasePath}kokichi.jpg` },
    { id: 6, name: "Himiko Yumeno", talent: "Magician", gender: "Female", height: "150 cm", weight: "39 kg", birthday: "December 3", image: `${imageBasePath}himiko.jpg` },
    { id: 7, name: "K1-B0", talent: "Robot", gender: "None", height: "160 cm", weight: "89 kg", birthday: "October 29", image: `${imageBasePath}keebo.jpg` },
    { id: 8, name: "Angie Yonaga", talent: "Artist", gender: "Female", height: "157 cm", weight: "41 kg", birthday: "April 18", image: `${imageBasePath}angie.jpg` },
    { id: 9, name: "Gonta Gokuhara", talent: "Entomologist", gender: "Male", height: "198 cm", weight: "94 kg", birthday: "January 23", image: `${imageBasePath}gonta.jpg` },
    { id: 10, name: "Kirumi Tojo", talent: "Maid", gender: "Female", height: "176 cm", weight: "52 kg", birthday: "May 10", image: `${imageBasePath}kirumi.jpg` },
    { id: 11, name: "Korekiyo Shinguji", talent: "Anthropologist", gender: "Male", height: "188 cm", weight: "65 kg", birthday: "July 31", image: `${imageBasePath}korekiyo.jpg` },
    { id: 12, name: "Miu Iruma", talent: "Inventor", gender: "Female", height: "173 cm", weight: "56 kg", birthday: "November 16", image: `${imageBasePath}miu.jpg` },
    { id: 13, name: "Rantaro Amami", talent: "???", gender: "Male", height: "179 cm", weight: "62 kg", birthday: "October 3", image: `${imageBasePath}rantaro.jpg` },
    { id: 14, name: "Ryoma Hoshi", talent: "Tennis Pro", gender: "Male", height: "105 cm", weight: "40 kg", birthday: "July 1", image: `${imageBasePath}ryoma.jpg` },
    { id: 15, name: "Tenko Chabashira", talent: "Aikido Master", gender: "Female", height: "165 cm", weight: "52 kg", birthday: "January 9", image: `${imageBasePath}tenko.jpg` },
    { id: 16, name: "Tsumugi Shirogane", talent: "Cosplayer", gender: "Female", height: "174 cm", weight: "51 kg", birthday: "August 15", image: `${imageBasePath}tsumugi.jpg` }
  ];

const Personajes = () => {
    const [data, setData] = useState(personajesDanganronpaV3);
    const [modal, setModal] = useState({ isOpen: false, type: "", personaje: null });

    const toggleModal = (type, personaje = null) => {
        setModal({ isOpen: !modal.isOpen, type, personaje });
    };

    const handleSave = () => {
        if (modal.type === "edit") {
            setData(data.map(p => (p.id === modal.personaje.id ? modal.personaje : p)));
        } else {
            setData([...data, { ...modal.personaje, id: data.length + 1 }]);
        }
        toggleModal("");
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este personaje?")) {
            setData(data.filter(p => p.id !== id));
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">Danganronpa V3: Killing Harmony Characters</h1>
            <Button color="success" onClick={() => toggleModal("add", { name: "", talent: "", gender: "", height: "", weight: "", birthday: "", image: "" })}>Add Character</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Talent</th>
                        <th>Gender</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Birthday</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(personaje => (
                        <tr key={personaje.id}>
                            <td>{personaje.id}</td>
                            <td>
                                <img src={personaje.image} alt={personaje.name} style={{ width: "50px", height: "50px" }} />
                            </td>
                            <td>{personaje.name}</td>
                            <td>{personaje.talent}</td>
                            <td>{personaje.gender}</td>
                            <td>{personaje.height}</td>
                            <td>{personaje.weight}</td>
                            <td>{personaje.birthday}</td>
                            <td>
                                <Button color="primary" size="sm" onClick={() => toggleModal("edit", personaje)}>Edit</Button>{" "}
                                <Button color="danger" size="sm" onClick={() => handleDelete(personaje.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal isOpen={modal.isOpen} toggle={() => toggleModal("")}> 
                <ModalHeader toggle={() => toggleModal("")}>
                    {modal.type === "edit" ? "Edit Character" : "Add Character"}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        {Object.keys(personajesDanganronpaV3[0]).filter(k => k !== "id").map(key => (
                            <FormGroup key={key}>
                                <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                                <Input
                                    type={key === "image" ? "url" : "text"}
                                    value={modal.personaje?.[key] || ""}
                                    onChange={e => setModal({ ...modal, personaje: { ...modal.personaje, [key]: e.target.value } })}
                                />
                            </FormGroup>
                        ))}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                    <Button color="secondary" onClick={() => toggleModal("")}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Personajes;
