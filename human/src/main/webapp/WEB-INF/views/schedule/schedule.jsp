<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>일정 관리</title>
    <link rel="stylesheet" href="${contextPath}/css/schedule.css">
</head>
<body>
<!-- 공통 헤더&사이드 -->
<%@ include file="/WEB-INF/views/common/common.jsp" %>

    <div class="calendar-container">
        <h1>일정관리</h1>
        <br>
        <div class="filters">
            <div>
                <label><input type="radio" id="individual-view" name="view" value="M" checked> 내 일정만 보기</label>
                <label><input type="radio" id="team-view" name="view" value="T"> 팀 일정만 보기</label>
                <label><input type="radio" id="all-view" name="view" value="all"> 모두 보기</label>
            </div>
            <div>
                <button id="monthly-view">월간보기</button>
                <button id="weekly-view">주간보기</button>
                <button id="daily-view">일간보기</button>
                <button id="export-excel">목록 EXCEL 추출</button>
            </div>
        </div>
        <div class="navigation">
            <button id="prev-month">〈</button>
            <span id="current-month">2024.11</span>
            <button id="next-month">〉</button>
        </div>
        <div id="calendar">
            <!-- 달력 내용은 JS로 생성 -->
        </div>
    </div>

    <!-- 팝업 -->
    <div id="popup" class="hidden">
        <div class="popup-content">
            <button id="close-popup">X</button>
            <h2 id="popup-title"></h2>
            <p><strong>중요도:</strong> <span id="popup-priority"></span></p>
            <p><strong>진행상황:</strong> <span id="popup-status"></span></p>
            <p><strong>일시:</strong> <span id="popup-date"></span></p>
            <p><strong>담당자:</strong> <span id="popup-manager"></span></p>
            <p><strong>참여자:</strong> <span id="popup-participants"></span></p>
            <p><strong>내용:</strong></p>
            <p id="popup-details"></p>
        </div>
    </div>
</div>
    <script src="${contextPath}/js/schedule.js"></script>
</body>
</html>
