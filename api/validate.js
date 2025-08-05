export default function handler(req, res) {
    // Ensure the request is a POST request
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { flag, phase } = req.body;
  
    // --- Define the flags for each phase ---
    // Storing answers on the backend is crucial for security.
    const flags = {
      1: "DARKLEAK{pavier_kale}",
      2: "DARKLEAK{clusterc0der}",
      3: "DARKLEAK{Robert'); DROP TABLE students;--}",
      4: "DARKLEAK{alibaug}"
    };
  
    const currentPhase = parseInt(phase, 10);
    const correctFlag = flags[currentPhase];
    let isCorrect = false;
  
    // --- Validate the submitted flag ---
    if (correctFlag) {
      // Case-insensitive comparison for robustness
      isCorrect = flag.toLowerCase() === correctFlag.toLowerCase();
    }
  
    let message = [];
    const nextPhase = currentPhase + 1;
  
    // --- Prepare the response message ---
    if (isCorrect) {
      switch (currentPhase) {
        case 1:
          message = [
            "✅ Flag 1 Correct! You've uncovered my identity.",
            "Now for your next challenge. A picture holds the key.",
            "Type 'download_image' to proceed."
          ];
          break;
        case 2:
          message = [
            "✅ Flag 2 Correct! You've proven your worth in analysis.",
            "Now, a test of your technical prowess.",
            "Type 'sql_hint' to get your next objective."
          ];
          break;
        case 3:
          message = [
            "✅ Flag 3 Correct! A classic, but effective. Little Bobby Tables would be proud.",
            "For your final task, you'll need to think outside the box.",
            "Type 'osint_hint' for your final briefing."
          ];
          break;
        case 4:
          message = [
            "✅ Final Flag Correct! Excellent work, agent.",
            "You have successfully completed the recruitment challenge.",
            "Welcome to DarkLeak."
          ];
          break;
      }
    }
  
    // --- Send the response ---
    if (isCorrect) {
      res.status(200).json({ correct: true, message, nextPhase });
    } else {
      res.status(200).json({ correct: false });
    }
  }
  
