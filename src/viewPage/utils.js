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

export const subtract2dArrays = (a, b) => {
    for (let row = 0; row < a.length; row++) {
        for (let col = 0; col < a[0].length; col++) {
            a[row][col] -= b[row][col] === true ? 1 : 0
        }
    }
    return a
}

export const add2dArrays = (a, b) => {
    //console.log("addition input:", a, b)
    for (let row = 0; row < a.length; row++) {
        for (let col = 0; col < a[0].length; col++) {
            a[row][col] += b[row][col]
        }
    }
    //console.log("addition output: ", a)
    return a
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

export const initialize2dIntArray = (numRows, numCols) => {
    let output = []
    for (let row = 0; row < numRows; row++) {
        let currRow = []
        for (let col = 0; col < numCols; col++) {
            currRow.push(0)
        }
        output.push(currRow)
    }
    return output
}

export const map2dArray= (matrix, num) => {
    console.log("mapping matrix to this many respondents: ", num)
    let output = []
    for (let row = 0; row < matrix.length; row++) {
        let currRow = []
        for (let col = 0; col < matrix[0].length; col++) {
            if(num === 0 || matrix[row][col] === 0) currRow.push("#ffffff")
            else if(num === 1) {
                currRow.push("#3a506b")
            }
            else currRow.push(lerpColor(0xb5d1f5, 0x3A506B , (matrix[row][col]-1)/(num-1)))
        }
        output.push(currRow)
    }
    return output
}

export const lerpColor = function(a, b, amount) {
    const ar = a >> 16,
          ag = a >> 8 & 0xff,
          ab = a & 0xff,

          br = b >> 16,
          bg = b >> 8 & 0xff,
          bb = b & 0xff,

          rr = ar + amount * (br - ar),
          rg = ag + amount * (bg - ag),
          rb = ab + amount * (bb - ab);

    return '#' + ((rr << 16) + (rg << 8) + (rb | 0)).toString(16);
}