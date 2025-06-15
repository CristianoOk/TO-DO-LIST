import { useState } from "react";
import Todo from "./Todo.js";
import './todoApp.css';

export default function TodoApp() {
  const [title, setTitle] = useState("Hola");
  const [todos, setTodos] = useState([]);

  /*
  function handleClick(e) { //Con "e", la función (que podría tener cualquier otro nombre distinto de "handleClick") lo que recibe como argumento es un evento (que puede ser de algún 'onClick', 'onChange', etc.).
    e.preventDefault(); //Con "preventDefault", elimino el comportamanieto nativo del lugar donde se haya producido el evento ("e") en donde la función "handleClick" fué llamada. Por ejemplo, digamos que tenés una barrita para que el user ingrese algún texto, y en la barrita por default aparece "Hola" y además te aparece un boton para que una vez que escribás algo en la barrita, eso que escribiste ahora quede mostrandose en lugar de "Hola"; bueno, si no pusiera esta función "preventDefault()" => si cambiaría cuando presiones el botón, peero la página se cargaría inmediatamente y volvería a salir el "Hola" que traía como default (esta actualización es incluso tan rádia en algunos casos, que podría parecer que ni siquiera funciona, me refiero a que si dice "Hola" sobre la barrita y vos escribís "jajPLANTA" y presionas el boton para que ahora aparezca "jajPLANTA", aunque no parezca que pasa nada si se cambia, pero rapídamente vuelve a "Hola").
    setTitle("Marcos");
  }*/

  function handleChange(e) {
    const value = e.target.value; //"taget.value", permite acceder (me gusta más capturar, que es lo que está haciendo en este caso) al valor del evento ("e") en este caso. Dicho valor "value" se está asignando a una "const value" (o sea, jaja si si la constante coincide con el nombre de la propiedad).

    setTitle(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(), //"crypto.randomUUID()", es una función que genera un identificador único (UUID) utilizando el módulo "crypto".
      title: title, //Se está asignando la variable "title" (del lado derecho después de ":"), como  valor para la propiedad "title" (del lado izquierdo de ":"). Le digo 'propiedad', ya que, si te das cuenta "const newTodo" es igual a varías cosas que están entre llaves "{}" => puedo afirmar que es un objeto, y un objeto tiene propiedades
      completed: false,
    };

    const temp = [... todos];
    temp.unshift(newTodo); //La función "unshift", agrega un elemento al principio del arreglo "temp".

    setTodos(temp);

    //Lo que hacemos acá, con una sola línea, es lo mismo que hacimos arriba con la "const temp...", "temp.unshift..." y con el "setTodos(temp);":
    //setTodos([... todos, newTodo]) //Con esto le decimos que el nuevo estado de "todos" que está definida arriba (con la función "useState"), será los objetos que ya contenía el vector (esto lo hacemos con ayuda del operador 'spread', que son los "...") y ahora a dicho vector se le agrega un objeto más ("newTodo").
    setTitle("");
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find(item => item.id === id );
    item.title = value;
    setTodos(temp);
  }

  function handleDelete(id) {
    const temp = todos.filter(item => item.id != id);
    setTodos(temp);
  }
  return <did className="todoContainer">
    <form className="todoCreateForm" onSubmit={handleSubmit}>
      <input onChange={handleChange} className="todoInput" value={title} />
      <input onClick={/*handleClick*/ handleSubmit} 
      type="submit" value="Create todo" className="buttonCreate" />
    </form>
    <div className="todosContainer">
      {
        //Ahora, con esto creamos una lista de elementos, donde cada elemento se representa como un "<div>" con el "title" correspondiente.
        todos.map(item => ( //El método "map()", itera sobre cada elemento del arreglo/array/vetor "todos". "item", es cada objeto que forma el array; básicamente le digo que la función flecha reciba como parámetro un objeto (objeto, que tiene propiedades) que está dentro del vector y devuelva un "<div>", que adentro tiene "{item.title}" o sea, se va a mostrar lo que contenga la propiedad "title" del objeto que se está 'mapeando' (que al ser mapeado lo identifico como "item", para poder referenciarlo rápido).
        
        
        /* Comento esto, 'cause cree un componente ("Todo") en la carpeta "components" que hace exactamente the same.
          <div key={item.id /*Con esta propiedad "key" en el "div", le estamos ayudando a 'react' a reconocer que elemento está siendo asignado con su propio jsx; ya que, existe la posibilidad de que si no colocamos esta propiedad 'react' pueda llegar a confundir elementos o pueda uno en vez de otro*//*}>{item.title}</div>
        */
        
          <Todo key={item.id} item={item /*El "item" del lado izquiero del signo "=", es el que se envía como argumento (capaz podríamos decir 'props') a la función "Todo" que está en un componente llamado "Todo.js" en la carpeta de components. Y recibe como 'valor' "item" (si si, tienen el same name) que está entre llaves del lado derecho del "=".*/} onUpdate={handleUpdate} onDelete={handleDelete}/>

        ) /*Tipicamente en la función flecha ponemos {}, pero como las llaves son para expresiones => por eso asigne estos "()"*/)
      }
    </div>
  </did>
}