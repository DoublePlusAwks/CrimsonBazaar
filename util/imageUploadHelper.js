import { s3 } from 'config/aws';

const convertToByteArray = (input) => {
  var binary_string = this.atob(input);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes
}

const atob = (input) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  let str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 == 1) {
    throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (let bc = 0, bs = 0, buffer, i = 0;
    buffer = str.charAt(i++);

    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
}

const uploadAsByteArray = async (byteArray, key, successCallback) => {
  s3.upload({
    Key: `items/${key}.jpg`,
    Body: byteArray,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo');
    }
    successCallback();
  });
}

export const uploadImage = async (image, key, successCallback) => {
  if (image) {
    uploadAsByteArray(convertToByteArray(image.base64), key, successCallback);
  } else {
    successCallback();
  }
}
