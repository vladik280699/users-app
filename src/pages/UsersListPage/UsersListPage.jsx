import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import './UsersListPage.scss'
import User from './components/User'
import {getUsers, getCheckedUsers, usersFetchRequest} from '../../services/store'

function UsersListPage() {
  const [tabIndex, setTabIndex] = useState(0)
  const users = useSelector(tabIndex ? getCheckedUsers : getUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersFetchRequest())
  }, [])

  return (
    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList>
        <Tab>Users</Tab>
        <Tab>Active users</Tab>
      </TabList>
      <TabPanel>
        <div className="List">
          {users.map((user) => (
            <User
              key={user.id.value}
              id={user.id.value}
              imageSrc={user.picture.medium}
              fistName={user.name.first}
              lastName={user.name.last}
              checkedAt={user.checkedAt}
            />
          ))}
        </div>
      </TabPanel>
      <TabPanel>
        <div className="List">
          {users.map((user) => (
            <User
              key={user.id.value}
              id={user.id.value}
              imageSrc={user.picture.medium}
              fistName={user.name.first}
              lastName={user.name.last}
              checkedAt={user.checkedAt}
            />
          ))}
        </div>
      </TabPanel>
    </Tabs>
  )
}

export default UsersListPage
