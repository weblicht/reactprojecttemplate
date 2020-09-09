// Return the main app version information provided by the API:
export function selectVersion(globalState) {
    try {
        return globalState.apiinfo.version
    } catch (e) {
        return undefined;
    }
}
