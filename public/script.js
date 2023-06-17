const socket = io();
const btn = document.querySelector('#btn')
const msg = document.querySelector('#msg')
const btn1 = document.querySelector('#btn1');
const username = document.querySelector('#username')
const profile = document.querySelector('.profile')
const signup = document.querySelector('.signup')
const chatbox = document.querySelector('.chatbox')
chatbox.classList.add('hide')
var room ="";
btn1.addEventListener('click', (ev) => {
    if (username.value == "")
        return;

    signup.classList.add('hide')
    chatbox.classList.remove('hide')

    socket.emit('signup', {
        username: username.value
    })
    const div = document.createElement('div')
    div.innerHTML = `<p><b> Your name : </b> ${username.value} </p>`
    profile.append(div)
})
socket.on("loggedIn", (msg) => {
    console.log(msg);
})

btn.addEventListener('click', (ev) => {
    console.log("send message")
    if (msg.value == "")
        return;
    if (!room) {
        console.log("not room")
        socket.emit("msg", {
            msg: msg.value,
            id: socket.id
        })
    }
    else{
        console.log("hai room")
        socket.emit("msg1", {
            msg: msg.value,
            id: socket.id
        })
    }
    msg.value = ""
})

socket.on("reply", (msg) => {
    // console.log(msg.msg,msg.senderId)
    const msgList = document.querySelector('.msgList')
    let li = document.createElement('div')

    li.innerHTML = `<li class="msg-item"> 
    <b class="sender-name"> ${msg.senderId} :</b>
    ${msg.msg.msg}
</li>`

    msgList.append(li)

})
// sms, emails, wp triggers, push notifications
// doc m likha hua h konse action pr konse noti jayenge

const btn2 = document.querySelector('#btn2');
btn2.addEventListener('click', (ev) => {
    room = document.querySelector('#roomname').value
    socket.emit('room', room)
})