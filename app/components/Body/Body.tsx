import React, { useEffect, useState } from 'react';
import styles from './Body.module.scss';
import CategoryBar from './CategoryBar/CategoryBar';
import Pagination from './Pagination/Pagination';
import { useRecoilState } from 'recoil';
import { categorySearchState, keywordSearchState, pageState, pathState, topBodyState } from '@/recoil/atom';
import KeyboardCapslockTwoToneIcon from '@mui/icons-material/KeyboardCapslockTwoTone';
import TopBody from './TopBody';
import CategoryBody from './CategoryBody';
import KeywordBody from './KeywordBody';
import Loading from './Loading';

function Body() {
    const [page, ____] = useRecoilState<number>(pageState);
    const [path, setPath] = useRecoilState<string>(pathState);
    // fetch condition state
    const [isTop, _] = useRecoilState<boolean>(topBodyState); // share top body component
    const [isCategorySearch, __] = useRecoilState<boolean>(categorySearchState); // share category component
    const [isKeywordSearch, ___] = useRecoilState<boolean>(keywordSearchState); // share header component
    // spinner timer
    const [isFetch, setIsFetch] = useState(true);

    useEffect(() => {
        setPath(window.location.pathname);
        setTimeout(() => {
            setIsFetch(false);
        }, 500);
    }, [isTop, isCategorySearch, isKeywordSearch]);

    // auto top button
    function returnTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    // Loading display render
    if (isFetch) {
        return <Loading />;
    }

    // production display
    return (
        <>
            <div>
                <CategoryBar />
            </div>

            <div>
                <Pagination />
            </div>

            {isTop && <TopBody />}
            {isCategorySearch && <CategoryBody />}
            {isKeywordSearch && <KeywordBody />}

            <div className={styles.top}>
                <KeyboardCapslockTwoToneIcon
                    className={styles.topIcon}
                    onClick={() => {
                        returnTop();
                    }}
                />
                <p>To the top</p>
            </div>
        </>
    );
}

export default Body;
