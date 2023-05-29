class Graph {
  constructor(vertices, directed = false, weighted = false) {
    this.vertices = vertices;
    this.directed = directed;
    this.weighted = weighted;
    this.adjacencyMatrix = this.initializeMatrix(vertices);
    this.adjacencyList = this.initializeList(vertices);
  }

  initializeMatrix(vertices) {
    const matrix = [];
    for (let i = 0; i < vertices; i++) {
      matrix.push(Array(vertices).fill(0));
    }
    return matrix;
  }

  initializeList(vertices) {
    const list = {};
    for (let i = 0; i < vertices; i++) {
      list[i] = [];
    }
    return list;
  }

  addEdge(source, destination, weight = 1) {
    if (source >= 0 && source < this.vertices && destination >= 0 && destination < this.vertices) {
      this.adjacencyMatrix[source][destination] = weight;
      this.adjacencyList[source].push({ node: destination, weight: weight });
      if (!this.directed) {
        this.adjacencyMatrix[destination][source] = weight;
        this.adjacencyList[destination].push({ node: source, weight: weight });
      }
    }
  }

  printAdjacencyMatrix() {
    console.log("Adjacency Matrix:");
    console.log(this.adjacencyMatrix);
  }

  printAdjacencyList() {
    console.log("Adjacency List:");
    for (let vertex in this.adjacencyList) {
      console.log(${vertex}: ${JSON.stringify(this.adjacencyList[vertex])});
    }
  }

  drawGraph() {
  }
}

function main() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Podaj liczbę wierzchołków: ", function (vertices) {
    const graph = new Graph(parseInt(vertices));

    rl.question("Czy graf jest skierowany? (Tak/Nie): ", function (isDirected) {
      if (isDirected.toLowerCase() === "tak") {
        graph.directed = true;
      }

      rl.question("Czy graf jest ważony? (Tak/Nie): ", function (isWeighted) {
        if (isWeighted.toLowerCase() === "tak") {
          graph.weighted = true;
        }

        for (let i = 0; i < graph.vertices; i++) {
          console.log(Wierzchołek ${i}:);
          rl.question("Podaj połączenia (oddzielone przecinkami): ", function (connections) {
            const edges = connections.split(",");
            edges.forEach((edge) => {
              const [destination, weight] = edge.split(":");
              if (graph.weighted) {
                graph.addEdge(i, parseInt(destination), parseFloat(weight));
              } else {
                graph.addEdge(i, parseInt(destination));
              }
            });
            if (i === graph.vertices - 1) {
              graph.printAdjacencyMatrix();
              graph.printAdjacencyList();
              graph.drawGraph();
              rl.close();
            }
          });
        }
      });
    });
  });
}

main();