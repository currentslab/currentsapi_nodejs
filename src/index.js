'use strict';

const API_DOMAIN = 'https://api.currentsapi.services';
const ENDPOINTS = {
  latestNews: '/v1/latest-news',
  search: '/v1/search',
  availableLanguages: '/v1/available/languages',
  availableRegions: '/v1/available/regions',
  availableCategories: '/v1/available/categories',
};

class CurrentsAPIError extends Error {
  constructor(response) {
    super(response.message || 'Currents API error');
    this.name = 'CurrentsAPIError';
    this.code = response.code;
    this.response = response;
  }
}

class CurrentsAPI {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('No API key specified');
    }
    this.apiKey = apiKey;
  }

  async latestNews(params = {}) {
    const url = this._buildUrl(ENDPOINTS.latestNews, params);
    return this._request(url);
  }

  async search(params = {}) {
    const url = this._buildUrl(ENDPOINTS.search, params);
    return this._request(url);
  }

  async availableLanguages() {
    const url = `${API_DOMAIN}${ENDPOINTS.availableLanguages}`;
    return this._request(url);
  }

  async availableRegions() {
    const url = `${API_DOMAIN}${ENDPOINTS.availableRegions}`;
    return this._request(url);
  }

  async availableCategory() {
    const url = `${API_DOMAIN}${ENDPOINTS.availableCategories}`;
    return this._request(url);
  }

  _buildUrl(endpoint, params) {
    const url = new URL(endpoint, API_DOMAIN);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    }
    return url.toString();
  }

  async _request(url) {
    const response = await fetch(url, {
      headers: {
        Authorization: this.apiKey,
      },
    });

    const body = await response.json();

    if (!response.ok || body.status === 'error') {
      throw new CurrentsAPIError(body);
    }

    return body;
  }
}

module.exports = CurrentsAPI;
