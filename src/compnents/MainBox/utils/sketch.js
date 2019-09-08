function createSketch(Obj, Sketch) {
    const sketch = new Sketch({
        view: Obj.view,
        layer: Obj.graphicsLayer2
    });
    sketch.on("create", (event) => {
        // check if the create event's state has changed to complete indicating
        // the graphic create operation is completed.
        if (event.state === "complete") {
            let query = Obj.baseBoundaryFeatureLayer.createQuery();
            Obj.selectGrphics.push(event.graphic);
            query.geometry = event.graphic.geometry;
            query.spatialRelationship = "intersects";
            Obj.baseBoundaryFeatureLayer.queryFeatures(query).then(function (results) {
                // prints an array of all the features in the service to the console
                console.log(results.features, Obj.featureLayerView);
                if (Obj.boundaryhighlight) {
                    Obj.boundaryhighlight.remove();
                }
                Obj.boundaryhighlight = Obj.featureLayerView.highlight(results.features);
            });
        }
    });
    return sketch;
}

export { createSketch };
