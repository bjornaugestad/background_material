var guiLanguage = "0";
if ( document.headerForm != null && document.headerForm.selectedValue != null && document.headerForm.selectedValue.selectedIndex != null){
	guiLanguage = document.headerForm.selectedValue.selectedIndex;
}

function resetDate(date) {
	date.value = "";
}

function moveRight() {
	var ns4 = (document.layers) ? true : false;
	var ie4 = (document.all) ? true : false;
	var frm = document.preferencesForm;
	frm.arrowMove.value = "OK";
	var j = frm.languageSelected.value;
	if (j == "") {
		if (guiLanguage == "1"){
			alert("Veuillez sèlectionner une langue pour changer vos prioritès.");
		 } else{
			alert("Please, select the language to change the priority.");
		 }
		return;
	}
	if (j == document.preferencesForm.languagesSize.value) {
		return;
	}
	var fieldRight = "allLanguages_" + j;
	j++;
	var fieldLeft = "allLanguages_" + j;
	var fieldLeftTemp = eval("frm." + fieldLeft + ".value");
	var fieldRightTemp = eval("frm." + fieldRight + ".value");
	if (!ns4) {
		eval("frm." + fieldRight + ".style.backgroundColor='white'");
		eval("frm." + fieldLeft + ".style.backgroundColor='#e78d0e'");
	}
	eval("frm." + fieldLeft + ".value='" + fieldRightTemp + "'");
	eval("frm." + fieldRight + ".value ='" + fieldLeftTemp + "'");
	
	frm.languageSelected.value = j;
	return;				
}

function moveLeft() {
	var ns4 = (document.layers) ? true : false;
	var ie4 = (document.all) ? true : false;		
	var frm = document.preferencesForm;
	frm.arrowMove.value = "OK";
	var j = frm.languageSelected.value;
	if (j == "") {
		if (guiLanguage == "1"){
			alert("Veuillez sèlectionner une langue pour changer vos prioritès.");
		 } else{
			alert("Please, select the language to change the priority.");
		 }
		return;
	}
	
	if (j == "0") {
		return;
	}
	var fieldRight = "allLanguages_" + j;
	j--;
	var fieldLeft = "allLanguages_" + j;
	var fieldLeftTemp = eval("frm." + fieldLeft + ".value");
	var fieldRightTemp = eval("frm." + fieldRight + ".value");
	if (!ns4) {
		eval("frm." + fieldRight + ".style.backgroundColor='white'");
		eval("frm." + fieldLeft + ".style.backgroundColor='#e78d0e'");
	}
	eval("frm." + fieldLeft + ".value='" + fieldRightTemp + "'");
	eval("frm." + fieldRight + ".value ='"+ fieldLeftTemp + "'");
	frm.languageSelected.value = j;
	return;				
}

function packLanguages() {
	var languagesOrder = "";
	var frm = document.preferencesForm;
	for (i = 0; i <= frm.languagesSize.value; i++) {
		var currentLanguage = "allLanguages_" + i;
		languagesOrder += eval("frm." + currentLanguage + ".value");
	}
	frm.languageIds.value = languagesOrder;
	return;
}

function selectLanguage(j) {
	var frm = document.preferencesForm;
	var ns4 =(document.layers) ? true : false;
	var ie4 =(document.all) ? true : false;
	if (frm.languageSelected.value == "") {    
		frm.languageSelected.value = j;
		if (!ns4) {
			eval("frm." + "allLanguages_" + j + ".style.backgroundColor='#e78d0e'");
		} else {
			eval("frm." + "allLanguages_" + j + ".value="+"frm." + "allLanguages_" + j + ".value.toUpperCase();");
		}
		return;
	}
	languageSelected = "allLanguages_" + frm.languageSelected.value;
	var languageClicked = "allLanguages_" + j;
	frm.languageSelected.value = "";
	if (!ns4) {
		eval("frm." + languageSelected + ".style.backgroundColor='white'");
	} else {
		eval("frm." + languageSelected + ".value=" + "frm." + languageSelected + ".value.toLowerCase();");
	}
	if (languageSelected != languageClicked){
		selectLanguage(j);
	}
	return;
}

function loginReset() {
    document.loginForm.username.value = "";
    document.loginForm.password.value = "";
}

