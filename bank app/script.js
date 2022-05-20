const acount1 = {
  owner: "sanjai ramasamy",
  movements: [200, -400, 500, -78],
  interestrate: 1.2,
  pin: 1111,
  movementtimes: [
    "2022-11-18T21:31:17.178Z",
    "2022-10-18T21:31:17.178Z",
    "2022-05-07T21:31:17.178Z",
    "2022-05-11T21:31:17.178Z",
  ],
  local: "en-IN",
};
const acount2 = {
  owner: "sanjai selvalakshmi",
  movements: [200, -400, 500, -78],
  interestrate: 1.2,
  pin: 2222,
  movementtimes: [
    "2022-11-18T21:31:17.178Z",
    "2022-10-18T21:31:17.178Z",
    "2022-01-18T21:31:17.178Z",
    "2022-04-18T21:31:17.178Z",
  ],
  local: "en-US",
};
const acount3 = {
  owner: "sanjai sindhuja",
  movements: [200, -400, 500, -78],
  interestrate: 1.2,
  pin: 3333,
  movementtimes: [
    "2022-11-18T21:31:17.178Z",
    "2022-10-18T21:31:17.178Z",
    "2022-01-18T21:31:17.178Z",
    "2022-04-18T21:31:17.178Z",
  ],
  local: "en-US",
};
const acount4 = {
  owner: "sanjai lemina",
  movements: [200, -400, 500, -78],
  interestrate: 1.2,
  pin: 4444,
  movementtimes: [
    "2022-11sr-18T21:31:17.178Z",
    "2022-10-18T21:31:17.178Z",
    "2022-01-18T21:31:17.178Z",
    "2022-04-18T21:31:17.178Z",
  ],
  local: "en-IN",
};
const acounts = [acount1, acount2, acount3, acount4];
//shortname;
const shortname = function (acount) {
  acount.map(function (mov, i) {
    mov.name = mov.owner
      .split(" ")
      .map((mov) => mov[0])
      .join("");
  });
};
shortname(acounts);
// formentmovement days
const formentmovementday = (local, date) => {
  const passeddate = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daypassed = passeddate(new Date(Date.now()), date);
  console.log(daypassed);
  console.log(date);

  if (daypassed === 0) {
    return "Today";
  }
  if (daypassed === 1) return "Yesterday";
  if (daypassed <= 7) return `${daypassed} Days Ago`;
  if (daypassed > 7) {
    //const dat = new Date(date);
    //const year = dat.getFullYear();
    //const month = `${dat.getMonth() + 1}`.padStart(2, 0);
    //const datee = `${dat.getDate()}`.padStart(2, 0);
    //const hour = `${dat.getHours()}`.padStart(2, 0);
    //const min = `${dat.getMinutes()}`.padStart(2, 0);
    //return `${datee}/${month}/${year}, ${hour}:${min}`;
    const options = {
      hour: "numeric",
      minute: "numeric",
      //second: "numeric",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      //weekday: "long",
    };
    const locationtime = Intl.DateTimeFormat(local, options).format(date);
    return locationtime;
  }
};
//formatnumber using initializing aps
const numberformat = (local, num) => {
  const number = num;
  const alreatenumber = new Intl.NumberFormat(local).format(number);
  return alreatenumber;
};
//bulding data histry
let m = document.querySelector(".ad");
const transferData = function (local, timer, acc, sorter = false) {
  m.innerHTML = " ";
  const movs = sorter ? acc.slice().sort((a, b) => a - b) : acc;
  console.log(timer);
  console.log(movs);
  movs.forEach((element, i) => {
    const alreateamount = numberformat(local, element);
    console.log(timer[i]);
    const returnn = formentmovementday(local, new Date(timer[i]));
    console.log(returnn);
    const type =
      element > 0
        ? `<div class="field">
                    <div class="h">
                      <h2 class="depasite"><span>${i + 1} </span>Depasite</h2>
                      <p class="date">${returnn}</p>
                    </div>
                    <h2>${alreateamount}$</h2>
                </div>`
        : ` <div class="field">
                    <div class="h">
                      <h2 class="withtraw"><span>${i + 1} </span>withdraw</h2>
                      <p class="date">${returnn}</p>
                    </div>
                    <h2>${alreateamount}$</h2>
                </div>`;
    console.log(type);

    document.querySelector(".ad").insertAdjacentHTML("afterbegin", type);
  });
};
const balanceamount = document.querySelector(".amountbalance");

