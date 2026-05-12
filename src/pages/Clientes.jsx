import { useEffect, useState } from 'react'
import axios from 'axios'

function Clientes() {

  const [clientes, setClientes] = useState([])

  const [cliente, setCliente] = useState({
    ndniClie: '',
    appaClie: '',
    apmaClie: '',
    nombClie: '',
    fechNaciClie: ''
  })

  const [editando, setEditando] = useState(false)
  const [idEditar, setIdEditar] = useState(null)

  const listarClientes = async () => {

    try {

      const response = await axios.get(
        'http://api.codextpd.com/api/clientes'
      )

      setClientes(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listarClientes()
  }, [])

  const guardarCliente = async (e) => {
    e.preventDefault()

    try {

      if (editando) {

        await axios.put(
          `http://api.codextpd.com/api/clientes/${idEditar}`,
          cliente
        )

      } else {

        await axios.post(
          'http://api.codextpd.com/api/clientes',
          cliente
        )
      }

      limpiarFormulario()
      listarClientes()

    } catch (error) {
      console.log(error)
    }
  }

  const editarCliente = (clie) => {

    setCliente({
      ndniClie: clie.ndniClie,
      appaClie: clie.appaClie,
      apmaClie: clie.apmaClie,
      nombClie: clie.nombClie,
      fechNaciClie: clie.fechNaciClie
    })

    setEditando(true)
    setIdEditar(clie.codiClie)
  }

  const eliminarCliente = async (id) => {

    if (!confirm('¿Eliminar cliente?')) return

    try {

      await axios.delete(
        `http://api.codextpd.com/api/clientes/${id}`
      )

      listarClientes()

    } catch (error) {
      console.log(error)
    }
  }

  const limpiarFormulario = () => {

    setCliente({
      ndniClie: '',
      appaClie: '',
      apmaClie: '',
      nombClie: '',
      fechNaciClie: ''
    })

    setEditando(false)
    setIdEditar(null)
  }

  return (
    <div className='container'>

      <div className='card'>

        <h1>CLIENTES</h1>

        <form onSubmit={guardarCliente}>

          <input
            type='text'
            placeholder='DNI'
            value={cliente.ndniClie}
            onChange={(e) => setCliente({
              ...cliente,
              ndniClie: e.target.value
            })}
          />

          <input
            type='text'
            placeholder='Apellido Paterno'
            value={cliente.appaClie}
            onChange={(e) => setCliente({
              ...cliente,
              appaClie: e.target.value
            })}
          />

          <input
            type='text'
            placeholder='Apellido Materno'
            value={cliente.apmaClie}
            onChange={(e) => setCliente({
              ...cliente,
              apmaClie: e.target.value
            })}
          />

          <input
            type='text'
            placeholder='Nombres'
            value={cliente.nombClie}
            onChange={(e) => setCliente({
              ...cliente,
              nombClie: e.target.value
            })}
          />

          <input
            type='date'
            value={cliente.fechNaciClie}
            onChange={(e) => setCliente({
              ...cliente,
              fechNaciClie: e.target.value
            })}
          />

          <button type='submit'>
            {editando ? 'Actualizar' : 'Guardar'}
          </button>

        </form>

      </div>

      <div className='card'>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>DNI</th>
              <th>AP PATERNO</th>
              <th>AP MATERNO</th>
              <th>NOMBRES</th>
              <th>FECHA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>

            {
              clientes.map((clie) => (
                <tr key={clie.codiClie}>

                  <td>{clie.codiClie}</td>
                  <td>{clie.ndniClie}</td>
                  <td>{clie.appaClie}</td>
                  <td>{clie.apmaClie}</td>
                  <td>{clie.nombClie}</td>
                  <td>{clie.fechNaciClie}</td>

                  <td>

                    <button onClick={() => editarCliente(clie)}>
                      Editar
                    </button>

                    <button onClick={() => eliminarCliente(clie.codiClie)}>
                      Eliminar
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Clientes