let auth = firebase.auth();
let db = firebase.database();

auth.signInAnonymously();

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid);
    }
});

$('#chatbox').on('submit', function (e) {
    e.preventDefault();
    let msg = $('#msg').val();
    if (msg) {
        $('#msg').val('');
        $('#chats').append(`<p>${msg}</p>`);
    }
});