const path = require('path');
const assert = require('assert');
const openCv = require('./../index.js');

describe('OpenCV4Node test', () => {
  it('Detect one face', async function detectFaces() {
    const file = path.join(__dirname, './data/face.jpg');
    this.timeout(5000);
    const { numDetections } = await openCv.detectFaces(file);
    assert.deepEqual(numDetections.length, 1);
  });
});