function saveQuery(queryType) {
    if (queryType == 1){
		queryType = "ADVANCED";
	}
    var errorMessage = "";
    if (queryType != "ADVANCED"){
		var frm = document.queriesForm;
	} else {
		var frm = document.advancedQueriesForm;
		if (frm.sqlQuery.value == null || trim(frm.sqlQuery.value) == ""){
			if (guiLanguage == "1"){
				errorMessage += "Veuillez entrer la dèfinition du profil.\n";
			} else{
				errorMessage += "Please, enter the query definiton.\n";
			}
		}
	}
    if (frm.queryName == null || trim(frm.queryName.value) == "") {
		if (guiLanguage == "1"){
			errorMessage += "Veuillez entrer le nom du profil.";
		} else{
			errorMessage += "Please, enter the query name.";
		}
    }
    if (errorMessage != ""){
	alert(errorMessage);
	return;
    }
    frm.buttonPress.value = "Save Query";
    frm.submit();  
}

function executeAdvancedQuery(){
	var frm = document.advancedQueriesForm;
	if (frm.sqlQuery.value == null || trim(frm.sqlQuery.value) == ""){
			if (guiLanguage == "1"){
				alert("Veuillez entrer la dèfinition du profil.");
			 } else{
				alert("Please, enter the query definiton.");
			 }
			return;
		}
	
	frm.buttonPress.value = "Execute Query";
	frm.submit();
}

function deleteSelectedQuery(queryType, userPermissions) {
	 if (queryType == 1){
		queryType = "ADVANCED";
	}
	if (queryType != "ADVANCED"){
		var frm = document.queriesForm;
	} else {
		var frm = document.advancedQueriesForm;
	}   
	if (frm.queryType[1].checked) {
		if (guiLanguage == "1"){
			if (!administratorCheck("supprimer les profils standards.", frm)) {
				return;
			}
		} else {
			if (!administratorCheck("delete standard queries.", frm)) {
				return;
			}
		}
	}
	var invalidSelection = false;
	if ((frm.queryType[0].checked && frm.userQuery.value == "") || (frm.queryType[1].checked && ((userPermissions < 7 && frm.standardQuery.value == "") 
	|| (userPermissions > 6 && frm.standardQueryEN.value == "")))){
		invalidSelection = true;
	    }

	if (userPermissions > 6 && ((frm.queryType[2].checked && frm.standardQueryFR.value == "")
		|| (frm.queryType[3].checked && frm.profQuery.value == "") || invalidSelection)) {
		invalidSelection = true;
	}
	
    
        if (invalidSelection){
		if (guiLanguage == "1"){
			alert("Aucune requête sélectionnée.");
		 } else{
			alert("No query selected.");
		 }
		return;
	}
	if (guiLanguage == "1"){
		if (!confirm("Etes vous sûr de vouloir détruire la requête sélectionnée ?")){
			return;
		}
	} else {
		if (!confirm("Are you sure you want to delete selected query?")){
			return;
		}
	}
	frm.buttonPress.value = "Delete Selected Query";
	frm.submit();  
}


function administratorCheck (message, frm){
	if (frm.userPermissions.value < 7) {
		if (guiLanguage == "1"){
			alert("Seul l'administrateur peut " + message);
		} else {
			alert("Only Administrator can " + message);
		}
		return false;
	}
	return true;
}

function loadSelectedQuery(queryType, userPermissions) {
	 if (queryType == 1){
		queryType = "ADVANCED";
	 }
	 if (queryType != "ADVANCED"){
		var frm = document.queriesForm;
	} else {
		var frm = document.advancedQueriesForm;
	}   
	var invalidSelection = false;
	if ((frm.queryType[0].checked && frm.userQuery.value == "") || (frm.queryType[1].checked && ((userPermissions < 7 && frm.standardQuery.value == "") 
	|| (userPermissions > 6 && frm.standardQueryEN.value == "")))){
		invalidSelection = true;
	    }
	if (userPermissions > 6 && ((frm.queryType[2].checked && frm.standardQueryFR.value == "")
		|| (frm.queryType[3].checked && frm.profQuery.value == "") || invalidSelection)) {
		invalidSelection = true;
	}

	if (invalidSelection){
		if (guiLanguage == "1"){
			alert("Aucune requête sélectionnée.");
		} else {
			alert("No query selected.");
		}
		return;
	}
	frm.buttonPress.value = "Load Selected Query";
	frm.submit();  
 }

function setPage(pageNumber) {
	var frm = document.searchResultForm;
	frm.pageIndex.value = pageNumber;
	frm.page.value = pageNumber;
	frm.userAction.value = "Set Page Link";
	frm.submit();
}

