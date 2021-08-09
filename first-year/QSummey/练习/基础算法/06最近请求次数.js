var RecentCounter = function() {
    this.queue = [];
};


RecentCounter.prototype.ping = function(t) {
    this.queue.push(t);
    while(this.queue[0] < t-3000) {
        this.queue.shift();
    }
    return this.queue.length;
};

const r = new RecentCounter();
console.log(r.ping(1));
console.log(r.ping(100));
console.log(r.ping(3001));
console.log(r.ping(3002));