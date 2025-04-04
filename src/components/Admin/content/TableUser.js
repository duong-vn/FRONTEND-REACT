const TableUser = (props) => {
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   let res = await getAllUser();
  //   if (res.EC === 0) {
  //     setListUser(res.DT);
  //   }
  // };
  const { listUser, handleClickUpdate, handleClickView, choose, setChoose } =
    props;

  return (
    <>
      <table className="table table-striped table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                (choose === 0 ||
                  (choose === 1 && user.role === "USER") ||
                  (choose === 2 && user.role === "ADMIN")) && (
                  <tr key={`table-user-${index}`}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td
                      className="action-btn"
                      style={{ width: "1%", whiteSpace: "nowrap" }}
                    >
                      <button
                        className="btn btn-info"
                        onClick={() => handleClickView(user)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleClickUpdate(user)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => props.handleClickDelete(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={"5"}>Not Found Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
