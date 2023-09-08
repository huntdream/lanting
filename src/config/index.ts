interface Config {
  baseurl: string;
  yjs: string
}

const isProd = process.env.NODE_ENV === 'production';

const config: Config = {
  baseurl: isProd
    ? 'https://api.maoyu.info/api/v1'
    : 'http://localhost:4000/api/v1',
  yjs: isProd ? "ws://yjs.maoyu.info" : "ws://localhost:1234"
};

export default config;
