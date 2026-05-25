/**
 * Comprehensive Logging and Analytics System
 * Handles application logging, event tracking, and performance monitoring
 */

// ============================================================================
// LOG LEVELS
// ============================================================================

export const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE'
};

// ============================================================================
// LOGGER CONFIGURATION
// ============================================================================

const LOG_CONFIG = {
  enableConsole: true,
  enableStorage: true,
  enableRemote: import.meta.env.PROD,
  maxStorageSize: 1000,
  remoteUrl: '/api/logs'
};

// ============================================================================
// LOGGER CLASS
// ============================================================================

class Logger {
  constructor(name = 'App') {
    this.name = name;
    this.logs = [];
    this.loadStoredLogs();
  }

  /**
   * Log error message
   */
  error(message, error = null, metadata = {}) {
    this.log(LOG_LEVELS.ERROR, message, error, metadata);
  }

  /**
   * Log warning message
   */
  warn(message, metadata = {}) {
    this.log(LOG_LEVELS.WARN, message, null, metadata);
  }

  /**
   * Log info message
   */
  info(message, metadata = {}) {
    this.log(LOG_LEVELS.INFO, message, null, metadata);
  }

  /**
   * Log debug message
   */
  debug(message, metadata = {}) {
    this.log(LOG_LEVELS.DEBUG, message, null, metadata);
  }

  /**
   * Log trace message
   */
  trace(message, metadata = {}) {
    this.log(LOG_LEVELS.TRACE, message, null, metadata);
  }

  /**
   * Internal logging method
   */
  log(level, message, error = null, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      logger: this.name,
      message,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : null,
      metadata,
      userAgent: navigator.userAgent
    };

    // Add to in-memory storage
    this.logs.push(logEntry);
    if (this.logs.length > LOG_CONFIG.maxStorageSize) {
      this.logs.shift();
    }

    // Console output
    if (LOG_CONFIG.enableConsole) {
      this.consoleLog(logEntry);
    }

    // Local storage
    if (LOG_CONFIG.enableStorage) {
      this.storeLog(logEntry);
    }

