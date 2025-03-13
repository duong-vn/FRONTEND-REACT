import React from "react";

class Id extends React.Component {
  state = {
    isShow: true,
  };

  render() {
    const { listUser } = this.props;
    return (
      <div>
        <div>
          {listUser.map((user) => {
            return (
              <div>
                toi co so la {user.id} <br />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Id;
