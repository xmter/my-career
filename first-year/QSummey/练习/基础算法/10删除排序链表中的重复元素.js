const l1 = {
  val: 1,
  next: {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 3,
          next: {
            val: 3,
            next: {
              val: 3,
              next: null,
            },
          },
        },
      },
    },
  },
};

function deleteDuplicates(head) {
  let p1 = (p2 = head);
  while (p1) {
    if (p1.val !== p2.val) {
      p2 = p2.next;
      p2.val = p1.val;
      p2.next = p1.next;
    }
    p1 = p1.next;
  }
  p2.next = null;
  return head;
}

function deleteDuplicates(head) {
  let p1 = head;
  while (p1 && p1.next) {
    if (p1.val === p1.next.val) {
      p1.next = p1.next.next;
    } else {
      p1 = p1.next;
    }
  }
  return head;
}

console.log(deleteDuplicates(l1));
