document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("downloadButton").addEventListener("click", function () {
      var a = document.createElement("a");
      a.href = "./CV.pdf";
      a.download = "CV.pdf";
      a.click();
    });
  });

  
  document.addEventListener("DOMContentLoaded", function() {
    const text = "Hi. I’m Sinethemba Vitsha.\nA Full Stack Developer.";
    const typewriterText = document.getElementById("typewriter-text");
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            if (text.charAt(index) === "\n") {
                typewriterText.innerHTML += "<br>";
            } else {
                typewriterText.innerHTML += text.charAt(index);
            }
            index++;
            setTimeout(typeWriter, 100); // Adjust speed here (lower value = faster typing)
        }
    }

    typeWriter();
});



document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chatIcon");
    const chatbot = document.getElementById("chatbot");
    const chatbox = document.getElementById("chatbox");
    const chatOptions = document.getElementById("chat-options");
    const closeChatButton = document.getElementById("close-chat");

    // Function to simulate typing animation
    function typeWriter(text, callback) {
        let index = 0;
        const typingSpeed = 50;
        
        function type() {
            if (index < text.length) {
                chatbox.lastElementChild.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    // Show message with typing effect
    function displayMessage(message, callback) {
        const p = document.createElement("p");
        chatbox.appendChild(p);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto scroll to bottom
        typeWriter(message, callback);
    }

    // Show options for the user to select
    function showOptions(options) {
        chatOptions.innerHTML = ""; 
        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option.text;
            button.addEventListener("click", function () {
                displayMessage(`You: ${option.text}`);
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

    // Start chat sequence
    function startChat() {
        displayMessage("Hello, I'm Sne the chatbot. How can I help you?", function () {
            showOptions([
                { text: "Who are you?", response: "I’m Sinethemba Vitsha, a Full Stack Developer." },
                { text: "What do you do?", response: "I specialize in building web applications." },
                { text: "How can I contact you?", response: "How would you like to contact me?", followUp: [
                    { text: "Email", response: "You can contact me via email: sinethemba@example.com." },
                    { text: "LinkedIn", response: "You can reach me on LinkedIn: linkedin.com/in/sinethemba-vitsha" }
                ] }
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
        // Display confirmation options
        displayMessage("Are you done chatting? (Yes/No)");
        
        // Show Yes/No options for closing
        showOptions([
            { text: "Yes", response: "Thank you! Have a great day.", action: "close" },
            { text: "No", response: "Okay, I'll be here when you need me!", action: "collapse" }
        ]);
    });

    // Override the showOptions function to add actions (close/collapse)
    function showOptions(options) {
        chatOptions.innerHTML = "";
        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option.text;
            button.addEventListener("click", function () {
                displayMessage(`You: ${option.text}`);
                setTimeout(() => {
                    displayMessage(option.response);
                    if (option.action === "close") {
                        setTimeout(() => {
                            chatbot.style.display = "none";
                            chatIcon.style.display = "block";
                            chatbox.innerHTML = ""; // Clear chat messages
                        }, 1000);
                    } else if (option.action === "collapse") {
                        setTimeout(() => {
                            chatbot.style.display = "none";
                            chatIcon.style.display = "block"; // Just collapse the chat
                        }, 1000);
                    }
                }, 500);
            });
            chatOptions.appendChild(button);
        });
    }
});