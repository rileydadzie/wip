const stopwatch = {
    startTime,
    currentTime,
    currentElapsedTime,
    elapsedTime:0,
    timerInterval, 
    isRunning:false,
    totalSeconds,
    hours,
    minutes,
    seconds,
    time,
    
    update: function() {
        this.currentTime = Date.now();
        this.currentElapsedTime = this.currentTime - this.startTime;
        this.convert()
    },
    convert: function () {
        this.totalSeconds = Math.floor(this.currentElapsedTime/1000)
        this.hours = Math.floor(this.totalSeconds/3600)
        this.minutes = Math.floor((this.totalSeconds % 3600)/60);
        this.seconds = this.totalSeconds % 60;
        this.format()
    },
    format: function () {
        this.hours = String(this.hours).padStart(2,"0");
        this.minutes = String(this.minutes).padStart(2,'0');
        this.seconds = String(this.seconds).padStart(2,'0');
        this.time = `${this.hours}:${this.minutes}:${this.seconds}`

    },
    start: function () {
        if(!this.isRunning) {
            this.isRunning = true
            this.startTime = Date.now()-elapsedTime
            this.timerInterval = setInterval(this.update(), 1000)
        }
    },
    stop: function () {
        if(this.isRunning) {
            this.isRunning = false
            clearInterval(this.timerInterval)
            this.elapsedTime = Date.now() - this.startTime
        }
    },
    reset: function () {
        this.stop()
        this.elapsedTime = 0
        this.startTime = Date.now()
        this.update()
    }
}