//curentacount balance amount;
const curentacount = function (local, acount) {
  const m = acount.reduce((acc, m) => {
    return acc + m;
  }, 0);
  balanceamount.textContent = new Intl.NumberFormat(local, {
    style: "currency",
    currency: "RUP",
  }).format(m);
  const am = acount
    .filter((mov) => mov > 0)
    .reduce(function (acc, m) {
      return acc + m;
    }, 0);
  console.log(am);
  const withtrave = acount
    .filter((mov) => mov < 0)
    .reduce(function (acc, m) {
      return acc + m;
    }, 0);
  console.log(withtrave);
};
const inc = function (local, ac) {
  const am = new Intl.NumberFormat(local).format(
    ac
      .filter((mov) => mov > 0)
      .reduce(function (acc, m) {
        return acc + m;
      }, 0)
  );
  return am;
};
const out = function (local, ac) {
  const am = ac
    .filter((mov) => mov < 0)
    .reduce(function (acc, m) {
      return acc + m;
    }, 0);
  return +Math.abs(new Intl.NumberFormat(local).format(am)).toFixed(2);
};
const intrest = (acount, local, intres) => {
  const amount = +new Intl.NumberFormat(local).format(
    acount.reduce((acc, mov) => acc + mov, 0) / intres
  );
  return amount.toFixed(2);
};

const namee = document.querySelector(".userinputs");
const pin = document.querySelector(".userinput");

let userobject;
let date = new Date();
const curentdate = document.querySelector(".curentdate");
const curentdatefunction = (date) => {
  //const year = date.getFullYear();
  //const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //const datee = `${date.getDate()}`.padStart(2, 0);
  //const hour = `${date.getHours()}`.padStart(2, 0);
  //const min = `${date.getMinutes()}`.padStart(2, 0);
  //const returnn = `${datee}/${month}/${year}, ${hour}:${min}`;
  //return returnn;
  const options = {
    hour: "numeric",
    minute: "numeric",
    //second: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    //weekday: "long",
  };
  const logdate = new Intl.DateTimeFormat(date, options).format();
  return logdate;
};
const intres = document.querySelector(".intrest");
const checkbtn = document.querySelector(".check");
///////////////////////////////
// log in
let timer;
checkbtn.addEventListener("click", function () {
  userobject = acounts.find((acc) => acc.name === namee.value);
  console.log(userobject);

  transferData(
    userobject.local,
    userobject.movementtimes,
    userobject.movements
  );
  curentacount(userobject.local, userobject.movements);

  document.querySelector(
    ".welcome"
  ).textContent = `welcome back  ${userobject.owner}`;
  document.querySelector(".in").textContent = inc(
    userobject.local,
    userobject.movements
  );
  document.querySelector(".out").textContent = out(
    userobject.local,
    userobject.movements
  );
  document.querySelector(".whole").classList.remove("hide");
  document.querySelector(".whole").style.opacity = 100;
  curentdate.textContent = curentdatefunction(userobject.local);
  intres.textContent = intrest(
    userobject.movements,
    userobject.local,
    userobject.interestrate
  );

  if (timer) clearInterval(timer);
  timer = startlogouttimer();
});
const transweramountcheck = document.querySelector(".transweramount");
const transwerid = document.querySelector(".id");
const transweramount = document.querySelector(".amt");
let id;
transweramountcheck.addEventListener("click", () => {
  id = acounts.find((mov) => mov.name === transwerid.value);
  userob = acounts.find((acc) => acc.name === namee.value);
  console.log(userob);
  if (
    id.name !== userob.name &&
    Number(transweramount.value) > 0 &&
    userob.movements.reduce((acc, mov) => acc + mov, 0) >=
      Number(transweramount.value)
  ) {
    userob.movements.push(Number(`-${transweramount.value}`));
    userob.movementtimes.push(new Date(Date.now()));
    id.movementtimes.push(new Date(Date.now()));
    id.movements.push(Number(transweramount.value));
    console.log(userob.movements, id.movements);
  }
  transferData(userob.local, userob.movementtimes, userob.movements);
  document.querySelector(".in").textContent = inc(
    userob.local,
    userob.movements
  );
  document.querySelector(".out").textContent = out(
    userob.local,
    userob.movements
  );
  curentacount(userob.local, userob.movements);
  transwerid.value = "";
  transweramount.value = "";
  intres.textContent = intrest(
    userob.movements,
    userob.local,
    userob.interestrate
  );
  //reeset timer
  clearInterval(timer);
  timer = startlogouttimer();
});
const closeidname = document.querySelector(".closeidname");
const closeidpin = document.querySelector(".closeidpin");

const closeacount = document.querySelector(".closeacount");
closeacount.addEventListener("click", () => {
  userob = acounts.find((acc) => acc.name === namee.value);
  if (
    userob.name === closeidname.value &&
    userob.pin === Number(closeidpin.value)
  ) {
    const index = acounts.findIndex((acc) => acc.name === userob.name);
    console.log(index);
    acounts.splice(index, 1);
  }
  closeidname.value = "";
  closeidpin.value = "";
  alert("this acount is removed");
  document.querySelector(".whole").style.opacity = 0;
  document.querySelector(".welcome").textContent = `welcome`;
});

