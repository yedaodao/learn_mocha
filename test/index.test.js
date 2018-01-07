const should = require('should');
const PollingTimer = require('../index');

describe('PollingTimer', function () {
    describe('#Constructor', function () {
        it('should return a correct instance', function () {
            let pollingTimer = new PollingTimer();
            (pollingTimer instanceof PollingTimer).should.equal(true);
        })
    });

    describe('#setRunCallback', function () {
        it('should has runCallback attr', function () {
            let pollingTimer = new PollingTimer();
            pollingTimer.setRunCallback(function () {
                return false;
            });
            (typeof pollingTimer.runCallback).should.equal('function');
        });
        it('should throw error', function () {
            let pollingTimer = new PollingTimer();
            try {
                pollingTimer.setRunCallback(null);
            } catch (err) {
                (typeof err).should.equal('object');
            }
        });
    });

    describe('#start', function () {
        it('should not throw error', function (done) {
            let pollingTimer = new PollingTimer();
            pollingTimer.setRunCallback(function () {
                return true;
            });
            pollingTimer.setEndCallback(function () {
                done();
            });
            pollingTimer.start();
        });

        it('should timeout', function (done) {
            this.timeout(10000);
            let pollingTimer = new PollingTimer({timeout: 5 * 1000});
            pollingTimer.setRunCallback(function () {
                return false;
            });
            pollingTimer.setEndCallback(function () {
                done();
            });
            pollingTimer.start();
        })
    });
});