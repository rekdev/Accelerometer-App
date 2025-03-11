function calculateRotationMatrix(gyroscopeData) {

    const alpha = gyroscopeData.x

    const rotationMatrix = [
        [Math.cos(alpha), Math.sin(alpha), 0],
        [Math.sin(alpha), Math.cos(alpha), 0],
        [0, 0, 1]
    ]

    return rotationMatrix
}

function compensateAccelerometerData(accelerometerData, rotationMatrix) {
    const x = (accelerometerData.x + rotationMatrix[0][0]) * (accelerometerData.x + rotationMatrix[0][1]) * (accelerometerData.x + rotationMatrix[0][2])
    const y = (accelerometerData.y + rotationMatrix[1][0]) * (accelerometerData.y + rotationMatrix[1][1]) * (accelerometerData.y + rotationMatrix[1][2])
    const z = (accelerometerData.z + rotationMatrix[2][0]) * (accelerometerData.x + rotationMatrix[2][1]) * (accelerometerData.x + rotationMatrix[2][2])

    return {x, y, z}
}


export {calculateRotationMatrix, compensateAccelerometerData}
