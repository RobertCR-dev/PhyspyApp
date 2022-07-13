const createPattients = function () {
  return [];
};

export const loadPattients = async function () {
  return JSON.parse(localStorage.getItem("pattients"));
};

const savePattients = async function (pattients) {
  return localStorage.setItem("pattients", JSON.stringify(pattients));
};

export const numberOfPages = function () {};
