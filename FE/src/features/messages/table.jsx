import React from 'react'

function TableMessages(props) {

  return (
    <div>
      <table className="table table-hover table-sm">
      <thead>
        <tr>
          <th className='mth'style={{width: "2%"}} scope="col">#</th>
          <th className='mth'style={{width: "25%"}} scope="col">Descrição</th>
          <th className='mth'style={{width: "50%"}} scope="col">Detalhes</th>
          <th className='mth'style={{width: "13%"}} scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {props.messages.map((elm,index) => (
          <tr key={index}>
            <th className='mth'scope="row">{index}</th>
            <td  className='mtd'> {elm.description} </td>
            <td  className='mtd'> {elm.details} </td>
            <td  className='mtd'>
              <button className="btn btn-sm btn-danger btn-rounded remove" 
                  onClick={()=>props.delMessage(elm.uid)}>Remover
              </button>
              <button className="btn btn-sm btn-info btn-rounded edit" 
                onClick={()=>props.editMessage(elm.uid)}>Editar
              </button>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
    </div> 
  )
}
export default TableMessages