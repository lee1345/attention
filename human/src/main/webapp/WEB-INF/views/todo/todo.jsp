<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>할일 관리 </title>
    <link rel="stylesheet" href="${contextPath}/css/todo.css">
</head>
<body>
<!-- 공통 헤더&사이드 -->
<%@ include file="/WEB-INF/views/common/common.jsp" %>

   <div class="layout-container">
           <main style="padding: 10px;">
               <!-- 상단 차트 -->
               <div class="chart-section">
                   <!-- 부서 업무 현황 -->
                   <section class="chart">
                       <h1 class="chart-title">전체 부서 업무 현황</h1>
                       <div class="chart-container">
                           <canvas id="departmentChart"></canvas>
                           <ul class="chart-legend" id="departmentLegend">
                                <li>예정: <span>2건</span></li>
                                <li>진행지연: <span>0건</span></li>
                                <li>진행중: <span>1건</span></li>
                                <li>완료지연: <span>0건</span></li>
                                <li>완료: <span>1건</span></li>
                           </ul>
                       </div>
                   </section>

                   <!-- 나의 업무 참여 현황 -->
                   <section class="chart">
                       <h1 class="chart-title">나의 부서업무 참여현황</h1> <!-- 수정 -->
                       <div class="chart-container">
                           <canvas id="myTaskChart"></canvas>
                           <ul class="chart-legend" id="myTaskLegend">
                               <li>예정: <span>2건</span></li>
                               <li>진행지연: <span>0건</span></li>
                               <li>진행중: <span>1건</span></li>
                               <li>완료지연: <span>0건</span></li>
                               <li>완료: <span>1건</span></li>
                           </ul>
                       </div>
                   </section>
               </div>
               <!-- 5번~10번 -->
               <div class="actions-section">
                   <div class="actions-buttons">
                   <div>
                       <button type="button"class="btn-open-register-modal" style="background-color:#3498db; color:white; font-size: 15pt; font-weight:bold">
                           TEAM 업무 <br>등록하기</br>
                       </button>
                   </div>
                       <div class="inline-buttons">
                           <button onclick="resetSearch()">검색/정렬 초기화</button>
                           <button onclick="hideSelectedRows()">선택 업무 숨기기</button>
                           <button onclick="showHiddenRows()">숨긴 업무 다시보기</button>
                       </div>
                   </div>
                   <div class="filters">
                        <form action="/todo">
                           <!-- 구분과 검색 필드 -->
                           <div class="filter-row">
                               <i class="fas fa-search"></i> <!-- 돋보기 아이콘 추가 -->
                               <label for="taskType">구분</label>
                               <select id="taskType" name="type">
                                   <option value="all">전체</option>
                                   <option value="title">제목</option>
                                   <option value="content">내용</option>
                               </select>
                               <input type="text" id="searchInput" name="search" placeholder="검색내용 입력">
                               <button type="submit" class="search-button">조회하기</button>
                           </div>
                        </form>
                       <!-- 정렬 옵션 -->
                       <div class="sort-options">
                           <button id="prBtn"><span class="icon"><i class="fa-solid fa-list"></i></span> 우선순위순</button>
                           <button id="stBtn"><span class="icon"><i class="fa-solid fa-tasks"></i></span> 진행상황순</button>
                           <button id="startBtn"><span class="icon"><i class="fa-solid fa-calendar-day"></i></span> 시작일순</button>
                           <button id="endBtn"><span class="icon"><i class="fa-solid fa-calendar-check"></i></span> 종료일순</button>
                       </div>

                   </div>
               </div>
               <!-- 업무 리스트 -->
               <section class="task-list">
                   <table id="todo-table">
                       <thead>
                           <tr>
                               <th>선택</th>
                               <th class="hidden">ID</th>
                               <th>우선순위</th>
                               <th>진행상황</th>
                               <th>제목</th>
                               <th>내용</th>
                               <th>시작일</th>
                               <th>종료일</th>
                               <th>담당자</th>
                               <th>참여자</th>
                               <th>수정</th>
                               <th>숨기기</th>
                           </tr>
                       </thead>
                       <tbody>

                           <c:forEach var="todo" items="${todos}">
                                <tr id="${todo.t_id}">
                                    <td><input type="checkbox" name="selectedTasks" value="${todo.t_id}" class="row-checkbox"></td>
                                    <td class="hidden">${todo.t_id}</td>
                                   <td class="<c:choose>
                                              <c:when test="${todo.t_priority == 'VU'}">very-urgent</c:when>
                                              <c:when test="${todo.t_priority == 'U'}">urgent</c:when>
                                              <c:otherwise>normal-priority</c:otherwise>
                                          </c:choose>">
                                        <c:choose>
                                             <c:when test="${todo.t_priority == 'VU'}">
                                               매우긴급
                                           <i class="icon urgent-icon" data-priority="VU">⚠️</i> <!-- 아이콘 추가 -->
                                           </c:when>
                                            <c:when test="${todo.t_priority == 'U'}">
                                               긴급
                                         <i class="icon urgent-icon" data-priority="U">⚡</i><!-- 아이콘 추가 -->
                                            </c:when>
                                            <c:when test="${todo.t_priority == 'N'}">보통</c:when>
                                            <c:when test="${todo.t_priority == 'NU'}">천천히</c:when>
                                            <c:otherwise>${todo.t_priority}</c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td> 
                                        <c:choose>
                                            <c:when test="${todo.t_stage == 'P'}">예정</c:when>
                                            <c:when test="${todo.t_stage == 'PD'}">진행지연</c:when>
                                            <c:when test="${todo.t_stage == 'IP'}">진행중</c:when>
                                            <c:when test="${todo.t_stage == 'CD'}">완료지연</c:when>
                                            <c:when test="${todo.t_stage == 'C'}">완료</c:when>
                                            <c:otherwise>${todo.t_stage}</c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>${todo.t_title}</td>
                                    <td>${todo.t_content}</td>
                                    <td>${todo.t_start_date}</td>
                                    <td>${todo.t_end_date}</td>
                                    <td>${todo.e_name}</td>
                                    <td>${todo.personListString}</td>
                                    <td><button class="edit" data-id="${todo.t_id}" onclick="editPopupOpen(${todo.t_id})">수정</button></td>
                                    <td><button class="delete" onclick="hideRow(${todo.t_id})">숨기기</button></td>
                                </tr>
                            </c:forEach>
                       </tbody>
                   </table>
               </section>
           </main>
       </div>
