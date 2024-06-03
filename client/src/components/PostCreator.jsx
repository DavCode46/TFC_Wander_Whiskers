import { Link } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es.json'
import en from 'javascript-time-ago/locale/en.json'
import useTheme from '@context/ThemeContext';

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(en)


const PostCreator = ({authorId, createdAt}) => {

  const [creator, setCreator] = useState({})
  const {themeMode} = useTheme()
  useEffect(() => {
    const getCreator = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/users/${authorId}`)
        setCreator(res?.data)
      } catch(err) {
        console.log(err)
      }
    }
    getCreator()
  }, [])

  return (
    <Link to={`/posts/users/${authorId}`} className='flex items-center gap-3 w-full'>
        <div className="">
          <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${creator?.profileImage}`} alt='User Profile Image' className=' rounded-full w-[3.5rem]'/>
        </div>
        <div className="flex items-center gap-3">
          <h4 className={`${themeMode === 'dark' ? 'text-gray-300 hover:text-gray-400' : ''} transition-all duration-300`}>{creator?.username}</h4>
          {/* <small className=' whitespace-nowrap'><ReactTimeAgo date={new Date(createdAt)} locale='es' /></small> */}
        </div>
    </Link>
  )
}



export default PostCreator