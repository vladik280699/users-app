import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import './UsersListPage.scss'
import User from './components/User'
import {getUsers, usersFetchRequest} from '../../services/store'

function UsersListPage() {
  const users = useSelector(getUsers)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(usersFetchRequest())
  },[])

  return <div className="List">
    {users.map((user) => (
      <User
        key={user.login.uuid}
        imageSrc={user.picture.medium}
        fistName={user.name.first}
        lastName={user.name.last}
      />
    ))}
  </div>
}

export default UsersListPage
