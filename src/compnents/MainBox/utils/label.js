export const labelingInfo = [
    {
        // autocasts as new LabelClass()
        symbol: {
            type: "text",  // autocasts as new TextSymbol()
            color: "#555",
            haloColor: "black",
            font: {  // autocast as new Font()
                family: "KaiTi",
                size: 22,
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.Name"
        }
    }
];
