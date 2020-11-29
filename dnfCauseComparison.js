var dnfCause = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {
        "url": "dnfCauseComparison.csv"
    },
    "layer": [
        {
            "width": 1000,
            "height": 300,
            "encoding": {
                "x": {"field": "dnf", "type": "nominal","axis": {"labelFontSize":15,"tickSize":7,"titleFontSize":15,"title":"Cause of DNF"}},
                "y": {"field": "count", "type": "quantitative","axis": {"labelFontSize":15,"tickSize":7,"titleFontSize":15,"Title":"DNF Count"}},
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
                            "value": 0.4
                        }
                    }
                },

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
                                "strokeWidth": 3,
                                "align": "left",
                                "dx": 5,
                                "dy": -5
                            }
                        },
                        {
                            "mark": {"type": "text", "align": "left", "dx": 5, "dy": -5},
                            "encoding": {
                                "color": {"type": "nominal", "field": "race", "scale": {"scheme": "set1"},"legend":{"labelColor":"#979797","title":null,"symbolSize":700,"symbolType":"circle"}}
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

var opt = {config: "config_quartz.json"}

vegaEmbed('#dnfCauseComparison', dnfCause, opt);