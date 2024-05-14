(function() {
    var width = 1500;
     height = 800;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("height", height)  
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)")

    var radiusScale = d3.scaleSqrt().domain([485930816, 2923706026]).range([5, 50])

    var forceXaction = d3.forceX(function(d) {
        if(d.Action == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.1)

    var forceXadventure = d3.forceX(function(d) {
        if(d.Adventure == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.1)

    var forceXanimation = d3.forceX(function(d) {
        if(d.Animation == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.1)

    var forceXcombine = d3.forceX(width / 2).strength(0.1)
    
    var forceCollide = d3.forceCollide(function(d) {
        return radiusScale(d.sales) + 2
    })

    var simulation = d3.forceSimulation()
        .force("x", forceXcombine)
        .force("y", d3.forceY(height / 2).strength(0.1))
        .force("collide", forceCollide)

    d3.queue()
        .defer(d3.csv, "imdb2.csv")
        .await(ready)

    function ready (error, datapoints) {

        var circles = svg.selectAll(".movie")
            .data(datapoints)
            .enter().append("circle")
            .attr("class", "movie")
            .attr("r", function(d) {
                return radiusScale(d.sales)
            })
            .attr("fill", "steelblue")
            .on('click', function(d) {
                console.log(d)
            })

        d3.select("#adventure").on('click', function() {
            simulation
                .force("x", forceXadventure)
                .force("collide", forceCollide)
                .alphaTarget(0.2)
                .restart()
 
        })

        d3.select("#action").on('click', function() {
            simulation
                .force("x", forceXaction)
                .force("collide", forceCollide)
                .alphaTarget(0.2)
                .restart()

        })

        d3.select("#animation").on('click', function() {
            simulation
                .force("x", forceXanimation)
                .force("collide", forceCollide)
                .alphaTarget(0.2)
                .restart()

        })

        d3.select("#combined").on('click', function() {
            simulation
                .force("x", forceXcombine)
                .force("collide", forceCollide)
                .alphaTarget(0.2)
                .restart()
        })

        simulation.nodes(datapoints)
            .on('tick', ticked)

        function ticked() {
            circles 
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                })
        }

    }

})();