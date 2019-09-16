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

export const nameMap = {
    '夏': [0, 1],
    '商': [1, 2],
    '周': [2, 5],
    '春秋': [5, 10],
    '战国': [10, 15],
    '秦': [15, 19],
    '汉': [19, 38],
    '三国': [38, 41],
    '晋': [41, 47],
    '十六国': [47, 51],
    '南北朝': [51, 61],
    '隋': [61, 69],
    '唐': [69, 82],
    '五代十国': [82, 91],
    '宋': [91, 103],
    '元': [103, 111],
    '民': [111, 117],
    '清': [117, 128],
    '民国': [128, 134]
}

export function searchKey(dy) {
    let result = 0;
    Object.keys(timeMap).forEach(i => {
        if (timeMap[i][1] > dy && timeMap[i][0] <= dy) {
            result = parseInt(i);
        }
    })
    if(dy===134) result=19
    return result;
}

export function searchName(dy) {
    let result = 0;
    Object.keys(nameMap).forEach(i => {
        if (nameMap[i][1] > dy && nameMap[i][0] <= dy) {
            result = i;
        }
    })
    return result;
}

