function reverseList(head) {
    let p1 = head;
    let p2 = null;
    while(p1) {
        const temp = p1.next;
        p1.next = p2;
        p2 = p1;
        p1 = temp;
    }
}