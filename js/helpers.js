export const uploadToCloudinary = async function (input) {
  const formData = new FormData();
  const file = input[0];
  const url = "https://api.cloudinary.com/v1_1/physpy/image/upload";
  console.log(file);
  formData.append("file", file);
  formData.append("upload_preset", "physpy");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const finished = await response.text();
  return JSON.parse(finished).url;
};
