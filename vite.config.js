import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 引入 React 插件
import path from 'path';

export default defineConfig({
    // root: path.resolve(__dirname, "."), // 通常不需要显式设置 root

    plugins: [react()], // 使用 React 插件

    server: {
        port: 8080, // 开发服务器端口
        open: true, // 自动打开浏览器
    },

    build: {
        outDir: 'dist', // 打包输出目录
        emptyOutDir: true, // 打包前清空输出目录
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // 设置路径别名（可选）
        },
    },
});