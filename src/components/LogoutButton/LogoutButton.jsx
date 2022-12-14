import { useMemo } from 'react'
import { logout } from '../../config/firebase'
import { useUserSettings } from '../../hooks'
import { Button } from 'semantic-ui-react'

const CONFIRM_LOGOUT_MESSAGE = 'Вы действительно хотите выйти?'

const LogoutButton = (props) => {

  const { settings: { controlsSize } } = useUserSettings()

  const handleLogOut = () => {
    if (window.confirm(CONFIRM_LOGOUT_MESSAGE)) {
      console.debug('log out')
      localStorage.clear()
      logout()
    }
  }

  const defultProps = useMemo(() => ({
    // fluid: true,
    negative: true,
    icon: 'sign out',
    content: 'Выйти',
    size: controlsSize,
    onClick: handleLogOut,
    ...props
  }), [props, controlsSize])

  return (
    <Button
      {...defultProps}
    />
  )
}

export default LogoutButton