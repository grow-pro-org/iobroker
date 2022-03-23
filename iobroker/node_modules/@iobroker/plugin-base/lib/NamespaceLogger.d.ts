export = NamespaceLogger;
declare class NamespaceLogger {
    /**
     * @param {string} namespaceLog Logging namespace to prefix
     * @param {ioBroker.Logger} logger logger instance
     */
    constructor(namespaceLog: string, logger: ioBroker.Logger);
    namespaceLog: string;
    logger: ioBroker.Logger;
    /**
     * @param {string} msg
     */
    silly(msg: string): void;
    /**
     * @param {string} msg
     */
    debug(msg: string): void;
    /**
     * @param {string} msg
     */
    info(msg: string): void;
    /**
     * @param {string} msg
     */
    error(msg: string): void;
    /**
     * @param {string} msg
     */
    warn(msg: string): void;
}
