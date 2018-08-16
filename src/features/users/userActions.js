import  firebase  from '../../firebase/firebase';

export const follow = (usersDisplayName, matchParamsId) => async (dispatch, getState, {getFirestore}) =>  {

            let toFollowUser;
            let currentUser;
      let arrVals = Object.entries(usersDisplayName);
             toFollowUser = arrVals.filter((user) =>{
                return user[0] === matchParamsId;
            })
            console.log(toFollowUser, "this is the new follow user");


             currentUser = arrVals.filter((user) => {
            return user[0] === getState().firebase.auth.uid;
        })

    const firestore = getFirestore();
    const following = {
      displayPhoto: toFollowUser[0][1].displayPicture || 'assets/user.png',
      displayName:toFollowUser[0][1].displayName || 'Unknown'
    };
    console.log(currentUser, "this is the cur user in followfunction");
    console.log(toFollowUser, "this is the user id of the user we have clicked on photo")
    try {
      await firestore.set({
        collection: 'users',
        doc: currentUser[0][0],
        subcollections:  [{collection:'following', doc:matchParamsId}]
      }, following );
        console.log("succesfully followed!");
    } catch (error) {
      console.log(error);
    }
}  

export const unfollow = (currentUser, visitedProfile) => async (dispatch, getState, {getFirestore}) => {
            const firestore = getFirestore();
            try {
              console.log("is this happening");
              await firestore.delete({
                collection:'users',
                doc:currentUser,
                subcollections: [{collection:'following', doc:visitedProfile}]
              })
              } catch(error){
                console.log(error);
              }
            }              



















export const checkFollow = (lookUpUser, currentUser) => async (dispatch, getState, {getFirestore}) => {
            const firestore = firebase.firestore();
            try {
              console.log(lookUpUser,"this is the look up user");
                const docRef = await firestore.collection('users').doc(lookUpUser).collection('followers').get();
              
                console.log(docRef, "this is the docref");
                const docs = docRef.docs;
                console.log(docs);
                const indDocs = docs.filter(doc => {
                 return doc.id === currentUser;
                });

                if(indDocs.length >0){
                  console.log(indDocs, "your in there");
                  return true;
                } else {
                  console.log("not a follower!");
                  return false;
                };


            } catch (error) {
              console.log(error);
            }
}