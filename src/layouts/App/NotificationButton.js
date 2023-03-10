import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
// Icons
import { Bell } from 'lucide-react';
import { socket } from '../../utils/socket'
import { useNotifications, newNotification } from '../../context/NotificationContext'

const NotificationButton = () => {
    const { dispatch } = useNotifications();
    const [counter, setCounter] = React.useState(0)

    React.useEffect(() => {
        socket.on('notification', ({ count_notification, notification }) => {
            console.log(notification)
            newNotification(dispatch, notification);
            setCounter(count_notification)
        })
    }, [socket])

    return (
        <IconButton
            component={LinkBehavior}
            to='/notifications'
        >
            <Badge badgeContent={counter} color="error">
                <Bell color='#fff' />
            </Badge>
        </IconButton>
    )
}

export default NotificationButton;