//loan imbliment
const loaninp = document.querySelector(".loan");
const loancheck = document.querySelector(".inploan");
loancheck.addEventListener("click", () => {
  userob = acounts.find((acc) => acc.name === namee.value);
  if (
    userob.movements.some((mov) => mov >= Number(loaninp.value) * 0.1) &&
    Number(loaninp.value) > 0
  ) {
    userob.movements.push(+Math.floor(loaninp.value));
    userob.movementtimes.push(new Date(Date.now()));
    setTimeout(
      () => transferData(userob.local, userob.movementtimes, userob.movements),
      3000
    );
    curentacount(userob.local, userob.movements);
    document.querySelector(".in").textContent = inc(
      userob.local,
      userob.movements
    );
    document.querySelector(".out").textContent = out(
      userob.local,
      userob.movements
    );
    loaninp.value = " ";
    intres.textContent = intrest(
      userob.movements,
      userob.local,
      userob.interestrate
    );
  }
  //reeset timer
  clearInterval(timer);
  timer = startlogouttimer();
});

const sort = document.querySelector(".sort");
let soter = false;
sort.addEventListener("click", () => {
  userob = acounts.find((acc) => acc.name === namee.value);
  transferData(userob.local, userob.movementtimes, userob.movements, !soter);
  soter = !soter;
});
const timerhtml = document.querySelector(".timers");
const startlogouttimer = () => {
  const tik = () => {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(Math.trunc(time % 60)).padStart(2, 0);
    timerhtml.textContent = `${min}:${sec}`;

    //stop setinterval
    if (time === 0) {
      clearInterval(timeboard);
      document.querySelector(".whole").style.opacity = 0;
      document.querySelector(".welcome").textContent = `welcome`;
    }
    time--;
  };
  let time = 600;
  //setinterval
  tik();
  const timeboard = setInterval(tik, 1000);
  return timeboard;
};

//const movemenUI=Array.from(document.querySelectorAll('.amoun'))
//console.log(movemenUI)
//const ui=movemenUI.map(el=>Number(el.textContent.replace('$',"")))
////console.log(ui)
//const anothermovementUi=[...document.querySelectorAll('.amoun')]
//console.log(anothermovementUi)
//const ami=Array.from(anothermovementUi).map(el=>Number (el.textContent.replace('$',"")))
//console.log(ami)

