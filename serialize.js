function serialize(nums) {
    let binStr = nums.map(num => num.toString(2).padStart(9, '0')).join('');

    const paddingLength = (8 - binStr.length % 8) % 8;
    binStr = binStr.padEnd(binStr.length + paddingLength, '0');

    const byteArray = [];
    for (let i = 0; i < binStr.length; i += 8) {
        byteArray.push(parseInt(binStr.slice(i, i + 8), 2));
    }

    const base64String = btoa(String.fromCharCode(...byteArray));
    return base64String;
}

function deserialize(base64String) {
    const byteArray = atob(base64String).split('').map(char => char.charCodeAt(0));

    let binStr = byteArray.map(byte => byte.toString(2).padStart(8, '0')).join('');

    const nums = [];
    for (let i = 0; i < binStr.length; i += 9) {
        const num = parseInt(binStr.slice(i, i + 9), 2);
        if (num > 0) {
            nums.push(num);
        }
    }

    return nums;
}

const tests = [
    { input: [1, 2, 3, 4, 5], label: "Short sequence" },
    { input: Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1), label: "Random 50 numbers" },
    { input: Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1), label: "Random 100 numbers" },
    { input: Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1), label: "Random 500 numbers" },
    { input: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1), label: "Random 1000 numbers" },
    { input: Array.from({ length: 900 }, (_, i) => (i % 3) + 1), label: "Boundary: repeated numbers" },
];

tests.forEach(test => {
    const serialized = serialize(test.input);
    const deserialized = deserialize(serialized);
    const compressionRatio = (test.input.join(',').length / serialized.length).toFixed(2);

    console.log(`${test.label}:`);
    console.log(`Original: ${test.input}`);
    console.log(`Serialized: ${serialized}`);
    console.log(`Deserialized: ${deserialized}`);
    console.log(`Compression Ratio: ${compressionRatio}`);
    console.log('');
});
