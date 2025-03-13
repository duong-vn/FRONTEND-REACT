import React, { useState } from "react";

// class UserInfo extends React.Component {
//   state = {
//     name: "duong tuan nguyen",
//     addresss: "ktx",
//     age: "20",
//   };
const UserInfo = (props) => {
  const [obj, setobj] = useState({
    name: "duong tuan nguyen",
    address: "ktx",
    age: "20",
  });

  const handleClick = (event) => {
    console.log(">>> clicked");
    console.log(event);
    setobj({
      name: "eric",
      age: Math.random() * 100 + 1,
    });
  };
  const handleMouseOver = () => {
    setobj({
      name: "duon tuan nguyen",
    });
  };
  const handleOnChange = (event) => {
    console.log(event);
    setobj({
      ...obj,
     name: event.target.value,
    });
  };
  const handleOnChangeAge = (event) => {
    console.log(event);
    setobj({
      ...obj,
      age: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.newUser({
      id: Math.floor(Math.random() * 100 + 1) + "random",
      name: obj.name,
      age: obj.age,
    });
  };
  //JSX

  return (
    <div>
      my name is {obj.name} and ok I'm from {obj.age}
      <button onClick={(event) => handleClick(event)}>click me</button>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Your name:</label>

        <input
          type="text"
          onChange={(event) => {
            return handleOnChange(event);
          }}
        />
        <label>Your age:</label>
        <input type="text" onChange={(event) => handleOnChangeAge(event)} />
        <button>submit </button>
      </form>
    </div>
  );
};

export default UserInfo;
