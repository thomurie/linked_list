/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    this.length++;
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    this.length++;
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    newNode.next = this.head;
    this.head = newNode;
    return;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (!this.head || !this.tail) {
      return;
    }

    const removedNode = this.tail;

    let node = this.head;
    let count = 0;
    let active = true;

    while (active) {
      // list with one item
      if (this.length === 1) {
        active = false;
        this.head = null;
        this.tail = null;
        break;
      } else if ((count = this.length - 1)) {
        active = false;
        this.tail = node;
        break;
      } else {
        count++;
        node = node.next;
      }
    }
    this.length--;
    return removedNode.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head || !this.tail) {
      return;
    }

    const removedNode = this.head;

    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;

    return removedNode.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length - 1 || !this.head || !this.tail) {
      return;
    }

    let count = 0;
    let node = this.head;
    while (count !== idx) {
      count++;
      node = node.next;
    }
    return node.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1 || !this.head || !this.tail) {
      return;
    }

    let count = 0;
    let node = this.head;
    while (count !== idx) {
      count++;
      node = node.next;
    }
    node.val = val;
    return;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    let count = 0;
    let node = this.head;
    let active = true;
    // get to the index right before the idx
    while (active) {
      // empty linked list
      if (this.length === 0) {
        active = false;
        this.length++;
        this.head = newNode;
        this.tail = newNode;
        return node;
        // insert as first item
      } else if (idx === 0) {
        active = false;
        this.length++;
        this.head.next = newNode;
        this.head = newNode;
        return;
        // insert as last item
      } else if (this.length === idx) {
        active = false;
        this.length++;
        this.tail.next = newNode;
        this.tail = newNode;
        return;
        // insert anywhere else
      } else if (count === idx - 1) {
        active = false;
        this.length++;
        newNode.next = node.next;
        node.next = newNode;
        return;
        // keep moving forward
      } else {
        count++;
        node = node.next;
      }
    }
    return;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length - 1 || !this.head || !this.tail) {
      return;
    }

    let count = 0;
    let node = this.head;
    let active = true;
    // get to the node right before the node
    while (active) {
      if (this.length === 1) {
        active = false;
        this.length--;
        this.head = null;
        this.tail = null;
        return node;
      } else if (count === idx - 1 && node.next.next !== null) {
        active = false;
        this.length--;
        const nextNode = node.next.next;
        const removedNode = node.next;
        node.next = nextNode;
        return removedNode;
      } else if (count === idx - 1 && node.next.next === null) {
        active = false;
        this.length--;
        this.tail = node;
        const removedNode = node.next;
        node.next = null;
        return removedNode;
      } else {
        active = false;
        break;
      }
    }
    return;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.head || !this.tail) {
      return 0;
    }

    const values = [];
    let node = this.head;
    while (node.next !== null) {
      values.push(node.val);
      node = node.next;
    }
    values.push(node.val);
    let average = values.reduce((a, v) => {
      return a + v;
    });
    return average / values.length;
  }
}

module.exports = LinkedList;
