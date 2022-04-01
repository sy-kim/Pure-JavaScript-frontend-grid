<script>
  import { innoGrid, ajax } from "./components/innogrid";
  import { Styles } from "sveltestrap";
  import { Button, Col, Row } from "sveltestrap/src";

  let domContainerState = false;
  window.addEventListener("DOMContentLoaded", (event) => {
    domContainerState = true;
    documentReady();
  });

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
        { header: "이메일", item: "email", width: "200px", type: "email", textAlign: "center", textColor: "block" },
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
          hide: true,
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

<!-- 간단한 양식을 포함한 팝업 대화 상자 -->
<dialog id="favDialog">
  <form method="dialog">
    <p>
      <label
        >좋아하는 동물:
        <select>
          <option />
          <option>아르테미아</option>
          <option>레서판다</option>
          <option>거미원숭이</option>
        </select>
      </label>
    </p>
    <menu>
      <button value="cancel">취소</button>
      <button id="confirmBtn" value="default">확인</button>
    </menu>
  </form>
</dialog>

<menu>
  <button id="updateDetails">상세정보 업데이트</button>
</menu>
<output aria-live="polite" />
<!-- <div>
  <Button id="myBtn" primary>Open Modal</Button>
</div>
<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>
</div>

<Row>
  <Col>
    <Button color="primary" primary>Sample bootstrap button</Button>
  </Col>
</Row>
-->
