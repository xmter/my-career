const buf = Buffer.from([0,5]);

console.log(buf.readInt16BE(0));

console.log(buf.readInt16LE(0))