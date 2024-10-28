document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chatIcon");
    const chatbot = document.getElementById("chatbot");
    const chatbox = document.getElementById("chatbox");
    const chatOptions = document.getElementById("chat-options");
    const closeChatButton = document.getElementById("close-chat");
    const clearChatButton = document.getElementById("clear-chat");

    // Function to simulate typing animation
    function typeWriter(text, isUserMessage, callback) {
        let index = 0;
        const typingSpeed = 60;
        const p = document.createElement("p");

        p.classList.add(isUserMessage ? "user-message" : "bot-message");
        chatbox.appendChild(p);
        chatbox.scrollTop = chatbox.scrollHeight;

        function type() {
            if (index < text.length) {
                p.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    function displayMessage(message, isUserMessage = false, callback) {
        typeWriter(message, isUserMessage, callback);
    }

    function showOptions(options) {
        chatOptions.innerHTML = "";
        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option.text;
            button.addEventListener("click", function () {
                displayMessage(`You: ${option.text}`, true);
                setTimeout(() => {
                    displayMessage(option.response);
                    if (option.followUp) {
                        showOptions(option.followUp);
                    }
                }, 500);
            });
            chatOptions.appendChild(button);
        });
    }

    function handleUnknownQuestion() {
        displayMessage("I’m not sure how to answer that. Can you try something else?");
    }

    function processUserQuestion(inputText) {
        const recognizedOptions = {
            " Who are you ": "My Name is Sinethemba Vitsha, I do Full Stack Development.",
            " What do you do ": "I specialize in building web applications.",
            " What is your tech stack ": "HTML, CSS, JavaScript, React.js, Java, and Spring Boot.",
            " Industry Exprience ": "2 Years of Experience",
            " How can i contact you ": "You can contact me via email, phone, or LinkedIn."
        };

        const response = recognizedOptions[inputText.toLowerCase()];
        if (response) {
            displayMessage(response);
        } else {
            handleUnknownQuestion();
        }
    }

    function startChat() {
        chatbox.innerHTML = ""; // Clear previous messages when starting chat
        displayMessage("Hello, I'm Sine the chatbot. How can I help you?", false, function () {
            showOptions([
                { text: "Who are you ", response: "My Name is Sinethemba Vitsha, I do Full Stack Development." },
                { text: "What do you do ", response: "I specialize in building web applications." },
                { text: "What is your tech stack ", response: "HTML, CSS, JavaScript, React.js, Java, and Spring Boot." },
                { text: "Industry Exprience ", response: "2 Years of Experience" },
                {
                    text: "How can I contact you?",
                    response: "How would you like to contact me?",
                    followUp: [
                        { text: "Email", response: "You can contact me via email: Maxwellsucksatcode@gmail.com." },
                        { text: "Personal Number", response: "You can contact me via Phone Number: 063 921 8642." },
                        { text: "LinkedIn", response: "You can reach me on LinkedIn:https://www.linkedin.com/in/sinethemba-vitsha-1620b1259/" }
                    ]
                }
            ]);
        });
    }

    // Event listener for the chat icon
    chatIcon.addEventListener("click", function () {
        chatbot.style.display = "block";
        chatIcon.style.display = "none";
        startChat();
    });

    // Event listener for closing the chat
    closeChatButton.addEventListener("click", function () {
        chatbot.style.display = "none";
        chatIcon.style.display = "block";
        chatbox.innerHTML = ""; // Clear chat messages for the next session
    });

    // Event listener for clearing the chat
    clearChatButton.addEventListener("click", function () {
        chatbox.innerHTML = ""; // Only clear chat messages without closing
        startChat(); // Show the initial question set again
    });

    // Event listener for handling user questions (typing or other input)
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && chatOptions.children.length === 0) {
            const userQuestion = chatbox.lastElementChild.textContent.replace("You: ", "").trim();
            processUserQuestion(userQuestion);
        }
    });
});
