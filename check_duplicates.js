// Script para verificar duplicados en las categorías de carreras
const fs = require('fs');
const path = require('path');

// Leer el archivo Universidades.tsx
const filePath = path.join(__dirname, 'project', 'src', 'components', 'Universidades.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Extraer el array categories usando expresión regular
const categoriesMatch = content.match(/const categories: Category\[\] = \[([\s\S]*?)\];/);
if (!categoriesMatch) {
    console.error('No se encontró el array categories');
    process.exit(1);
}

const categoriesContent = categoriesMatch[1];

// Evaluar el contenido del array (se hace de forma segura usando una función)
const evaluateCategories = new Function(`
    return [${categoriesContent}];
`);

const categories = evaluateCategories();

// Verificar duplicados en cada categoría
let hasDuplicates = false;
categories.forEach(category => {
    const careerSet = new Set();
    const duplicates = new Set();
    
    category.careers.forEach(career => {
        if (careerSet.has(career)) {
            duplicates.add(career);
            hasDuplicates = true;
        }
        careerSet.add(career);
    });
    
    if (duplicates.size > 0) {
        console.log(`\nCategoría: ${category.label} (${category.id})`);
        console.log('Carreras duplicadas:', Array.from(duplicates));
    }
});

if (hasDuplicates) {
    console.log('\nSe encontraron duplicados en las categorías.');
} else {
    console.log('\nNo se encontraron duplicados en las categorías.');
}

// Verificar que todas las carreras de las universidades estén en las categorías
console.log('\nVerificando que todas las carreras de las universidades estén en las categorías...');

// Leer el archivo data.ts para obtener las carreras de las universidades
const dataFilePath = path.join(__dirname, 'project', 'src', 'utils', 'data.ts');
const dataContent = fs.readFileSync(dataFilePath, 'utf8');

// Extraer el array universities
const universitiesMatch = dataContent.match(/export const universities: University\[\] = \[([\s\S]*?)\];/);
if (!universitiesMatch) {
    console.error('No se encontró el array universities');
    process.exit(1);
}

const universitiesContent = universitiesMatch[1];

// Evaluar el contenido del array universities
const evaluateUniversities = new Function(`
    return [${universitiesContent}];
`);

const universities = evaluateUniversities();

// Obtener todas las carreras de las universidades
const allUniversityCareers = new Set();
universities.forEach(university => {
    if (university.careers) {
        university.careers.forEach(career => {
            allUniversityCareers.add(career);
        });
    }
});

// Obtener todas las carreras de las categorías
const allCategoryCareers = new Set();
categories.forEach(category => {
    category.careers.forEach(career => {
        allCategoryCareers.add(career);
    });
});

// Verificar que todas las carreras de las universidades estén en las categorías
const missingCareers = [];
allUniversityCareers.forEach(career => {
    if (!allCategoryCareers.has(career)) {
        missingCareers.push(career);
    }
});

if (missingCareers.length > 0) {
    console.log('\nCarreras de universidades que no están en las categorías:');
    missingCareers.forEach(career => {
        console.log(`- ${career}`);
    });
} else {
    console.log('\nTodas las carreras de las universidades están en las categorías.');
}
