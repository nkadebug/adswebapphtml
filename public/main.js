let auth = firebase.auth();
let db = firebase.database();

const usersRef = db.ref('users');
const chatsRef = db.ref('chats');

let uid = null;
let to = 'nka';

auth.signInAnonymously();

auth.onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    usersRef.child(uid).child('status').set('Online');
    usersRef
      .child(uid)
      .child('status')
      .onDisconnect()
      .set('Offline at ' + new Date().getTime());
  } else {
    uid = null;
  }
});

$('#chatbox').on('submit', function (e) {
  e.preventDefault();
  let msg = $('#msg').val();
  if (msg) {
    $('#msg').val('');
    $('#chats').append(`<p class='right'>${msg}</p>`);
    chatsRef.push({ msg, from: uid, to, ts: new Date().getTime() });
  }
});