//coding chalenge
/*
//1
const depasite = acounts
  .flatMap((mov) => mov.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, mov) => sum + mov, 0);
console.log(depasite);
//2 amount>1000
const depasite1000 = acounts
  .flatMap((mov) => mov.movements)
  .reduce((sum, mov) => (mov >= 100 ? sum + 1 : sum), 0);
console.log(depasite1000);
///3 object creating
const sums = acounts
  .flatMap((mov) => mov.movements)
  .reduce(
    (nc, el) => {
      el > 0 ? (nc.depasite += el) : (nc.withdraw += el);
      return nc;
    },
    { depasite: 0, withdraw: 0 }
  );
console.log(sums);
const convertcase = (title) => {
  const exeption = ["a", "and", "an", "the", "but", "or", "on", "in", "with"];
  const titlecase = title
    .toLowerCase()
    .split(" ")
    .map((mov) =>
      exeption.includes(mov) ? mov : mov[0].toUpperCase() + mov.slice(1)
    )
    .join(" ");
  return titlecase;
};
console.log(
  convertcase(
    "sanjai love sindhuja seriously two years they are very happy and now they have twon quit babys i love you so much and he got a job so he is very hapy"
  )
);

const dog = [
  { weight: 22, curfood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curfood: 200, owners: ["Mtilda"] },
  { weight: 13, curfood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curfood: 340, owners: ["Michael"] },
];
console.log(typeof dog);

dog.map((mov) => (mov.recfood = Math.trunc(mov.weight ** 0.75 * 28)));
const checktype = (dog) =>
  dog.curfood > dog.recfood ? "Eating too much" : "Eating too little";
console.log(dog[0]);
console.log(dog[1]);
console.log(dog[2]);
console.log(dog[3]);
// 1
const recfood = dog.map((mov) => Math.trunc(mov.weight ** 0.75 * 28));
console.log(recfood);
//2
const sarah = dog.find((mov) => mov.owners.includes("Sarah"));
console.log(`sarah dogs is ${checktype(sarah)} `);
// 3

const eattomuch = dog
  .filter((mov) => mov.curfood > mov.recfood)
  .flatMap((mov) => mov.owners);
const eattolittle = dog
  .filter((mov) => mov.curfood < mov.recfood)
  .flatMap((mov) => mov.owners);
console.log(eattomuch);
console.log(eattolittle);

//4
console.log(
  `${eattomuch.join(" and ")} dogs "eating to much! and ${eattolittle.join(
    " and "
  )} dogs "eating to little!`
);

//5
const some = dog.some((mov) => mov.curfood === mov.recfood);
console.log(some);
//6 curent > (recomended *0.90 ) && curent <(recomended*1.10)
const okay = dog.some(
  (mov) => mov.curfood > mov.recfood * 0.9 && mov.curfood < mov.recfood * 1.1
);
console.log(okay);

//7
console.log(
  dog.filter(
    (mov) => mov.curfood > mov.recfood * 0.9 && mov.curfood < mov.recfood * 1.1
  )
);
//8

const shallow = Array.from(dog);
console.log(shallow);
console.log(shallow.sort((a, b) => a.recfood - b.recfood));
console.log("hey");

/// section 12 Numbers
console.log(23 === 23.0);
console.log(0.1 + 0.2 === 0.3);
//type nconvertion
console.log(Number("23"));
console.log(+"23");
//parsing
console.log(Number.parseInt("30e"));
console.log(Number.parseInt("e30e"));
console.log(Number.parseInt("30.8e"));
console.log(Number.parseFloat("30.8e"));
console.log(Number.isNaN("30.8e"));
console.log(Number.isNaN(+"e"));
console.log(Number.isNaN(90));
console.log(Number.isFinite(90));
console.log(Number.isFinite("s"));

// math and rounding
//math method:
console.log(Number.parseInt(Math.sqrt(24)));
console.log(Math.max(34, 5, 631));
console.log(Math.min(34, 5, 631));
console.log(Math.trunc(Math.random(), 5));
console.log(Math.PI * Number.parseInt("10px") ** 2);
console.log(Math.trunc(Math.random() * 6) + 1);

const rendomInt = (max, min) => Math.trunc(Math.random() * max - min) + 1;

rendomInt(20, 10);

//round method
console.log(Math.trunc(23.9));

console.log(Math.round(23.5));
console.log(Math.round(23.9));
console.log(Math.ceil(23.1));
console.log(Math.ceil(23.9));
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));
console.log((4.45).toFixed(3));

const newarry = Array.from({ length: 10 }, (om, i) => i + 1);
console.log(newarry);
const isEven = (n) => n % 2 === 0;
console.log(isEven(19));
console.log(isEven(12));

const amountbalance = document.querySelector(".amountbalance");

amountbalance.addEventListener("click", () => {
  let arrays = [...document.querySelectorAll(".field")];
  arrays.forEach((mov, index) => {
    if (index % 2 === 0) mov.style.backgroundColor = "orangered";
    console.log("hey");
  });
});

// BigInt
console.log(Number.MAX_SAFE_INTEGER);
console.log(
  726236424912010130127462469264254912918201326473592401264021472018762301267n
);
console.log(BigInt(726236424));
//operations
console.log(3276387628176018701287602708392n * BigInt(2000000));

// creating a date
const now = new Date();
console.log(now);
console.log(new Date("october 24, 2022"));
console.log(new Date(2022, 9, 2, 15, 23, 1000));
console.log(new Date(3));
const feature = new Date(2037, 10, 19, 15, 23);
console.log(feature);
console.log(feature.getFullYear());
console.log(feature.getMonth());
console.log(feature.getDate());
console.log(feature.getDay());
console.log(feature.getHours());
console.log(feature.getMinutes());
console.log(feature.getSeconds());
console.log(feature.toISOString());
console.log(feature.getTime());
console.log(Date.now());
console.log(new Date(1652348872143));*/

// oprations with dates
//const future = new Date(2037, 10, 19, 15, 23);
//const calcdaypassed = (day1, day2) =>
//  Math.abs((day2 - day1) / (1000 * 60 * 60 * 24));
//const days1 = calcdaypassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
//console.log(days1);
//console.log(Math.abs(new Date(2037, 3, 24) - new Date(2037, 3, 14)));
//console.log(Date.now());
//console.log(+future);

// internationnalizing dates (intl)
const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
const now = new Date();
console.log(new Intl.DateTimeFormat("en-IN", options).format());
const num = 23438728.98;
console.log(`US : ${new Intl.NumberFormat("en-US").format(num)}`);
console.log(`TAMIL NADU : ${new Intl.NumberFormat("ta-IN").format(num)}`);
//setTimeout(
//(data1) => console.log(`hey ${data1} chlm waite three min...`),
//4000,
//"sindhu"
//);
const settimer = () => {
  let time = 100;
  setInterval(() => {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    console.log(`${min}:${sec}`);
    time--;
  }, 1000);
};
