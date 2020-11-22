//both female and male data
var allConstructors; // global
var mercedes;
var toroRosso;

function change(data) {
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        }).sort(null)(data);
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    path = d3.select("#donut")
        .selectAll("path")
        .data(pie); // Compute the new angles
    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
}

Promise.all([
    d3.csv("dnf_all.csv"),
    d3.csv("dnf_caterham.csv"),
    d3.csv("dnf_ferrari.csv"),
    d3.csv("dnf_forceIndia.csv"),
    d3.csv("dnf_hrt.csv"),
    d3.csv("dnf_lotus.csv"),
    d3.csv("dnf_marussia.csv"),
    d3.csv("dnf_merc.csv"),
    d3.csv("dnf_rbr.csv"),
    d3.csv("dnf_renault.csv"),
    d3.csv("dnf_sauber.csv"),
    d3.csv("dnf_spyker.csv"),
    d3.csv("dnf_toroRosso.csv"),
    d3.csv("dnf_virgin.csv"),
    d3.csv("dnf_williams.csv")
]).then(function(files) {
    allConstructors = files[0];
    caterham = files[1];
    ferrari = files[2];
    forceIndia = files[3];
    hrt = files[4];
    lotus = files[5];
    marussia = files[6];
    mercedes = files[7];
    rbr = files[8];
    renault = files[9];
    sauber = files[10];
    spyker = files[11];
    toroRosso = files[12];
    virgin = files[13];
    williams = files[14];
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75; //This is the size of the hole in the middle

var color = d3.scaleOrdinal()
    .range(["#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437","#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437"]);

    var svg = d3.select('#donut')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })
        .sort(null);

    var donutTip = d3.select("body").append("div")
        .attr("class", "donut-tip")
        .style("opacity", 0);

    var path = svg.selectAll('path')
        .data(pie(allConstructors))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color(d.data.title);
        })
        .attr('transform', 'translate(0, 0)')
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85');
            donutTip.transition()
                .duration(50)
                .style("opacity", 1);
            let num = (Math.round((i.value / i.data.all) * 100)).toString() + '%';
            donutTip.html(num)
                .style("left", (d.pageX + 10) + "px")
                .style("top", (d.pageY - 15) + "px");

        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            donutTip.transition()
                .duration('50')
                .style("opacity", 0);
        });

    // select legend
    var legend = d3.select("#legend")

// Add one dot in the legend for each name.
    legend.selectAll("mydots")
        .data(color.domain())
        .enter()
        .append("circle")
        .attr("cx", 100)
        .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
    legend.selectAll("mylabels")
        .data(color.domain())
        .enter()
        .append("text")
        .attr("x", 120)
        .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    d3.select("select#constructorList")
        .on("change",function(d){
            var selected = d3.select("#constructorList").node().value;
            change(window[selected]);
        })
}).catch(function(err) {
    // handle error here
    console.log(err)
})