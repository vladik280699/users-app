import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'

import '../UsersListPage.scss'
import {setUserStatusById} from '../../../services/store'

function User({imageSrc, fistName, lastName, id, checkedAt}) {
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(setUserStatusById(id, checkedAt ? undefined : new Date()))
  }

  return <div className="User">
    <div>
      <img src={imageSrc} className="Avatar"/>
    </div>
    <div className="Name">
      <span>{`${fistName} ${lastName}`}</span>
    </div>
    <div>
      <button
        onClick={handleChange}
        className={`Button ${checkedAt? 'active' : ''}`}
      >
        {checkedAt? 'deactivate' : 'activate'}
      </button>
      <div className="HelperText">{checkedAt ? `${checkedAt.getHours()}:${checkedAt.getMinutes()}` : null}</div>
    </div>
  </div>
}

User.propTypes = {
  id: PropTypes.string,
  imageSrc: PropTypes.string,
  fistName: PropTypes.string,
  lastName: PropTypes.string,
  checkedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any,
  ])
}

export default User
