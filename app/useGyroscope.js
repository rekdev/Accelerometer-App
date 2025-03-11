import { useState, useEffect } from 'react'

import { Gyroscope } from 'expo-sensors'

function useGyroscope(interval = 1000) {
    const [gyroscopeActive, setGyroscopeActive] = useState(false)
    const [gyroscopeData, setGyroscopeData] = useState({
        x: 0,
        y: 0,
        z: 0,
    })
    const [subscription, setSubscription] = useState(null)

    /* Accelerometer suscribe, unsuscribe and interval setting functions */
    const _suscribe = () => {
        setSubscription(Gyroscope.addListener(setGyroscopeData))
    }

    const _unsuscribe = () => {
        if (subscription)
            subscription.remove()

        setSubscription(null)
    }

    const _setInterval = (interval) => {
        Gyroscope.setUpdateInterval(interval)
    }

    /* Set data to the state at the component mount */
    useEffect(() => {
        if(gyroscopeActive)
            _suscribe()
        else 
            _unsuscribe()

        _setInterval(interval)
        return () => _unsuscribe()
    }, [gyroscopeActive])

    return {gyroscopeActive, setGyroscopeActive, gyroscopeData, setGyroscopeData, subscription, setSubscription}
}

export default useGyroscope
