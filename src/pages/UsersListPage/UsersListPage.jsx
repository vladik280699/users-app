import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import './UsersListPage.scss'
import User from './components/User'
import {getUsers, getCheckedUsers, usersFetchRequest, getSearchText} from '../../services/store'
import SearchInput from '../../components/SearchInput/SearchInput'

function UsersListPage() {
  const [tabIndex, setTabIndex] = useState(0)
  const users = useSelector(tabIndex ? getCheckedUsers : getUsers)
  const searchText = useSelector(getSearchText)
  const dispatch = useDispatch()

  const filteredUsers = users.filter(({name: {first, last}}) => first.toLowerCase().includes(searchText) || last.toLowerCase().includes(searchText))

  useEffect(() => {
    dispatch(usersFetchRequest())
  }, [])

  const renderUsersList = () => (
    <div>
      <div className="SearchWrapper">
        <SearchInput/>
      </div>
      <div className="List">
        {filteredUsers.map((user) => (
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
    </div>
  )

  return (
    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList>
        <Tab>Users</Tab>
        <Tab>Active users</Tab>
      </TabList>
      <TabPanel>
        {renderUsersList()}
      </TabPanel>
      <TabPanel>
        {renderUsersList()}
      </TabPanel>
    </Tabs>
  )
}

export default UsersListPage
