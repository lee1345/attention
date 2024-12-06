<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOGIN</title>
  <link rel="stylesheet" href="${contextPath}/css/mytodo.css">
  <script src="https://code.jquery.com/jquery-3.4.1.js" ></script>
</head>
<body>
<!-- 공통 헤더&사이드 -->
<%@ include file="/WEB-INF/views/common/common.jsp" %>








  <script src="${contextPath}/js/mytodo.js"></script>
</body>
</html>