function selectedDocuments(currentForm) {
	if (currentForm == 1){
		currentForm = "searchResultForm";
	}
	if (currentForm == 2){
		currentForm = "recentPressReleasesForm";
	}
	eval("var frm = document." + currentForm + ";");
	var coll_elements = frm.elements;
	var bln_checked = false;
	for (var i = 0; i < coll_elements.length; i++){
		if (coll_elements[i].name == "checkReleases") {
			if (coll_elements[i].checked == true) {
				bln_checked = true;
			}
		}
	}
	if (bln_checked == true) {
		frm.userAction.value = "Selected Documents";
		frm.submit();
	} else{
		if (guiLanguage == "1"){
			alert("Aucun communiqué de presse n'est sélectionné.");
		 } else{
			alert("No press release is selected.");
		 }
		 return;
	}
}

function changeSortType(guiLang){
	if (guiLang == 1){
		guiLang = "en";
	}
	if (guiLang == 2){
		guiLang = "fr";
	}
	var frm = document.recentPressReleasesForm;
	var selectedValue = "DATE";
	if (frm.sortBy.selectedIndex == 1){
		selectedValue="TYPE"
	}
	if (frm.sortBy.selectedIndex == 2){
		selectedValue="TOPIC"
	}
	var hits = frm.hits.value;
	if (guiLang != null && guiLang != ""){
		if (guiLang == "fr" || guiLang == "FR" ){
			guiLang = "&guiLanguage=fr";
		} else {
			guiLang = "&guiLanguage=en";
		}
	}
	else {
		guiLang = "";
	}
	document.location.href = "recentPressReleasesAction.do?hits="+hits+"&sortBy="+selectedValue+guiLang;	
}

function confirmDeletion(queryType, isAdvanced){
	var frm = document.queriesForm;
	if (isAdvanced != null && isAdvanced == "ADVANCED"){
		var frm = document.advancedQueriesForm;
	} 
	if (queryType == "USER"){
		if (guiLanguage == "1"){
			alert("La requête ne sera pas détruite. Vous l'avez choisie comme profil à exécuter.");
		 } else{
			alert("Query will not be deleted, because you have selected it as push query.");
		 }
		return;
	}
	if (guiLanguage == "1"){
		if (!confirm("La requête que vous voulez détruire est sélectionnée comme profil par certains utilisateurs ? Etes vous sûr de vouloir la détruire ?")){
			return;
		}
	} else {
		if (!confirm("The query you are about to delete is selected as push query by some users. Delete anyway?")){
			return;
		}
	}
	frm.buttonPress.value = "Delete Selected Query";
	frm.deletionConfirmed.value="YES";
	frm.submit();
}

function keywordsPopup(){
	var keywords = document.searchForm.keywords.value;
	window.open('browseKeywordsAction.do?selectedKeywords='+keywords,'Hint','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=no,copyhistory=no,width=700,height=480');
}

function keywordsPopup1(){
	var keywords = document.searchForm.keywords.value;
	window.open('browseKeywordsAction.do?selectedKeywords='+keywords,'Hint','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=no,copyhistory=no,width=800,height=480');
}

function keywordsSelected(select){
	if (select == "YES"){
		window.opener.document.searchForm.keywords.value=selectAllOptions(document.all.resultOptions);
	}
	window.close();
	window.opener.focus();
}

function keywordsSelectedNetscape(select){
	var frm = document.browseKeywordsForm;
	if (select == "YES"){
		var coll_elements = frm.elements;
		var keywordsChecked = "";
		var firstKeyword = "";
		for (var i = 0; i < coll_elements.length; i++){
			if (coll_elements[i].name == "keywordsSelected") {
				if (coll_elements[i].checked == true) {
					if (firstKeyword == ""){
						firstKeyword = coll_elements[i].value;
						keywordsChecked += coll_elements[i].value+", ";
					}
					else if ((keywordsChecked.indexOf(", "+coll_elements[i].value+",") == -1) && firstKeyword != coll_elements[i].value) {
						keywordsChecked += coll_elements[i].value+", ";
					} 
				}
			}
		}
		if (keywordsChecked != ""){
			keywordsChecked = keywordsChecked.substring(0, keywordsChecked.length - 2);
		}
		window.opener.document.searchForm.keywords.value=keywordsChecked;
	}
	window.close();
	window.opener.focus();
}

function radioSelect(button, formBean) {
	if (formBean == 1){
		formBean = "searchResultForm";
	}
	if (formBean == 2){
		formBean = "recentPressReleasesForm";
	}
	eval("var frm = document." + formBean + ";");
	var source = "selectedDocumentsType";
	var destination = "selectedDocumentsType1"
	if (button == '1'){
		source = "selectedDocumentsType1";
		destination = "selectedDocumentsType"	
	}
	var coll_elements = frm.elements;
	var sourceValue = "";
	for (var i = 0; i < coll_elements.length; i++){
		if (coll_elements[i].name == source) {
			if (coll_elements[i].checked == true) {
				sourceValue = coll_elements[i].value;
			}
		}
	}
	for (var i = 0; i < coll_elements.length; i++){
		if (coll_elements[i].name == destination) {
			if (coll_elements[i].value == sourceValue) {
				coll_elements[i].checked = true;
			}
		}
	}

	return;
}

