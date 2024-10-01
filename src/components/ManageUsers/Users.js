import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers, deleteUser } from '../../service/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModelDelete';
import ModalUser from './ModalUser';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0)

    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({});

    //modal edit/create
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState('');
    const [dataModalUser, setDataModalUser] = useState({})

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);

        if(response && response.data && response.data.EC === 0){
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

    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUsers()
    }

    const handleEditUser = (user) => {
        setActionModalUser('UPDATE')
        setDataModalUser(user)
        setIsShowModalUser(true);
    }

    const handleCreateUser = () => {
        setActionModalUser('CREATE')
        setIsShowModalUser(true);
    }

    const handleRefresh = async () => {
        await fetchUsers();
    }

    return (
        <>
            <div className='container'>
                <div className='manage-users-container mt-3'>
                    <div className='user-header'>
                        <div>
                            <h3>Account management board</h3>
                        </div>
                        <div className='actions'>
                            <button className='btn btn-success refresh' onClick={()=> handleRefresh()}><i class="fa fa-refresh" aria-hidden="true"></i>
                            Refresh</button>
                            <button className='btn btn-primary add' onClick={() => handleCreateUser()}><i class="fa fa-plus" aria-hidden="true"></i>
                            Add new user</button>
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
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index)=>{
                                            return(
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <span 
                                                            title='Edit'
                                                            className='btn edit'
                                                            onClick={()=> handleEditUser(item)}
                                                        > <i class="fa fa-pencil" aria-hidden="true"></i>
                                                        </span>
                                                        <span 
                                                            title='Remove'
                                                            className='btn delete'
                                                            onClick={()=> handleDeleteUser(item)}
                                                        > <i class="fa fa-times" aria-hidden="true"></i>
                                                        </span>
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
            
            <ModalUser
                handleClose = {handleClose}
                onHide = {onHideModalUser}
                show = {isShowModalUser}
                action = {actionModalUser}
                dataModalUser = {dataModalUser}
            />
        </>
        
    )
}

export default Users;