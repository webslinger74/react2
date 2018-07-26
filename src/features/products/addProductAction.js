import { SubmissionError} from 'redux-form';
import {toastr} from 'react-redux-toastr';
import  firebase  from '../../firebase/firebase';
import {FETCH_PRODUCTS} from '../../constants/productConstants';

export const addProduct = (product, data) => {

    console.log("this is the prod",product);
    console.log("this is the blob",data);
    return async (dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
       
        try {

            let newProduct = {
                price:product.price,
                title:product.title,
                description:product.description,
                createdAt:firestore.FieldValue.serverTimestamp()
            };
            console.log(data, "is this the blob passed via reduxform!!!");
            

            const fireProduct = await firestore.add('products/', {...newProduct});
            console.log(fireProduct, "does it have an id");
            const prodId = fireProduct.id;
            console.log(prodId, "is this the id for product!");
            var storageRef = firebase.storage().ref();
            var nameRef = storageRef.child(`/products/${newProduct.title}`);
            var file = data;
            console.log(file);
           nameRef.put(file).then(function(snapshot) {
                console.log(snapshot, 'Uploaded a blob or file!');
                var snapImage = snapshot.downloadURL;
                console.log(snapImage, "is this the image URL");


                const itemUpdates =  {
                    downloadpic: snapImage
                  }
                  
                  firestore.update({ collection: 'products', doc: prodId }, itemUpdates)

              });;

            toastr.success('Successfully added Product');
        } catch (error) {
            toastr.error('Unable to create new product!');
            console.log(error)
            throw new SubmissionError({
                _error: error.message
            })

        }
    }
};


export const getPhotoFromStorage = () => {
    return async (dispatch, getState, {getFirebase, getFirestore}) =>{
        var firebase = getFirebase();
        var storage = firebase.storage();
        var picRef = storage.refFromURL('gs://webapplication-26ea2.appspot.com/products/fender amp');
        console.log(picRef);
    }
}



export const getProductForDashboard = (lastProduct) =>
async (dispatch, getState) => {
    const firestore = firebase.firestore();
    const productsRef = firestore.collection('products');
    try {
        let totalProds = await firestore.collection('products').get();
        console.log(totalProds, "total prods");
        let startAfter = lastProduct && await firestore.collection('products').doc(lastProduct.id).get();
        let query;
        lastProduct ? query = productsRef.orderBy('title', 'asc').startAfter(startAfter).limit(2):
        query = productsRef.orderBy('title', 'asc').limit(2);
        let querySnap = await query.get();
        if (querySnap.docs.length === 0){
            return querySnap;
        }


        let products = [];
        for (let i=0; i< querySnap.docs.length; i++){
            let prod = {...querySnap.docs[i].data(), id:querySnap.docs[i].id}
            products.push(prod);
        }
        console.log(products);
        dispatch({type: FETCH_PRODUCTS, payload: products})
        return querySnap;
        
    } catch (error) {
        console.log(error);
    }
}
export const getPrevProductForDashboard = (previousTitle) =>
async (dispatch, getState) => {
    console.log(previousTitle, "is this the prev title???");
    const firestore = firebase.firestore();
    const productsRef = firestore.collection('products');
    console.log(productsRef, "this is  full product array hopefully");
    try {
        //this part get the titles of all prods in order in an array
        let totalProds = await firestore.collection('products').orderBy('title', 'asc').get();
        console.log(totalProds, "total prods");
        let arrayTitles = totalProds.docs.map((doc, index)=> {
            return doc;
        })
        console.log(arrayTitles, "is it");
        let arrayTitlesInner = arrayTitles.map((doc, index)=> {
            return doc._document.data.internalValue.root.right.value.internalValue;
        })
        console.log(arrayTitlesInner, "all title in order in an array");

      //  array.findIndex(function(currentValue, index, arr), thisValue)
         
        const checkTitle = (title) => {
            return title === previousTitle;
        }

        const arrayIndexInner = arrayTitlesInner.findIndex(checkTitle, previousTitle);
        console.log(arrayIndexInner, "this should be the one 2 before");
       let moveIndexArray = 0

       if (arrayIndexInner >= 2){
          moveIndexArray = arrayIndexInner -2;
       } else {
           moveIndexArray = 0
       };

       console.log(moveIndexArray);

      const startSearch =  arrayTitlesInner.filter((value, index) => {
            if (index === moveIndexArray){
                console.log(moveIndexArray);
                console.log(index);
                console.log("is this a title", value);
            return value;
            }
        })
        console.log(startSearch, "this is our new search");
        const startSearchString = startSearch[0];
        console.log(startSearchString);

        let query;
         query = productsRef.orderBy('title', 'asc').startAt(startSearchString).limit(2);
        let querySnap = await query.get();
        if (querySnap.docs.length === 0){
            return querySnap;
        }

        let products = [];
        for (let i=0; i< querySnap.docs.length; i++){
            let prod = {...querySnap.docs[i].data(), id:querySnap.docs[i].id}
            products.push(prod);
        }
        console.log(products);
        dispatch({type: FETCH_PRODUCTS, payload: products})
        return querySnap;
        
    } catch (error) {
        console.log(error);
    }
}
