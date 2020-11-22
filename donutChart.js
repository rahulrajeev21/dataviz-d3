//both female and male data
var totals = [{
    title: "Collision",
    value: 286,
    all: 1098
},
    {
        title: "Gearbox",
        value: 472,
        all: 1098
    },
    {
        title: "Front Wing",
        value: 318,
        all: 1098
    },
    {
        title: "Accident",
        value: 22,
        all: 1098
    }
];
//female
var mercedes = [{
    title: "Collision",
    value: 25,
    all: 100
},
    {
        title: "Gearbox",
        value: 44,
        all: 100
    },
    {
        title: "Front Wing",
        value: 28,
        all: 100
    },
    {
        title: "Accident",
        value: 3,
        all: 100
    }
];
//male
var toroRosso = [{
    title: "Collision",
    value: 27,
    all: 100
},
    {
        title: "Gearbox",
        value: 42,
        all: 100
    },
    {
        title: "Front Wing",
        value: 30,
        all: 100
    },
    {
        title: "Accident",
        value: 2,
        all: 100
    }
];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 75; //This is the size of the hole in the middle

//Only choose one! This one for a d3 color scheme:
var color = d3.scaleOrdinal(d3.schemeSet1);
//Or this one for a customized color scheme:
// var color = d3.scaleOrdinal()
//     .range(["#5A39AC", "#DD98D6", "#E7C820", "#08B2B2"]);

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
    .data(pie(totals))
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

var legendRectSize = 13;
var legendSpacing = 7;
var legend = svg.selectAll('.legend') //the legend and placement
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'circle-legend')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize - 13;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });
legend.append('circle') //keys
    .style('fill', color)
    .style('stroke', color)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '.5rem');
legend.append('text') //labels
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .attr('fill','white')
    .text(function (d) {
        return d;
    });

d3.select("button#allConstructors")
    .on("click", function () {
        change(totals);
    })
d3.select("button#mercedes")
    .on("click", function () {
        change(mercedes);
    })
d3.select("button#toroRosso")
    .on("click", function () {
        change(toroRosso)
    })

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