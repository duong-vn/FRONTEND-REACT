import ReactPaginate from "react-paginate";
import { useState } from "react";

const TableUserPaginate = (props) => {
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   let res = await getAllUser();
  //   if (res.EC === 0) {
  //     setListUser(res.DT);
  //   }
  // };
  const handlePageClick = (event) => {
    fetchDataPaginate(event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };

  const {
    listUser,
    handleClickUpdate,
    handleClickView,
    choose,
    setChoose,
    fetchDataPaginate,
    pageCount,
    totalUser,
  } = props;

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
                    <td style={{ width: "10%" }}>{user.id}</td>
                    <td style={{ width: "20%" }}>{user.username}</td>
                    <td style={{ width: "30%" }}>{user.email}</td>
                    <td style={{ width: "20%" }}>{user.role}</td>
                    <td
                      className="action-btn"
                      style={{
                        width: "20%",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
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
          <tr colSpan={"1"}>Total users: {totalUser} </tr>
        </tbody>
      </table>
      <div className="pagination-container d-flex justify-content-center ">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};
export default TableUserPaginate;
