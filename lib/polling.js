function PollingTimer(options) {
    options = options || {};
    this.timeout = options.timeout || 120 * 1000;
    this.timer = null;
    this.runCallback = null;
    this.intervalTime = 1000;
    this.endCallback = null;
    this.startTime = null;
}

PollingTimer.prototype.start = function (intervalTime) {
    this.intervalTime = intervalTime;
    this.startTime = Date.now();
    this.run();
};

PollingTimer.prototype.setRunCallback = function (func) {
    if (typeof func !== 'function') {
        throw new Error('Invalid params');
    }
    this.runCallback = func;
};

PollingTimer.prototype.setEndCallback = function (func) {
    if (typeof func !== 'function') {
        throw new Error('Invalid params');
    }
    this.endCallback = func;
};

PollingTimer.prototype.run = function () {
    const self = this;
    const nowTime = Date.now();
    if ((nowTime - self.startTime) >= this.timeout) {
        return this.stop();
    }
    this.timer = setTimeout(function () {
        if (!self.runCallback) {
            self.stop();
        }
        const res = self.runCallback();
        if (!res) {
            return self.run();
        }
        self.stop();
    }, this.intervalTime);
};

PollingTimer.prototype.stop = function () {
    clearTimeout(this.timer);
    if (this.endCallback) {
        this.endCallback();
    }
};

module.exports = PollingTimer;