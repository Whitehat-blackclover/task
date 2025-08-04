const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

// Flag values
const flag1 = "DARKLEAK{xavir_kale}";
const flag2 = "DARKLEAK{blackriver_bank}";
const flag3 = "DARKLEAK{SQL_INJECTION_COMPLETED_ACCESS_GRANTED}";

let phase = 1;

let intro = [
  "Welcome to the Executive Recuritments for CyberSecurity",
  "This will determine your destiny in this DC X GDG",
  "I am Mr.X ",
  "My true name is in the open write fetch_message to get the file",
  "But there is an issue my child nobody can ready it",
  "Can You?",
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
      "Here's a little help : https://www.youtube.com/watch?v=jD6ZuQAPelg",
    ]);
    window.open("agent_message.txt", "_blank");
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
        "Take a screen shot of this and send to admins on the group"
      ]);
      phase = 2;
    }

    // Flag 2
    else if (submittedFlag === flag2 && phase === 2) {
      print([
        "Second Flag Verified!",
        "Great work detective, you're nearly there..."
      ]);
      phase = 3;
    }

    // Flag 3
    else if (submittedFlag === flag3 && phase === 3) {
      print([
        "✅ All flags submitted!",
        "Access Granted to Mr.X's Vault.",
        "You have successfully completed the CyberSecurity recruitment!"
      ]);
      phase = 4;
    }

    else {
      print(["❌ Incorrect flag or wrong phase. Try again."]);
    }
  }

  else if (cmd === "download_logs" && phase === 2) {
    print([
      "Downloading leaked_logs.zip...",
      "Use your terminal tools to grep for keywords.",
      "You're looking for a bank name connected to illicit transactions.",
    ]);
    window.open("logs.zip", "_blank");
  }

  else if (cmd === "dckx") {
    print([
      "This would normally get you disqualified, but we'll allow it.",
      "🧪 Vaccination is important. My 327th son is called Bobby.",
      "Answer: Robert'); DROP TABLE students;--",
      "💉 Reference: https://xkcd.com/327",
      "This is a classic SQL Injection joke. Remember: Never trust user input!"
    ]);
  }

  else if (cmd === "help") {
    print([
      "Available commands:",
      "fetch_message     - Download the agent's encrypted message",
      "download_logs     - Get the logs to investigate (after Flag 1)",
      "submit FLAG       - Submit the decrypted flag (e.g. submit DARKLEAK{...})"
    ]);
  }

  else {
    print(["Unknown command. Type 'help' for a list of commands."]);
  }
}
