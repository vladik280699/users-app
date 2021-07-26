import React from 'react'
import PropTypes from 'prop-types'

import '../UsersListPage.scss'

function User({imageSrc, fistName, lastName}) {
  return <div className="User">
    <div>
      <img src={imageSrc} className="Avatar"/>
    </div>
    <div className="Name">
      <span>{`${fistName} ${lastName}`}</span>
    </div>
  </div>
}

User.propTypes = {
  imageSrc: PropTypes.string,
  fistName: PropTypes.string,
  lastName: PropTypes.string,
}

export default User
