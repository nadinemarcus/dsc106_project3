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
    }).strength(0.05)

    var forceXbiography = d3.forceX(function(d) {
        if(d.Biography == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXadventure = d3.forceX(function(d) {
        if(d.Adventure == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXcomedy = d3.forceX(function(d) {
        if(d.Comedy == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXanimation = d3.forceX(function(d) {
        if(d.Animation == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXdrama = d3.forceX(function(d) {
        if(d.Drama == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXfamily = d3.forceX(function(d) {
        if(d.Family == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXcrime = d3.forceX(function(d) {
        if(d.Crime == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXfantasy = d3.forceX(function(d) {
        if(d.Fantasy == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXhistory = d3.forceX(function(d) {
        if(d.History == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXhorror = d3.forceX(function(d) {
        if(d.Horror == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXmusic = d3.forceX(function(d) {
        if(d.Music == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)
    
    var forceXmusical = d3.forceX(function(d) {
        if(d.Musical == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXmystery = d3.forceX(function(d) {
        if(d.Mystery == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXromance = d3.forceX(function(d) {
        if(d.Romance == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXscifi = d3.forceX(function(d) {
        if(d.SciFi == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXthriller = d3.forceX(function(d) {
        if(d.Thriller == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)

    var forceXwestern = d3.forceX(function(d) {
        if(d.Western == 1) {
            return 300
        } else {
            return 1000
        }
    }).strength(0.05)


    var forceXcombine = d3.forceX(width / 2).strength(0.05)
    
    var forceCollide = d3.forceCollide(function(d) {
        return radiusScale(d.sales) + 2
    })

    var simulation = d3.forceSimulation()
        .force("x", forceXcombine)
        .force("y", d3.forceY(height / 2).strength(0.05))
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
                .alphaTarget(0.1)
                .restart()
 
        })

        d3.select("#action").on('click', function() {
            simulation
                .force("x", forceXaction)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#musical").on('click', function() {
            simulation
                .force("x", forceXmusical)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#western").on('click', function() {
            simulation
                .force("x", forceXwestern)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })


        d3.select("#mystery").on('click', function() {
            simulation
                .force("x", forceXmystery)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })


        d3.select("#thriller").on('click', function() {
            simulation
                .force("x", forceXthriller)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#romance").on('click', function() {
            simulation
                .force("x", forceXromance)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#scifi").on('click', function() {
            simulation
                .force("x", forceXscifi)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#drama").on('click', function() {
            simulation
                .force("x", forceXdrama)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#family").on('click', function() {
            simulation
                .force("x", forceXfamily)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#history").on('click', function() {
            simulation
                .force("x", forceXhistory)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#fantasy").on('click', function() {
            simulation
                .force("x", forceXfantasy)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })
        
        d3.select("#biography").on('click', function() {
            simulation
                .force("x", forceXbiography)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#crime").on('click', function() {
            simulation
                .force("x", forceXcrime)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })


        d3.select("#comedy").on('click', function() {
            simulation
                .force("x", forceXcomedy)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#horror").on('click', function() {
            simulation
                .force("x", forceXhorror)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#music").on('click', function() {
            simulation
                .force("x", forceXmusic)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#animation").on('click', function() {
            simulation
                .force("x", forceXanimation)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
                .restart()

        })

        d3.select("#combined").on('click', function() {
            simulation
                .force("x", forceXcombine)
                .force("collide", forceCollide)
                .alphaTarget(0.1)
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
