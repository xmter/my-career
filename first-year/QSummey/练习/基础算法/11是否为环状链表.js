const l1 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: {
                    val: 5
                }
            },
        },
    },
};


l1.next.next.next.next.next = l1.next;


const l3 = {
    val: 5,
    next: {
        val: 7,
        next: {
            val: 9,
            next: null
        }
    }
}


// 环形：快的和慢一定会相遇

// 方式1
function isCircularList(head) {
    let slow = head;
    let faster = head.next;
    while(faster && slow !== faster ){
        faster = faster.next.next;
        slow = slow.next;
    }
    if (slow === faster) {
        return true;
    }
    return false;
}

// 方式2
function isCircularList(head) {
    let slow = faster = head;
    while(slow && faster && faster.next){
        faster = faster.next.next;
        slow = slow.next;
        if(faster === slow) {
            return true;
        }
    }
    return false;
}

console.log(isCircularList(l3))