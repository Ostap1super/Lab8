class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjacencyList = {};
  }

  addEdge(source, destination, weight) {
    if (!this.adjacencyList[source]) {
      this.adjacencyList[source] = [];
    }
    this.adjacencyList[source].push({ node: destination, weight: weight });
  }

  dijkstra(startNode) {
    const distances = {};
    const visited = {};
    const previous = {};
    const PriorityQueue = (function () {
      function PriorityQueue() {
        this.items = [];
      }
      PriorityQueue.prototype.enqueue = function (element) {
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
          if (element.distance < this.items[i].distance) {
            this.items.splice(i, 0, element);
            added = true;
            break;
          }
        }
        if (!added) {
          this.items.push(element);
        }
      };
      PriorityQueue.prototype.dequeue = function () {
        return this.items.shift();
      };
      PriorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0;
      };
      return PriorityQueue;
    })();
    const pq = new PriorityQueue();

    // Inicjalizacja dystansów dla wszystkich wierzchołków jako nieskończoność, a startowego jako 0
    for (let vertex in this.adjacencyList) {
      if (vertex === startNode) {
        distances[vertex] = 0;
        pq.enqueue({ node: vertex, distance: 0 });
      } else {
        distances[vertex] = Infinity;
        pq.enqueue({ node: vertex, distance: Infinity });
      }
      previous[vertex] = null;
    }

    while (!pq.isEmpty()) {
      const { node: current } = pq.dequeue();
      visited[current] = true;

      if (this.adjacencyList[current]) {
        for (let neighbor of this.adjacencyList[current]) {
          if (!visited[neighbor.node]) {
            const distance = distances[current] + neighbor.weight;
            if (distance < distances[neighbor.node]) {
              distances[neighbor.node] = distance;
              previous[neighbor.node] = current;
              pq.enqueue({ node: neighbor.node, distance: distance });
            }
          }
        }
      }
    }

    return { distances, previous };
  }

  getPath(previous, destination) {
    const path = [];
    let current = destination;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
    return path;
  }
}

function main() {
  const graph = new Graph(6);

  graph.addEdge("A", "B", 2);
  graph.addEdge("A", "C", 4);
  graph.addEdge("B", "C", 1);
  graph.addEdge("B", "D", 7);
  graph.addEdge("C", "E", 3);
  graph.addEdge("D", "E", 2);
  graph.addEdge("D", "F", 5);
  graph.addEdge("E", "F", 1);

  const startNode = "A";
  const { distances, previous } = graph.dijkstra(startNode);

  for (let vertex in distances) {
    console.log(Najkrótsza droga z wierzchołka ${startNode} do ${vertex}: ${distances[vertex]});
    const path = graph.getPath(previous, vertex);
    console.log(Ścieżka: ${path.join(" -> ")});
    console.log("---------------------------");
  }
}

main();