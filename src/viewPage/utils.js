export const convert1dTo2dArray = (input, numRows, numCols) => {
    let output = []
    for (let row = 0; row < numRows; row++) {
        let currRow = []
        for (let col = 0; col < numCols; col++) {
            
            currRow.push(input[getIndexFromCoords(row, col, numRows)])
        }
        output.push(currRow)
    }
    return output
}

export const getIndexFromCoords = (row, col, numRows) => {
    return (col * numRows) + row
}