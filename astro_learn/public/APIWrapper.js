var apiHandle = null;
var SCORM_INITIALIZED = false;

// Obtener la referencia a la API del LMS
function getAPIHandle() {
  if (apiHandle == null) {
    apiHandle = findAPI(window);
  }
  if (apiHandle == null) {
    console.error("No se pudo encontrar la API SCORM.");
  }
  return apiHandle;
}

// Buscar la API en la ventana y en los frames padres
function findAPI(win) {
  var attempts = 0;
  while ((win.API == null) && (win.parent != null) && (win.parent != win) && (attempts < 7)) {
    attempts++;
    win = win.parent;
  }
  return win.API;
}

// Inicializar SCORM
function LMSInitialize(dummyString) {
  var api = getAPIHandle();
  if (api == null) {
    console.error("No se pudo inicializar SCORM: API no encontrada.");
    return "false";
  }
  var result = api.LMSInitialize(dummyString);
  if (result == "true") {
    SCORM_INITIALIZED = true;
  } else {
    console.error("Error en LMSInitialize: " + LMSGetLastError());
  }
  return result;
}

// Finalizar SCORM
function LMSFinish(dummyString) {
  if (!SCORM_INITIALIZED) {
    console.error("SCORM no está inicializado. No se puede finalizar.");
    return "false";
  }
  var api = getAPIHandle();
  if (api == null) {
    console.error("No se pudo finalizar SCORM: API no encontrada.");
    return "false";
  }
  var result = api.LMSFinish(dummyString);
  if (result == "true") {
    SCORM_INITIALIZED = false;
  } else {
    console.error("Error en LMSFinish: " + LMSGetLastError());
  }
  return result;
}

// Guardar los datos en el LMS
function LMSCommit(dummyString) {
  if (!SCORM_INITIALIZED) {
    console.error("SCORM no está inicializado. No se puede guardar.");
    return "false";
  }
  var api = getAPIHandle();
  if (api == null) {
    console.error("No se pudo guardar los datos: API no encontrada.");
    return "false";
  }
  var result = api.LMSCommit(dummyString);
  return result;
}

// Obtener un valor del LMS
function LMSGetValue(name) {
  if (!SCORM_INITIALIZED) {
    console.error("SCORM no está inicializado. No se puede obtener un valor.");
    return "";
  }
  var api = getAPIHandle();
  if (api == null) {
    console.error("No se pudo obtener el valor: API no encontrada.");
    return "";
  }
  var value = api.LMSGetValue(name);
  return value;
}

// Establecer un valor en el LMS
function LMSSetValue(name, value) {
  if (!SCORM_INITIALIZED) {
    console.error("SCORM no está inicializado. No se puede establecer un valor.");
    return "false";
  }
  var api = getAPIHandle();
  if (api == null) {
    console.error("No se pudo establecer el valor: API no encontrada.");
    return "false";
  }
  var result = api.LMSSetValue(name, value);
  return result;
}

// Obtener el último error del LMS
function LMSGetLastError() {
  var api = getAPIHandle();
  if (api == null) {
    console.error("API no encontrada. No se pudo obtener el último error.");
    return "101"; // Código genérico de error
  }
  return api.LMSGetLastError();
}

// Obtener una descripción del error
function LMSGetErrorString(errorCode) {
  var api = getAPIHandle();
  if (api == null) {
    console.error("API no encontrada. No se pudo obtener la descripción del error.");
    return "No API";
  }
  return api.LMSGetErrorString(errorCode);
}
