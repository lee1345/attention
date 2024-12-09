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
    <script src="${contextPath}/js/common.js" defer></script>

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
              <span>${employee.e_name} ${employee.e_position}</span>
              <span><a id="mypage">MyPage</a><span>
              <span><a id="login">Logout</a><span>
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
            <strong><a id="schedule"><i class="fa-solid fa-calendar-days"></i> 일정관리</a></strong>
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
              <strong><a id="address"><i class="fa-solid fa-address-book"></i> 주소록</a></strong>
            </li>
          </ul>
        </nav>

        <!-- 팝업 배경 오버레이 -->
        <div class="popup-overlay" id="popupOverlay"></div>

        <!-- 팝업 -->
        <div class="comPopup hidden" id="comPopup">
            <button class="close-btn" id="comClosePopup">X</button>
            <h2>정보 수정</h2>
            <form id="comRegisterForm">

                <label for="password">기존 비밀번호</label>
                <input type="password" id="password" name="password" /><br>
                <label for="password">새 비밀번호</label>
                <input type="password" id="password" name="password" /><br>
                <label for="email">기존 이메일</label>
                <input type="email" id="email" name="email" required /><br>
                <label for="email">새 이메일</label>
                <input type="email" id="email" name="email" required /><br>
                <label for="phone">기존 전화번호</label>
                <input type="number" id="phone" name="phone" /><br>
                <label for="phone">새 전화번호</label>
                <input type="number" id="phone" name="phone" /><br>
                <button type="submit" class="submit-btn">등록</button>
            </form>
        </div>
  </body>
</html>
