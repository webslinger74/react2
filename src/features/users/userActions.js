export const followOrUnfollow = (usersDisplayName, matchParamsId, followStatus) => async (dispatch, getState, {getFirestore}) =>  {

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
      photoURL: toFollowUser[0][1].displayPicture || 'assets/user.png',
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

      if(followStatus){
          followStatus = false;
          console.log("turning to false!", followStatus);
          return followStatus;
      } else {
          console.log("Turning to true", followStatus);
          followStatus = true;
      }
    } catch (error) {
      console.log(error);
    }
}  