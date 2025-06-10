const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  console.log('Building Tailwind CSS...');
  
  // Ensure directories exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  if (!fs.existsSync('src')) {
    fs.mkdirSync('src');
  }
  
  // Check if index.css exists
  if (!fs.existsSync('src/index.css')) {
    const content = '@tailwind base;\n@tailwind components;\n@tailwind utilities;';
    fs.writeFileSync('src/index.css', content);
    console.log('Created src/index.css');
  }
  
  // Run tailwind using relative paths
  execSync('node_modules/.bin/tailwindcss -i ./src/index.css -o ./dist/output.css', { stdio: 'inherit' });
  
  console.log('Tailwind CSS built successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
} 