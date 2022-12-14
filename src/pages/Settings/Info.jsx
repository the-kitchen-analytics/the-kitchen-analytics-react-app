import { Header, List, Segment } from 'semantic-ui-react'
import { formatDate } from '../../utils/date'
import { getLocalStorageSize } from '../../utils/localStorage'

const Info = ({ user }) => {

  const listItems = [
    {
      key: 'app-version',
      text: 'Версия',
      value: process.env.REACT_APP_VERSION,
    },
    {
      key: 'last-login-at',
      text: 'Дата последнего входа',
      value: formatDate(new Date(parseInt(user.metadata.lastLoginAt))),
    },
    {
      key: 'localstorage-usage',
      text: 'Размер кэша',
      value: getLocalStorageSize() + ' (KB)',
    },
  ]

  return (
    <Segment>
      <Header
        icon="info circle"
        content="О приложении"
      />
      <List
        relaxed
        bulleted
      >
        {
          listItems.map(({ key, text, value }) => (
            <List.Item key={key}>
              {text}: <strong>
                {value}
              </strong>
            </List.Item>
          ))
        }
      </List>
    </Segment>
  )
}

export default Info