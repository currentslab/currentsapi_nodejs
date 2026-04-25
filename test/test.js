'use strict';

const assert = require('assert');
const CurrentsAPI = require('../src/index');

describe('CurrentsAPI', function () {
  describe('constructor', function () {
    it('should throw when no API key is provided', function () {
      assert.throws(() => new CurrentsAPI(), /No API key specified/);
      assert.throws(() => new CurrentsAPI(null), /No API key specified/);
      assert.throws(() => new CurrentsAPI(''), /No API key specified/);
    });

    it('should store the API key on the instance', function () {
      const api = new CurrentsAPI('secret');
      assert.strictEqual(api.apiKey, 'secret');
    });

    it('should not share API key across instances', function () {
      const api1 = new CurrentsAPI('key1');
      const api2 = new CurrentsAPI('key2');
      assert.strictEqual(api1.apiKey, 'key1');
      assert.strictEqual(api2.apiKey, 'key2');
    });
  });

  describe('latestNews', function () {
    it('should request /v1/latest-news with language param', async function () {
      const api = new CurrentsAPI('test_key');
      let calledUrl;
      global.fetch = async (url, options) => {
        calledUrl = url;
        assert.strictEqual(options.headers.Authorization, 'test_key');
        return {
          ok: true,
          json: async () => ({ status: 'ok', news: [] }),
        };
      };

      const res = await api.latestNews({ language: 'en' });
      assert.strictEqual(res.status, 'ok');
      assert(calledUrl.includes('/v1/latest-news'));
      assert(calledUrl.includes('language=en'));
    });

    it('should request /v1/latest-news without params', async function () {
      const api = new CurrentsAPI('test_key');
      let calledUrl;
      global.fetch = async (url, options) => {
        calledUrl = url;
        return {
          ok: true,
          json: async () => ({ status: 'ok', news: [] }),
        };
      };

      await api.latestNews();
      assert(calledUrl.includes('/v1/latest-news'));
    });
  });

  describe('search', function () {
    it('should build correct query string for documented params', async function () {
      const api = new CurrentsAPI('test_key');
      let calledUrl;
      global.fetch = async (url, options) => {
        calledUrl = url;
        return {
          ok: true,
          json: async () => ({ status: 'ok', news: [] }),
        };
      };

      await api.search({ keywords: 'OpenAI', language: 'en', country: 'US', category: 'technology' });
      assert(calledUrl.includes('/v1/search'));
      assert(calledUrl.includes('keywords=OpenAI'));
      assert(calledUrl.includes('language=en'));
      assert(calledUrl.includes('country=US'));
      assert(calledUrl.includes('category=technology'));
    });
  });

  describe('available endpoints', function () {
    it('availableLanguages should hit /v1/available/languages', async function () {
      const api = new CurrentsAPI('test_key');
      let calledUrl;
      global.fetch = async (url) => {
        calledUrl = url;
        return { ok: true, json: async () => ({ languages: [] }) };
      };
      await api.availableLanguages();
      assert(calledUrl.includes('/v1/available/languages'));
    });

    it('availableRegions should hit /v1/available/regions', async function () {
      const api = new CurrentsAPI('test_key');
      let calledUrl;
      global.fetch = async (url) => {
        calledUrl = url;
        return { ok: true, json: async () => ({ regions: [] }) };
      };
      await api.availableRegions();
      assert(calledUrl.includes('/v1/available/regions'));
    });

    it('availableCategory should hit /v1/available/categories', async function () {
      const api = new CurrentsAPI('test_key');
      let calledUrl;
      global.fetch = async (url) => {
        calledUrl = url;
        return { ok: true, json: async () => ({ categories: [] }) };
      };
      await api.availableCategory();
      assert(calledUrl.includes('/v1/available/categories'));
    });
  });

  describe('error handling', function () {
    it('should throw CurrentsAPIError on API error response', async function () {
      const api = new CurrentsAPI('test_key');
      global.fetch = async () => ({
        ok: true,
        json: async () => ({ status: 'error', code: 'Unauthorized', message: 'Bad key' }),
      });

      try {
        await api.latestNews();
        assert.fail('Expected error to be thrown');
      } catch (err) {
        assert.strictEqual(err.name, 'CurrentsAPIError');
        assert.strictEqual(err.code, 'Unauthorized');
      }
    });

    it('should throw CurrentsAPIError on HTTP error status', async function () {
      const api = new CurrentsAPI('test_key');
      global.fetch = async () => ({
        ok: false,
        status: 500,
        json: async () => ({ status: 'error', code: 'InternalError', message: 'Oops' }),
      });

      try {
        await api.latestNews();
        assert.fail('Expected error to be thrown');
      } catch (err) {
        assert.strictEqual(err.name, 'CurrentsAPIError');
        assert.strictEqual(err.code, 'InternalError');
      }
    });
  });
});
