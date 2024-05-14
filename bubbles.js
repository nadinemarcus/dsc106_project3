(function() {
    var width = 1000;
     height = 800;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("height", height)  
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)")

    var radiusScale = d3.scaleSqrt().domain([179968873, 2923706026]).range([5, 30])

    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05 ))
        .force("collide", d3.forceCollide(function(d) {
            return radiusScale(d.sales) + 1;
        }))

    d3.queue()
        .defer(d3.csv, "imdb.csv")
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
            //.on('click', function(d) {
            //    console.log(d)
            //})

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