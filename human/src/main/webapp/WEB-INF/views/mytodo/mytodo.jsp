<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOGIN</title>
  <link rel="stylesheet" href="${contextPath}/css/mytodo.css">
  <script src="https://code.jquery.com/jquery-3.4.1.js" ></script>
</head>
<body>
<!-- 공통 헤더&사이드 -->
<%@ include file="/WEB-INF/views/common/common.jsp" %>
<div class="layout-container">
        <main>
            <h2>ATTENTION! MY TODO-LIST</h2>

            <!-- 차트와 버튼 컨테이너 -->
            <div class="chart-and-buttons">
                <!-- 차트 섹션 -->
                <div class="chart-section">
                    <div class="chart">

                        <div class="chart-container">
                            <canvas id="myChart"></canvas>
                            <ul class="chart-legend">
                                <li>예정: <span>2건</span></li>
                                <li>진행중: <span>1건</span></li>
                                <li>지연: <span>0건</span></li>
                                <li>완료: <span>1건</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 버튼 섹션 -->
                <div class="actions-buttons">
                    <button class="large-button">나의 할일 <br>등록하기</br></button>
                    <div class="inline-buttons">
                        <button class="small-button">선택 삭제</button>
                        <button class="small-button">선택 숨기기</button>
                        <button class="small-button">숨긴 업무 모두보기</button>
                    </div>
                </div>
            </div>
        </main>
    </div>


        <!-- 정렬 옵션 -->
        <div class="sort-options">
            <button><span class="icon"><i class="fa-solid fa-list"></i></span> 우선순위순</button>
            <button><span class="icon"><i class="fa-solid fa-tasks"></i></span> 진행상황순</button>
            <button><span class="icon"><i class="fa-solid fa-calendar-day"></i></span>시작일순</button>
            <button><span class="icon"><i class="fa-solid fa-calendar-check"></i></span> 종료일순</button>
        </div>

        <!-- 업무 리스트 -->
        <section class="task-list">
            <!-- 첫 번째 할일 -->
            <div class="task-item">
                <input type="checkbox" class="task-checkbox" id="task-1">
                <div class="task-content-wrapper">
                    <!-- Label: 텍스트 콘텐츠 -->
                    <label for="task-1" class="task-content">
                        <h3>
                            <span class="icon">⚡</span> 커버낫 의상 협찬문의, 피팅
                        </h3>
                        <p>의상협찬 가능여부 연락, 피팅 진행</p>
                        <p>(기간) 2024-11-22 ~ 2024-11-27</p>
                    </label>
                    <!-- Buttons: 옆에 배치 -->
                    <div class="task-buttons">
                        <div class="status-buttons">
                            <button class="status in-progress">진행</button>
                            <button class="status delayed">지연</button>
                            <button class="status completed">완료</button>
                        </div>
                        <div class="action-buttons">
                            <button class="edit">수정</button>
                            <button class="delete">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 두 번째 할일 -->
            <div class="task-item">
                <input type="checkbox" class="task-checkbox" id="task-2">
                <div class="task-content-wrapper">
                    <!-- Label: 제목 및 내용 -->
                    <label for="task-2" class="task-content">
                        <h3>
                            <span class="icon">➖</span> 신입사원 교육 참여
                        </h3>
                        <p>준비물: 필기도구!</p>
                        <p>(기간) 2024-11-22 ~ 2024-11-27</p>
                    </label>
                    <!-- Buttons: 옆에 배치 -->
                    <div class="task-buttons">
                        <div class="status-buttons">
                            <button class="status in-progress">진행</button>
                            <button class="status delayed">지연</button>
                            <button class="status completed">완료</button>
                        </div>
                        <div class="action-buttons">
                            <button class="edit">수정</button>
                            <button class="delete">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

  <script src="${contextPath}/js/mytodo.js"></script>
</body>
</html>
