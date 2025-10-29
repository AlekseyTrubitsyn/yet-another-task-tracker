/**
 * Icon Sprite Generator Library
 *
 * Shared logic for generating SVG sprites from individual icon files.
 * Used by both the Vite plugin and the standalone generation script.
 */

import fs from 'fs';
import path from 'path';

/**
 * Extract SVG content without the wrapper tags
 */
export function extractSvgContent(svgString, filename) {
  // Remove XML declaration
  svgString = svgString.replace(/<\?xml[^>]*\?>/g, '');

  // Extract viewBox from the SVG tag
  const viewBoxMatch = svgString.match(/viewBox="([^"]*)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Extract content between <svg> tags
  const contentMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!contentMatch) {
    console.warn(`⚠️  Could not extract content from ${filename}`);
    return { content: '', viewBox };
  }

  let content = contentMatch[1].trim();

  return { content, viewBox };
}

/**
 * Generate SVG sprite content and icon names from icon files
 * @param {string} iconsDir - Path to directory containing SVG icon files
 * @returns {{ sprite: string, iconNames: string[] }} Generated sprite and icon names
 */
export function generateSpriteData(iconsDir) {
  // Check if icons directory exists
  if (!fs.existsSync(iconsDir)) {
    console.error(`❌ Icons directory not found: ${iconsDir}`);
    return { sprite: '', iconNames: [] };
  }

  // Read all SVG files
  const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'));

  if (files.length === 0) {
    console.warn('⚠️  No SVG files found in icons directory');
    return { sprite: '', iconNames: [] };
  }

  const symbols = [];
  const iconNames = [];

  files.forEach((file) => {
    const iconName = path.basename(file, '.svg');
    const filePath = path.join(iconsDir, file);
    const svgContent = fs.readFileSync(filePath, 'utf-8');

    const { content, viewBox } = extractSvgContent(svgContent, file);

    if (content) {
      symbols.push(`
        <symbol id="icon-${iconName}" viewBox="${viewBox}" fill="none">
          ${content.split('\n').map((line) => '    ' + line).join('\n')}
        </symbol>
      `);

      iconNames.push(iconName);
    }
  });

  // Generate sprite SVG
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${symbols.join('\n')}
</svg>`;

  return { sprite, iconNames };
}

/**
 * Generate TypeScript types file for icon names
 * @param {string[]} iconNames - Array of icon names
 * @param {string} typesOutput - Path to output TypeScript file
 */
export function generateTypesFile(iconNames, typesOutput) {
  const typesContent = `// Auto-generated file - do not edit manually
// Run 'yarn icons:generate' to update

export type IconName =
${iconNames.map((name) => `  | '${name}'`).join('\n')};

export const ICON_NAMES = [
${iconNames.map((name) => `  '${name}',`).join('\n')}
] as const;
`;

  fs.writeFileSync(typesOutput, typesContent, 'utf-8');
}
