import { request, GaxiosError } from 'gaxios';
import { server } from '../src/server';
import * as assert from 'assert';

describe('generator server', () => {
  const baseUrl = 'http://localhost:8080';

  after(() => {
    server.close();
  });

  it('should resolve naked package name', async () => {
    const res = await request({
      url: `${baseUrl}/packages/request`,
    });
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.data, {
      name: 'request',
      version: 'latest',
    });
  });

  it('should resolve naked scoped package name', async () => {
    const res = await request({
      url: `${baseUrl}/packages/@google-cloud/storage`,
    });
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.data, {
      name: '@google-cloud/storage',
      version: 'latest',
    });
  });

  it('should resolve package name and version', async () => {
    const res = await request({
      url: `${baseUrl}/packages/request/4.3.2`,
    });
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.data, {
      name: 'request',
      version: '4.3.2',
    });
  });

  it('should resolve versioned scoped package name', async () => {
    const res = await request({
      url: `${baseUrl}/packages/@google-cloud/storage/1.2.3`,
    });
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.data, {
      name: '@google-cloud/storage',
      version: '1.2.3',
    });
  });

  it('should throw a 500 with a nonsense path', async () => {
    await assert.rejects(
      request({
        url: `${baseUrl}/packages/this/path/is/actually/nonsense`,
      }),
      (err: GaxiosError) => {
        assert.strictEqual(err.response!.status, 500);
        return true;
      }
    );
  });
});
