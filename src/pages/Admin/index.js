import React, { useState, useEffect } from 'react';
import { firestore } from './../../firebase/utils';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import './styles.scss';
import { Link } from 'react-router-dom';

const Admin = props => {


  return (
    <div className="admin">
        <div className="wrap">
          <ul>
            <li className="menuNav">
              <Link>
                  <span className="material-icons">
                      local_cafe
                  </span>
				  <span className="linkHeader">
					  Product Management
				  </span>
				  <span className="linkDetails">
					  <ul>
						  <li>
						  Add/Remove finished goods.
						  </li>
					  </ul>
				  </span>
              </Link>
            </li>
			<li className="menuNav">
              <Link>
                  <span className="material-icons">
				  inventory_2
                  </span>
				  <span className="linkHeader">
					  Inventory Management
				  </span>
				  <span className="linkDetails">
					  <ul>
						  <li>
						  Add/Remove raw materials, packaging, ...etc. 
						  </li>
					  </ul>
				  </span>
              </Link>
            </li>
          </ul>
        </div>
    </div>
  );
}

export default Admin;