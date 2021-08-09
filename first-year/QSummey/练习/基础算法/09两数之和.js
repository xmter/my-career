const l1 = {
    val: 2,
    next: {
        val: 4,
        next: {
            val: 3,
            next: null
        }
    }
}
const l2 = {
    val: 5,
    next: {
        val: 7,
        next: {
            val: 9,
            next: null
        }
    }
}

function ListNode (val) {
    this.val = val;
    this.next = null;
}

function addTwoNumbers (l1, l2) {
    // 初始化l3
    const l3 = new ListNode(0);
    // 指针
    let p1 = l1;
    let p2 = l2;
    let p3 = l3;
    let carry = 0;
    while (p1 || p2) {
        const v1 = p1 ? p1.val : 0;
        const v2 = p2 ? p2.val : 0;
        let cur = v1 + v2 + carry;
        carry = Math.floor(cur / 10);

        p3.next = new ListNode( cur % 10);
        if (p1) p1 = p1.next;
        if (p2) p2 = p2.next;
        p3 = p3.next;
    }
    if (carry) {
        p3.next = new ListNode(carry);
    }
    return l3.next;
}

console.log(addTwoNumbers(l1,l2));