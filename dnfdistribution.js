var dnfdistrdataset;

function getSelectedConstructor() {
    selectedConstructor = document.getElementById("constrselect").value;
    var dnf_constr_data = JSON.parse(dnf_constr_jsondata);
    dnfdistrdataset = dnf_constr_data[selectedConstructor];


    var dnfdistribution = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A simple radial chart with embedded data.",
        "height": 500,
        "width": 1000,
        "data": {"values": dnfdistrdataset},
        "layer": [
            {
                "selection": {
                    "dnfcause": {
                        "type": "multi", "fields": ["dnf"], "bind": "legend"
                    }
                },
                "mark": {"type": "arc", "innerRadius": 30, "stroke": null}
            }
        ],
        "encoding": {
            "theta": {"field": "count", "type": "quantitative", "stack": true},
            "radius": {
                "field": "count",
                "scale": {"type": "sqrt", "zero": true, "rangeMin": 10}
            },
            "color": {
                "field": "dnf",
                "type": "nominal",
                "legend": {
                    "title": "Cause of DNF",
                    "titleColor": "#979797",
                    "titleFontSize": 15,
                    "labelColor": "#979797",
                    "title": null,
                    "symbolSize": 300,
                    "symbolType": "circle",
                    "labelFontSize": 15,
                    "rowPadding":7
                }
            },
            "opacity": {
                "condition": {"selection": "dnfcause", "value": 1},
                "value": 0.4
            }
        },
        "view": {"stroke": null}
    }

    var opt = {config: "config_dark.json"}

    vegaEmbed('#dnfdistribution', dnfdistribution, opt);
}