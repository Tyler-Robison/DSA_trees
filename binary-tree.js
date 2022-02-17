/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  // can still have DFS/BFS in a binsry tree

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  // breadth first needed here, want to find first node that is missing left or right
  minDepth() {
    let minDepth = 1;
    let toVisitQueue;
    // checks for empty tree.
    if (this.root) {
      toVisitQueue = [this.root];
    } else {
      return 0;
    }

    while (toVisitQueue.length > 0) {
      const current = toVisitQueue.shift();
      if (!current.left && !current.right) return minDepth;
      if (!current.left || !current.right) return minDepth + 1;
      // if reach this point, node has left and right child, min not found
      minDepth++;
      toVisitQueue.push(current.left);
      toVisitQueue.push(current.right);
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  // depth first -> 3 nums currdepth, maxDepth, depth of last branch
  // everytime find a branch (left and right) save branchDepth
  // everytime descend a level save currDepth
  // if currDepth > maxD, maxD = curr
  // if hit leaf, go back to last branch, set currDepth to branchDepth
  // return maxDepth after exiting while loop
  maxDepth() {
    let maxDepth = 0;
    let currDepth = 1;
    let branchDepth;
    let toVisitStack;
    // checks for empty tree.
    if (this.root) {
      toVisitStack = [this.root];
    } else {
      return 0;
    }

    while (toVisitStack.length > 0) {
      const current = toVisitStack.shift();
      // if not at a leaf, currDepth++
      if (current.left || current.right) currDepth++
      if (currDepth > maxDepth) maxDepth = currDepth

      // if find a branch, save depth of branch so we can reset currDepth
      if (current.left && current.right) branchDepth = currDepth;

      if (current.left) toVisitStack.push(current.left)
      if (current.right) toVisitStack.push(current.right)
      // if find leaf, set currDepth to what it was at last branch
      if (!current.left && !current.right) currDepth = branchDepth
    }
    return maxDepth
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  // traverse to the end, put all vals into an array, brute force solve
  // backup to nearest branch, cut off same amt of array values, solve again
  // solve with Kadane's algorithm

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let secondLowest = Infinity;
    if (!this.root) return null;

    const toVisitStack = [this.root];
    while (toVisitStack.length > 0) {
      const current = toVisitStack.pop();
      if (current.val > lowerBound && current.val < secondLowest) {
        secondLowest = current.val
      }

      if (current.left) toVisitStack.push(current.left)
      if (current.right) toVisitStack.push(current.right)
    }
    if (secondLowest === Infinity) return null
    return secondLowest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  // for each node find depth and parent
  // rootNode can't be cousin
  areCousins(node1, node2) {
    if (!this.root) return null;
    let currentDepth = 0;
    let branchDepth;
    let node1Depth = null;
    let node2Depth = null;
    let node1Parent = null;
    let node2Parent = null;

    const toVisitStack = [this.root];
    while (toVisitStack.length > 0) {
      currentDepth++
      const current = toVisitStack.pop();
      if (current.left && current.right) branchDepth = currentDepth
      // console.log('current', current.left.val)

      if (current.left) {
        if (current.left.val === node1.val) {
          console.log('test')
          node1Parent = current.val
          node1Depth = currentDepth
        }

        if (current.left.val === node2.val) {
          console.log('test')
          node2Parent = current.val
          node2Depth = currentDepth
        }
      }

      if (current.right) {
        if (current.right.val === node1.val) {
          console.log('test')
          node1Parent = current.val
          node1Depth = currentDepth
        }

        if (current.right.val === node2.val) {
          console.log('test')
          node2Parent = current.val
          node2Depth = currentDepth
        }
      }


      if (!current.left && !current.right) currentDepth = branchDepth - 1

      if (current.left) toVisitStack.push(current.left)
      if (current.right) toVisitStack.push(current.right)
    }
    console.log('n1 parent', node1Parent, 'n1 depth', node1Depth)
    console.log('n2 parent', node2Parent, 'n2 depth', node2Depth)

    if (!node1Parent || !node2Parent) return false
    if (node1Parent !== node1Parent && node1Depth === node2Depth) return true

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };

// let n7 = new BinaryTreeNode(7);
// let n6 = new BinaryTreeNode(6);
// let n5 = new BinaryTreeNode(5);
// let n4 = new BinaryTreeNode(4);
// let n3 = new BinaryTreeNode(3, n6, n7);
// let n2 = new BinaryTreeNode(2, n4, n5);
// let root = new BinaryTreeNode(1, n2, n3);
// let tree = new BinaryTree(root);