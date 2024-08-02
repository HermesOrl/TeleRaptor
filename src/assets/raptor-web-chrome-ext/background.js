function stripHeaders(headers) {
	const toExclude = [
		'content-security-policy',
		'x-frame-options',
		'permissions-policy',
		'x-xss-protection',
		'x-content-type-options',
		'strict-transport-security',
		'expect-ct',
		'expires',
		'cf-cache-status',
		'cf-ray',
		'cf-request-id',
	];
	return headers.filter(h => {
		return !toExclude.includes(h.name.toLowerCase());
	})
}

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    return {
      responseHeaders: stripHeaders(details.responseHeaders)
    };
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "responseHeaders", "extraHeaders"]
);
