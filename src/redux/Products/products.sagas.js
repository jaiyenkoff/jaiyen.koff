import { takeLatest, put, all, call} from 'redux-saga/effects';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct, handleEditProduct } from './products.helpers'
import productsTypes from './products.types';
import { auth } from './../../firebase/utils';
import { setProducts, fetchProductsStart } from './products.actions';

export function* addProduct({ payload :{
    productCategory,
    productName,
    productThumbnailUrl,
    productPrice,
    productStock
}}) {

    try {
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnailUrl,
            productPrice,
            productAdminUID: auth.currentUser.uid,
            productStock,
            createdDate: timestamp
        });

        yield put(
            fetchProductsStart()
        );

    } catch (err) {
        console.log(err)
    }

}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts() {
    try {
        const products = yield handleFetchProducts();
        yield put(
            setProducts(products)
        )
    } catch (err) {
        console.log(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        );
    } catch (err) {
        console.log(err)
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}


export function* editProduct({ payload :{
    productCategory,
    productName,
    productThumbnailUrl,
    productPrice,
    productStock
}}) {
    try {
        yield handleEditProduct({
            productCategory,
            productName,
            productThumbnailUrl,
            productPrice,
            productStock
        });
        yield put(
            fetchProductsStart()
        );
    } catch (err) {
        console.log(err);
    }
}

export function* onEditProductStart() {
    yield takeLatest(productsTypes.EDIT_PRODUCT_START, editProduct)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onEditProductStart)
    ])
}