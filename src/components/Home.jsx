import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPaste, updateToPaste } from '../redux/pasteSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faCopy } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get("pasteId")
  const dispatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes)

   useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId)
        setTitle(paste.title)
        setValue(paste.content)
      }
  
    }, [pasteId])


  function createPaste() {
    if (!title.trim() || !value.trim()) {
      alert("Title and content are required!")
      return
    }

    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString()
    }

    if (pasteId) {
      dispatch(updateToPaste(paste))
    } else {
      dispatch(addToPaste(paste))
    }

    setTitle('')
    setValue('')
    setSearchParams({})
  }

  return (
    <div>
      <div className='flex flex-row flex-wrap gap-3 pt-7 place-content-between  justify-center pl-10 pr-10'>
        <input
          className='p-1 rounded border-1 w-70  border-gray-300 mt-2 md:w-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
          type='text'
          placeholder='Enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className='p-2 mt-2 bg-indigo-500 text-white rounded text-xs'
          onClick={createPaste}
        >
          {pasteId ? 'Update My Paste' : 'Create My Paste'}
        </button>
      </div>
      <div className='flex justify-center'>
      <div className='flex justify-center p-5 flex-col md:w-240'>
        <div className='flex justify-between border-1 border-gray-300'>
          <div className="flex gap-2 p-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
          <button className="text-black "><FontAwesomeIcon icon={faCopy} /></button>
        </div>
        <textarea
          className='rounded w-100 border md:w-230 border-gray-300 p-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
          value={value}
          placeholder='Enter Content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
      </div>
    </div>
  )
}

export default Home
