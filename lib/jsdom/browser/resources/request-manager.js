"use strict";

/**
 * Manage all the request and it is able to abort
 * all pending request.
 */
module.exports = class RequestManager {
  constructor() {
    this.openedRequests = [];
  }

  add(req) {
    this.openedRequests.push(req);
  }

  remove(req) {
    const idx = this.openedRequests.indexOf(req);
    if (idx !== -1) {
      this.openedRequests.splice(idx, 1);
    }
  }

  close() {
    while (this.openedRequests.length > 0) {
      const openedRequest = this.openedRequests.shift();

      if (typeof openedRequest?.abort === "function") {
        openedRequest.abort();
      }
    }
  }

  size() {
    return this.openedRequests.length;
  }
};
