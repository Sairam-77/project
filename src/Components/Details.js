import React, { useContext } from 'react'
import { Context } from '../App';
const Details = () => {
    const {selected} = useContext(Context)
  return <>
  <h1 className='text-center'>{selected.properties.name}</h1>
  </>
}

export default Details