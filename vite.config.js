import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log('Vite run:', command);
  return {
    plugins: [
      createVuePlugin(),
      createSvgIconsPlugin({
        // 指定需要缓存的svg图标文件目录
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ].filter(Boolean),
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
      }
    }
  };
});
