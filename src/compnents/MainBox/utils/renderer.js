export const renderer = {
    type: "unique-value",  // autocasts as new UniqueValueRenderer()
    field: "China",
    defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
    uniqueValueInfos: [{
        // All features with value of "North" will be blue
        value: '0',
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.5],
            outline: {  // autocasts as new SimpleLineSymbol()
                color: [220, 220, 220, 0.5],
                width: "0.5px"
            }
        }
    }, {
        // All features with value of "East" will be green
        value: '1',
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [151, 51, 204, 0.5],
            outline: {  // autocasts as new SimpleLineSymbol()
                color: [220, 220, 220, 0.5],
                width: "0.5px"
            }
        }
    }, {
        // All features with value of "South" will be red
        value: '2',
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 44, 0.5],
            outline: {  // autocasts as new SimpleLineSymbol()
                color: [220, 220, 220, 0.5],
                width: "0.5px"
            }
        }
    }, {
        // All features with value of "West" will be yellow
        value: '3',
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [251, 51, 204, 0.5],
            outline: {  // autocasts as new SimpleLineSymbol()
                color: [220, 220, 220, 0.5],
                width: "0.5px"
            }
        }
    }]
};

export const heatMapRenderer = {
    type: "heatmap",
    colorStops: [
        { color: "rgba(63, 40, 102, 0)", ratio: 0 },
        { color: "#472b77", ratio: 0.083 },
        { color: "#4e2d87", ratio: 0.166 },
        { color: "#563098", ratio: 0.249 },
        { color: "#5d32a8", ratio: 0.332 },
        { color: "#6735be", ratio: 0.415 },
        { color: "#7139d4", ratio: 0.498 },
        { color: "#7b3ce9", ratio: 0.581 },
        { color: "#853fff", ratio: 0.664 },
        { color: "#a46fbf", ratio: 0.747 },
        { color: "#c29f80", ratio: 0.83 },
        { color: "#e0cf40", ratio: 0.913 },
        { color: "#ffff00", ratio: 1 }
    ],
    maxPixelIntensity: 65,
    minPixelIntensity: 0
};

const textSymbol = {
    type: "text", // autocasts as new TextSymbol()
    color: "#4e2d87",
    text: "\ue643", // esri-icon-map-pin
    font: {
        // autocasts as new Font()
        size: 22,
        family: "CalciteWebCoreIcons", // Esri Icon Font
        weight: 'lighter'
    }
};

const textPeopleSymbol = {
    type: "text", // autocasts as new TextSymbol()
    color: "#c29f80",
    text: "\ue675", // esri-icon-map-pin
    font: {
        // autocasts as new Font()
        size: 22,
        family: "CalciteWebCoreIcons", // Esri Icon Font
        weight: 'lighter'
    }
};

const simpleMarker = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    size: 25,
    color: [125, 255, 255],
};

export const simpleMarkerRender = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: textSymbol
};

export const simplePeopleMarkerRender = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: textPeopleSymbol
};