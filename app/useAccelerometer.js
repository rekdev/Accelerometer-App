import { useState, useEffect } from 'react'

import { Accelerometer } from 'expo-sensors'

function useAccelerometer(interval = 1000) {
    const [active, setActive] = useState(false)
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    })
    const [subscription, setSubscription] = useState(null)

    /* Accelerometer suscribe, unsuscribe and interval setting functions */
    const _suscribe = () => {
        setSubscription(Accelerometer.addListener(setData))
    }

    const _unsuscribe = () => {
        if (subscription)
            subscription.remove()

        setSubscription(null)
    }

    const _setInterval = (interval) => {
        Accelerometer.setUpdateInterval(interval)
    }

    /* Set data to the state at the component mount */
    useEffect(() => {
        if(active)
            _suscribe()
        else 
            _unsuscribe()

        _setInterval(interval)
        return () => _unsuscribe()
    }, [active])

    return {active, setActive, data, setData, subscription, setSubscription}
}

export default useAccelerometer
