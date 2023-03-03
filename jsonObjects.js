const simpleObject = { key: "value", key2: "value2" };

const simpleArrayOfvalues = ["one", "two", "three"];

const arrayOfObjects = [{ key: "value" }, { key2: "value" }, { key3: "value" }];

const typesOfData = { string: "this is a string", number: 10 };

const mix = {
  Firstname: "Ali",
  Lastname: "Ahmad",
  Age: 26,
  Students: [
    {
      firstName: "Sara",
      lastName: "Conor",
    },
    {
      firstName: "Bruce",
      lastName: "Willis",
    },
  ],
};

console.log(simpleObject.key);
console.log(simpleObject["key2"]);
console.log(simpleArrayOfvalues[2]);
console.log(arrayOfObjects[2].key3);
console.log(mix.Students[0].firstName);

const firstStudentFirstName = mix.Students[0].firstName;
console.log(firstStudentFirstName);
console.log(firstStudentFirstName)
