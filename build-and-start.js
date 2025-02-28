const { execSync } = require('child_process');

try {
    execSync('next build', { stdio: 'inherit' });
    execSync('next start', { stdio: 'inherit' });
} catch (error) {
    console.error('Ошибка при выполнении команд:', error);
}