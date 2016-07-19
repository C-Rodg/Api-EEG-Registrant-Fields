
<%@ LANGUAGE=VBScript %>
<% OPTION EXPLICIT %>

<%  
	Dim regrequest
	Set regrequest = CreateObject("MSXML2.XMLHTTP")
	regrequest.Open "Post", "https://eeginc.my.salesforce.com/services/Soap/class/EEG_SessionMobileWebService", False
	regrequest.SetRequestHeader "Content-Type", "text/xml"
	regrequest.SetRequestHeader "SOAPAction", "application/soap+xml"
	regrequest.SetRequestHeader "Accept", "*/*"
	regrequest.SetRequestHeader "Content-Length", Request.TotalBytes

	dim b
	b = Request.TotalBytes

	dim x
	x = Request.BinaryRead(b)

	regrequest.Send(x)

	If regrequest.Status <> 200 Then
	    Response.Write("Error: " & regrequest.responseText)
	Else
  	    Response.ContentType = "text/xml"
  		Response.Write regrequest.responsexml.xml
	End If	
%>