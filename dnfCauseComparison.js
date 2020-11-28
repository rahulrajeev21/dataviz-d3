var dnfCause = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "description": "Stock prices of 5 Tech Companies over Time.",
    "data": {"url": "dnfCauseComparison.csv"},
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
        "x": {"field": "dnf", "type": "ordinal"},
        "y": {"field": "count", "type": "quantitative"},
        "color": {"field": "race", "type": "nominal"},
        "opacity": {
            "condition": {"selection": "gp", "value": 1},
            "value": 0.2
        }

    }
}

vegaEmbed('#dnfCauseComparison', dnfCause);