document.body.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    const now = new Date();
    document.getElementById("time-log").append(now.getTime() + "\n");
  }
});
