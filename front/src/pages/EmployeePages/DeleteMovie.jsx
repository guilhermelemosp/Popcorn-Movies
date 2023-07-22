import React from 'react'
import DeleteMovieComponent from '../../components/DeleteMovieComponent';

const DeleteMovie = () => {
    return (
      <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <DeleteMovieComponent/>
      </div>
    </div>
    )
}

export default DeleteMovie