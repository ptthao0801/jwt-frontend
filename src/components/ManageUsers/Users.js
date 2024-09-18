import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers, deleteUser } from '../../service/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModelDelete';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);

        if(response && response.data && response.data.EC === 0){
            // console.log(response.data.DT);
            setTotalPages(response.data.DT.totalPages)
            setListUsers(response.data.DT.users);

            console.log('>>>>>check response: ', response)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
      };

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true);
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    }

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);
        console.log('>>> check response delete: ', response)
        if(response && response.data.EC === 0){
            toast.success(response.data.EM)
            await fetchUsers();
        } else {
            toast.error(response.data.EM)
        }
        setIsShowModalDelete(false)
    }

    return (
        <>
            <div className='container'>
                <div className='manage-users=container'>
                    <div className='user-header'>
                        <div>
                            <h3>Table Users</h3>
                        </div>
                        <div className='action'>
                            <button className='btn btn-success'>Refresh</button>
                            <button className='btn btn-primary'>Add new user</button>
                        </div>
                    </div> 
                    <div className='user-body'>
                        <table className="table table-hover ">
                            <thead>
                                <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index)=>{
                                            return(
                                                <tr key={`row-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning mx-3'>Edit</button>
                                                        <button className='btn btn-danger'
                                                            onClick={()=> handleDeleteUser(item)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr><td>Not found users</td></tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={4}
                                pageCount={totalPages}
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
                    }
                </div>
            </div>

            <ModalDelete
                show = {isShowModalDelete}
                handleClose = {handleClose}
                confirmDeleteUser = {confirmDeleteUser}
                dataModal = {dataModal}/>
        </>
        
    )
}

export default Users;