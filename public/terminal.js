const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

let phase = 1;

// Initial welcome message
const intro = [
  "Welcome to the Executive Recruitments for CyberSecurity.",
  "This will determine your destiny.",
  "I am Mr. X.",
  "Your first task is to find my real name.",
  "Type 'fetch_message' to get a clue.",
  "Type 'help' for a list of all available commands.",
  ""
];

// Command suggestions
const suggestions = {
  help: [
    "Available commands:",
    "  submit DARKLEAK{...}   - Submit a flag for the current phase.",
    "  fetch_message          - Get the encrypted message for Phase 1.",
    "  download_image         - Download the image for Phase 2.",
    "  sql_hint               - Get a hint for the SQL injection challenge (Phase 3).",
    "  osint_hint             - Get a hint for the OSINT challenge (Phase 4).",
    "  clear                  - Clear the terminal screen.",
    "  help                   - Show this list of commands."
  ]
};

// --- Terminal Output Functions ---

// Prints a single line to the terminal
const print = (text, isCommand = false) => {
  const line = document.createElement("div");
  line.className = 'message';
  if (isCommand) {
      line.innerHTML = `<span class="prompt">&gt;</span> ${text}`;
  } else {
      line.textContent = text;
  }
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
};

// Prints multiple lines with a delay for a typewriter effect
const printLines = async (lines, delay = 50) => {
  for (const line of lines) {
    print(line);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};


// --- Command Handling ---

const processCommand = async (command) => {
  const args = command.trim().split(" ");
  const cmd = args[0].toLowerCase().trim();
  print(command, true); // Echo the command

  if (!cmd) return;

  switch (cmd) {
    case "submit":
      const flag = args.slice(1).join(" ");
      if (!/^DARKLEAK\{[^}]+\}$/.test(flag)) {
        print("❌ Invalid syntax. Use: submit DARKLEAK{...}");
        return;
      }
      await validateFlag(flag);
      break;

    case "fetch_message":
       if (phase !== 1) {
            print("⚠️ This command is for Phase 1 only.");
            return;
       }
      print("📂 Fetching: agent_message.txt...");
      try {
        const res = await fetch("agent_message.txt");
        const text = await res.text();
        print(`Encrypted Message: ${text.trim()}`);
        print("Hint: It's a simple substitution cipher.");
      } catch (e) {
        print("⚠️ Could not fetch agent_message.txt. Make sure the file is present.");
      }
      break;

    case "download_image":
       if (phase !== 2) {
            print("⚠️ This command is for Phase 2 only.");
            return;
       }
      print("🖼️ Downloading image: get-3 (1).jpg...");
      window.open("get-3 (1).png", "_blank");
      break;

    case "sql_hint":
       if (phase !== 3) {
            print("⚠️ This command is for Phase 3 only.");
            return;
       }
      print("💡 Hint: This would normally get you disqualified, but we'll allow it. PS Vaccination is important. My 327th son is called Bobby.");
      break;

    case "osint_hint":
       if (phase !== 4) {
            print("⚠️ This command is for Phase 4 only.");
            return;
       }
      print("💡 Hint: The Club's Head of Cybersecurity likes travelling a lot. We are unable to reach him most of the time. He says he is unwell and at home. Could you find his Instagram account and see where he is at the moment.");
      break;

    case "help":
      await printLines(suggestions.help);
      break;
      
    case "clear":
      terminal.innerHTML = "";
      break;

    default:
      print(`❓ Unknown command: ${cmd}. Type 'help' for available commands.`);
  }
};

// --- API Communication ---

async function validateFlag(flag) {
    try {
        const res = await fetch("/api/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ flag, phase })
        });

        if (!res.ok) {
            throw new Error(`Server responded with status: ${res.status}`);
        }

        const data = await res.json();

        if (data.correct) {
            await printLines(data.message);
            phase = data.nextPhase;
        } else {
            print("❌ Incorrect flag. Try again.");
        }
    } catch (e) {
        console.error("Validation Error:", e);
        print("⚠️ Error submitting flag. Could not connect to the validation server. Please try later.");
    }
}


// --- Event Listener ---

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value;
    input.value = "";
    processCommand(command);
  }
});

// --- Initial Load ---

window.onload = () => {
  printLines(intro);
};
