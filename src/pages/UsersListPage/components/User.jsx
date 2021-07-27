import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'

import '../UsersListPage.scss'
import {setUserStatusById} from '../../../services/store'

function User({imageSrc, fistName, lastName, id, checked}) {
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(setUserStatusById(id, !checked))
  }

  return <div className="User">
    <div>
      <img src={imageSrc} className="Avatar"/>
    </div>
    <div className="Name">
      <span>{`${fistName} ${lastName}`}</span>
    </div>
    <div className="">
      <input
        type="checkbox"
        id={id}
        name={id}
        onChange={handleChange}
        checked={checked}
      />
    </div>
  </div>
}

User.propTypes = {
  id: PropTypes.string,
  imageSrc: PropTypes.string,
  fistName: PropTypes.string,
  lastName: PropTypes.string,
  checked: PropTypes.bool,
}

export default User
