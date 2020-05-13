import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  // 配置路由
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   }
  // ],
  // 是否使文件包含hash后缀，用户增量发布，避免浏览器缓存
  hash:true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umi',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  // 配置主题，实际配less变量
  // theme: {
  //   '@primary-color': '#1DA57A',
  // },
  // 配置需要兼容的浏览器最低版本
  targets: {
    ie: 9,
  },
  // 配置代理能力，访问/api/user相当于访问http://192.168.1.207:8040/user
  proxy: {
    '/api': {
      'target': 'http://192.168.1.207:8040',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
}

export default config;
