var dnfplot = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {
    "url": "dnfbyyear.csv"
},
    "width": 600,
    "height": 400,
    "transform": [
    {"filter": "datum.Constructor !== 'All natural disasters'"}
],
    "mark": {
    "type": "circle",
        "opacity": 0.8,
        "stroke": "black",
        "strokeWidth": 1
},
    "encoding": {
    "x": {
        "field": "Year",
            "type": "temporal",
            "axis": {"grid": false}
    },
    "y": {"field": "Constructor", "type": "nominal", "axis": {"title": ""}},
    "size": {
        "field": "DNF",
            "type": "quantitative",
            "title": "DNF Cases",
            "legend": {"clipHeight": 70},
        "scale": {"rangeMax": 5000}
    },
    "color": {"field": "Constructor", "type": "nominal", "legend": null}
}
}
vegaEmbed('#dnfbyyear', dnfplot);