const { buildSchema } = require('graphql');
const download = require('download');
const uniqueFilename = require('unique-filename');

const openCv = require('./opencv/index.js');

module.exports.schema = buildSchema(`
type Face {
  x: Int,
  y: Int,
  width: Int,
  height: Int
}
type Image {
  faces: [Face!]
}
type Query {
  image(url: String!): Image
}
`);

class Image {
  constructor(url) {
    this.url = url;
  }

  async faces() {
    if (!this.downloadedFile) {
      await this.downloadFile(this.url);
    }
    const { objects, numDetections } = await openCv.detectFaces(this.downloadedFile);
    return objects;
  }

  async downloadFile(url) {
    const filename = uniqueFilename('');
    await download(url, 'tmp', { filename });
    this.downloadedFile = `tmp/${filename}`;
  }
}

module.exports.root = {
  image({ url }) {
    return new Image(url);
  },
};
