<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : SampleTest.jsp
  * @Description : SampleTest 화면
  * @Modification Information
  *
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2009.02.01            최초 생성
  *
  * author 실행환경 개발팀
  * since 2009.02.01
  *
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><spring:message code="title.sample" /></title>
    <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/sample.css'/>"/>
    <!-- 
    <script src="/static/js/BlockUi.js"></script>
    <script src="/static/js/test.js"></script>
     -->
     
     <script src="/static/js/mUtils/commUtil.js"></script>
     <script src="/static/js/mUtils/ajaxUtil.js"></script>
     <script>
     	/* let mUtils = {
			blockUi : new BlockUi()
     	}; */
     	
     </script>
</head>

<body style="text-align:center; margin:0 auto; display:inline; padding-top:100px;">
   sampleTest
   <form id="frmSearch" name="frmSearch">
   	<input type="text" id="test" name="test"/>
   </form>
</body>


</html>
