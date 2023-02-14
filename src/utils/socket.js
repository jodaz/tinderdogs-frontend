import vars from "../vars";
import socketIO from 'socket.io-client';

export const socket = socketIO.connect(vars.source);

export const handleConnect = user => {
    socket.emit('conectar', {
        uid: user.id
    }, res => console.log("Estas conectado ", res)) // Con esto obtengo los usuarios conectados
}

export const handleSetUserId = user => {
    socket.emit('setUserId', user.id)
}

export const handleDisconnect = () => {
    socket.on('disconnect', () => console.log("Estas desconectado"))
}

export const listenConnection = () => {
    socket.on('listaPersona', res => console.log("Usuarios conectados ", res))
}

export const listenMessages = () => {
    socket.on('mensajePrivado', res => console.log(res))
}

export const handleLogout = () => {
    socket.emit('desconectar')
}

export const emitMessage = ({
    id_chat,
    message,
    receiver,
    sender
}) => {
    socket.emit('mensajePrivado', {
        mensaje: message,
        uid: receiver,
        id_conversation: id_chat,
        sender: sender
    })
}
