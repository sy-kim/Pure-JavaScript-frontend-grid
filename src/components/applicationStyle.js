export default class AppStyle {
  constructor() {
    this.init();
  }

  init() {
    let styleSheet = document.createElement("style");

    styleSheet.innerHTML = `
    .theme-light {
        --color-primary: #0060df;
        --color-secondary: #fbfbfe;
        --color-accent: #fd6f53;
        --font-color: #000000;
     }
     .theme-dark {
        --color-primary: #17ed90;
        --color-secondary: #243133;
        --color-accent: #12cdea;
        --font-color: #ffffff;
     }
    `;
    document.head.appendChild(styleSheet);

    const setTheme = (theme) => (document.documentElement.className = theme);
  }
}
