const cv = require('opencv4nodejs');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

exports.detectFaces = async (imageFile) => {
  const img = await cv.imreadAsync(imageFile);
  const grayImg = await img.bgrToGrayAsync();
  const { objects, numDetections } = await classifier.detectMultiScaleAsync(grayImg);
  return { objects, numDetections };
};
