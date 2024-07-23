import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
  vus: 2,
  duration: '60s',
};

const users = [
  {
    id: 100,
    portfolioId: 1234,
    orgId: 'gorila',
    name: 'Goku'
  },
  {
    id: 101,
    portfolioId: 123456,
    orgId: 'gorila',
    name: 'Hokage'
  },
  {
    id: 102,
    portfolioId: 1234562,
    orgId: 'gorila',
    name: 'Ichigo'
  },
  {
    id: 103,
    portfolioId: 70213,
    orgId: 'vita',
    name: 'Advisor João'
  },
  {
    id: 104,
    portfolioId: 672673,
    orgId: 'genial',
    name: 'Advisor XPTO'
  },
]

export default function () {
  const url = 'http://localhost:3000/migration';

  const user = randomItem(users);
  const payload = JSON.stringify(user);

  const params = {
      headers: {
          'Content-Type': 'application/json',
      },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1);
}