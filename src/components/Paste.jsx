import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCopy, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes) || [];


  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId))
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center flex-col p-4 gap-3 w-100 md:w-240'>
      <input
        className='p-1 rounded border-1 border-gray-300  mt-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='border-1 border-gray-300  rounded'>
        <div className='border-b-1 border-gray-300 p-2 font-bold text-xl'>All Pastes</div>
      <div className='flex flex-col gap-3 p-3'>
        {filteredData.length > 0 &&
          filteredData.map(
            (paste) =>{
                return (
              <div className='border border-gray-300 flex flex-row justify-between' key={paste?._id} >
                <div className='flex flex-col gap-0'>
                  <div className='p-2 font-bold text-xl '>
                    {paste.title}
                  </div>
                  <div className='p-2 text-gray-700 text-sm'>
                    {paste.content}
                  </div>
                </div>
                <div>
                <div className='flex flex-col  place-content-evenly'>
                  <div className='flex flex-row gap-2 p-2 '>
                  <button className='border border-gray-300 text-sm rounded p-1'>
                    <a href ={`/?pasteId=${paste?._id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                    </a>
                  </button>
                  <button className='border border-gray-300 text-sm rounded p-1'>
                    <a href={`/pastes/${paste?._id}`}>
                      <FontAwesomeIcon icon={faEye} /> 
                    </a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)} className='border border-gray-300 text-sm rounded p-1'>
                    <FontAwesomeIcon icon={faTrash} /> 
                  </button>
                  <button onClick={() =>
                     {navigator.clipboard.writeText(paste?.content)
                      toast.success("copied to clipboard")
                     }} className='border border-gray-300 rounded p-1 text-sm'>
                     <FontAwesomeIcon icon={faCopy} /> 
                  </button>
                  </div>
                  <div className="text-sm text-black flex justify-end pr-2">
                    {new Date(paste.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                </div>
                </div>
                </div>
              </div>
            )
          }
        )
        }
      
      </div>
      </div>
      </div>
    </div>
  )
}
export default Paste
