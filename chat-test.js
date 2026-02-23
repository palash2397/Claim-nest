import io from "socket.io-client";

const userAToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODcyYjc0NjRhZDIxYTQ5Yzg1NjZlYyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc3MTgzNjQ2NywiZXhwIjoxNzcyNzAwNDY3fQ.C0AGDuWjEM8rOtnm4io13XOrHIF6q7V1KHm88UMdK2Q";
const userBToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGRhOGYxYjVjNWQzNTZhN2E5MzgyMyIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzcxODM2NDg0LCJleHAiOjE3NzI3MDA0ODR9.9ODwBX4NvuwH_t6CTgft5iDDWkxHSs-qoh1Li6Eixlw";
const conversationId = "699c14ad50fc6d00fe628cfa";

// Connect User A
const userA = io("http://localhost:4004", {
  auth: { token: userAToken }
});

// Connect User B
const userB = io("http://localhost:4004", {
  auth: { token: userBToken }
});

// Join room
userA.on("connect", () => {
  console.log("User A connected");
  userA.emit("joinConversation", conversationId);
});

userB.on("connect", () => {
  console.log("User B connected");
  userB.emit("joinConversation", conversationId);
});

// Listen for messages
userB.on("receiveMessage", (msg) => {
  console.log("User B received:", msg);
});

// Send message from A
setTimeout(() => {
  userA.emit("sendMessage", {
    conversationId,
    content: "Hello from A"
  });
}, 2000);