import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// pagination
export const pageState = atom<number>({
    key: 'pageState',
    default: 1,
});

// current path
export const pathState = atom<string>({
    key: 'pathState',
    default: '/',
});

// current category
export const categoryState = atom<string>({
    key: 'categoryState',
    default: '',
});

// admin current category
export const manageCategoryState = atom<string>({
    key: 'manageCategoryState',
    default: '',
});

// admin state management
export const createState = atom<string>({
    key: 'createState',
    default: 'media',
});

// is admin?
export const adminState = atom<boolean>({
    key: 'adminState',
    default: false,
});

// all product search ? or sort product search?
export const allProductSearchState = atom<boolean>({
    key: 'allProductSearchState',
    default: true,
});

// all product search ? or sort product search?
export const getProductModalState = atom<boolean>({
    key: 'getProductModalState',
    default: false,
});
// all product search ? or sort product search?
export const productState = atom<any>({
    key: 'productState',
    default: null,
});

// product category search
export const categorySearchState = atom<boolean>({
    key: 'categorySearchState',
    default: false,
});

// product keyword search
export const keywordSearchState = atom<boolean>({
    key: 'keywordSearchState',
    default: false,
});
// product keyword input
export const keywordState = atom<string>({
    key: 'keywordState',
    default: '',
});

// get a product modal state
export const topBodyState = atom<boolean>({
    key: 'topBodyState',
    default: true,
});

// cart modal state
export const cartModalState = atom<boolean>({
    key: 'cartModalState',
    default: false,
});

// cart modal state
export const tokenState = atom<boolean>({
    key: 'tokenState',
    default: false,
});

// cart modal state
export const cartIdState = atom<number>({
    key: 'cartIdState',
    default: 0,
});
