import * as React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../../context/GuestContext';
import MessageIconButton from './MessageIconButton';
import { apiProvider } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { useChat, openChat } from '../../../context/ChatContext';
import isConnectedUser from '../../../utils/isConnectedUser';

const MessageButton = ({ itemID, shouldCreate, handleClose }) => {
    const { state: { users }, dispatch: chatDispatch } = useChat()
    const { state: { isAuth, user } } = useAuth();
    const { dispatch } = useGuest();
    const navigate = useNavigate()

    const newChat = async () => {
        try {
            const res = await apiProvider.post('/api/chat/new-conversation', {
                user2: itemID
            })

            if (res.status >= 200 || res.status < 300) {
                const { data: { data } } = res;

                openChat(chatDispatch, data, user)
                navigate(`/chat/${data.id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const action = e => {
        e.stopPropagation()
        if (!isAuth) {
            openGuestWarning(dispatch, 'enviar mensajes');
        } else {
            if (shouldCreate) {
                newChat()
            } else {
                navigate(`/chat/${itemID}`)
            }
            handleClose()
        }
    }

    return (
        <MessageIconButton
            active={isConnectedUser(users, { id: itemID })}
            onClick={action}
        />
    );
}

export default MessageButton
