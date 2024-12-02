<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ATTENTION</title>
    <!-- 폰트어썸 경로 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" integrity="sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- 동적 경로로 CSS 로드 -->
    <link rel="stylesheet" href="${contextPath}/css/common.css" />
    <!-- JS 파일 로드 -->
    <script src="${contextPath}/js/common.js" defer></script>
  </head>

  <body>
    <header>
      <div class="logo">ATTENTION</div>
      <div class="user-info">
        <!-- 로그인 여부에 따라 표시되는 콘텐츠 -->
        <a id="login">로그인</a>
        <a id="signup">회원가입</a>
      </div>
    </header>
    <div class="container">
      <nav class="sidebar">
        <ul>
          <li>
            <span><i class="fa-solid fa-bars"></i> 할일관리</span>
            <ul>
              <li><a id="teamTasks">- 팀별 할일</a></li>
              <li><a id="myTasks">- 나의 할일</a></li>
            </ul>
          </li>
          <ul>
          <strong><a id="schedule"><i class="fa-solid fa-calendar-days"></i> 일정관리</a></strong>
          </ul>
          <li>
            <span><i class="fa-solid fa-bullhorn"></i> 게시판</span>
            <ul>
              <li><a id="notice">- 공지사항</a></li>
              <li><a id="freeBoard">- 자유게시판</a></li>
            </ul>
          </li>
          <li>
            <strong><a id="addressBook"><i class="fa-solid fa-address-book"></i> 주소록</a></strong>
          </li>
        </ul>
      </nav>
    </div>
  </body>

</html>
