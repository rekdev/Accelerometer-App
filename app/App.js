import { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { io } from 'socket.io-client'

export default function App() {
  /* Socket.io Connection states */
  const [ipAddress, setIpAddress] = useState("0.0.0.0")
  const [connectionStatus, setConnectionStatus] = useState(false)
  const [connectionId, setConnectionId] = useState(null)

  const socketConnection = useRef(null)

  const toggleState = () => {
    setActive(!active)
    setGyroscopeActive(!gyroscopeActive)
  }
  

  const connectToServer = (ipAddress) => {
    const socket = io(`http://${ipAddress}`)
    socketConnection.current = socket

    socket.on('connect', () => {
      console.log(`Connected with id ${socket.id}`)

      setConnectionStatus(true)
      setConnectionId(socket.id)
    })
  }

  /* */
  return (

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Server IP address'
        onChangeText={value => setIpAddress(value)}
        value={ipAddress}
      />
      <Text style={styles.text}>{connectionStatus ? `Connected to server with id ${connectionId}` : 'Disconnected'}</Text>

      <TouchableOpacity style={styles.connectButton} onPress={() => connectToServer(ipAddress)}>
        <Text style={styles.buttonText}>Connect to server</Text>
      </TouchableOpacity>

      <Text style={styles.text}>x: 0</Text>
      <Text style={styles.text}>y: 0</Text>
      <Text style={styles.text}>z: 0</Text>


      <Text style={styles.text}>Gx: 0</Text>
      <Text style={styles.text}>Gy: 0</Text>
      <Text style={styles.text}>Gz: 0</Text>

      <TouchableOpacity style={styles.button} onPress={toggleState}>
        <Text style={styles.buttonText}>{active && gyroscopeActive ? 'Turn off accelerometer' : 'Turn on accelerometer'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 30,
  },
  text: {
    fontSize: 18,
  },
  connectButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#b07ebc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#337cd6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: 'adb5ba',
    width: '100%',
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  }
});
