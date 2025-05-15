# A*搜索算法

**A\*算法**，又称为**A-Star算法**，是一种图的遍历和路径搜索算法，由于其完整性，最佳性和效率性，它被广泛用于计算机科学的许多领域。一个主要的实际缺点是它的空间复杂性，因为它将所有生成的节点存储在内存中。因此，在实际的旅游路由系统中，它的表现通常优于通过算法，可以预先处理图表以获得更好的性能

斯坦福研究院的Peter Hart, Nils Nilsson和Bertram Raphael(现在是斯坦福国际研究院)在1958年第一次公布了**A\*算法**[1]。它可以被视为Dijkstra算法的一种扩展。**A\*算法**可以启发式地指导其搜索来实现更好的性能。

## **A\***算法的历史

> A*是作为Shakey项目的一部分创建的，Shakey项目旨在建立一个可以规划自己行为的移动机器人。![Shakey机器人](Shakey.png)
>Nils Nilsson最初建议使用图遍历算法对于Shakey的路径进行规划，图形遍历是由启发式函数$h(n)$的引导，从节点n到目标节点的估计距离：它完全忽略了$g(n)$，从起始节点到n的距离. Bertram Raphael建议使用$g(n) + h(n)$；Peter Hart发明了我们现在呼吁启发式功能的可否受理和一致性的概念。A *最初设计用于在路径的成本是其成本的成本时找到最少的成本路径，但已经表明，A *可用于找到满足成本代数条件的任何问题的最佳路径。
>

>

>

## 描述

**A\*算法**是一种聪明的搜素算法，或者是最好的首先搜索算法，这意味着它在加权图方面配制：从图形的特定起始节点开始，它旨在找到给定目标节点的路径 成本（最小距离旅行，最短时间等）。 它通过维护源自开始节点的路径树并一次将这些路径扩展为一个边缘，直到满足其终止标准。

在其主循环的每次迭代时，A *需要确定其延伸的哪个路径。 它基于路径的成本，并估计将路径延伸到目标所需的成本。具体来说，a *选择最小化$g(n)=g(n)+h(n)$的路径，在$g(n)=g(n)+h(n)$中n是路径上的下一个节点，$g(n)$是从起始节点到n的路径的成本，$h(n)$是一个启发式函数，估计从n到目标的最便宜路径的成本。a *当它选择扩展的路径是从开始到目标的路径或者如果没有符合条件的路径，则延长路径。启发式功能是特定于问题的。如果启发式函数是允许的，这意味着它永远不会高估实现目标的实际成本，a *保证从开始到目标中返回最小成本路径。

a *的典型实现使用优先级队列来执行重复选择的最小（估计）成本节点以扩展。 该优先级队列称为开放式或边缘。 在算法的每个步骤中，从队列中移除具有最低F（x）值的节点，相应地更新其邻居的F和G值，并且这些邻居被添加到队列中。 该算法继续直到删除节点（因此，具有所有条纹节点的最低F值的节点）是目标节点。[B]该目标的F值也是最短路径的成本，自从h处 目标是允许的启发式零。

到目前为止所描述的算法仅给我们最短路径的长度。 为了找到实际的步骤序列，可以很容易地修改算法，以便路径上的每个节点都跟踪其前代。 在运行此算法之后，终端节点将指向其前身，依此类推，直到某些节点的前任是启动节点。

作为示例，当搜索地图上的最短路径时，H（x）可能表示到目标的直线距离，因为它在物理上是任何两个点之间的最小距离。 对于来自视频游戏的网格图，使用曼哈顿距离或曲折距离变得更好，具体取决于可用的移动组（4路或8路）

如果启发式H满足图表的每个边缘（x，y）的附加条件h（x）≤d（x，y）+ h（y）（其中d表示该边缘的长度），则调用h 单调或一致。 通过一致的启发式，A *保证在不处理任何节点的情况下找到最佳路径，不止一次，A *相当于运行Dijkstra的算法，其降低的成本d'（x，y）= d（x，y）+ h （y） - h（x）。

## 伪代码

以下伪代码描述了算法：

```matlab
function reconstruct_path(cameFrom, current)
    total_path := {current}
    while current in cameFrom.Keys:
        current := cameFrom[current]
        total_path.prepend(current)
    return total_path

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
function A_Star(start, goal, h)
    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
    // This is usually implemented as a min-heap or priority queue rather than a hash-set.
    openSet := {start}

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
    // to n currently known.
    cameFrom := an empty map

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    gScore := map with default value of Infinity
    gScore[start] := 0

    // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
    // how short a path from start to finish can be if it goes through n.
    fScore := map with default value of Infinity
    fScore[start] := h(start)

    while openSet is not empty
        // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
        current := the node in openSet having the lowest fScore[] value
        if current = goal
            return reconstruct_path(cameFrom, current)

        openSet.Remove(current)
        for each neighbor of current
            // d(current,neighbor) is the weight of the edge from current to neighbor
            // tentative_gScore is the distance from start to the neighbor through current
            tentative_gScore := gScore[current] + d(current, neighbor)
            if tentative_gScore < gScore[neighbor]
                // This path to neighbor is better than any previous one. Record it!
                cameFrom[neighbor] := current
                gScore[neighbor] := tentative_gScore
                fScore[neighbor] := gScore[neighbor] + h(neighbor)
                if neighbor not in openSet
                    openSet.add(neighbor)

    // Open set is empty but goal was never reached
    return failure
```

>备注：在此伪代码中，如果通过一个路径到达节点，从OpenSet删除，随后由更便宜的路径达成，它将再次添加到OpenSet中。 这对于保证返回的路径是必不可少的，如果启发式函数是允许但不一致的。 如果启发式是一致的，则当从OpenSet删除节点时，它保证了它的路径是最佳的，因此测试'暂叫_Gscore <gscore [邻居]如果再次达到节点，则始终失败。

## 例子

一个A *算法的示例，其中节点是与道路连接的城市，H（x）是目标点的直线距离：
