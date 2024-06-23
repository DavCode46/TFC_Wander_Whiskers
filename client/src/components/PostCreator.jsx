import { Link } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es.json'

import useTheme from '@context/ThemeContext';

TimeAgo.addDefaultLocale(es)



const PostCreator = ({authorId}) => {

  const [creator, setCreator] = useState({})
  const {themeMode} = useTheme()
  useEffect(() => {
    const getCreator = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/users/${authorId}`)
        setCreator(res?.data)
      } catch(err) {
        // console.log(err)
      }
    }
    getCreator()
  }, [authorId])

  return (
    <Link to={`/posts/users/${authorId}`} className='flex items-center gap-3 w-full'>
        <div className="">
          <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${creator?.profileImage}`} alt='User Profile Image' className=' rounded-full w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem]'/>
        </div>
        <div className="flex items-center gap-3">
          <h4 className={`${themeMode === 'dark' ? 'text-gray-300 hover:text-gray-400' : ''} transition-all duration-300`}>{creator?.username}</h4>
         
        </div>
    </Link>
  )
}



export default PostCreator