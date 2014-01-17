define(function(require, exports, module) {

  var m = require('hashmap');

  function Graph() {
    this.vertices = new HashMap();
    this.edges = new HashMap();
    this.vertexMap = new HashMap();
    this.edgeMap = new HashMap();
  }

  Graph.prototype.addVertex = function(vertex) {
    this.vertices.set(vertex, true);
    this.vertexMap.set(vertex, []);
  };
  Graph.prototype.addEdge = function(edge, sourceVertex, destVertex) {
    this.edges.set(edge, true);
    this.vertexMap.get(sourceVertex).push(edge);
    this.vertexMap.get(destVertex).push(edge);
  };
  Graph.prototype.removeVertex = function(vertex) {
    if (this.vertexMap.get(vertex).length > 0) return false;
    this.vertices.remove(vertex);
  };
  Graph.prototype.removeEdge = function(edge) {
    var vs = this.edgeMap.get(edge);
    for (var i = 0; i < vs.length; i++) {
      this.vertexMap.get(vs[i]).remove(edge);
    }
    this.edges.remove(edge);
  };

  Graph.prototype.toString = function() {
  };



  function Vertex() {}
  function Edge() {}
  var a, b, c, g = new Graph();
  g.addVertex(a = new Vertex());
  g.addVertex(b = new Vertex());
  g.addEdge(c = new Edge(), a, b);


});