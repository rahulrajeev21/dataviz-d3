var dnfCause = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {
        "url": "dnfCauseComparison.csv"
    },
    "width": 400,
    "height": 300,
    "layer": [
        {
            "encoding": {
                "x": {"field": "dnf", "type": "nominal"},
                "y": {"field": "count", "type": "quantitative"},
                "color": {"field": "race", "type": "nominal"}
            },
            "layer": [
                {
                    "selection": {
                        "gp": {
                            "type": "multi", "fields": ["race"], "bind": "legend"
                        },
                        "grid": {
                            "type": "interval", "bind": "scales"
                        }
                    },
                    "mark": "line",
                    "encoding": {
                        "opacity": {
                            "condition": {"selection": "gp", "value": 1},
                            "value": 0.2
                        }
                    }},

                {
                    "selection": {
                        "label": {
                            "type": "single",
                            "nearest": true,
                            "on": "mouseover",
                            "encodings": ["x"],
                            "empty": "none"
                        }
                    },
                    "mark": "point",
                    "encoding": {
                        "opacity": {
                            "condition": {"selection": "label", "value": 1},
                            "value": 0
                        }
                    }
                }
            ]
        },
        {
            "transform": [{"filter": {"selection": "label"}}],
            "layer": [
                {
                    "mark": {"type": "rule", "color": "gray"},
                    "encoding": {
                        "x": {"type": "nominal", "field": "dnf"}
                    }
                },
                {
                    "encoding": {
                        "text": {"type": "quantitative", "field": "count"},
                        "x": {"type": "nominal", "field": "dnf"},
                        "y": {"type": "quantitative", "field": "count"}
                    },
                    "layer": [
                        {
                            "mark": {
                                "type": "text",
                                "stroke": "white",
                                "strokeWidth": 2,
                                "align": "left",
                                "dx": 5,
                                "dy": -5
                            }
                        },
                        {
                            "mark": {"type": "text", "align": "left", "dx": 5, "dy": -5},
                            "encoding": {
                                "color": {"type": "nominal", "field": "race"}
                            }
                        }
                    ]
                }
            ]
        }
    ]
}



vegaEmbed('#dnfCauseComparison', dnfCause);