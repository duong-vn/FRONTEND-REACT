import React, { useState } from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

// class MyComponent extends React.Component {

const MyComponent = () => {
  // state = {
  //   listUser: [
  //     { id: 1, name: "nguyentuanduong ", age: 19 },
  //     { id: 2, name: "tduong ", age: 17 },
  //     { id: 3, name: "ac", age: 22 },
  //   ],
  // };
  const [listUser, setListUser] = useState([
    { id: 1, name: "nguyentuanduong ", age: 19 },
    { id: 2, name: "tduong ", age: 17 },
    { id: 3, name: "ac", age: 22 },
  ]);

  const newUser = (obj) => {
    setListUser([obj, ...listUser]);
  };
  const handleDeleteUser = (userID) => {
    let listUserClone = [...listUser];
    listUserClone = listUserClone.filter((user) => {
      return user.id !== userID;
    });

    setListUser([...listUserClone]);
  };

  let concac = { con: "cac", dit: "me", may: "dit" };
  return (
    <>
      {JSON.stringify(concac)}
      <UserInfo newUser={newUser} />
      <br /> <br></br>
      <div
        style={{
          justifyContent: "space-between",
        }}
      >
        <DisplayInfo listUser={listUser} handleDeleteUser={handleDeleteUser} />
      </div>
      <div></div>
    </>
  );
};

export default MyComponent;
