import { takeLatest, put, all, call} from 'redux-saga/effects';
import { handleAddProduct } from './products.helpers'
import productsTypes from './products.types';
import { auth } from './../../firebase/utils'

export function* addProduct({ payload :{
    productCategory,
    productName,
    productThumbnail,
    productPrice
}}) {

    try {
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUID: auth.currentUser.uid,
            createdDate: timestamp
        });
    } catch (err) {
        console.log(err)
    }

}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart)
    ])
}