    // Remote logging (production only)
    if (LOG_CONFIG.enableRemote && level === LOG_LEVELS.ERROR) {
      this.sendRemote(logEntry);
    }
  }

  /**
   * Console logging with styling
   */
  consoleLog(logEntry) {
    const { level, message, error, metadata } = logEntry;
    const timestamp = new Date(logEntry.timestamp).toLocaleTimeString();

    const styles = {
      ERROR: 'color: #EF4444; font-weight: bold;',
      WARN: 'color: #F59E0B; font-weight: bold;',
      INFO: 'color: #3B82F6; font-weight: bold;',
      DEBUG: 'color: #8B5CF6; font-weight: bold;',
      TRACE: 'color: #6B7280; font-weight: bold;'
    };

    const style = styles[level] || '';
    console.log(`%c[${timestamp}] ${level}:`, style, message);

    if (error) {
      console.error('Error Details:', error);
    }

    if (Object.keys(metadata).length > 0) {
      console.log('Metadata:', metadata);
    }
  }

  /**
   * Store logs in local storage
   */
  storeLog(logEntry) {
    try {
      const storedLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      storedLogs.push(logEntry);

      // Keep only last 100 entries
      if (storedLogs.length > 100) {
        storedLogs.shift();
      }

      localStorage.setItem('app_logs', JSON.stringify(storedLogs));
    } catch (error) {
      console.error('Failed to store log:', error);
    }
  }

  /**
   * Load stored logs from local storage
   */
  loadStoredLogs() {
    try {
      const storedLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      this.logs = [...storedLogs];
    } catch (error) {
      console.error('Failed to load stored logs:', error);
    }
  }

  /**
   * Send error logs to remote server
   */
  async sendRemote(logEntry) {
    try {
      await fetch(LOG_CONFIG.remoteUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry)
      });
    } catch (error) {
      console.error('Failed to send remote log:', error);
    }
  }

  /**
   * Get all logs
   */
  getLogs(level = null) {
    if (!level) return this.logs;
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Clear logs
   */
  clearLogs() {
    this.logs = [];
    try {
      localStorage.removeItem('app_logs');
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  }

  /**
   * Export logs as JSON
   */
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Export logs as CSV
   */
  exportLogsAsCSV() {
    const headers = ['Timestamp', 'Level', 'Logger', 'Message', 'Error', 'Metadata'];
    const rows = this.logs.map(log => [
      log.timestamp,
      log.level,
      log.logger,
      log.message,
      log.error ? log.error.message : '',
      JSON.stringify(log.metadata)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  }
}

// ============================================================================
// ANALYTICS TRACKER
// ============================================================================

class AnalyticsTracker {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  /**
   * Track event
   */
  trackEvent(category, action, label = '', value = 0) {
    const event = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      category,
      action,
      label,
      value,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.events.push(event);
    this.storeEvent(event);
  }

  /**
   * Track page view
   */
  trackPageView(pageName) {
    this.trackEvent('page', 'view', pageName);
  }

  /**
   * Track user action
   */
  trackUserAction(action, metadata = {}) {
    this.trackEvent('user', action, '', metadata);
  }

  /**
   * Track purchase
   */
  trackPurchase(orderId, amount, itemCount) {
    this.trackEvent('ecommerce', 'purchase', orderId, amount);
    this.storeEvent({
      type: 'purchase',
      orderId,
      amount,
      itemCount,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track error
   */
  trackError(errorMessage, errorCode = 'UNKNOWN') {
    this.trackEvent('error', 'occurred', errorCode, 0);
    this.storeEvent({
      type: 'error',
      message: errorMessage,
      code: errorCode,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Get session duration
   */
  getSessionDuration() {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  /**
   * Store event in local storage
   */
  storeEvent(event) {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      storedEvents.push(event);

      if (storedEvents.length > 1000) {
        storedEvents.shift();
      }

      localStorage.setItem('analytics_events', JSON.stringify(storedEvents));
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get session info
   */
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      duration: this.getSessionDuration(),
      eventCount: this.events.length,
      startTime: new Date(this.startTime).toISOString()
    };
  }

  /**
   * Send analytics to server
   */
  async sendAnalytics() {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: this.events,
          sessionDuration: this.getSessionDuration()
        })
      });
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  }
}

// ============================================================================
// PERFORMANCE MONITOR
// ============================================================================

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.startTimes = {};
  }

  /**
   * Start measuring performance
   */
  start(label) {
    this.startTimes[label] = performance.now();
  }

  /**
   * End measuring and store metric
   */
  end(label) {
    if (!this.startTimes[label]) {
      console.warn(`Performance marker '${label}' was not started`);
      return;
    }

    const duration = performance.now() - this.startTimes[label];
    this.metrics[label] = duration;
    delete this.startTimes[label];

    return duration;
  }

  /**
   * Get metric duration
   */
  getMetric(label) {
    return this.metrics[label] || null;
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    return { ...this.metrics };
  }

  /**
   * Clear metrics
   */
  clearMetrics() {
    this.metrics = {};
    this.startTimes = {};
  }

  /**
   * Log performance summary
   */
  logSummary() {
    const summary = {
      timestamp: new Date().toISOString(),
      metrics: this.getAllMetrics(),
      navigationTiming: this.getNavigationTiming()
    };

    console.table(summary.metrics);
    return summary;
  }

  /**
   * Get navigation timing data
   */
  getNavigationTiming() {
    if (!window.performance || !window.performance.timing) {
      return null;
    }

    const timing = window.performance.timing;
    return {
      domContentLoaded: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
      loadComplete: timing.loadEventEnd - timing.loadEventStart,
      totalTime: timing.loadEventEnd - timing.fetchStart
    };
  }
}

// ============================================================================
// SINGLETON INSTANCES
// ============================================================================

export const logger = new Logger('Ecocreds');
export const analytics = new AnalyticsTracker();
export const performance = new PerformanceMonitor();

// ============================================================================
// ERROR BOUNDARY HELPER
// ============================================================================

export const setupGlobalErrorHandler = () => {
  window.addEventListener('error', (event) => {
    logger.error('Global Error', event.error, {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
    analytics.trackError(event.message, 'GLOBAL_ERROR');
  });

  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection', event.reason, {
      promise: event.promise
    });
    analytics.trackError(
      event.reason?.message || 'Unknown promise rejection',
      'UNHANDLED_REJECTION'
    );
  });
};

export default {
  logger,
  analytics,
  performance,
  setupGlobalErrorHandler,
  LOG_LEVELS
};
