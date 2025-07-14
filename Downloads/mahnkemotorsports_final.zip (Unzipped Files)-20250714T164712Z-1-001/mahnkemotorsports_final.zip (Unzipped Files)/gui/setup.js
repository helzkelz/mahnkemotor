document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h1>Minky Setup Wizard</h1>
    <form id="wizard-form">
      <label>Project Name:<br><input type="text" name="project" required></label><br><br>
      <label>Theme Color:<br><input type="color" name="theme" value="#39ff14"></label><br><br>
      <label>Enable Gallery:<br><input type="checkbox" name="gallery" checked></label><br><br>
      <button type="submit">Generate Config</button>
    </form>
    <pre id="output"></pre>
  `;

  const form = document.getElementById("wizard-form");
  const output = document.getElementById("output");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const config = {
      project: data.get("project"),
      themeColor: data.get("theme"),
      galleryEnabled: data.get("gallery") === "on"
    };
    output.textContent = JSON.stringify(config, null, 2);
  });
});
