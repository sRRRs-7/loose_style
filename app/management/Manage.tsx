import { createState } from 'recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import CreateBrand from './createDisplay/CreateBrand/CreateBrand';
import CreateCart from './createDisplay/CreateCart/CreateCart';
import CreateCategory from './createDisplay/CreateCategory/CreateCategory';
import CreateMedia from './createDisplay/CreateMedia/CreateMedia';
import CreateOrder from './createDisplay/CreateOrder/CreateOrder';
import CreateProduct from './createDisplay/CreateProduct/CreateProduct';
import CreateUser from './createDisplay/CreateUser/CreateUser';

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