<!-- Modal -->
<!-- 팝업 컨테이너 -->
<div class="task-popup-wrapper" >
    <!-- 업무등록 팝업  -->
   <div class="popup" id="task-popup">
           <button class="btn-modal-close">x</button>
           <h2>TEAM 업무 등록하기</h2>
          <form id="t-registerForm">
              <label for="title">제목</label>
              <input type="text" id="title" name="title" placeholder="제목을 입력하세요">

              <label for="t-priority">중요도</label>
              <select id="t-priority" name="priority">
                  <option value="VU">매우 긴급</option>
                  <option value="U">긴급</option>
                  <option value="N" selected>보통</option>
                  <option value="NU">천천히</option>
              </select>

              <label for="t-stage">진행상황</label>
              <select id="t-stage" name="stage">
                  <option value="P">예정</option>
                  <option value="PD">진행지연</option>
                  <option value="CD">완료지연</option>
                  <option value="C">완료</option>
              </select>

              <label>일시</label>
              <label>시작일</label>
              <div class="date-time">
                  <input type="date" id="start-date" name="startDate">
              </div>

              <label>종료일</label>
              <div class="date-time">
                  <input type="date" id="end-date" name="endDate">
              </div>

              <label>참여자</label>
              <button id="open-participant-popup" type="button">참여자 선택</button>
              <div id="selected-participants"></div>

              <label>내용</label>
              <textarea id="content" name="content" maxlength="100" placeholder="100자까지 입력 가능합니다."></textarea>

              <button id="add-task-button" type="button">추가하기</button>
          </form>
       </div>

       <!-- 참여자 선택 팝업 -->
      <div id="participant-popup" class="hidden">
                          <button class="btn-modal-close">x</button>
                          <h2>참여자 선택</h2>
                          <table>
                              <thead>
                                  <tr>
                                      <th>선택</th>
                                      <th>부서</th>
                                      <th>이름</th>
                                      <th>직위</th>
                                  </tr>
                              </thead>
                              <tbody id="participant-list">
                                  <!-- JavaScript로 추가 -->
                              </tbody>
                          </table>
                          <button id="close-participant-popup">선택완료</button>
                          <button id="reset-participant-selection" style="background-color: red; color: white; margin-top: 10px;">선택 초기화</button>
                      </div>
             <!--  업무수정 팝업 -->
            <div class="popup hidden" id="edit-popup">
                <button class="btn-modal-close">x</button>
                <h2>업무 수정하기</h2>
                <form id="edit-task-form">
                    <!-- 숨겨진 수정 ID 필드 -->
                    <input type="hidden" id="edit-id" name="id">

                    <label for="edit-title">제목</label>
                    <input type="text" id="edit-title" name="title" placeholder="제목을 입력하세요">

                    <label for="edit-priority">중요도</label>
                    <select id="edit-priority" name="priority">
                        <option value="VU">매우 긴급</option>
                        <option value="U">긴급</option>
                        <option value="N">보통</option>
                        <option value="NU">천천히</option>
                    </select>

                    <label for="edit-stage">진행상황</label>
                    <select id="edit-stage" name="stage">
                        <option value="P">예정</option>
                        <option value="PD">진행지연</option>
                        <option value="CD">완료지연</option>
                        <option value="C">완료</option>
                    </select>

                    <label>일시</label>
                    <label>시작일</label>
                    <div class="date-time">
                        <input type="date" id="edit-start-date" name="startDate">
                    </div>

                    <label>종료일</label>
                    <div class="date-time">
                        <input type="date" id="edit-end-date" name="endDate">
                    </div>

                    <label>참여자</label>
                    <button id="edit-open-participant-popup" class="open-participant-popup" type="button">참여자 선택</button>
                    <div id="edit-selected-participants"></div>

                    <label>내용</label>
                    <textarea id="edit-content" name="content" maxlength="100" placeholder="100자까지 입력 가능합니다."></textarea>

                    <button id="save-changes-button" type="button">저장</button>
                </form>
            </div>
           </div>

            <!-- 커스텀 팝업 -->
            <div id="custom-popup" class="popup hidden">
                <div class="popup-content">
                    <p id="popup-message"></p>
                 <button onclick="closeCustomPopup()" class="btn-close-popup">확인</button>
                </div>
            </div>

            <!-- 모달 오버레이 -->
            <div id="popup-overlay" class="modal-overlay hidden"></div>

