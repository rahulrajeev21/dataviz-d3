var dnfplot = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {
        "url": "dnfbyyear.csv"
    },
    "width": 1000,
    "height": 400,

    "selection": {
        "grid": {
            "type": "interval", "bind": "scales"
        }
    },
    "mark": {
        "type": "circle",
        "opacity": 0.8,
        "stroke": null,
        "strokeWidth": 1,
        "tooltip":true
    },
    "encoding": {
        "x": {
            "field": "Year",
            "type": "temporal",
            "axis": {"grid": false,"labelFontSize":15,"tickSize":7,"titleFontSize":15}
        },
        "y": {"field": "Constructor", "type": "nominal", "axis": {"title": null},"axis": {"labelFontSize":15,"tickSize":7,"tickMinStep":3,"title":null}},
        "size": {
            "field": "DNF",
            "type": "quantitative",
            "title": "DNF Cases",
            "legend": null,
            "scale": {"rangeMax": 5000}
        },
        "color": {"field": "Constructor", "type": "nominal", "legend": null}
    }
}

var opt = {config: "config_quartz.json"}
vegaEmbed('#dnfbyyear', dnfplot, opt);