<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- 폰트어썸 경로 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" integrity="sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- 동적 경로로 CSS 로드 -->
    <link rel="stylesheet" href="${contextPath}/css/common.css" />
    <!-- JS 파일 로드 -->
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="${contextPath}/js/common.js" ></script>
    <!--
    <script src="${contextPath}/js/alarm.js" defer></script>
    -->
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client/dist/sockjs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/stompjs/lib/stomp.min.js"></script>
    <title>ATTENTION</title>
  </head>
  <body>
  <div class="common">
      <header>
        <div class="logo">
          <img src="${contextPath}/images/logo.png" alt="Logo" style="height: 60px;">
        </div>
        <div class="user-info">
          <span>${employee.e_dept}팀</span>
          <span>${employee.e_name} ${employee.e_position}님</span>
          <span>안녕하세요! </span>
          <span><i class="fa-solid fa-bell" id="show-alarm-popup" style="cursor: pointer;"></i></span>
          <span><a id="comMyPage">내 정보 수정</a><span>
          <span><a id="login">로그아웃</a><span>
        </div>
      </header>

      <div class="container">
        <nav class="sidebar">
          <ul>
            <li>
              <span><i class="fa-solid fa-bars"></i> 할일관리</span>
              <ul>
                <li><a id="todo">- 팀별 할일</a></li>
                <li><a id="mytodo">- 나의 할일</a></li>
              </ul>
              <br>
            </li>
            <span><a id="schedule"><i class="fa-solid fa-calendar-days"></i> 일정관리</a></span>
            <br><br>
            <li>
              <span><i class="fa-solid fa-bullhorn"></i> 게시판</span>
              <ul>
                <li><a id="notice">- 공지사항</a></li>
                <li><a id="freeBoard">- 자유게시판</a></li>
              </ul>
            </li>
            <br><br>
            <li>
              <span><a id="address"><i class="fa-solid fa-address-book"></i> 주소록</a></span>
            </li>
          </ul>
        </nav>

        <!-- 팝업 배경 오버레이 -->
        <div class="comPopup-overlay" id="comPopupOverlay"></div>

        <!-- 팝업 -->
        <div class="comPopup hidden" id="comPopup">
            <button class="close-btn" id="comClosePopup">X</button>
            <h2>정보 수정</h2>
            <p>원하는 회원 정보를 수정할 수 있습니다</p>
            <form id="comRegisterForm">
                <p>${employee.e_dept}팀 ${employee.e_name} ${employee.e_position}</p></br>
                <label for="phone">전화번호</label>
                <input type="text" id="phone" name="phone" value="${employee.e_phone}" /><br>
                <label for="email">이메일</label>
                <input type="email" id="email" name="email" value="${employee.e_email}" required /><br>
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" /><br>
                <button type="submit" class="submit-btn">등록</button>
            </form>
        </div>

        <!-- 알림 팝업 -->
        <div id="comAlarm-popup" class="hidden">
            <div class="comA-popup-content">
                <button class="comA-close-btn" onclick="closeAlarmPopup()">X</button>
                <h2 id="comA-popup-title">알림 기록</h2>
                <table style="width: 100%; border-spacing: 0; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th>시간</th>
                            <th>내용</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody id="comAlarm-table-body"></tbody>
                </table>
            </div>
        </div>
  </body>
</html>
