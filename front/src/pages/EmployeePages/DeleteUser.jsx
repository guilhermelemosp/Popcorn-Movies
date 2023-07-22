import React from 'react'
import DeleteUserComponent from '../../components/DeleteUserComponent';

const DeleteUser = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <DeleteUserComponent/>
      </div>
    </div>
  )
}

export default DeleteUser;