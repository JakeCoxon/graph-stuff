define(function(require, exports, module) {

    var HashMap = require('hashmap');

    function Graph() {
        this.vertices = new HashMap();
        this.edges = new HashMap();
        this.vertexMap = new HashMap();
        this.edgeMap = new HashMap();
    }

    Graph.prototype.addVertex = function(vertex) {
        this.vertices.set(vertex, true);
        this.vertexMap.set(vertex, []);
        return vertex;
    };

    Graph.prototype.addEdge = function(edge, sourceVertex, destVertex) {
        this.edges.set(edge, true);
        if (!this.containsVertex(sourceVertex)) throw new Error("Source vertex does not exist in graph");
        if (!this.containsVertex(destVertex)) throw new Error("Dest vertex does not exist in graph");
        this.vertexMap.get(sourceVertex).push(edge);
        this.vertexMap.get(destVertex).push(edge);
        this.edgeMap.set(edge, [sourceVertex, destVertex]);
    };

    Graph.prototype.removeVertex = function(vertex) {
        if (this.vertexMap.get(vertex).length > 0) return false;
        this.vertices.remove(vertex);
    };

    Graph.prototype.removeEdge = function(edge) {
        var vs = this.edgeMap.get(edge);
        for (var i = 0; i < vs.length; i++) {
            Array.remove(this.vertexMap.get(vs[i]), edge);
        }
        this.edges.remove(edge);
    };

    Graph.prototype.containsEdge = function(edge) {
        return this.edges.has(edge);
    };

    Graph.prototype.containsVertex = function(vertex) {
        return this.vertices.has(vertex);
    }

    Graph.prototype.incidentEdges = function(vertex) {
        return this.vertexMap.get(vertex);
    };

    Graph.prototype.incidentVertices = function(edge) {
        return this.edgeMap.get(edge);
    };

    Graph.prototype.oppositeVertex = function(edge, vertex) {
        var incidents = this.incidentVertices(edge);
        if (incidents[0] == vertex) return incidents[1];
        if (incidents[1] == vertex) return incidents[0];
    };

    Graph.prototype.toString = function() {
    };

    return Graph;


});