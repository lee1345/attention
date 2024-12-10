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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" integrity="sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

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

  <!-- 팝업 -->
  <div id="popup" class="hidden">
      <div class="popup-content">
          <button id="close-Popup" class="close-btn">X</button>
          <h1 id="popup-title">일정 제목</h1>
          <table>
              <tr>
                  <th><i class="fa-solid fa-circle-exclamation"></i>&nbsp;&nbsp;중요도</th>
                  <td id="popup-priority"></td>
              </tr>
              <tr>
                  <th><i class="fa-solid fa-spinner"></i>&nbsp;&nbsp;진행상황</th>
                  <td id="popup-stage"></td>
              </tr>
              <tr>
                  <th><i class="fa-regular fa-calendar-days"></i>&nbsp;&nbsp;시작일</th>
                  <td id="popup-startDate"></td>
              </tr>
              <tr>
                  <th><i class="fa-regular fa-calendar-days"></i>&nbsp;&nbsp;종료일</th>
                  <td id="popup-endDate"></td>
              </tr>
              <tr>
                  <th><i class="fa-regular fa-clipboard"></i>&nbsp;&nbsp;내용</th>
                  <td id="popup-description"></td>
              </tr>
          </table>
      </div>
  </div>

  <!-- JS -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.1/locales/ko.global.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="${contextPath}/js/schedule.js"></script>
</body>
</html>
