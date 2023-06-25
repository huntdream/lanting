interface Config {
  baseurl: string;
}

const isProd = process.env.NODE_ENV === 'production';

const config: Config = {
  baseurl: isProd
    ? 'https://api.maoyu.dev/api/v1'
    : 'http://localhost:4000/api/v1',
};

export default config;
