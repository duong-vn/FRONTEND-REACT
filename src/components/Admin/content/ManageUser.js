import ModalCreateuser from "./ModalCreateUser";
import "./ManageUser.scss";

import TableUser from "./TableUser";
import TableUserPaginate from "./TableUserPaginate";
import { useState, useEffect } from "react";
import { getAllUser } from "../../../services/apiService";
import ModalViewUser from "./ModalViewUser";
import { toast } from "react-toastify";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { getAllUserPaginate } from "../../../services/apiService";
const ManageUser = (props) => {
  const LIMIT_USER = 5;
  const [choose, setChoose] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [totalUser, setTotalUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClickUpdate = (user) => {
    setDataUpdate(user);
    setShowModalUpdate(true);
  };
  const handleClickView = (user) => {
    setDataView(user);
    setShowData(true);
  };
  const handleClickDelete = (user) => {
    setShowModalDelete(true);
    setDataDelete(user);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };
  const resetDataView = () => {
    setDataView({});
  };
  const [listUser, setListUser] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    fetchDataPaginate(1);
  }, []);

  const fetchData = async () => {
    let res = await getAllUserPaginate(1, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
      setTotalUser(res.DT.totalRows);
    } else {
      toast.error(res.EM);
    }
  };
  const fetchDataPaginate = async (page) => {
    let res = await getAllUserPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
      setTotalUser(res.DT.totalRows);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="title">Quản lí user</div>
      <div className="manage-user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-secondary"
            onClick={() => handleShowModal()}
          >
            Add new user
          </button>

          <select
            className="role-sort"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
              textAlign: "center",
            }}
            value={choose} // Bind the select value to the state
            onChange={(e) => setChoose(Number(e.target.value))} // Update state on change
          >
            <option value="0">All</option>
            <option value="1">User</option>
            <option value="2">Admin</option>
          </select>
        </div>

        <div className="table-user-container">
          {/* <TableUser
            choose={choose}
            setChoose={setChoose}
            listUser={listUser}
            handleClickUpdate={handleClickUpdate}
            handleClickView={handleClickView}
            handleClickDelete={handleClickDelete}
          /> */}
          <TableUserPaginate
            choose={choose}
            setChoose={setChoose}
            listUser={listUser}
            handleClickUpdate={handleClickUpdate}
            handleClickView={handleClickView}
            handleClickDelete={handleClickDelete}
            fetchDataPaginate={fetchDataPaginate}
            pageCount={pageCount}
            totalUser={totalUser}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateuser
          show={showModal}
          setShow={setShowModal}
          fetchData={fetchData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdate}
          setShow={setShowModalUpdate}
          dataUpdate={dataUpdate}
          fetchDataPaginate={fetchDataPaginate}
          resetUpdateData={resetUpdateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={showData}
          setShow={setShowData}
          dataView={dataView}
          resetDataView={resetDataView}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalDeleteUser
          show={showModalDelete}
          setShow={setShowModalDelete}
          user={dataDelete}
          fetchData={fetchData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
