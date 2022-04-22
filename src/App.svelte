<script>
  import { innoGrid } from "./components/innogrid";
  import { Button } from "sveltestrap/src";
  import { ajax, ajaxFetch } from "./components/ajax";
  import Dialog from "./components/Dialog";

  let domContainerState = false;
  window.addEventListener("DOMContentLoaded", (event) => {
    domContainerState = true;
    documentReady();
  });

  function setTheme(themeName) {
    localStorage.setItem("theme", themeName);

    console.log("Theme : ", localStorage.getItem("theme"));

    let documentElement = document.body;
    documentElement.classList.toggle("dark");

    console.log("ClassList : ", documentElement.classList);
  }

  function documentReady() {
    const gridConfiguration = {
      gridStyle: {
        gridWidth: "100%", // default auto
        headerHeight: "30px",
        headerBorderColor: "#e5e6e9",
        headerBackgroundColor: "#f8f9fb", // default header background color : "Gainsboro"
        sort: true, // false is all row display
        sortType: "asc", // asc or desc
        pagination: true,
        paginatorElement: document.getElementById("grid_paginator"),
        search: true,
        searchElement: document.getElementById("gridSearch"),
        searchPosition: "right",
        excelExport: true,
      },
      gridColumnDef: [
        {
          header: "번호",
          item: "index",
          width: "50px", // default min-size : 50
          type: "html",
          textAlign: "center",
          textColor: "BlueViolet",
        },
        {
          header: "이름",
          item: "name",
          width: "100px",
          type: "html",
          textAlign: "center",
          textColor: "green",
          sortable: true,
          filter: true,
        },
        {
          header: "숫자테스트",
          item: "number",
          width: "100px",
          type: "number",
          textAlign: "center",
          textColor: "red",
          sortable: true,
          filter: true,
        },
        { header: "이메일", item: "email", width: "200px", type: "email", textAlign: "center", textColor: "black" },
        {
          header: "전화번호",
          item: "phone",
          width: "100px",
          type: "phone",
          textAlign: "center",
          textColor: "DarkOrchid",
        },
        { header: "부서", item: "dept", width: "100px", type: "text", textAlign: "center" },
        { header: "팀이름은", item: "team", width: "100px", textAlign: "center" },
        {
          header: "테스트",
          item: "counter",
          width: "100px",
          type: "numberLocale",
          textAlign: "center",
          textColor: "Fuchsia",
        },
        {
          header: "체크박스",
          item: "checkbox",
          width: "100px",
          type: "checkBox",
          textAlign: "center",
          textColor: "red",
          // hide: true,
        },
        {
          header: "히든 테스트",
          item: "hiddentest",
          width: "100px",
          type: "text",
          textAlign: "center",
          textColor: "black",
          hide: false,
        },
      ],
    };

    let gridData = [
      {
        index: 1,
        number: 10,
        name: "김수영",
        email: "email/@email.com",
        phone: "01054019317",
        dept: "ICT 사업부",
        team: "ICT 개발팀",
        counter: 123456778,
        checkbox: '<input type="checkbox" name="color" value="blue">체크</label>',
        hiddentest: "display hidden test",
      },
      {
        index: 2,
        number: 30,
        name: "홍길동",
        email: "email@email.com",
        phone: "01054019317",
        dept: "ICT 사업부",
        team: "연구소",
        counter: 123456778,
        // 체크박스 타입을 지정하는것 TODO 작업해야함
        checkbox: '<input type="checkbox" name="color" value="blue">체크</label>',
        hiddentest: "display hidden test",
      },
      {
        index: 3,
        number: 40,
        name: "김선달",
        email: "email@email.com",
        phone: "01054019317",
        dept: "경영지원부",
        team: "인사관리팀",
        counter: 123456778,
        checkbox: '<input type="checkbox" name="color" value="blue">체크</label>',
        hiddentest: "display hidden test",
      },
      {
        index: 4,
        number: 4,
        name: `이것은`,
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배-연습으로",
        counter: -123456778,
        hiddentest: "display hidden test",
      },
      {
        index: 5,
        number: 5,
        name: "춘향이",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 6,
        number: 7,
        name: "춘향이",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 7,
        number: 20,
        name: "춘향이",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 8,
        number: 80,
        name: "춘향이",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 9,
        number: 90,
        name: "춘향이",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 10,
        number: 100,
        name: "your name",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 11,
        number: 111,
        name: "your name",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 12,
        number: 112,
        name: "your name",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 13,
        number: 113,
        name: "your name",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원분배",
      },
      {
        index: 14,
        number: 114,
        name: "your name",
        email: "email@email.com",
        phone: "01054019317",
        dept: "자원관리부",
        team: "자원테스트분배",
      },
    ];

    let table = document.getElementById("grid");
    innoGrid(table, gridData, gridConfiguration, true);

    // grid end

    // Dialog confirm button click event something TODO
    let dialogConfirm = function (dialogObject) {
      alert("dialogObject click :", dialogObject);
      dialogObject.close();
    };

    // Dialog cacel button click event something TODO
    let dialogCancel = function (dialogObject) {
      console.log("Dialog cacel button event : ");
      dialogObject.close();
    };

    let dialogConfig = {
      container: "dialogContainer",
      title: "다이얼로그 타이틀",
      contents: `<h2>Test Contents</h2>
                <p> 내용을 이렇게 사용할수 있으며 HTML tag 를 넣어서 사용할수있다</p>
               `,
      width: 600, // default width 600px
      height: 200, // default height 200px
      confirmButton: dialogConfirm,
      cacelButton: dialogCancel,
      showButton: document.getElementById("dialogButton"),
    };

    let dialog = new Dialog(dialogConfig);

    let themeSwitch = document.getElementById("switch");
    themeSwitch.addEventListener("click", function () {
      console.log("localStorage : ", localStorage.getItem("theme"));

      if (localStorage.getItem("theme") === "dark") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    });

    // Example async await function

    let url = "https://jsonplaceholder.typicode.com/users";
    requestURL(url).then((data) => {
      let getServerGridData = document.getElementById("getServerGridData");

      const gridConfiguration = {
        gridStyle: {
          gridWidth: "100%", // default auto
          headerHeight: "30px",
          headerBorderColor: "#e5e6e9",
          headerBackgroundColor: "#f8f9fb", // default header background color : "Gainsboro"
          sort: true, // false is all row display
          sortType: "asc", // asc or desc
          pagination: true,
          paginatorElement: document.getElementById("getServerGridData_paginator"),
          search: true,
          // searchElement: document.getElementById("gridSearch"),
          searchPosition: "right",
        },
        gridColumnDef: [
          {
            header: "아이디",
            item: "id",
            width: "70px", // default min-size : 50
            type: "number",
            textAlign: "center",
            textColor: "BlueViolet",
            sortable: true,
          },
          {
            header: "이름",
            item: "name",
            width: "50px", // default min-size : 50
            type: "html",
            textAlign: "left",
            textColor: "BlueViolet",
            sortable: true,
          },
          {
            header: "FirstName",
            item: "username",
            width: "50px", // default min-size : 50
            type: "html",
            textAlign: "left",
            textColor: "BlueViolet",
          },
          {
            header: "이메일",
            item: "email",
            width: "150px", // default min-size : 50
            type: "email",
            textAlign: "left",
            textColor: "black",
          },
          {
            header: "전화번호",
            item: "phone",
            width: "150px", // default min-size : 50
            type: "text",
            textAlign: "right",
            textColor: "black",
          },
          {
            header: "WebSite",
            item: "website",
            width: "250px", // default min-size : 50
            type: "html",
            textAlign: "left",
            textColor: "BlueViolet",
          },
          {
            header: "주소",
            item: {
              subKey: "address",
              displayItems: ["street", "city", "zipcode"],
            },
            width: "250px", // default min-size : 50
            type: "address",
            textAlign: "left",
            textColor: "BlueViolet",
          },
        ],
      };

      innoGrid(getServerGridData, data, gridConfiguration, true);
    });

    // Excel export test
    let excelExportButton = document.getElementById("excelExportButton");

    excelExportButton.addEventListener("click", function (event) {
      //fs.readFile("./main.js", (err, data) => {});
    });
  }

  async function requestURL(url) {
    let response = await fetch(url);
    let resultData = await response.json();
    return resultData;
  }
</script>

<!-- <Styles /> -->
<div>
  <h2>Data grid develope</h2>
</div>
<div>
  <div id="gridSearch" />
  <table id="grid" style="border-collapse:collapse; width:100%;" />
  <div id="grid_paginator">Paginator</div>
</div>

<!-- Trigger/Open The Modal -->
<br />
<br />

<div id="dialogContainer" />

<button id="dialogButton" style="width:100px;">Show dialog</button>

<h1>Theme Switcher</h1>
<button id="switch" style="width:100px;"> Theme select</button>

<div style="width:80%;">
  <!-- <div id="getServerGridData" /> -->
  <table id="getServerGridData" style="border-collapse:collapse;" />
  <div id="getServerGridData_paginator" />
</div>

<div>
  <button id="excelExportButton" style="width:150px;">Excel export test</button>
</div>
