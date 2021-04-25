function escapeRegexCharacters(str: any) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default escapeRegexCharacters;
