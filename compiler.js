const fs = require('fs');
const { spawn } = require('child_process');

function readInputFile(inputFile) {
    try {
        const inputCode = fs.readFileSync(inputFile, 'utf8');
        return inputCode;
    } catch (err) {
        console.error(`Error reading input file: ${err}`);
        process.exit(1);
    }
}

function writeOutputFile(outputFile, generatedCode, callback) {
    try {
        fs.writeFileSync(outputFile, generatedCode);
        console.log(`Compilation successful. Output written to ${outputFile}`);
        callback(null);
    } catch (err) {
        console.error(`Error writing output file: ${err}`);
        process.exit(1);
    }
}

function transformCode(inputCode) {
    let transformedCode = inputCode.replace(/print/g, 'console.log');

    // Add range function definition
    const rangeFunction = `
function range(start, end, step = 1) {
    return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
}
`;

    // Add the range function at the beginning of the transformed code
    transformedCode = rangeFunction + transformedCode;

    transformedCode = transformedCode.replace(/for\s*\((.*?)\)\s*{/g, 'for ($1) {');

    transformedCode = transformedCode.replace(/else if\s*\((.*?)\)\s*\{/g, 'else if ($1) {');

    return transformedCode;
}

function compile(inputFile, outputFile) {
    // Read input code from file
    const inputCode = readInputFile(inputFile);

    // Transform the input code
    const transformedCode = transformCode(inputCode);

    // Write the transformed code to the output file
    writeOutputFile(outputFile, transformedCode, (err) => {
        if (!err) {
            // After writing output file, execute 'node outputFile'
            const childProcess = spawn('node', [outputFile]);
            childProcess.stdout.on('data', (data) => {
                console.log(`${data}`);
            });
            childProcess.stderr.on('data', (data) => {
                console.error(`Error from ${outputFile}: ${data}`);
            });
        }
    });
}

const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node compiler.js <inputFile> <outputFile>');
    process.exit(1);
}

const inputFile = args[0]; // First argument is the input file
const outputFile = args[1]; // Second argument is the output file

compile(inputFile, outputFile);