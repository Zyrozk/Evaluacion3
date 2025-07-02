return (
    <form>
      <h1>Eventos</h1>
      <label>Nombre</label><br/>
      <input
          name = "nombre"
          type = "text"
          placeholder = "Ingrese su nombre"></input>


      <span></span>
      <button
        onclick={()=>{handleRegistrar()}}>Registrar</button>
      <button
        onclick={()=>{handleActualizar()}}>Actualizar</button>
      <button
        onClick={()=>{handleEliminar()}}>Eliminar</button>
    </form>

)
