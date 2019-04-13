const Promise = require('bluebird');
const axios = require('axios');
const { config } = require('./config');

let axiosInstance = axios.create({
  baseURL: config.github_api_base_url,
  headers: {
    Accept: 'application/vnd.github.symmetra-preview+json',
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  responseType: 'json'
});

class ApiClient {
  constructor(token) {
    if (token) this.attachToken(token);
  }

  attachToken(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `token ${token}`;
  }

  async getLabels(user, repo) {
    const endpoint = `/repos/${user}/${repo}/labels`;
    try {
      const result = await axiosInstance.get(endpoint);
      return result.data;
    } catch (err) {
      return err.response.data;
    }
  }

  createLabel(repo, label) {
    return new Promise((resolve, reject) => {
      const endpoint = `/repos/${repo}/labels`;
      this.apiClient.post(endpoint, label, (error, status, createdLabel) => {
        if (error) {
          error.method = 'POST';
          error.endpoint = endpoint;
          return reject(error);
        }
        if (status !== 201) {
          return reject(new Error(`API responded with ${status} status`));
        }
        resolve(createdLabel);
      });
    });
  }

  updateLabel(repo, labelName, label) {
    labelName = encodeURIComponent(labelName);
    return new Promise((resolve, reject) => {
      const endpoint = `/repos/${repo}/labels/${labelName}`;
      this.apiClient.patch(endpoint, label, (error, status, updatedLabel) => {
        if (error) {
          error.method = 'PATCH';
          error.endpoint = endpoint;
          return reject(error);
        }
        if (status !== 200) {
          return reject(new Error(`API responded with ${status} status`));
        }
        resolve(updatedLabel);
      });
    });
  }

  deleteLabel(repo, labelName) {
    labelName = encodeURIComponent(labelName);
    return new Promise((resolve, reject) => {
      const endpoint = `/repos/${repo}/labels/${labelName}`;
      this.apiClient.del(endpoint, {}, (error, status) => {
        if (error) {
          error.method = 'DELETE';
          error.endpoint = endpoint;
          return reject(error);
        }
        if (status !== 204) {
          return reject(new Error(`API responded with ${status} status`));
        }
        resolve();
      });
    });
  }
}

function createApiClient() {
  return new ApiClient(process.env.GITHUB_ACCESS_TOKEN);
}

module.exports = createApiClient;
