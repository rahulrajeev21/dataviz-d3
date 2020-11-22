d3.json("dnf_constructors.json").then(data => {
    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + 100)
        .attr("height", height + 50)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    const color = d3.scaleOrdinal().range(["#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64",
        "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d",
        "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010",
        "#10b437", "#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a",
        "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352",
        "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437"]);

    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius - 75)
        .outerRadius(radius);

    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t) => arc(i(t));
    }

    d3.selectAll("input")
        .on("change", update);

    function update(val = this.value) {
        // Join new data
        const path = svg.selectAll("path")
            .data(pie(data[val]));

        // Update existing arcs
        path.transition().duration(200).attrTween("d", arcTween);

        // Enter new arcs
        path.enter().append("path")
            .attr("fill", (d, i) => color(i))
            .attr("d", arc)
            .attr("stroke", "black")
            .attr("stroke-width", "6px")
            .each(function (d) {
                this._current = d;
            });
    }

// keys for legend
    var legendKeys = ["Accident", "Brakes", "Collision", "Disqualified", "Drivetrain","Electrical",
        "Engine","ERS","Front wing","Gearbox","Hydraulics","Mechanical","Power Unit","Rear wing",
        "Retired","Spun off","Suspension","Transmission","Turbo"]

    update("all");

// select legend
    var legend = d3.select("#legend")

// colors
    legend.selectAll("legendColors")
        .data(color.domain())
        .enter()
        .append("circle")
        .attr("cx", 100)
        .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return color(d)})

// labels
    legend.selectAll("legendLabels")
        .data(legendKeys)
        .enter()
        .append("text")
        .attr("x", 120)
        .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", "white")
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

});