function validateLoginForm() {
	var frm = document.loginForm;
	var message = "";
	if (trim(frm.username.value) == "") {
		if (guiLanguage == "1"){
			message += "Utilisateur requis!" + "\n";
		} else {
			message += "Username is required!" + "\n";
		}
	}
	if (trim(frm.password.value) == "") {
		if (guiLanguage == "1"){
			message += "Mot de passe requis!" + "\n";
		} else {
			message += "Password is required!" + "\n";
		}
	}
	if (message != "") {
		alert(message);
		return false;
	}
	if (frm.username.value.length < 3) {
		if (guiLanguage == "1"){
			message += "Le nom d'utilisateur doit comporter au moins 3 caractères!" + "\n";
		} else {
			message += "The username should contain at least 3 characters!" + "\n";
		}
	}
	if (frm.password.value.length < 3) {
		if (guiLanguage == "1"){
			message += "Le mot de passe doit comporter au moins 3 caractères!" + "\n";
		} else {
			message += "The password should contain at least 3 characters!" + "\n";
		}
	}
	if (message != "") {
		alert(message);
		return false;
	}
	return true;
 }

 function trim(string) { 
    var me = string; 
    while(me.charAt(0)==" ") 
        me = me.substr(1); 
    while(me.charAt(me.length-1)==" ") 
        me = me.substr(0,me.length-1); 
 return me; 
}

 function searchKeywords(netscape) {
	var frm = document.browseKeywordsForm;
	guiLng = frm.guiLng.value;
	if (trim(frm.keyOrDescription.value) == "") {
		if (guiLng == "fr"){
			alert("Veuillez entrer le texte recherché.");
		 } else{
			alert("Please, enter the search text.");
		 }
		if (netscape != "YES") {
			return false;
		} else {
			return;
		}
	}
	if (netscape != "YES") {
		document.all.selectedKeywords.value=selectAllOptions(document.all.resultOptions);
	} else {
		frm.submit();
	}
	return true;
 }

function validateSearchForm(){

	if (document.searchForm.dateSelect[1].checked){
		return true;
	}
	var dateFrom=document.searchForm.dateFrom;
	if (guiLanguage == "1"){
		if (isDate(dateFrom.value, "date de début")==false){
			dateFrom.focus()
			return false
		}
	} else {
		if (isDate(dateFrom.value, "Begin Date")==false){
			dateFrom.focus()
			return false
		}
	}
	var dateTo=document.searchForm.dateTo;
	if (guiLanguage == "1"){
		if (isDate(dateTo.value, "date de fin")==false){
			dateTo.focus()
			return false
		}
	} else {
		if (isDate(dateTo.value, "End Date")==false){
			dateTo.focus()
			return false
		}
	}
    return true
 }

function topicSelected(jumpValue, guiLanguage){
	if (jumpValue == null || jumpValue == ""){
		return;
	}
	document.location.href='searchResultAction.do'+jumpValue+'&guiLanguage='+guiLanguage;
}



/* used in GS_PressRelease.jsp
   increases/decreases the font size of a press release body
   param: 
    changeType values: Small, Bigg
*/
function changeFont(changeType){      
    
    var minTextSize = -2;
    var maxTextSize = 3;
    var texteSizeString=new Array;
    var docFontSizeElement=document.getElementById("docFontSize");
    var textSize=new Number(docFontSizeElement.value);    

    texteSizeString[-2]="smallerText";
    texteSizeString[-1]="smallText";
    texteSizeString[0]="normalText";
    texteSizeString[1]="bigText";
    texteSizeString[2]="biggerText";
    texteSizeString[3]="biggerText2";    

    if(changeType == "Small") { 	
        if (textSize>minTextSize){
             textSize -= 1;	 
             document.getElementById("bodyContent").className =  texteSizeString[textSize];
             document.getElementById("bodyContent").style.display = "inline";    
        }
    } else {  	
        if (textSize<maxTextSize){
            textSize += 1;		 
            document.getElementById("bodyContent").className =  texteSizeString[textSize];
            document.getElementById("bodyContent").style.display = "inline";    
        }
    }   
    docFontSizeElement.value=textSize;
 
}