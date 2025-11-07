import chalk from 'chalk';

/**
 * Muestra un cuadro con título y campos formateados en consola
 * @param {string} title - Título del cuadro
 * @param {Array<{label: string, value: string}>} fields - Campos a mostrar
 */
export function printBox(title, fields) {
  // Calcular longitud máxima
  const maxLabel = Math.max(...fields.map(f => f.label.length));
  const maxValue = Math.max(...fields.map(f => f.value.length));
  const width = Math.max(maxLabel + maxValue + 6, title.length + 4);

  // Función auxiliar para formatear filas
  const line = (label, value = '') =>
    ` ${label.padEnd(maxLabel)} : ${value.padEnd(maxValue)} `;

  // Bordes
  const top = `╔${'═'.repeat(width)}╗`;
  const mid = `╠${'═'.repeat(width)}╣`;
  const bottom = `╚${'═'.repeat(width)}╝`;

  console.log('\n' + chalk.cyan(top));
  console.log(chalk.cyan('║') + chalk.bold(line(title).padEnd(width)) + chalk.cyan('║'));
  console.log(chalk.cyan(mid));
  fields.forEach(f => {
    console.log(chalk.cyan('║') + chalk.green(line(f.label, f.value)) + chalk.cyan('║'));
  });
  console.log(chalk.cyan(bottom) + '\n');
}
