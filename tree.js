/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let sum = 0;
    let toVisitStack
    // checks for empty tree.
    if (this.root) {
      toVisitStack = [this.root]
    } else {
      return sum;
    }

    while (toVisitStack.length > 0) {
      const current = toVisitStack.pop()
      sum += current.val

      for (let child of current.children) {
        toVisitStack.push(child)
      }
    }
    return sum
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let evenCount = 0;
    let toVisitStack
    // checks for empty tree.
    if (this.root) {
      toVisitStack = [this.root]
    } else {
      return evenCount;
    }

    while (toVisitStack.length > 0) {
      const current = toVisitStack.pop()
      if (current.val % 2 === 0) evenCount++

      for (let child of current.children) {
        toVisitStack.push(child)
      }
    }
    return evenCount
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let count = 0
    let toVisitStack
    // checks for empty tree.
    if (this.root) {
      toVisitStack = [this.root]
    } else {
      return count;
    }

    while (toVisitStack.length > 0) {
      const current = toVisitStack.pop()
      if (current.val > lowerBound) count++

      for (let child of current.children) {
        toVisitStack.push(child)
      }
    }
    return count
  }
}

module.exports = { Tree, TreeNode };
