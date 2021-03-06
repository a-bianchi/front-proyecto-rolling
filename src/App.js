import React, { useState, useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import FormularioTurno from "./components/FormularioTurno";
import CardDetalle from "./components/CardDetalle";
import {
  hacerPostEnBackend,
  getTurnos,
  eliminarTurno,
} from "./services/turnos";
import ModalCustom from "./components/ModalCustom";

function App() {
  const [lista, setLista] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const request = async () => {
        const storageLista = await getTurnos();
        if (storageLista) {
          if (storageLista.data) setLista(storageLista.data);
        }
      };
      request();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  return (
    <div>
      <Row>Turnos Clinica</Row>
      <Row>
        <Col xs={5}>
          <FormularioTurno
            turno={{}}
            buttonName={"Agregar"}
            handlerTurno={async (values) => {
              /* values es un objeto con el valor de los inputs del formulario
                  values =      {
                      nombre: 'Pepito',
                      nombreDueno: "Lala",
                      fecha: "Lala",
                      hora: "Lala",
                      sintomas: "Lala",
                  }
              
              */
              const turnoNuevo = await hacerPostEnBackend(values);
              /*
              response = {
                _id: 'adkjshkj2h34k2jh34d09823048'
                nombre: 'Pepito',
                nombreDueno: "Lala",
                fecha: "Lala",
                hora: "Lala",
                sintomas: "Lala",
              }
              */
              /*
               lista = un arreglo de turnos
              */
              setLista([...lista, turnoNuevo.data]);
            }}
          />{" "}
        </Col>
      </Row>
      <ModalCustom
        show={show}
        onHide={() => setShow(false)}
        title={"Informacion"}
        body={"Ya existe un turno para esa mascota!!"}
      />
      <Row>
        {lista.length > 0 ? (
          lista.map((element, index) => {
            return (
              <div key={index} style={{ margin: "15px" }}>
                <CardDetalle
                  indice={index}
                  turno={element}
                  funcionEliminar={async () => {
                    await eliminarTurno(element._id);
                    if (lista.length !== 0) {
                      const nuevaLista = lista.filter((turno) => {
                        if (turno._id !== element._id) return turno;
                      });
                      setLista(nuevaLista);
                    }
                  }}
                />
              </div>
            );
          })
        ) : (
          <Alert variant={"info"}> No hay turnos cargados!!!</Alert>
        )}
      </Row>
    </div>
  );
}

export default App;
