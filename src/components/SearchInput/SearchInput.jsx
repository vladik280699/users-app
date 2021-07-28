import React, { useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {setSearchText} from '../../services/store'
import './SearchInput.scss'

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setSearchText(searchTerm))
    }, 250)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }


  return (
    <input
      type='text'
      autoComplete='off'
      placeholder='Search...'
      className="SearchInput"
      value={searchTerm}
      onChange={handleChange}
    />
  )
}

export default SearchInput