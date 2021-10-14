const logger = {
    debug: () => {},
    log: () => {},
    info: () => {},
    warn: () => {},
    error: () => {}
  };
  
  if (process.env.NODE_ENV === 'development') {
    logger.debug = window.console.debug;
    logger.log = window.console.log;
    logger.info = window.console.info;
    logger.warn = window.console.warn;
    logger.error = window.console.error;
  }
  
  export default logger;
  