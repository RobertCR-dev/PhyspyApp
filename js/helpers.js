export const uploadToCloudinary = async function (files) {
  return new Promise(function (res, err) {
    const formData = new FormData();
    const url = "https://api.cloudinary.com/v1_1/physpy/image/upload";
    let src = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "physpy");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          src.push(JSON.parse(data).url);
          if (i + 1 === files.length) {
            res(src);
          }
        });
    }
  });
};
