interface Config {
  baseurl: string;
  yjs: string;
  storage: string;
}

const prodConfig: Config = {
  baseurl: 'https://api.maoyu.space/api/v1',
  yjs: 'wss://yjs.maoyu.space',
  storage: 'https://storage.maoyu.space',
};

const devConfig: Config = {
  baseurl: 'http://localhost:4000/api/v1',
  yjs: 'ws://localhost:1234',
  storage: 'https://storage.maoyu.space',
};

const isProd = process.env.NODE_ENV === 'production';

const config: Config = isProd ? prodConfig : devConfig;

export default config;
