import { adminState } from 'recoil/atom';
import Footer from 'components/Footer/Footer';
import ManageHeader from 'management/createDisplay/Header/ManageHeader';
import React from 'react';
import { useRecoilState } from 'recoil';
import ManageLogin from 'management/createDisplay/Login/ManageLogin';
import ManageCategory from 'management/createDisplay/Category/ManageCategory';
import Manage from 'management/Manage';

function manage() {
    const [admin, _] = useRecoilState(adminState);

    return (
        <div>
            <div>
                <ManageHeader />
            </div>

            <div>{admin && <ManageCategory />}</div>

            <div>{admin ? <Manage /> : <ManageLogin />}</div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default manage;
