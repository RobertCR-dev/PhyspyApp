export let patients = [];

export const state = {
  activePatients: [],
  activeA: null,
  activeB: 0,
  activeC: 0,
  pageA: 1,
  pageB: 1,
};

export const queryPatients = function (query) {
  state.activePatients = [];
  if (query === "") {
    state.activePatients = [...patients];
    return;
  }
  patients.forEach((e) => {
    if (e.name.toLowerCase().includes(query.toLowerCase()))
      state.activePatients.unshift(e);
  });
};

export const generatePatient = function (
  name,
  birthDay,
  gender,
  number,
  email,
  reason,
  description,
  src
) {
  const id = Math.random().toString(36).substr(2, 8);
  patients.unshift({
    name: name,
    birthDay: birthDay,
    gender: gender,
    number: number,
    email: email,
    reason: reason,
    description: description,
    imgSrc: src,
    appointments: [],
    id: id,
    createdIn: new Date(),
  });

  updateLocal();
  return id;
};

export const editPatient = function (...updatedData) {
  console.log(updatedData);
  const index = patients.indexOf(state.activeA);
  patients[index].name = updatedData[0];
  patients[index].birthDay = updatedData[1];
  patients[index].gender = updatedData[2];
  patients[index].number = updatedData[3];
  patients[index].email = updatedData[4];
  patients[index].reason = updatedData[5];
  patients[index].description = updatedData[6];
  patients[index].imgSrc = updatedData[7];
  updateLocal();
  console.log(state.activeA);
};

export const addAppointment = function (data) {
  state.activeA.appointments.unshift({
    date: data[0],
    condition: data[1],
    prescription: data[2],
    comments: data[3],
    files: data[4],
  });
  updateLocal();
};

export const removePatient = function () {
  const index = patients.indexOf(state.activeA);
  patients.splice(index, 1);
  updateLocal();
};

const updateLocal = function () {
  console.log(patients);
  localStorage.setItem("patients", JSON.stringify(patients));
};

const seedPatients = function (num) {
  const patients = [];
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
    let name = firstNames[randomFirstName] + " " + lastNames[randomLastName];
    let birthDay = new Date(
      Math.floor(
        Math.random() * (30 * 365 * 24 * 60 * 60 * 1000) +
          10 * 365 * 24 * 60 * 60 * 1000
      )
    );
    let description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    let randomSrc;
    let gender;
    let reason = "Lorem ipsum";
    let email = (
      firstNames[randomFirstName].slice(0, 1) +
      lastNames[randomLastName] +
      "@mail.com"
    ).toLowerCase();
    let number = "+1" + Math.floor(Math.random() * 999999999 + 1);

    if (randomFirstName < 10) {
      randomSrc = imgSrc[Math.floor(Math.random() * 5)];
      gender = "male";
    }
    if (randomFirstName >= 10) {
      randomSrc = imgSrc[Math.floor(Math.random() * 5 + 5)];
      gender = "female";
    }

    generatePatient(
      name,
      birthDay,
      gender,
      number,
      email,
      reason,
      description,
      randomSrc
    );
  }
  return JSON.parse(localStorage.getItem("patients"));
};

const loadPatients = function () {
  if (JSON.parse(localStorage.getItem("patients")) !== null)
    patients = JSON.parse(localStorage.getItem("patients"));
  else seedPatients(18);
};
loadPatients();
