import { useNavigate } from 'react-router-dom'
import { Header, Segment, Message, Grid } from 'semantic-ui-react'
import { LoadableButton } from '../../components/ui/Button'
import { useUserSettings } from '../../hooks'

const ClearCache = () => {

  const navigate = useNavigate()
  const { settings: { controlsSize } } = useUserSettings()

  const handleClearCacheButtonClick = () => {
    localStorage.clear()

    setTimeout(() => {
      navigate('/')
      window.location.reload()
    }, 500)
  }

  return (
    <Segment>
      <Header
        icon="erase"
        content="Очистить кэш"
      />

      <Message
        warning
        header='Внимание!'
        content='Все несохранённые данные будут удалены, а так же ваши настройки будут сброшены. Страница будет перезагружена'
      />

      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={4}>
            <LoadableButton
              fluid
              type="button"
              content="Oчистить"
              icon="trash"
              negative
              basic
              size={controlsSize}
              onClick={handleClearCacheButtonClick}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </Segment>
  )
}

export default ClearCache