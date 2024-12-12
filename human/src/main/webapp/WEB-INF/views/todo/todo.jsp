<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
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
           <main>
               <!-- 상단 차트 -->
               <div class="chart-section">
                   <!-- 부서 업무 현황 -->
                   <section class="chart">
                       <h1 class="chart-title">부서 업무 현황</h1>
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
                       <h1 class="chart-title">나의 업무 참여 현황</h1> <!-- 수정 -->
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
                       <button type="button"class="btn-open-register-modal" id="createPopup">
                           TEAM 업무 <br>등록하기</br>
                       </button>
                   </div>
                       <div class="inline-buttons">
                           <button>검색/정렬 초기화</button>
                           <button>선택 업무 숨기기</button>
                           <button>숨긴 업무 다시보기</button>
                       </div>
                   </div>
                   <div class="filters">
                        <form action="/todo">
                           <!-- 구분과 검색 필드 -->
                           <div class="filter-row">
                               <i class="fas fa-search"></i> <!-- 돋보기 아이콘 추가 -->
                               <label for="taskType">구분</label>
                               <select id="taskType" name="type">
                                   <option value="title">제목</option>
                                   <option value="all">전체</option>
                                   <option value="team">팀</option>
                               </select>
                               <input type="text" id="searchInput" name="search" placeholder="검색내용 입력">
                               <button type="submit" class="search-button">조회하기</button>
                           </div>
                        </form>
                       <!-- 정렬 옵션 -->
                        <div class="sort-options">
                            <button onclick="sortTable('T_PRIORITY')">
                                <span class="icon"><i class="fa-solid fa-list"></i></span> 우선순위순
                            </button>
                            <button onclick="sortTable('T_STAGE')">
                                <span class="icon"><i class="fa-solid fa-tasks"></i></span> 진행상황순
                            </button>
                            <button onclick="sortTable('T_START_DATE')">
                                <span class="icon"><i class="fa-solid fa-calendar-day"></i></span> 시작일순
                            </button>
                            <button onclick="sortTable('T_END_DATE')">
                                <span class="icon"><i class="fa-solid fa-calendar-check"></i></span> 종료일순
                            </button>
                        </div>
                   </div>
               </div>
               <!-- 업무 리스트 -->
               <section class="task-list">
                   <table>
                       <thead>
                           <tr>
                               <th>선택</th>
                               <th>우선순위</th>
                               <th>진행상황</th>
                               <th>내용</th>
                               <th>시작일</th>
                               <th>종료일</th>
                               <th>담당자</th>
                               <th>수정</th>
                               <th>숨기기</th>
                           </tr>
                       </thead>
                       <tbody>
                           <!-- <tr>
                               <td><input type="checkbox" name="selectedTasks" value="1"></td>
                               <td>중요</td>
                               <td>예정</td>
                               <td>[토스] 홈페이지 외주</td>
                               <td>24.02.11 14:00</td>
                               <td>24.02.11 14:00</td>
                               <td>김혜민</td>
                               <td><button class="edit" id="editPopup">수정</button></td>
                               <td><button class="delete">숨기기</button></td>
                           </tr> -->
                           <c:forEach var="todo" items="${todos}">
                                <tr>
                                    <td><input type="checkbox" name="selectedTasks" value="${todo.t_id}"></td>
                                    <td>${todo.t_priority}</td>
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
                                    <td>${todo.t_content}</td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${not empty todo.t_start_date}">
                                                <fmt:formatDate value="${todo.t_start_date}" pattern="yyyy-MM-dd" />
                                            </c:when>
                                            <c:otherwise>
                                                -
                                            </c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${not empty todo.t_end_date}">
                                                <fmt:formatDate value="${todo.t_end_date}" pattern="yyyy-MM-dd" />
                                            </c:when>
                                            <c:otherwise>
                                                -
                                            </c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>${todo.t_updated_id}</td>
                                    <td><button type="button" class="edit" id="openPopup">수정</button></td>
                                    <td><button class="delete">숨기기</button></td>
                                </tr>
                            </c:forEach>
                       </tbody>
                   </table>
               </section>
           </main>
       </div>
<!-- Modal -->
<!-- 팝업 컨테이너 -->
<div class="task-popup-wrapper">
    <!-- 업무등록 팝업  -->
   <div class="popup" id="task-popup">
           <button class="btn-modal-close">x</button>
           <h2>TEAM 업무 등록하기</h2>
           <label>제목</label>
           <input type="text" placeholder="제목을 입력하세요">

           <label>중요도</label>
           <select>
               <option>중요도를 선택</option>
               <option>매우긴급</option>
               <option>긴급</option>
               <option>보통</option>
               <option>천천히</option>
           </select>

           <label>진행상황</label>
           <select>
               <option>진행상황을 선택</option>
               <option>예정</option>
               <option>진행지연</option>
               <option>완료지연</option>
                <option>완료</option>
           </select>

           <label>일시</label>
           <div class="date-time">
               <input type="date">
               <select>
                   <option>00시</option>
                   <option>01시</option>
                   <!-- ... -->
                   <option>23시</option>
               </select>
               <select>
                   <option>00분</option>
                   <option>30분</option>
               </select>
           </div>

           <label>참여자</label>
           <button id="open-participant-popup">참여자 선택</button>
           <div id="selected-participants"></div>

           <label>내용</label>
           <textarea maxlength="100" placeholder="100자까지 입력 가능합니다."></textarea>

           <button>추가하기</button>
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
           <div class="popup-overlay" id="popupOverlay"></div>
           <!-- 수정 팝업 -->
           <div class="popup hidden" id="popup">
           <button class="btn-modal-close">x</button>
               <h3>업무 수정</h3>
               <label>제목</label>
                  <input type="text" placeholder="제목을 입력하세요">

                  <label>중요도</label>
                  <select>
                      <option>중요도를 선택</option>
                      <option>매우긴급</option>
                      <option>긴급</option>
                      <option>보통</option>
                      <option>천천히</option>
                  </select>

                  <label>진행상황</label>
                  <select>
                      <option>진행상황을 선택</option>
                      <option>예정</option>
                      <option>진행지연</option>
                      <option>완료지연</option>
                       <option>완료</option>
                  </select>

                  <label>일시</label>
                  <div class="date-time">
                      <input type="date">
                      <select>
                          <option>00시</option>
                          <option>01시</option>
                          <!-- ... -->
                          <option>23시</option>
                      </select>
                      <select>
                          <option>00분</option>
                          <option>30분</option>
                      </select>
                </div>
              <label>참여자</label>
              <button id="open-participant-popup">참여자 선택</button>
              <div id="selected-participants"></div>

              <label>내용</label>
              <textarea maxlength="100" placeholder="100자까지 입력 가능합니다."></textarea>
              <button>수정하기</button>
           </div>
           <!-- 팝업 구조 -->
           <div class="popup-overlay hidden" id="popup-overlay"></div>
           <div class="popup hidden" id="participant-popup">
               <button class="btn-close-popup" id="close-popup">x</button>
               <h3>참여자 선택</h3>
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
                    <!--JavaScript 추가-->
                   </tbody>
               </table>
               <button id="confirm-selection">선택 완료</button>
           </div>
</body>
<script src="${contextPath}/js/todo.js"></script>
</html>

<script>
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

</script>
