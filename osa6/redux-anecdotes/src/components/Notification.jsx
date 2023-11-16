import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (notification.type === 'notification/showNotification') {
    return (
      <div style={style}>
        {notification.payload}
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default Notification