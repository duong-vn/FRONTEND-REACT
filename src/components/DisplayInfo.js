import React, { useEffect, useState } from "react";
import "./DisplayInfo.scss";
// import logo from "../logo.svg";
// import Id from "./Id";

//stateless vs stateful
// class DisplayInfo extends React.Component {
//   // componentDidMount() {
//   //   console.log(">>> call me component didmount");
//   //   setTimeout(() => {
//   //     document.title = "REACT";
//   //   }, 3000);
//   // }

//   // componentDidUpdate(prevProps, prevState) {
//   //   console.log(">>> call me component update", this.props, prevProps);
//   //   if (this.props.listUser !== prevProps.listUser) {
//   //     if (this.props.listUser.length == 5) {
//   //       console.log("u have 5 cuh");
//   //     }
//   //   }
//   // }

//   render() {
//     console.log("call me render");
//     const { listUser } = this.props;

//     return (
//       <span>
//         {true && (
//           <>
//             {listUser.map((user) => {
//               return (
//                 <div key={user.id}>
//                   <div class={+user.age > 17 ? "red" : "green"}>
//                     toi ten la {user.name} <br />
//                     toi du tuoi roi ({user.age})
//                   </div>
//                   <button onClick={() => this.props.handleDeleteUser(user.id)}>
//                     Delete data
//                   </button>
//                   <hr></hr>
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </span>
//     );
//   }
// }

const DisplayInfo = (props) => {
  const { listUser } = props;
  const [isShow, setShow] = useState(true);

  const handleShowHide = () => {
    setShow(!isShow);
  };
  useEffect(() => {
    if (listUser.length === 0) {
      alert("THERES A HO IN THIS HOUSE");
    }
    console.log(">> call me efete");
  });

  console.log(">> me rende ");
  return (
    <span>
      <span onClick={() => handleShowHide()}>
        {isShow ? "HIDE DA SHIT" : "show dashit"}
      </span>
      {isShow && (
        <>
          {listUser.map((user) => {
            return (
              <div key={user.id}>
                <div class={+user.age > 17 ? "red" : "green"}>
                  toi ten la {user.name} <br />
                  toi du tuoi roi ({user.age})
                </div>
                <button onClick={() => props.handleDeleteUser(user.id)}>
                  Delete data
                </button>
                <hr></hr>
              </div>
            );
          })}
        </>
      )}
    </span>
  )
}

export default DisplayInfo;
