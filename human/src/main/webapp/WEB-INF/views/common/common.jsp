<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ATTENTION</title>
  <link rel="stylesheet" href="${contextPath}/css/common.css" />
</head>

<body>
<header>
  <div class="logo">ATTENTION</div>
  <div class="user-info">
    <c:choose>
      <c:when test="${not empty sessionScope.user}">
        <div id="logout">로그아웃</div>
      </c:when>
      <c:otherwise>
        <div id="login">로그인</div>
        <div id="sing">회원가입</div>
      </c:otherwise>
    </c:choose>
  </div>
</header>
<div class="container">
  <nav class="sidebar">
    <ul>
      <li>
        <span>할일관리</span>
        <ul>
          <li>- 팀별 할일</li>
          <li>- 나의 할일</li>
        </ul>
      </li>
      <li><strong>일정관리</strong></li>
      <li>
        <span>게시판</span>
        <ul>
          <li>- 공지사항</li>
          <li>- 자유게시판</li>
        </ul>
      </li>
      <li><strong>주소록</strong></li>
    </ul>
  </nav>
</div>
</body>
</html>
