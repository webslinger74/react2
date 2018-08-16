const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



exports.userFollowing = functions.firestore
    .document('users/{followerUid}/following/{followingUid}')
    .onCreate((event, context) => {
        console.log({event});
        console.log({ context });
        console.log('v1');
        const followerUid = context.params.followerUid;
        const followingUid = context.params.followingUid;

        const followerDoc = admin 
        .firestore()
        .collection('users')
        .doc(followerUid);

        return followerDoc.get().then(doc => {
            let userData = doc.data();
            console.log({ userData });
            let follower = {
                displayName: userData.displayName,
                displayPhoto : userData.displayPicture|| '/assets/user.png',
            };
            return admin
            .firestore()
            .collection('users')
            .doc(followingUid)
            .collection('followers')
            .doc(followerUid)
            .set(follower);
        });
    });

exports.stopFollowing = functions.firestore
    .document('users/{followerUid}/following/{followingUid}')
    .onDelete((event, context) => {
        return admin
        .firestore()
        .collection('users')
        .doc(context.params.followingUid)
        .collection('followers')
        .doc(context.params.followerUid)
        .delete()
        .then(()=> {
            return console.log('doc deleted');
        })
        .catch(error => {
            return console.log(error);
        });
    });
