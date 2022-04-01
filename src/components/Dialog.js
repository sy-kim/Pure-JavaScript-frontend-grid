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

    container.className = "wrapper";

    console.log("Container class Name = ", container.className);

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
      //height: "32px",
      marginRight: "2px",
    });

    let dialogConfirmButton = document.createElement("button");
    Object.assign(dialogConfirmButton.style, {
      height: "30px",
      marginTop: "2px",
    });
    Object.assign(dialogConfirmButton, {
      id: "innogrid_dialog_confirm_button",
      innerText: "확인",
    });

    dialogConfirmButton.addEventListener("click", () => {
      this.confirmButton(dialogTag);
    });

    let dialogCancelButton = document.createElement("button");
    Object.assign(dialogCancelButton.style, {
      height: "30px",
      marginLeft: "2px",
      marginTop: "2px",
      backgroundColor: "gray",
    });
    Object.assign(dialogCancelButton, {
      id: "innogrid_dialog_confirm_button",
      innerText: "취소",
    });

    dialogCancelButton.addEventListener("click", () => {
      this.cacelButton(dialogTag);
    });

    dialogFooterBox.appendChild(dialogConfirmButton);
    dialogFooterBox.appendChild(dialogCancelButton);

    dialogFooter.appendChild(dialogFooterBox);

    dialogTag.appendChild(dialogTitle);
    dialogTag.appendChild(dialogContents);
    dialogTag.appendChild(dialogFooter);

    container.appendChild(dialogTag);

    this.showButton.addEventListener("click", function (event) {
      if (typeof dialogTag.showModal === "function") {
        dialogTag.showModal();
      } else {
        alert("The <dialog> API is not supported by this browser");
      }
    });
  }
}
