import React from 'react'

function TableUsers(props) {

  return (
    <div>
      <table className="table table-hover table-sm">
      <thead>
        <tr>
          <th className='mth userTH'style={{width: "2%"}} scope="col">#</th>
          <th className='mth userTH'style={{width: "25%"}} scope="col">Nome</th>
          <th className='mth userTH'style={{width: "50%"}} scope="col">Senha</th>
          <th className='mth userTH'style={{width: "13%"}} scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((elm,index) => (
          <tr key={index}>
            <th className='mth userTH'scope="row">{index}</th>
            <td  className='mtd userTD'> {elm.name} </td>
            <td  className='mtd userTD'> {elm.password} </td>
            <td  className='mtd userTD'>
              <button className="btn btn-sm btn-danger btn-rounded remove" 
                  onClick={()=>props.delUser(elm.uid)}>Remover
              </button>
              <button className="btn btn-sm btn-info btn-rounded edit" 
                onClick={()=>props.editUser(elm.uid)}>Editar
              </button>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
    </div> 
  )
}
export default TableUsers