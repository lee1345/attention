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

  <div class="headerContainer">
    <h2 class="text-center">일정 관리</h2>

    <!-- 필터 버튼 -->
    <div class="text-center mb-3">
      <div class="buttons" style="display: flex; justify-content: space-between;">
        <div class="left-buttons">
          <button id="filter-my-events" class="btn btn-primary">내 일정 보기</button>
          <button id="filter-team-events" class="btn btn-success">팀 일정 보기</button>
          <button id="filter-all-events" class="btn btn-secondary active" style="width:100px;">모두 보기</button>
        </div>
        <div class="right-buttons">
          <button id="view-month" class="btn btn-outline-primary active">월별 보기</button>
          <button id="view-week" class="btn btn-outline-primary">주별 보기</button>
          <button id="view-day" class="btn btn-outline-primary">일별 보기</button>
        </div>
      </div>
    <br><br>
    <!-- FullCalendar -->
    <div id="calendar"></div>
  </div>

  <!-- 모달 -->
  <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-title">일정 제목</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
        </div>
        <div class="modal-body" id="modal-body">일정 내용이 여기에 표시됩니다.</div>
      </div>
    </div>
  </div>

  <!-- JS -->
  <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.1/locales/ko.global.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="${contextPath}/js/schedule.js"></script>
</body>
</html>

