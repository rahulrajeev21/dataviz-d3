var pitstopViz = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {"url": "pitstops.csv"},
    "vconcat": [
        {
            "width": 1000,
            "height": 300,
            "selection": {"brush": {"type": "interval"}},
            "mark": "circle",
            "tooltip":true,
            "encoding": {
                "x": {
                    "field": "Laps", "type": "quantitative",
                    "scale": {"domain": [1, 75]},"axis": {"grid": false,"labelFontSize":15,"tickSize":7,"titleFontSize":15}
                },
                "y": {
                    "field": "PitstopMs", "type": "quantitative","axis": {"grid": true,"labelFontSize":15,"tickSize":7,"titleFontSize":15,"title":"Pitstop Duration (in milliseconds)"}
                }
            }
        },
        {
            "width": 1000,
            "height": 300,
            "transform": [{"filter": {"selection": "brush"}}],
            "mark": "line",
            "tooltip":true,
            "encoding": {
                "x": {"field": "Points", "type": "quantitative","axis": {"grid": false,"labelFontSize":15,"tickSize":7,"titleFontSize":15}},
                "y": {"field": "Position", "type": "quantitative", "sort": "descending","axis": {"grid": true,"labelFontSize":15,"tickSize":7,"titleFontSize":15}}
            }
        }
    ]
}

var opt = {config: "config_quartz.json"}

vegaEmbed('#pitstopViz', pitstopViz, opt);