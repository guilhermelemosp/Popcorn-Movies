import React, { useContext } from 'react'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";
import {Link} from 'react-router-dom';

function Header() {

  const { header, backgenre } = useContext(Contextpage);

  return (
    <>
      <header className={`flex  items-center ${backgenre ? 'justify-center gap-10 md:justify-between' : 'justify-center'} text-3xl md:text-4xl font-bold text-blue-300 py-3 px-5 md:px-10`}>

        {backgenre ?
          <Link to='/menu-admin' className='bg-gray-600 text-white p-2 rounded-full text-xl md:text-2xl'>
            <HiChevronLeft />
            </Link>
          : null}

        {header}
      </header>

    </>
  )
}

export default Header