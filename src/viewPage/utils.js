export const convert1dTo2dArray = (input, numRows, numCols) => {
    let output = []
    for (let row = 0; row < numRows; row++) {
        let currRow = []
        for (let col = 0; col < numCols; col++) {
            currRow.push(input[getIndexFromCoords(row, col, numCols)])
        }
        output.push(currRow)
    }
    return output
}

export const subtract = (a, b) => {
    console.log("subtraction input:", a, b)
    for (let row = 0; row < a.length; row++) {
        for (let col = 0; col < a[0].length; col++) {
            a[row][col] -= b[row][col]
        }
    }
    console.log("subtraction output: ", a)
    return a
}

export const sum1dAvailabilityArrays = (arrays, numRows, numCols) => {
    let output = []
    for (let row = 0; row < numRows; row++) {
        let currRow = []
        for (let col = 0; col < numCols; col++) {
            let index = getIndexFromCoords(row, col, numRows)
            let count = 0
            arrays.forEach(e => {
                count += e.available[index] ? 1 : 0
            })
            currRow.push(count)
        }
        output.push(currRow)
    }
    return output
}

export const getIndexFromCoords = (row, col, numCols) => {
    return (row * numCols) + col
}

export const convert2dTo1dArray = (matrix) => {
    let output = []
    matrix.forEach(row => {
        row.forEach(cell => {
            output.push(cell)
        })
    })
    //console.log("1d array:", output)
    return output
}