var accidentRatingBar = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {"url": "experiment.json"},
    "selection": {
        "org": {
            "type": "single",
            "fields": ["Constructor"],
            "bind": {
                "input": "select",
                "options": ["Ferrari", "ForceIndia", "Haas", "McLaren", "Mercedes", "RedBull", "Sauber", "ToroRosso", "Williams"]
            }
        }
    },
    "transform": [{"filter": {"selection": "org"}}],
    "mark": "bar",
    "encoding": {
        "x": {
            "aggregate": "sum", "field": "AccidentRating",
            "scale": {
                "domain": [0, 5]
            },
            "title": ""
        }
    }
}
vegaEmbed('#accidentBar', accidentRatingBar);