import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Viewpaste = () => {

  const {id} = useParams()
  const allPastes = useSelector((state) => state.paste.pastes)
  const paste = allPastes.filter((p) => p._id === id)[0]
  return (
    <div>
      <div className='flex mt-7 flex-row gap-3 place-content-between justify-center'>
        <input
          className='p-1 rounded border-1 border-gray-300 mt-2 md:w-230 w-100'
          type='text'
          placeholder='Enter title here'
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        
      </div>

      <div className=' mt-2 flex justify-center'>
        <textarea
          className='rounded w-65 border md:w-230 border-gray-300 p-4 w-100'
          value={paste.content}
          disabled
          placeholder='Enter Content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Viewpaste