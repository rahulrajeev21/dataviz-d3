var pitstopViz = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {"url": "pitstops.csv"},
    "vconcat": [
        {
            "width": 1000,
            "height": 300,
            "selection": {"brush": {"type": "interval"}},
            "mark": "point",
            "encoding": {
                "x": {
                    "field": "Laps", "type": "quantitative",
                    "scale": {"domain": [10, 70]}
                },
                "y": {
                    "field": "PitstopMs", "type": "quantitative"
                }
            }
        },
        {
            "width": 1000,
            "height": 300,
            "transform": [{"filter": {"selection": "brush"}}],
            "mark": "line",
            "encoding": {
                "x": {"field": "Points", "type": "quantitative"},
                "y": {"field": "Position", "type": "quantitative", "sort": "descending"}
            }
        }
    ]
}

var opt = {config: "config_quartz.json"}

vegaEmbed('#pitstopViz', pitstopViz, opt);