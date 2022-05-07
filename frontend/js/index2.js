const d = document;
const apiUrl = 'http://localhost:4000/api/v1/todos';
const $main = d.querySelector('main');
const $h1 = d.createElement('h1');
const $input = d.createElement('input');
const $crearBtn = d.createElement('button');
const $ol = d.createElement('ol');

$h1.textContent = 'Lista de adopciones';
$main.appendChild($h1);
$main.appendChild($input);
$crearBtn.setAttribute('id', 'crearBtn');
$crearBtn.textContent = 'Adopta';
$main.appendChild($crearBtn);


let tareas = null;
let $botonesAdoptar = null;

/* EVENTOS */
d.addEventListener('DOMContentLoaded', () => {
    leerTareas();
    escucharEventos();
  });

  const escucharAdoptar = () => {
    $crearBtn.addEventListener('click', crearTarea);
  };

  const vigilarAdoptar = (botones) => {
    //console.log(botones);
    botones.forEach((boton) => {
      const id = boton.parentNode.id;
      //console.log(id);
      boton.addEventListener('click', () => adoptarAnimal(id));
    });
  };


/* FUNCIONES */
const crearTarea = () => {
    //console.log('...crear tarea...');
    const tarea = {
      name: $input.value,
      especie: $input.value,
      raza: $input.value,
      completed: false,
    };
    //console.log('tarea:', tarea);
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/jason',
      },
      body: JSON.stringify(tarea),
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        //console.log('datos:', datos);
        if (datos.success) {
          leerTareas();
          $input.value = null;
        }
      })
      .catch((error) => console.log('error:', error));
  };

const leerTareas = () => {
    $ol.innerHTML = null;
    fetch(apiUrl)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        //console.log('datos:', datos)
        tareas = datos.success;
        tareas.forEach((elemento) => {
          //console.log(elemento);
          const $li = d.createElement('li');
          $li.setAttribute('id', elemento._id);
          const $borrarBtn = d.createElement('button');
          $li.appendChild(d.createTextNode(elemento.name));
          $borrarBtn.classList.add('adoptar');
          $borrarBtn.textContent = 'Adoptar';
          $li.appendChild($borrarBtn);
          $ol.appendChild($li);
        });
        $main.appendChild($ol);
        $botonesAdoptar = d.querySelectorAll('.adoptar');
        //console.log($botonesEliminar);
        vigilarAdoptar($botonesAdoptar);
      })
      .catch((error) => console.log('error:', error));
    };

    const adoptarAnimal = (id) => {
        //console.log('id:', id);
        fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
        })
          .then((respuesta) => leerTareas())
          .catch((error) => console.log('error:', error));
      };