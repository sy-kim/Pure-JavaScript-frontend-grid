/**
 * Create dialog function class
 */
export default class Dialog {
  constructor(config) {
    this.container = config.container;
    this.title = config.title;
    this.contents = config.contents;
    this.confirmButton = config.confirmButton;
    this.cacelButton = config.cacelButton;
    this.width = config.width;
    this.height = config.height;
    this.showButton = config.showButton;

    this.init();
  }

  init() {
    let container = document.getElementById(this.container);
    let dialogTag = document.createElement("dialog");
    //container.className = "wrapper";

    let dialogTitle = document.createElement("header");
    dialogTitle.innerText = this.title;
    dialogTitle.className = "header";

    let dialogContents = document.createElement("div");
    Object.assign(dialogContents, {
      id: "innogrid_dialog_contents",
      innerHTML: this.contents,
    });

    let dialogFooter = document.createElement("footer");
    dialogFooter.className = "footer";

    let dialogFooterBox = document.createElement("div");
    Object.assign(dialogFooterBox.style, {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "2px",
    });

    let dialogConfirmButton = document.createElement("button");
    Object.assign(dialogConfirmButton, {
      id: "innogrid_dialog_confirm_button",
      innerText: "확인",
    });

    // Dialog confirm button event listener
    dialogConfirmButton.addEventListener("click", () => {
      this.confirmButton(dialogTag);
    });

    let dialogCancelButton = document.createElement("button");
    Object.assign(dialogCancelButton, {
      id: "innogrid_dialog_confirm_button",
      innerText: "취소",
    });

    // Dialog cancel button event listener
    dialogCancelButton.addEventListener("click", () => {
      this.cacelButton(dialogTag);
    });

    // Confirm button
    dialogFooterBox.appendChild(dialogConfirmButton);
    // Cancel button
    dialogFooterBox.appendChild(dialogCancelButton);
    // Footer box add childrens
    dialogFooter.appendChild(dialogFooterBox);
    // Dialog title
    dialogTag.appendChild(dialogTitle);
    // Dialog contents
    dialogTag.appendChild(dialogContents);
    // Dialog footer
    dialogTag.appendChild(dialogFooter);
    // Dialog container
    container.appendChild(dialogTag);

    // Sample dialog show button
    this.showButton.addEventListener("click", function (event) {
      if (typeof dialogTag.showModal === "function") {
        dialogTag.showModal();
      } else {
        alert("The <dialog> API is not supported by this browser");
      }
    });
  }
}
