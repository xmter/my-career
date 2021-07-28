const buf = Buffer.from('everybody晚上好', 'UTF-8');
console.log(buf);
console.log(buf.length);
console.log(buf.toString('UTF-8', 0, 12));
