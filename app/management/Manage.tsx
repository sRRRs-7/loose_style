import { createState } from '../recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import CreateBrand from './create/CreateBrand/CreateBrand';
import CreateCart from './create/CreateCart/CreateCart';
import CreateCategory from './create/CreateCategory/CreateCategory';
import CreateMedia from './create/CreateMedia/CreateMedia';
import CreateOrder from './create/CreateOrder/CreateOrder';
import CreateProduct from './create/CreateProduct/CreateProduct';
import CreateUser from './create/CreateUser/CreateUser';

function Manage() {
    const [create, _] = useRecoilState(createState); // manage path state for SPA

    return (
        <div>
            <div>
                {create == 'media' && <CreateMedia />}
                {create == 'product' && <CreateProduct />}
                {create == 'user' && <CreateUser />}
                {create == 'brand' && <CreateBrand />}
                {create == 'category' && <CreateCategory />}
                {create == 'cart' && <CreateCart />}
                {create == 'order' && <CreateOrder />}
            </div>
        </div>
    );
}

export default Manage;
