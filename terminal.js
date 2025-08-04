const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

// Flag values
const flag1 = "DARKLEAK{xavir_kale}";
const flag2 = "DARKLEAK{DROP TABLE students;--}";
const flag3 = "DARKLEAK{alibaug}";

let phase = 1;

let intro = [
  "Welcome to the Executive Recruitments for CyberSecurity",
  "This will determine your destiny in this DC X GDG",
  "I am Mr.X",
  "My true name is in the open. Type 'fetch_message' to get the file.",
  "But there is an issue, my child... nobody can read it.",
  "Can you?",
  ""
];

function print(lines) {
  if (typeof lines === "string") lines = [lines];
  lines.forEach(line => {
    terminal.innerHTML += line + "\n";
  });
  terminal.scrollTop = terminal.scrollHeight;
}

print(intro);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    terminal.innerHTML += "> " + cmd + "\n";
    handleCommand(cmd);
    input.value = "";
  }
});

function handleCommand(cmd) {
  if (cmd === "fetch_message" && phase === 1) {
    print([
      "Downloading agent_message.txt...",
      "Can you decrypt it?",
    ]);
    window.open("agent_message.txt", "_blank");
  }

  else if (cmd === "sql_hint" && phase === 2) {
    print([
      "🧪 We're querying the wrong database... or are we?",
      "Here's what we got back from the logs:",
      "",
      "🧠 This reminds me of someone. Bobby... Bobby Tables.",
      "Figure out what was dropped and format it as a flag.",
      "xkcd.com/327",
      ""
    ]);
  }


  else if (cmd === "get_image" && phase === 3) {
    print([
      "Here's an image for you to investigate...",
      "Try looking *deeper*. Metadata matters.",
    ]);
    window.open("image.png", "_blank"); // You’ll host/upload this image
  }

  else if (cmd.startsWith("submit")) {
    const parts = cmd.split(" ");
    if (parts.length !== 2) {
      print(["❌ Invalid syntax. Use: submit DARKLEAK{...}"]);
      return;
    }

    const submittedFlag = parts[1];

    // Flag 1
    if (submittedFlag === flag1 && phase === 1) {
      print([
        "First Flag Completed!",
        "Take a screenshot and send it to the admins.",
        "You're ready for the next step. Type 'sql_hint' to proceed."
      ]);
      phase = 2;
    }

    // Flag 2
    else if (submittedFlag === flag2 && phase === 2) {
      print([
        "Second Flag Verified!",
        "Clever detective work!",
        "Now, can you find the final piece? Type 'get_image' to continue."
      ]);
      phase = 3;
    }

    // Flag 3
    else if (submittedFlag === flag3 && phase === 3) {
      print([
        "✅ All flags submitted!",
        "You have outsmarted the digital veil.",
        "Access Granted to Mr.X's Vault. Recruitment Complete!"
      ]);
      phase = 4;
    }

    else {
      print(["❌ Incorrect flag or wrong phase. Try again."]);
    }
  }

  else if (cmd === "help") {
    print([
      "Available commands:",
      "fetch_message     - Download the agent's encrypted message (Flag 1)",
      "sql_hint          - Get an SQL injection clue (Flag 2)",
      "get_image         - Download the image to investigate (Flag 3)",
      "submit FLAG       - Submit the decrypted flag (e.g. submit DARKLEAK{...})"
    ]);
  }


  else {
    print(["Unknown command. Type 'help' for a list of commands."]);
  }
}
