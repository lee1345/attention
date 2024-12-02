<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Team Task List</title>
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/todo.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> //차트 라이브러리 불러오기 그리기 위한 기능 제공
</head>
<body>
    <%@ include file="../common/common.jsp" %> <!-- 헤더 추가 -->
    <div class="layout-container">
        <main>
            <!-- 상단 차트 -->
            <div class="chart-section">
                <!-- 부서별 업무 현황 -->
                <section class="chart">
                    <h3>부서 업무 현황</h3>
                    <canvas id="departmentChart"></canvas> //부서별 업무 현황 차트
                    <ul class="chart-legend">// 텍스트로 업무 상태를 표시하고 동적으로 값을 삽입
                        <li>예정: <span>${departmentCounts.scheduled}</span>건</li> //departmentCount객체에서 데이터를 가져옴
                        <li>진행지연: <span>${departmentCounts.delayedInProgress}</span>건</li>
                        <li>진행중: <span>${departmentCounts.inProgress}</span>건</li>
                        <li>완료지연: <span>${departmentCounts.delayedCompleted}</span>건</li>
                        <li>완료: <span>${departmentCounts.completed}</span>건</li>
                    </ul>
                </section>

                <!-- 나의 업무 참여 현황 -->
                <section class="chart">
                    <h3>나의 업무 참여 현황</h3>
                    <canvas id="myTaskChart"></canvas> //개인 업무 참여 현황을 시각적으로 표시
                    <ul class="chart-legend">
                        <li>예정: <span>${myTaskCounts.scheduled}</span>건</li> //myTaskCount 객체에서 데이터를 가져옴
                        <li>진행지연: <span>${myTaskCounts.delayedInProgress}</span>건</li>
                        <li>진행중: <span>${myTaskCounts.inProgress}</span>건</li>
                        <li>완료지연: <span>${myTaskCounts.delayedCompleted}</span>건</li>
                        <li>완료: <span>${myTaskCounts.completed}</span>건</li>
                    </ul>
                </section>
            </div>

            <!-- TEAM 업무 등록 및 검색 조건 -->
            <div class="task-and-search-container">
                <!-- TEAM 업무 등록 -->
                <section class="task-registration">
                    <button>TEAM 업무 등록하기</button> // 새로운 업무를 추가하는 역할
                    <div class="filters"> // 업무 검색 조건을 초기화, 숨긴 업무을 복원하는 기능
                        <button onclick="resetFilters()">검색/정렬 초기화</button>
                        <button onclick="hideSelectedTasks()">선택 업무 숨기기</button>
                        <button onclick="restoreHiddenTasks()">숨긴 업무 다시 보기</button>
                    </div>
                </section>

                <!-- 검색 및 정렬 조건 -->
                <section class="search-filters">
                    <form method="GET" action="/todo">
                        <label for="taskType">구분:</label>
                        <select id="taskType" name="type">
                            <option value="all">전체</option>
                            <option value="personal">개인</option>
                            <option value="team">팀</option>
                            <option value="title">제목</option>
                        </select>

                        <label for="taskTextInput">내용:</label>
                        <input type="text" id="taskTextInput" name="query" placeholder="내용을 입력하세요">

                        <label for="startDate">시작일:</label>
                        <input type="date" id="startDate" name="startDate">

                        <label for="endDate">종료일:</label>
                        <input type="date" id="endDate" name="endDate">

                        <button type="submit">조회</button>
                    </form>
                </section>
            </div>

            <!-- 정렬 버튼 -->
            <div class="sort-options">
                <span class="sort-label">정렬:</span>
                <button class="sort-button active" onclick="sortTasks('priority')">우선순위순</button>
                <button class="sort-button" onclick="sortTasks('status')">진행상황순</button>
                <button class="sort-button" onclick="sortTasks('startDate')">시작일순</button>
                <button class="sort-button" onclick="sortTasks('endDate')">종료일순</button>
            </div>

            <!-- 업무 리스트 -->
            <section class="task-list">
                <h2>업무 리스트</h2>
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
                        <c:forEach var="task" items="${tasks}">
                            <tr>
                                <td><input type="checkbox" name="selectedTasks" value="${task.id}"></td>
                                <td>${task.priority}</td>
                                <td>${task.status}</td>
                                <td>${task.title}</td>
                                <td>${task.startDate}</td>
                                <td>${task.endDate}</td>
                                <td>${task.assignee}</td>
                                <td><a href="/todo/edit/${task.id}">수정</a></td>
                                <td>
                                    <form method="POST" action="/todo/hide/${task.id}">
                                        <button type="submit">숨기기</button>
                                    </form>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </section>
        </main>
    </div>

    <!-- Chart.js 스크립트 -->
    <script>
        const departmentCtx = document.getElementById('departmentChart').getContext('2d');
        const departmentChart = new Chart(departmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['예정', '진행지연', '진행중', '완료지연', '완료'],
                datasets: [{
                    data: [2, 0, 1, 0, 1],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#90EE90']
                }]
            }
        });

        const myTaskCtx = document.getElementById('myTaskChart').getContext('2d');
        const myTaskChart = new Chart(myTaskCtx, {
            type: 'doughnut',
            data: {
                labels: ['예정', '진행지연', '진행중', '완료지연', '완료'],
                datasets: [{
                    data: [2, 0, 1, 0, 1],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#90EE90']
                }]
            }
        });

        function sortTasks(criteria) {
            alert(criteria + " 기준으로 정렬합니다.");
        }
    </script>
</body>
</html>
