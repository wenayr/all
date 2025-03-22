const fs = require('fs');
const path = require('path');

// Конфигурация
const LIBRARY_NAME = 'wenay-common';     // Название библиотеки для обновления
const TARGET_VERSION = "^1.0.223";  // Целевая версия
const ROOT_DIR = process.cwd();    // Стартовая директория (текущая)

// Главная функция
async function updateDependencies() {
    try {
        await processDirectory(ROOT_DIR);
        console.log('\x1b[32m%s\x1b[0m', '✓ Обновление завершено!');
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', '✖ Ошибка:', error.message);
    }
}

// Рекурсивный обход директорий
async function processDirectory(dirPath) {
    const files = await fs.promises.readdir(dirPath);
    console.log(dirPath)
    for (const file of files) {
        if (file === 'node_modules') continue; // Пропускаем node_modules

        const fullPath = path.join(dirPath, file);
        const stat = await fs.promises.stat(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file === 'package.json') {
            await updatePackageJson(fullPath);
        }
    }
}

// Обновление конкретного package.json
async function updatePackageJson(filePath) {
    const content = await fs.promises.readFile(filePath, 'utf8');
    const pkg = JSON.parse(content);
    let updated = false;

    // Проверяем все возможные секции зависимостей
    const sections = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

    for (const section of sections) {
        if (pkg[section]?.[LIBRARY_NAME]) {
            if (pkg[section][LIBRARY_NAME] !== TARGET_VERSION) {
                pkg[section][LIBRARY_NAME] = TARGET_VERSION;
                updated = true;
            }
        }
    }

    if (updated) {
        await fs.promises.writeFile(
            filePath,
            JSON.stringify(pkg, null, 2) + '\n' // Сохраняем форматирование
        );
        console.log(`Обновлено в: ${path.relative(ROOT_DIR, filePath)}`);
    }
}

// Запуск скрипта
updateDependencies();