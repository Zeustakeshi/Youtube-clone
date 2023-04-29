export default function generateKeywordSuggestions(keyword, availableKeywords) {
    const suggestions = [];

    for (const availableKeyword of availableKeywords) {
        const similarity = calculateKeywordSimilarity(
            keyword,
            availableKeyword
        );

        if (similarity >= 0.14) {
            suggestions.push({ availableKeyword, similarity });
        }
    }

    return suggestions;
}

function calculateKeywordSimilarity(keyword1, keyword2) {
    const distance = levenshteinDistance(keyword1, keyword2);
    const maxLength = Math.max(keyword1.length, keyword2.length);
    const similarity = 1 - distance / maxLength;
    return similarity;
}

function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    const dp = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(null));

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    const distance = dp[m][n];
    return distance;
}
