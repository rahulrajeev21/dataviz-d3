var dnfdistrdataset;
function getSelectedConstructor() {
    selectedConstructor = document.getElementById("constrselect").value;
    var dnf_constr_data = JSON.parse(dnf_constr_jsondata);
    dnfdistrdataset = dnf_constr_data[selectedConstructor];


    var dnfdistribution = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A simple radial chart with embedded data.",
        "data": {"values": dnfdistrdataset},
        "layer": [
            {    "selection": {
                    "dnfcause": {
                        "type": "multi", "fields": ["dnf"], "bind": "legend"
                    }
                },
                "mark": {"type": "arc", "innerRadius": 20, "stroke": "#fff"}},

        ],
        "encoding": {
            "theta": {"field": "count", "type": "quantitative", "stack": true},
            "radius": {
                "field": "count",
                "scale": {"type": "sqrt", "zero": true, "rangeMin": 20}
            },
            "color": {"field": "dnf", "type": "nominal","legend":{"title":"Cause of DNF", "orient":"bottom","direction":"horizontal"}},
            "opacity": {
                "condition": {"selection": "dnfcause", "value": 1},
                "value": 0.2
            }
        },
        "view": {"stroke": null}
    }

// var opt = {config:"config_urban.json"}

    vegaEmbed('#dnfdistribution', dnfdistribution);
}