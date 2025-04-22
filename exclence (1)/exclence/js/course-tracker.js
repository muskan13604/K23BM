class CourseTracker {
    constructor() {
        this.startTime = null;
        this.courseId = null;
        this.trackingInterval = null;
        this.timeSpent = 0;
    }

    startTracking(courseId) {
        if (this.courseId === courseId && this.trackingInterval) {
            return; // Already tracking this course
        }

        // Stop tracking previous course if any
        this.stopTracking();

        this.courseId = courseId;
        this.startTime = Date.now();
        this.timeSpent = 0;

        // Update time spent every minute
        this.trackingInterval = setInterval(() => {
            this.timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateTimeDisplay();
            
            // Send update every 5 minutes
            if (this.timeSpent % 300 === 0) {
                this.saveProgress();
            }
        }, 60000); // Check every minute

        // Update display immediately
        this.updateTimeDisplay();
    }

    stopTracking() {
        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
            this.saveProgress();
            this.trackingInterval = null;
        }
        this.courseId = null;
        this.startTime = null;
        this.timeSpent = 0;
    }

    async saveProgress() {
        if (!this.courseId || this.timeSpent === 0) return;

        try {
            const response = await fetch('track_time.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course_id: this.courseId,
                    time_spent: this.timeSpent
                })
            });

            const data = await response.json();
            
            if (data.success) {
                // Update the time display with the total time from server
                this.updateTotalTimeDisplay(data.total_time);
                // Reset the current session timer
                this.startTime = Date.now();
                this.timeSpent = 0;
            } else {
                console.error('Failed to save progress:', data.error);
            }
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    updateTimeDisplay() {
        const timeDisplay = document.querySelector(`[data-course-time="${this.courseId}"]`);
        if (timeDisplay) {
            const hours = Math.floor(this.timeSpent / 3600);
            const minutes = Math.floor((this.timeSpent % 3600) / 60);
            timeDisplay.textContent = `${hours}h ${minutes}m`;
        }
    }

    updateTotalTimeDisplay(totalTime) {
        const timeDisplay = document.querySelector(`[data-course-time="${this.courseId}"]`);
        if (timeDisplay) {
            timeDisplay.textContent = `${totalTime.hours}h ${totalTime.minutes}m`;
        }
    }
}

// Initialize the tracker
const courseTracker = new CourseTracker();

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start tracking when entering a course page
    const courseContent = document.querySelector('[data-course-id]');
    if (courseContent) {
        const courseId = courseContent.dataset.courseId;
        courseTracker.startTracking(courseId);
    }

    // Stop tracking when leaving the page
    window.addEventListener('beforeunload', () => {
        courseTracker.stopTracking();
    });

    // Handle visibility change (tab switching, minimizing)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            courseTracker.saveProgress();
        }
    });
}); 