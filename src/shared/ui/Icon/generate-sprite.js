#!/usr/bin/env node

/**
 * Icon Sprite Generation Script
 *
 * Thin wrapper around the sprite generation library.
 * Generates sprite and TypeScript types for icon names.
 *
 * Usage: yarn icons:generate
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { generateSpriteData, generateTypesFile } from './lib/sprite-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, 'assets');
const TYPES_OUTPUT = path.join(__dirname, 'icon-names.ts');

/**
 * Main execution
 */
function main() {
  console.log('🎨 Generating SVG sprite...\n');

  // Generate sprite data and types
  const { sprite, iconNames } = generateSpriteData(ICONS_DIR);

  if (iconNames.length === 0) {
    console.log('⚠️  No icons found. Exiting.\n');
    process.exit(0);
  }

  console.log(`📁 Found ${iconNames.length} icon(s):\n`);
  iconNames.forEach((name) => console.log(`   ✅ ${name}`));

  // Generate TypeScript types
  generateTypesFile(iconNames, TYPES_OUTPUT);
  console.log(`\n✨ Types generated: ${path.relative(process.cwd(), TYPES_OUTPUT)}`);

  console.log(`\n💡 Note: The sprite will be automatically generated during build.`);
  console.log(`   - Development: Sprite served at /sprite.svg`);
  console.log(`   - Production: Sprite bundled with content hash\n`);
  console.log(`🎉 Successfully generated types for ${iconNames.length} icon(s)!\n`);
}

// Run the generator
try {
  main();
} catch (error) {
  console.error('\n❌ Error generating sprite:', error.message);
  process.exit(1);
}