<script src="${contextPath}/js/todo.js"></script>
</body>

</html>

<script>
let employeeList = JSON.parse('${employeeList}');
console.log('employeeList', employeeList);

////////////////////////////////////////////
let todoStageCounts = JSON.parse('${todoStageCountsJson}');
// console.log(todoStageCounts);

// 상태별 카운트 배열 초기화 (예정, 진행지연, 진행중, 완료지연, 완료)
let stageCounts = [0, 0, 0, 0, 0];

// todoStageCounts를 순회하면서 각 상태의 카운트를 stageCounts 배열에 할당
todoStageCounts.forEach(item => {
    switch(item.t_stage) {
        case 'P': // 예정
                   stageCounts[0] = parseInt(item.count) || 0; // 데이터 없으면 0
                   break;
               case 'PD': // 진행지연
                   stageCounts[1] = parseInt(item.count) || 0;
                   break;
               case 'IP': // 진행중
                   stageCounts[2] = parseInt(item.count) || 0;
                   break;
               case 'CD': // 완료지연
                   stageCounts[3] = parseInt(item.count) || 0;
                   break;
               case 'C': // 완료
                   stageCounts[4] = parseInt(item.count) || 0;
                   break;
    }
});

console.log(stageCounts); // [0, 1, 1, 0, 0] 상태별 카운트 배열 출력
//////////////////////////////////

let myTodoStageCounts = JSON.parse('${myTodoStageCountsJson}');
// console.log(myTodoStageCounts);

// 상태별 카운트 배열 초기화 (예정, 진행지연, 진행중, 완료지연, 완료)
let myStageCounts = [0, 0, 0, 0, 0];

// todoStageCounts를 순회하면서 각 상태의 카운트를 stageCounts 배열에 할당
myTodoStageCounts.forEach(item => {
    switch(item.t_stage) {
        case 'P': // 예정
           myStageCounts[0] = parseInt(item.count) || 0; // 데이터 없으면 0
           break;
       case 'PD': // 진행지연
           myStageCounts[1] = parseInt(item.count) || 0;
           break;
       case 'IP': // 진행중
           myStageCounts[2] = parseInt(item.count) || 0;
           break;
       case 'CD': // 완료지연
           myStageCounts[3] = parseInt(item.count) || 0;
           break;
       case 'C': // 완료
           myStageCounts[4] = parseInt(item.count) || 0;
           break;
    }
});

console.log('myStageCounts', myStageCounts); // [0, 1, 1, 0, 0] 상태별 카운트 배열 출력

</script>

