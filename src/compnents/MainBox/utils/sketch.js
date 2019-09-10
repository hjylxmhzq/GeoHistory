function createSketch(Obj, Sketch) {
    const sketch = new Sketch({
        view: Obj.view,
        layer: Obj.graphicsLayer2
    });
    sketch.on("create", (event) => {
        // check if the create event's state has changed to complete indicating
        // the graphic create operation is completed.
        Obj.setState({ rightDrawShow: true });
        if (event.state === "complete") {
            let query = Obj.baseBoundaryFeatureLayer.createQuery();
            Obj.selectGrphics.push(event.graphic);
            query.geometry = event.graphic.geometry;
            query.spatialRelationship = "intersects";
            Obj.baseBoundaryFeatureLayer.queryFeatures(query).then(function (results) {
                // prints an array of all the features in the service to the console
                console.log(results);
                if (Obj.boundaryhighlight) {
                    Obj.boundaryhighlight.remove();
                }
                Obj.boundaryhighlight = Obj.featureLayerView.highlight(results.features);
                const selectedBoundary = [];
                if (results.features.length) {
                    for (let feature of results.features) {
                        selectedBoundary.push(feature.attributes);
                    }
                    Obj.setState({ selectedBoundary });
                }
            });
        }
    });
    sketch.on("update", (event) => {
        // check if the create event's state has changed to complete indicating
        // the graphic create operation is completed.
        Obj.setState({ rightDrawShow: true });
    });
    return sketch;
}

export { createSketch };
