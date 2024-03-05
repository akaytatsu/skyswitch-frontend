import { camelToSnake } from './format';

type Props = {
  url: string;
  params?: any;
};

export function urlTransform({ url, params }: Props): string {
  let urlWithParams = url;
  if (!params) return urlWithParams;
  Object.keys(params).forEach((key) => {
    urlWithParams = urlWithParams.replace(`{${key}}`, params[key]);
  });

  return urlWithParams;
}

export function toQueryString(data: any, disableSnakeCase?: boolean): string {
  if (!data) return '';
  return Object.keys(data)
    .filter((key) => data[key] !== undefined)
    .map((key) => {
      return `${key && !disableSnakeCase ? camelToSnake(key) : key}=${
        data[key]
      }`;
    })
    .join('&');
}

export function queryStringToJSON(qs?: string): any {
  if (!qs || typeof qs !== 'string') return {};
  qs = qs?.replace('?', '') || ''; // remove first char if it is a '?'
  const pairs = qs.split('&');
  const result = {} as any;
  pairs.forEach(function (p) {
    const pair = p.split('=');
    const key = pair[0];
    const value = decodeURIComponent(pair[1] || '');

    if (result[key]) {
      if (Object.prototype.toString.call(result[key]) === '[object Array]')
        result[key].push(value);
      else result[key] = [result[key], value];
    } else result[key] = value;
  });

  // clean empty keys
  Object.keys(result).forEach((key) => {
    if (result[key] === '') delete result[key];
  });

  return JSON.parse(JSON.stringify(result));
}
