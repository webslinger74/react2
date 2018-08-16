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

export const getProductDetails = (productId) => {
          console.log(productId, "this is the id");
   return async (dispatch, getState) => {
       
        const firestore = firebase.firestore();
        try {
            let indprod = productId;
            console.log(indprod, "indprod");
            //hopefully return individual product from collection with ID that was passed
            let singleProduct = await firestore.collection('products').doc(indprod).get();
            console.log(singleProduct, "snapshotofSingle");
            console.log(singleProduct.data());
            return singleProduct.data();
} catch(error){
    console.log(error);
}
    }
}

export const addProductComment = (values, prodId, userId) => {
     return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        
        var storage = firebase.storage();
        try {
        var displayName = getState().firebase.auth.displayName;
        
        var storageRef = await storage.ref(`profile/${userId}`);
        console.log(storageRef, "this is the storage image")
       var downloadableImg = await storageRef.getDownloadURL();
       console.log(downloadableImg, "is this the url");



     await firebase.push(`product_review/${prodId}`, {values:values,
                                                      userId:userId,
                                                      downloadableImg:downloadableImg,
                                                      displayName:displayName});
        } catch(error){
            console.log(error);
        }
    }    
     }

    
export const getPhotoFromStorage = (userId) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) =>{
        var firebase = getFirebase();
        var storage = firebase.storage();
        try {
        var storageRef = await storage.ref(`profile/${userId}`);
        console.log(storageRef, "this is the storage image")
       var downloadableImg = await storageRef.getDownloadURL();
       console.log(downloadableImg, "is this the url");
       return downloadableImg;
        } catch (error){
            console.log(error);
        }
    
    }
}



export const getProductComments = (productId) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
        let comments = await firebase.database().ref(`product_review/${productId}`);
            console.log(comments, "this is the comments we want");
              return comments;
       
        
       }  
         catch (error){
            console.log(error);
        }
    }
}

export const calcProductRating = (productId) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            let comments = await firebase.database().ref(`product_review/${productId}`);
            

            comments.on('value', (snapshot)=> {
                console.log(snapshot.val(), "this is the rating snapshot!");
                const ratings = Object.values(snapshot.val());
                console.log(ratings, "is this the array yeah");
                const indRatings = ratings.map((rating)=>{
                    return rating.values.rating;
                });
                console.log(indRatings, "this is new array of ratings hopefully!");
                console.log(indRatings.length, "this is the length");
                
             return indRatings;
            });


            return commentData
        } catch (error) {
            console.log(error);
        }
    }
}

export const removeComment = (prodId, commentId) => {
    return async (dispatch, getState, {getFirebase}) => {
        try {
        const firebase = getFirebase();
        console.log(prodId, commentId, "have the 2 vals come accross");
      let delComment =  await firebase.database().ref(`product_review/${prodId}/${commentId}`).remove();
        } catch (error) {
            console.log(error);
        }
    }
}

