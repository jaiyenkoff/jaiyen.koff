import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { checkUserIsAdmin } from './../../Utils';
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminPortal = props => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const isAdmin = checkUserIsAdmin(currentUser);
    if (!isAdmin) return null;

    return (
        < div className="adminToolBar">
            <ul>
                <li>
                    <Link to='/adminportal'>
                        Admin Portal
                    </Link>
                </li>
            </ul>
        </div>
    )

}

export default AdminPortal;
