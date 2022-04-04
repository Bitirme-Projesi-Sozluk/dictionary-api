const cloudinary = require('cloudinary');

const cloudinaryUpload = (file) => {
  return new Promise((resolve, reject) => {

    console.log(file);

    cloudinary.v2.uploader.upload_stream({
      tags: "maltepe_img",
      resource_type: 'raw',
      public_id: 'maltepe',
    }, (error, result) => {
      if (error)
        reject(error);
      console.log(result);
      resolve(result);
    })
      .end(file.buffer);
  });
}

module.exports = {
  cloudinaryUpload
}