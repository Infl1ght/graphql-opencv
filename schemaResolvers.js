const { buildSchema } = require('graphql');
const download = require('download');
const uniqueFilename = require('unique-filename');

const openCv = require('./opencv/index.js');

module.exports.schema = buildSchema(`
type Image {
  facesNumber: Int!
}
type Query {
  image(url: String!): Image
}
`);

class Image {
  constructor(url) {
    this.url = url;
  }

  async facesNumber() {
    if (!this.downloadedFile) {
      await this.downloadFile(this.url);
    }
    const { numDetections } = await openCv.detectFaces(this.downloadedFile);
    return numDetections.length;
  }

  async downloadFile(url) {
    const filename = uniqueFilename('');
    await download(url, 'tmp', { filename });
    this.downloadedFile = 'tmp/' + filename;
  }
}

module.exports.root = {
  image({ url }) {
    return new Image(url);
  },
};
