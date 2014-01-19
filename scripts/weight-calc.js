define(function(require, exports, module) {

    var Graph = require('graph'),
        HashMap = require('hashmap');


    function calculateEdgeWeight(graph, initialEdge) {
        
        var initialVertices = graph.incidentVertices(initialEdge);
        
        var path = depthFirstTraversal(graph, initialVertices[0], initialEdge,
            function(edge, vertex) {

                // if (typeof edge.weight === undefined && edge.label != initialEdge.label) 
                //     return;
                
                if (vertex == initialVertices[1])
                    return true;

                return false;

            });

        var matchingEdges = 1, totalWeight = 0;

        console.log(path);

        for (var i = 0; i < path.length; i++) {
            // if (edge.label == initialEdge.label)
            //     matchingEdges ++;
            // else
            //     totalWeight += edge.weight * (graph.incidentVertices(edge)[1] == vertex ? 1 : -1)
        }
        


        return;

    }

    function depthFirstTraversal(graph, initialVertex, initialEdge, f) {

        var frontier = [[initialEdge, initialVertex]];
        var discovered = new HashMap();
        var parents = new HashMap();

        var goal = (function() {
            while (frontier.length) {

                var front = frontier.pop(),
                    edge = front[0],
                    vertex = front[1];

                discovered.set(vertex, true);
                var incidentEdges = graph.incidentEdges(vertex);

                for (var i = 0; i < incidentEdges.length; i++) {

                    if (incidentEdges[i] != initialEdge) {

                        var oppositeVertex = graph.oppositeVertex(incidentEdges[i], vertex);

                        if (!discovered.has(oppositeVertex)) { 

                            parents.set(incidentEdges[i], edge);

                            var res = f(incidentEdges[i], oppositeVertex);
                            if (res) return incidentEdges[i];
                            frontier.push([incidentEdges[i], oppositeVertex]);

                        }


                    }

                }

            }
        })();

        var path = [goal];
        while (goal && parents.has(goal)) {

            goal = parents.get(goal);
            path.push(goal);

        }

        return path;

    }



    return calculateEdgeWeight;

});