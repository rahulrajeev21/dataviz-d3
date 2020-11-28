var accidentRatingBar = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {"url": "pitstops.json"},
    "width": 400,
    "height": 200,
    "vconcat": [{
        "selection": {
            "brush": {"type": "interval"}
        },
        "mark": "point",
        "encoding": {
            "x": {
                "field": "Laps", "type": "quantitative",
                "scale": {"domain": [10,70]}
            },
            "y": {
                "field": "PitstopMs", "type": "quantitative"
            }
        }
    }, {
        "transform": [
            {"filter": {"selection": "brush"}}
        ],
        "mark": "line",
        "encoding": {
            "x": {"field": "Points", "type": "quantitative"},
            "y": {"field": "Position", "type": "quantitative","sort":"descending"}
        }
    }]
}
vegaEmbed('#concatviz', accidentRatingBar);