/* eslint-disable import/prefer-default-export */
import md5 from 'md5';
import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:59701' });

export const insertToIndex = async (data) => {
  try {
    const result = await client.bulk({
      body: [
        { index: { _index: 'stocknews', _id: md5(data.title) } },
        { ...data }
      ]
    });
    console.log('result-------', result);
  } catch (err) {
    console.log('err---------', err);
  }
};
