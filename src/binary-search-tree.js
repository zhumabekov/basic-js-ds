const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this._addNode(this.rootNode, newNode);
    }
  }
  _addNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._addNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this._hasNode(this.rootNode, data);
  }
  _hasNode(node, data) {
    if (node === null) {
      return false;
    }

    if (data < node.value) {
      return this._hasNode(node.left, data);
    } else if (data > node.value) {
      return this._hasNode(node.right, data);
    } else {
      return true;
    }
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }
  _findNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.value) {
      return this._findNode(node.left, data);
    } else if (data > node.value) {
      return this._findNode(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }
  _removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.value) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.value) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      const minRightNode = this._findMinNode(node.right);
      node.value = minRightNode.value;
      node.right = this._removeNode(node.right, minRightNode.value);
      return node;
    }
  }

  min() {
    return this._findMinNode(this.rootNode);
  }
  _findMinNode(node) {
    if (node === null) {
      return null;
    }

    while (node.left !== null) {
      node = node.left;
    }

    return node;
  }

  max() {
    return this._findMaxNode(this.rootNode);
  }
  _findMaxNode(node) {
    if (node === null) {
      return null;
    }

    while (node.right !== null) {
      node = node.right;
    }

    return node;
  }
}

module.exports = {
  BinarySearchTree
};