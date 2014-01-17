define(function(require, exports, module) {

  var m = require('mori');

  function Graph() {}
  function Vertex() {}
  function Edge(weight) {
    this.weight = weight;
  }
  function UnknownEdge(label) {
    this.label = label;
  }

  function findEdgeWeight(graph, initEdge) {
    var vs = graph.adjacentVertices(initEdge);
    var frontier = [vs[0]];
    var discovered = {};

    while (frontier.length) {

      var v = frontier.pop();
      if (!discovered[v]) {

        discovered[v] = true;
        var adjEdges = graph.adjacentEdges(v);
        for (var i = 0; i < adjEdges.length; i++) {

          if (adjEdges[i] != initEdge) {
            if (typeof adjEdges[i] == "Edge" || (typeof adjEdges[i] == "UnknownEdge" && adjEdges[i].label == initEdge.label)) {
              frontier.push(graph.adjacentVertex(v, adjEdges[i]));
            }
          }

        }

      }

    }
  }
  console.log("OK");

  return Graph;

});

