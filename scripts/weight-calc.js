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

        debugger;
        for (var i = 0; i < path.length; i++) {

            var edge = path[i][0],
                vertex = path[i][1];

            if (edge.label && edge.label == initialEdge.label)
                matchingEdges ++;
            else
                totalWeight += edge.weight * (graph.incidentVertices(edge)[1] == vertex ? 1 : -1);

        }

        return matchingEdges / totalWeight;

    }

    function depthFirstTraversal(graph, initialVertex, initialEdge, f) {

        var frontier = [[initialEdge, initialVertex]],
            discovered = new HashMap(),
            parents = new HashMap();

        var goal = (function() {
            while (frontier.length) {

                var front = frontier.pop(),
                    edge = front[0],
                    vertex = front[1],
                    incidentEdges = graph.incidentEdges(vertex);

                discovered.set(vertex, true);

                for (var i = 0; i < incidentEdges.length; i++) {

                    if (incidentEdges[i] != initialEdge) {

                        var oppositeVertex = graph.oppositeVertex(incidentEdges[i], vertex);

                        if (!discovered.has(oppositeVertex)) {
                            
                            var result = f(incidentEdges[i], oppositeVertex);

                            parents.set(incidentEdges[i], [edge, vertex]);

                            if (result) return [incidentEdges[i], oppositeVertex];
                            frontier.push([incidentEdges[i], oppositeVertex]);

                        }

                    }

                }

            }

            throw new Error("No goal found");
        })();

        var path = [goal];
        while (goal && parents.has(goal)) {

            goal = parents.get(goal[0]);
            path.push(goal);

        }

        return path;

    }



    return calculateEdgeWeight;

});