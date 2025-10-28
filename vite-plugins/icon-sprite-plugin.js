/**
 * Vite Plugin: Icon Sprite Generator
 *
 * This plugin generates an SVG sprite from individual icon files and injects it
 * inline into the HTML during build process.
 * - Generates sprite at build time
 * - Injects sprite inline into HTML (no separate file)
 * - Serves sprite on-the-fly in dev mode
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { generateSpriteData, generateTypesFile } from '../src/shared/ui/Icon/lib/sprite-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function iconSpritePlugin(options = {}) {
  const iconsDir = options.iconsDir || path.join(process.cwd(), 'src/shared/ui/Icon/assets');
  const typesOutput = options.typesOutput || path.join(process.cwd(), 'src/shared/ui/Icon/icon-names.ts');

  let spriteData = null;

  return {
    name: 'vite-plugin-icon-sprite',

    buildStart() {
      // Generate sprite data and types
      spriteData = generateSpriteData(iconsDir);

      if (spriteData.iconNames.length > 0) {
        generateTypesFile(spriteData.iconNames, typesOutput);
        console.log(`🎨 Icon sprite: Generated types for ${spriteData.iconNames.length} icon(s)`);
      }
    },

    transformIndexHtml(html) {
      // Inject sprite inline into HTML
      if (!spriteData || !spriteData.sprite) {
        return html;
      }

      // Insert sprite at the beginning of body tag
      const injectedHtml = html.replace(
        '<body>',
        `<body>\n    ${spriteData.sprite}`
      );

      console.log(`✨ Icon sprite: Injected inline sprite (${spriteData.iconNames.length} icons)`);
      return injectedHtml;
    },

    configureServer(server) {
      // In dev mode, serve the sprite from public folder or generate on-the-fly
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sprite.svg') {
          if (!spriteData) {
            spriteData = generateSpriteData(iconsDir);
          }

          if (spriteData.sprite) {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(spriteData.sprite);
            return;
          }
        }
        next();
      });

      // Watch icon assets for changes
      server.watcher.add(iconsDir);
      server.watcher.on('change', (file) => {
        if (file.startsWith(iconsDir) && file.endsWith('.svg')) {
          console.log(`🔄 Icon changed: ${path.basename(file)}`);
          spriteData = generateSpriteData(iconsDir);
          generateTypesFile(spriteData.iconNames, typesOutput);

          // Trigger HMR
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      });
    },
  };
}
