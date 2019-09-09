export const timeMap = {
    0: [0, 1],
    1: [1, 2],
    2: [2, 5],
    3: [5, 10],
    4: [10, 15],
    5: [15, 19],
    6: [19, 38],
    7: [38, 41],
    8: [41, 47],
    9: [47, 51],
    10: [51, 61],
    11: [61, 69],
    12: [69, 82],
    13: [82, 91],
    14: [91, 103],
    15: [103, 111],
    16: [111, 117],
    17: [117, 128],
    18: [128, 134]
}

export function searchKey(dy) {
    let result = 0;
    Object.keys(timeMap).forEach(i => {
        if (timeMap[i][1] > dy && timeMap[i][0] <= dy) {
            result = parseInt(i)
        }
    })
    return result;
}

