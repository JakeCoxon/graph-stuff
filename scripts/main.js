define(function(require, exports, module) {

    Array.remove = function() {
        var what, arr = arguments.shift(), a = arguments, L = a.length, ax;
        while (L && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    };

    var Graph = require('graph');
    var HashMap = require('hashmap');
    var weightCalc = require('weight-calc');



    function Vertex(label) {
        this.label = label;
    }

    function Edge(weight) {
        this.weight = weight;
    }

    function LabelEdge(label) {
        this.label = label;
    }

    function makeGraph(data) {
        var graph = new Graph();
        var vertexNames = graph.vertexNames = new HashMap();
        
        function newVertex(id) {

            return graph.addVertex(vertexNames.set(id, new Vertex(id)));

        }
        
        for (var k in data) {

            var source = vertexNames.get(k) || newVertex(k);

            for (var k2 in data[k]) {

                var destData = data[k][k2],
                    dest = vertexNames.get(destData[0]) || newVertex(destData[0]),
                    weight = destData[1];

                if (typeof weight == "number") graph.addEdge(new Edge(weight), source, dest);
                else graph.addEdge(new LabelEdge(weight), source, dest);

            }

        }
        return graph;

    }

    var graph = makeGraph({
        'a': [['b', 1]],
        'b': [['c', 1]],
        'c': [['d', 1]],
        'd': [['a', 1]]
    });
    var initialEdge = graph.incidentEdges(graph.vertexNames.get('a'))[0];
  
    var w = weightCalc(graph, initialEdge);
    console.log(w);


});