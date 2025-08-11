import React from 'react';
import { render } from 'react-dom';
import { useState, useEffect, useRef } from 'react';

const Saludo = ({ nombre, idioma = 'es' }) => {
  const saludo = idioma === 'es' ? 'Hola' : 'Hello';

  return (
    <p>
      {saludo} {nombre}
    </p>
  );
};

const nombres = ['Uriel', 'Eduardo', 'Marines', 'Cody'];

const Nombres = () => {
  return (
    <ul>
      {nombres.map((n, i) => (
        <li key={i}>{n}</li>
      ))}
    </ul>
  );
};
const ButtonClickMe = () => {
  const [numeroVeces, setnumeroVeces] = useState(0);

  useEffect(() => {
    console.log('holaaa');
    return () => {
      console.log('adios');
    };
  }, []);
  return (
    <div>
      <p>Precionado: {numeroVeces}</p>
      <button onClick={() => setnumeroVeces(numeroVeces + 1)}>Click me!</button>
    </div>
  );
};
const SaludoInput = () => {
  const [name, setName] = useState('');
  return (
    <div>
      <input type="text" onChange={(event) => setName(event.target.value)} />
      <p>Tu Nombre es {name}</p>
      <a href="#" onClick={(event) => event.preventDefault()}>
        Ir
      </a>
    </div>
  );
};

const FirstForm = ({ showed }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const firstInput = useRef()
  useEffect(() => {
    
    if(showed){
      firstInput.current.focus()
    }
  }, [showed]);
  function sendForm(ev) {
    ev.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTitle('');
        setBody('');
        console.log(json);
      });
  }

  return (
    <form onSubmit={(ev) => sendForm(ev)}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          ref={firstInput}
        />
      </div>
      <div>
        <label htmlFor="body">Publicación</label>
        <textarea
          value={body}
          type="text"
          id="body"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <input type="submit" value="Enviar" />
    </form>
  );
};
const Accordion = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Mostrar formulario</button>
      {show && <FirstForm showed={show} />}
    </div>
  );
};

const App = () => {
  const [showButton, setShowButton] = useState(true);
  return (
    <>
      <h1>
        <Saludo idioma="en" nombre="Frank" />
      </h1>
      <Nombres />

      <button onClick={() => setShowButton(false)}>
        Preciona para eliminar boton
      </button>
      <br />
      {showButton && <ButtonClickMe />}
      <SaludoInput />
      <Accordion />
    </>
  );
};

render(<App />, document.getElementById('root'));
