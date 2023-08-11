import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://message-board-5c4dd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messageListinDB = ref(database, "messageList")

const inputFieldEl = document.getElementById("msg-area")
const publishbutton = document.getElementById("publish-btn")
const messages = document.getElementById("endorsement-msgs")

publishbutton.addEventListener("click",()=>{
    let inputValue = inputFieldEl.value
    
    push(messageListinDB, inputValue)
    
    clearInputFieldEl()
})

onValue(messageListinDB, function(snapshot) {
    if (snapshot.exists()) {
        let msgsArray = Object.entries(snapshot.val())
    
        clearmessages()
        
        for (let i = 0; i < msgsArray.length; i++) {
            let currentmsg = msgsArray[i]
            let currentmsgID = currentmsg[0]
            let currentmsgValue = currentmsg[1]
            
            appendItemTomessages(currentmsg)
        }    
    } else {
        messages.innerHTML = "No endorsements here... yet"
    }
})

function clearmessages() {
    messages.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemTomessages(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `messageList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    messages.append(newEl)
}