const pattients = JSON.parse(localStorage.getItem("pattients")) ?? [];

export const state = {
  allPattients: pattients,
  pattient: this.pattients,
  active: "",
  pages: "",
};

export const generatePattient = function (
  name,
  date,
  gender,
  number,
  email,
  reason,
  description,
  randomSrc
) {
  pattients.unshift({
    name: name,
    date: date,
    gender: gender,
    number: number,
    email: email,
    reason: reason,
    description: description,
    imgSrc: randomSrc,
  });
  updateLocal();
};

const updateLocal = function () {
  localStorage.setItem("pattients", JSON.stringify(pattients));
};

export const seedPattients = function (num) {
  const firstNames = [
    "James",
    "Robert",
    "John",
    "Michael",
    "David",
    "William",
    "Richard",
    "Joseph",
    "Thomas",
    "Charles",
    "Mary",
    "Patricia",
    "Jennifer",
    "Linda",
    "Elizabeth",
    "Barbara",
    "Susan",
    "Jessica",
    "Sarah",
    "Karen",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzales",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ];

  const imgSrc = [
    "https://res.cloudinary.com/physpy/image/upload/v1658245152/PhyspyApp/retrato1_yzbzow.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245152/PhyspyApp/retrato2_r8eex7.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245152/PhyspyApp/retrato3_qkc7uk.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245151/PhyspyApp/retrato4_qikash.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245151/PhyspyApp/retrato5_r1j3e2.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245151/PhyspyApp/retrato6_l0zix8.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245152/PhyspyApp/retrato7_tzz8fx.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245152/PhyspyApp/retrato8_bkqs7f.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245152/PhyspyApp/retrato9_pb2ujg.jpg",
    "https://res.cloudinary.com/physpy/image/upload/v1658245152/PhyspyApp/retrato10_uuod1t.jpg",
  ];

  for (let i = 0; i < num; i++) {
    let randomFirstName = Math.floor(Math.random() * 19 + 1);
    let randomLastName = Math.floor(Math.random() * 19 + 1);
    let name = firstNames[randomFirstName] + lastNames[randomLastName];
    let description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    let randomSrc;
    let date = new Date(
      Math.floor(
        Math.random() * (30 * 365 * 24 * 60 * 60 * 1000) +
          10 * 365 * 24 * 60 * 60 * 1000
      )
    );
    let gender;
    let reason = "Lorem ipsum";
    let email = +randomFirstName + "@mail.com";
    let number = "+1" + Math.floor(Math.random() * 999999999 + 1);

    if (randomFirstName < 10) {
      randomSrc = imgSrc[Math.floor(Math.random() * 5 + 1)];
      gender = "male";
    }
    if (randomFirstName >= 10) {
      randomSrc = imgSrc[Math.floor(Math.random() * 5 + 6)];
      gender = "female";
    }

    generatePattient(
      name,
      date,
      gender,
      number,
      email,
      reason,
      description,
      randomSrc
    );
  }
};
