<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
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
                       <button class="large-button" >TEAM 업무<br> 등록하기</br></button>
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
                               <input type="text" id="searchInput" name="search" placeholder="검색 내용을 입력하세요">
                               <button type="submit" class="search-button">조회하기</button>
                           </div>
                        </form>
                       <!-- 정렬 옵션 -->
                       <div class="sort-options">
                           <button><span class="icon"><i class="fa-solid fa-list"></i></span> 우선순위순</button>
                           <button><span class="icon"><i class="fa-solid fa-tasks"></i></span> 진행상황순</button>
                           <button><span class="icon"><i class="fa-solid fa-calendar-day"></i></span> 시작일순</button>
                           <button><span class="icon"><i class="fa-solid fa-calendar-check"></i></span> 종료일순</button>
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
                               <th>제목</th>
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
                               <td><button class="edit">수정</button></td>
                               <td><button class="delete">숨기기</button></td>
                           </tr> -->
                           <c:forEach var="todo" items="${todos}">
                                <tr>
                                    <td><input type="checkbox" name="selectedTasks" value="${todo.t_id}"></td>
                                    <td>${todo.t_priority}</td>
                                    <td> 
                                        <c:choose>
                                            <c:when test="${todo.t_stage == 'P'}">예정</c:when>
                                            <c:when test="${todo.t_stage == 'D'}">진행지연</c:when>
                                            <c:when test="${todo.t_stage == 'I'}">진행중</c:when>
                                            <c:when test="${todo.t_stage == 'L'}">완료지연</c:when>
                                            <c:when test="${todo.t_stage == 'C'}">완료</c:when>
                                            <c:otherwise>${todo.t_stage}</c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>${todo.t_content}</td>
                                    <td><fmt:formatDate value="${todo.t_start_date}" pattern="yy.MM.dd HH:mm" /></td>
                                    <td><fmt:formatDate value="${todo.t_end_date}" pattern="yy.MM.dd HH:mm" /></td>
                                    <td>${todo.t_writer}</td>
                                    <td><button class="edit">수정</button></td>
                                    <td><button class="delete">숨기기</button></td>
                                </tr>
                            </c:forEach>
                       </tbody>
                   </table>
               </section>
           </main>
       </div>


</body>
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
            stageCounts[0] = parseInt(item.count); // 인덱스 0에 값 할당
            break;
        case 'D': // 진행지연
            stageCounts[1] = parseInt(item.count); // 인덱스 1에 값 할당
            break;
        case 'I': // 진행중
            stageCounts[2] = parseInt(item.count); // 인덱스 2에 값 할당
            break;
        case 'L': // 완료지연 (데이터 없으면 0으로 유지)
            stageCounts[3] = 0;
            break;
        case 'C': // 완료 (데이터 없으면 0으로 유지)
            stageCounts[4] = 0;
            break;
    }
});

console.log(stageCounts); // [0, 1, 1, 0, 0] 상태별 카운트 배열 출력

</script>

<script src="${contextPath}/js/todo.js"></script>