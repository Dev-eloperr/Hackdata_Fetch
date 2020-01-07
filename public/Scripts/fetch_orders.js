
$(document).ready(function() {
    console.log("fetching...");
    var count = 0;

    if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
    firebase.initializeApp({
        "projectId": "hackdata-3db9b",
        "appId": "1:405958797889:web:2b95d7d48fe59b2cdeb4c0",
        "databaseURL": "https://hackdata-3db9b.firebaseio.com",
        "storageBucket": "hackdata-3db9b.appspot.com",
        "locationId": "asia-northeast1",
        "apiKey": "AIzaSyAIk17fkMiY9nWF_2i5I1nyUiFo4acrkAA",
        "authDomain": "hackdata-3db9b.firebaseapp.com",
        "messagingSenderId": "405958797889"
    });

    const db = firebase.firestore();

    $( "#myform" ).submit(function( event ) {
        event.preventDefault();
        $("myform").css("display", "none");
    const form1 = document.getElementById("myform");
    firebase.auth().signInWithEmailAndPassword(form1.em.value, form1.pa.value).then(function (user) {
        // user signed in
        const db_ref = db.collection('applicants');
        db_ref.onSnapshot(function (querySnapshot) {
            var orders = [];

            querySnapshot.docChanges().forEach(function (change) {
                orders.push(change.doc.data());
                if (change.type === "added") {
                    document.getElementById('orders-wrapper').insertAdjacentHTML('beforeend', '<tr id="' + change.doc.data().uniqueid + '">' +
                        '<th class="count"></th>' +

                        '<th>' + change.doc.data().teamname + '</th><th>' + change.doc.data().email1 + '</th><th>' + change.doc.data().email2 + '</th><th>' + change.doc.data().email3 + '</th></tr>');
                    count = count + 1;
                    if (count === 1)
                        document.getElementById('spin').remove();
                }
                reset_count();
            });
            console.log(orders);

        });

        function reset_count() {
            let i = 1;
            document.querySelectorAll('.count').forEach(function (element) {
                element.innerHTML = i;
                i = i + 1;
            });
            i = 1;
        }


    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
});


});