const fs = require('fs');
const path = require('path');

console.log('=== Verificación de estructura de despliegue ===');

// Verificar estructura del backend
const backendPath = path.join(__dirname, 'backend');
const projectPath = path.join(__dirname, 'project');

console.log('\n📁 Estructura del backend:');
if (fs.existsSync(backendPath)) {
  const backendFiles = fs.readdirSync(backendPath);
  console.log(backendFiles.sort().join(', '));
} else {
  console.log('Backend directory not found');
}

console.log('\n📁 Estructura del frontend:');
if (fs.existsSync(projectPath)) {
  const projectFiles = fs.readdirSync(projectPath);
  console.log(projectFiles.sort().join(', '));
} else {
  console.log('Project directory not found');
}

// Verificar archivos importantes
console.log('\n🔍 Verificación de archivos importantes:');

const importantFiles = [
  { name: '.env (backend)', path: path.join(backendPath, '.env') },
  { name: 'server.js', path: path.join(backendPath, 'server.js') },
  { name: 'db.js', path: path.join(backendPath, 'db.js') },
  { name: 'package.json (backend)', path: path.join(backendPath, 'package.json') },
  { name: 'package.json (frontend)', path: path.join(projectPath, 'package.json') },
  { name: 'vite.config.js', path: path.join(projectPath, 'vite.config.js') },
  { name: '.htaccess', path: path.join(projectPath, 'public', '.htaccess') }
];

importantFiles.forEach(file => {
  if (fs.existsSync(file.path)) {
    console.log(`✅ ${file.name} - encontrado`);
  } else {
    console.log(`❌ ${file.name} - NO encontrado`);
  }
});

// Verificar scripts de despliegue
console.log('\n📋 Scripts de despliegue en package.json (backend):');
const backendPackagePath = path.join(backendPath, 'package.json');
if (fs.existsSync(backendPackagePath)) {
  const backendPackage = JSON.parse(fs.readFileSync(backendPackagePath, 'utf8'));
  console.log('Scripts:', backendPackage.scripts);
}

console.log('\n📋 Scripts de despliegue en package.json (frontend):');
const frontendPackagePath = path.join(projectPath, 'package.json');
if (fs.existsSync(frontendPackagePath)) {
  const frontendPackage = JSON.parse(fs.readFileSync(frontendPackagePath, 'utf8'));
  console.log('Scripts:', frontendPackage.scripts);
}

// Verificar configuración del backend
console.log('\n⚙️  Configuración del backend:');
const serverJsPath = path.join(backendPath, 'server.js');
if (fs.existsSync(serverJsPath)) {
  const serverContent = fs.readFileSync(serverJsPath, 'utf8');
  const portMatch = serverContent.match(/PORT\s*=\s*process\.env\.PORT\s*\|\|\s*(\d+)/);
  const hostMatch = serverContent.match(/app\.listen\(.*,\s*['"]([^'"]+)['"]/);
  
  console.log('Puerto por defecto:', portMatch ? portMatch[1] : 'No encontrado');
  console.log('Host configurado:', hostMatch ? hostMatch[1] : 'No encontrado');
}

console.log('\n=== Fin de la verificación ===');