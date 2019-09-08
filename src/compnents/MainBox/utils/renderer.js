export const renderer = {
    type: "unique-value",  // autocasts as new UniqueValueRenderer()
    field: "China",
    defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
    uniqueValueInfos: [{
        // All features with value of "North" will be blue
        value: '0',
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 51,51, 204, 0.5 ]
        }
    }, {
        // All features with value of "East" will be green
        value: '1',
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 151,51, 204, 0.5 ]
        }
    }, {
        // All features with value of "South" will be red
        value: '2',
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 51,51, 44, 0.5 ]
        }
    }, {
        // All features with value of "West" will be yellow
        value: '3',
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 251,51, 204, 0.5 ]
        }
    }]
};
